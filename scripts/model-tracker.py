#!/usr/bin/env python3
"""
Model Data Tracker — detect model version changes from AI vendors.
Creates a report and sets GitHub Actions outputs for downstream steps.
"""
import json, os, re, sys, urllib.request, urllib.error
from datetime import datetime

VENDORS = [
    {"id": "gpt",     "name": "OpenAI",    "url": "https://platform.openai.com/docs/models",             "pattern": r'GPT[- ]?5\.\d+',            "recorded": "GPT-5.5 / 5.6"},
    {"id": "claude",  "name": "Anthropic", "url": "https://docs.anthropic.com/en/docs/about-claude/models", "pattern": r'Claude\s+(?:Opus|Sonnet|Fable)\s+[\d.]+', "recorded": "Claude Opus 4.7 / 4.8"},
    {"id": "gemini",  "name": "Google",    "url": "https://ai.google.dev/gemini-api/docs/models",       "pattern": r'Gemini\s+[\d.]+\s*(?:Pro|Ultra|Flash)?', "recorded": "Gemini 3.1 Pro"},
    {"id": "grok",    "name": "xAI",       "url": "https://docs.x.ai/docs/models",                      "pattern": r'Grok\s+[\d.]+',              "recorded": "Grok 4.1"},
    {"id": "deepseek","name": "DeepSeek",  "url": "https://api-docs.deepseek.com/",                     "pattern": r'DeepSeek\s+V?[\d.]+',        "recorded": "DeepSeek V4 / V4-Pro"},
    {"id": "qwen",    "name": "Alibaba",   "url": "https://help.aliyun.com/zh/model-studio/getting-started/models", "pattern": r'Qwen\d*', "recorded": "通义千问 Qwen3"},
]

def fetch(url, timeout=15):
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (compatible; ModelTracker/1.0)',
            'Accept': 'text/html,application/xhtml+xml'
        })
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return r.read().decode('utf-8', errors='replace')
    except Exception as e:
        return f"<!-- FETCH ERROR: {e} -->"

def find_versions(html, pattern):
    return sorted(set(re.findall(pattern, html, re.IGNORECASE)), key=lambda x: -len(x))

changes = []
for v in VENDORS:
    print(f"  {v['name']:12s} ...", end=" ", flush=True)
    html = fetch(v['url'])
    versions = find_versions(html, v['pattern'])
    if versions:
        found = versions[0]
        # Normalize for comparison
        rec_clean = re.sub(r'[\s/]+', '', v['recorded'].lower())
        found_clean = re.sub(r'[\s/]+', '', found.lower())
        if found_clean not in rec_clean and rec_clean not in found_clean:
            changes.append(v)
            print(f"CHANGED: {found}")
        else:
            print(f"ok ({found})")
    else:
        print("no match (may need JS/auth)")

# Generate report
report = []
report.append(f"# 🤖 Model Update Report")
report.append(f"**Generated:** {datetime.utcnow().strftime('%Y-%m-%d %H:%M UTC')}")
report.append("")
if not changes:
    report.append("✅ **No model changes detected.** All vendors up to date.")
else:
    report.append(f"⚠️ **{len(changes)} vendor(s) may have updated models:**\n")
    for c in changes:
        report.append(f"- **{c['name']}** — recorded: `{c['recorded']}` → check: {c['url']}")
    report.append("")
    report.append("Please review and update `js/data.js` if needed.")

report_text = "\n".join(report)
print(f"\n{'='*50}\n{report_text}")

# Write report for GitHub
report_path = os.path.join(os.environ.get('GITHUB_WORKSPACE', '.'), 'model-tracker-report.md')
with open(report_path, 'w') as f:
    f.write(report_text)

# Set GitHub Actions outputs
github_output = os.environ.get('GITHUB_OUTPUT', '/dev/null')
with open(github_output, 'a') as f:
    f.write(f"changed={'true' if changes else 'false'}\n")
    if changes:
        names = json.dumps([c['name'] for c in changes])
        f.write(f"vendors={names}\n")

sys.exit(0 if not changes else 0)  # Don't fail — let workflow decide next step
