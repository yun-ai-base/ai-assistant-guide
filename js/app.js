/* ===================== AI 使用智能助理 · 学习向导 ===================== */
(function () {
  "use strict";

  /* ---------- 顶部导航 ---------- */
  const topnav = document.getElementById("topnav");
  const panels = {
    overview: document.getElementById("panel-overview"),
    models: document.getElementById("panel-models"),
    concepts: document.getElementById("panel-concepts"),
    agents: document.getElementById("panel-agents")
  };
  let currentTab = "overview";
  function switchTab(tab) {
    if (!panels[tab]) return;
    currentTab = tab;
    topnav.querySelectorAll(".navbtn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    Object.entries(panels).forEach(([k, el]) => el.classList.toggle("active", k === tab));
    if (tab === "concepts") highlightRelNode(activeConcept); // 概念 ⇄ 关系图联动
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (location.hash.slice(1) !== tab) history.replaceState(null, "", "#" + tab); // 可分享 / 刷新保留
  }
  topnav.addEventListener("click", e => {
    const btn = e.target.closest(".navbtn");
    if (btn) switchTab(btn.dataset.tab);
  });
  document.querySelectorAll(".hero-card").forEach(c =>
    c.addEventListener("click", () => switchTab(c.dataset.goto))
  );
  // 支持 URL 直达（如 #models、#concepts），浏览器前进/后退也能用
  function applyHash() {
    const t = location.hash.slice(1);
    if (t && panels[t] && t !== currentTab) switchTab(t);
  }
  window.addEventListener("hashchange", applyHash);

  /* ===================== 模块一：模型 ===================== */
  const grid = document.getElementById("model-grid");
  const state = { country: "all", type: "all", q: "" };

  // 各模型官方使用站点（中国模型卡片点击即跳转，所有卡片底部也有显式链接）
  const MODEL_SITES = {
    gpt: "https://chat.openai.com",
    claude: "https://claude.ai",
    gemini: "https://gemini.google.com",
    grok: "https://grok.com",
    deepseek: "https://chat.deepseek.com",
    qwen: "https://chat.qwen.ai",
    doubao: "https://www.doubao.com",
    glm: "https://chat.zhipuai.cn",
    kimi: "https://kimi.com",
    hunyuan: "https://yuanbao.tencent.com",
    minimax: "https://hailuoai.com",
    mimo: "https://mimo.mi.com"
  };

  function modelMatches(m) {
    if (state.country !== "all" && m.country !== state.country) return false;
    if (state.type !== "all" && m.type !== state.type) return false;
    if (state.q) {
      const hay = (m.name + m.vendor + m.tag + m.scene).toLowerCase();
      if (!hay.includes(state.q.toLowerCase())) return false;
    }
    return true;
  }

  function renderModels() {
    const list = MODELS.filter(modelMatches);
    grid.innerHTML = list.length
      ? list.map(m => {
        const site = MODEL_SITES[m.id] || "#";
        return `
        <article class="model-card ${m.country === "cn" ? "cn-click" : ""}">
          ${m.country === "cn" ? `<a class="mc-stretch" href="${site}" target="_blank" rel="noopener" aria-label="前往 ${m.name} 官网"></a>` : ""}
          <span class="flag ${m.country}">${m.country === "us" ? "🇺🇸 美国" : "🇨🇳 中国"}</span>
          <div class="mc-head">
            <div>
              <div class="mc-name">${m.name}</div>
              <div class="mc-vendor">${m.vendor} · ${m.type === "closed" ? "闭源" : "开源"}</div>
            </div>
          </div>
          <span class="mc-tag">${m.tag}</span>
          <div class="mc-meta"><b>版本：</b>${m.version}<br><b>上下文：</b>${m.context}</div>
          <div class="mc-section">
            <h5>✅ 优势</h5>
            <ul class="mc-list">${m.strengths.map(s => `<li>${s}</li>`).join("")}</ul>
          </div>
          <div class="mc-section">
            <h5>⚠️ 短板</h5>
            <ul class="mc-list weak">${m.weakness.map(s => `<li>${s}</li>`).join("")}</ul>
          </div>
          <div class="mc-section">
            <h5>🎯 适用场景</h5>
            <div class="mc-meta">${m.scene}</div>
          </div>
          <div class="mc-section">
            <h5>👤 选型建议</h5>
            <div class="mc-meta">${m.forWhom}</div>
          </div>
          <div class="mc-section">
            <h5>💡 使用心法</h5>
            <div class="mc-meta">${m.tip}</div>
          </div>
          <div class="mc-section">
            <h5>🔗 常搭配</h5>
            <div class="mc-meta">${m.stack}</div>
          </div>
          <div class="mc-price"><b>价格：</b>${m.price}</div>
          <a class="mc-site" href="${site}" target="_blank" rel="noopener">🌐 前往官网 →${m.country === "cn" ? "（或点击卡片）" : ""}</a>
        </article>`;
      }).join("")
      : `<p style="color:var(--text-dim)">没有匹配的模型，试试调整筛选条件。</p>`;
  }

  document.getElementById("model-country").addEventListener("click", e => {
    const b = e.target.closest(".fbtn"); if (!b) return;
    state.country = b.dataset.country;
    document.querySelectorAll("#model-country .fbtn").forEach(x => x.classList.toggle("active", x === b));
    renderModels();
  });
  document.getElementById("model-type").addEventListener("click", e => {
    const b = e.target.closest(".fbtn"); if (!b) return;
    state.type = b.dataset.type;
    document.querySelectorAll("#model-type .fbtn").forEach(x => x.classList.toggle("active", x === b));
    renderModels();
  });
  document.getElementById("model-search").addEventListener("input", e => {
    state.q = e.target.value.trim(); renderModels();
  });
  renderModels();

  /* ===================== 模块二：概念 ===================== */
  const tabsEl = document.getElementById("concept-tabs");
  const bodyEl = document.getElementById("concept-body");
  let activeConcept = CONCEPTS[0].id;

  tabsEl.innerHTML = CONCEPTS.map(c =>
    `<button class="ctab ${c.id === activeConcept ? "active" : ""}" data-id="${c.id}">
       <span class="ico">${c.icon}</span>${c.name.split("（")[0]}
     </button>`).join("");

  function conceptViz(id) {
    const C = { line: "#2a3342", txt: "#9aa7b8", a: "#4cc2ff", b: "#a78bfa", g: "#34d399", w: "#fbbf24", p: "#f472b6" };
    const head = `<svg viewBox="0 0 300 160" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">`;
    const tail = `</svg>`;
    if (id === "prompt") return head + `
      <rect x="20" y="30" width="120" height="60" rx="12" fill="#1a212e" stroke="${C.a}"/>
      <text x="80" y="58" fill="${C.txt}" font-size="12" text-anchor="middle">你：帮我写报告</text>
      <text x="80" y="76" fill="${C.txt}" font-size="11" text-anchor="middle">(Prompt)</text>
      <path d="M140 60 H200" stroke="${C.a}" stroke-width="2" marker-end="url(#ar)"/>
      <circle cx="240" cy="60" r="26" fill="#16263f" stroke="${C.b}"/>
      <text x="240" y="64" fill="${C.b}" font-size="12" text-anchor="middle">AI</text>
      <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${C.a}"/></marker></defs>` + tail;
    if (id === "skill") return head + `
      <rect x="20" y="40" width="70" height="50" rx="8" fill="#1a212e" stroke="${C.b}"/>
      <text x="55" y="62" fill="${C.b}" font-size="11" text-anchor="middle">📘 Skill</text>
      <path d="M90 65 H150" stroke="${C.b}" stroke-width="2" marker-end="url(#ar2)"/>
      <rect x="155" y="40" width="120" height="50" rx="8" fill="#16263f" stroke="${C.a}"/>
      <text x="215" y="58" fill="${C.txt}" font-size="11" text-anchor="middle">自动补齐角色</text>
      <text x="215" y="74" fill="${C.txt}" font-size="11" text-anchor="middle">+流程(SOP)</text>
      <defs><marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${C.b}"/></marker></defs>` + tail;
    if (id === "agent") return head + `
      <circle cx="60" cy="80" r="30" fill="#16263f" stroke="${C.g}"/>
      <text x="60" y="85" fill="${C.g}" font-size="20" text-anchor="middle">🤖</text>
      <path d="M95 60 H140" stroke="${C.g}" stroke-width="2" marker-end="url(#ar3)"/>
      <rect x="145" y="20" width="60" height="34" rx="8" fill="#1a212e" stroke="${C.a}"/><text x="175" y="42" fill="${C.txt}" font-size="11" text-anchor="middle">🔍 搜索</text>
      <rect x="145" y="63" width="60" height="34" rx="8" fill="#1a212e" stroke="${C.a}"/><text x="175" y="85" fill="${C.txt}" font-size="11" text-anchor="middle">💻 代码</text>
      <rect x="145" y="106" width="60" height="34" rx="8" fill="#1a212e" stroke="${C.a}"/><text x="175" y="128" fill="${C.txt}" font-size="11" text-anchor="middle">📁 文件</text>
      <defs><marker id="ar3" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="${C.g}"/></marker></defs>` + tail;
    if (id === "mcp") return head + `
      <circle cx="150" cy="80" r="28" fill="#16263f" stroke="${C.a}"/>
      <text x="150" y="85" fill="${C.a}" font-size="12" text-anchor="middle">MCP</text>
      <line x1="150" y1="52" x2="150" y2="22" stroke="${C.line}"/>
      <line x1="122" y1="62" x2="95" y2="35" stroke="${C.line}"/>
      <line x1="178" y1="62" x2="205" y2="35" stroke="${C.line}"/>
      <line x1="122" y1="98" x2="95" y2="125" stroke="${C.line}"/>
      <line x1="178" y1="98" x2="205" y2="125" stroke="${C.line}"/>
      <circle cx="150" cy="18" r="9" fill="#1a212e" stroke="${C.b}"/><text x="150" y="22" fill="${C.b}" font-size="10" text-anchor="middle">📧</text>
      <circle cx="90" cy="32" r="9" fill="#1a212e" stroke="${C.b}"/><text x="90" y="36" fill="${C.b}" font-size="10" text-anchor="middle">📅</text>
      <circle cx="210" cy="32" r="9" fill="#1a212e" stroke="${C.b}"/><text x="210" y="36" fill="${C.b}" font-size="10" text-anchor="middle">🗂️</text>
      <circle cx="90" cy="128" r="9" fill="#1a212e" stroke="${C.b}"/><text x="90" y="132" fill="${C.b}" font-size="10" text-anchor="middle">🔌</text>
      <circle cx="210" cy="128" r="9" fill="#1a212e" stroke="${C.b}"/><text x="210" y="132" fill="${C.b}" font-size="10" text-anchor="middle">🛢️</text>` + tail;
    if (id === "token") return head + `
      <text x="150" y="30" fill="${C.txt}" font-size="11" text-anchor="middle">文字被拆成 Token 逐个处理</text>
      ${[0,1,2,3,4,5,6].map(i => `<rect x="${20+i*38}" y="60" width="30" height="40" rx="6" fill="#1a212e" stroke="${i%2?C.a:C.p}"/>`).join("")}
      <text x="35" y="84" fill="${C.txt}" font-size="11" text-anchor="middle">你</text>
      <text x="73" y="84" fill="${C.txt}" font-size="11" text-anchor="middle">好</text>
      <text x="149" y="84" fill="${C.txt}" font-size="11" text-anchor="middle">AI</text>
      <text x="187" y="84" fill="${C.txt}" font-size="11" text-anchor="middle">回</text>
      <path d="M20 120 H280" stroke="${C.w}" stroke-width="2" stroke-dasharray="4"/>
      <text x="150" y="140" fill="${C.w}" font-size="11" text-anchor="middle">上下文窗口 = 记忆上限 · API 按 Token 计费</text>` + tail;
    return head + tail;
  }

  function renderConcept() {
    const c = CONCEPTS.find(x => x.id === activeConcept);
    tabsEl.querySelectorAll(".ctab").forEach(b => b.classList.toggle("active", b.dataset.id === activeConcept));
    bodyEl.innerHTML = `
      <div class="cb-grid">
        <div>
          <div class="cb-title">${c.icon} ${c.name}</div>
          <div class="cb-oneliner">${c.oneLiner}</div>
          <div class="cb-def">${c.def}</div>
          <div class="cb-block"><h4>📌 关键要点</h4>
            <ul class="cb-points">${c.points.map(p => `<li>${p}</li>`).join("")}</ul>
          </div>
          <div class="cb-block myth"><h4>🚫 常见误区</h4>
            <p class="cb-myth">${c.myth}</p>
          </div>
          <div class="cb-block try"><h4>🧪 上手小实验</h4>
            <p class="cb-try">${c.try}</p>
          </div>
          <div class="cb-block related"><h4>🔗 关联概念</h4>
            <p class="cb-rel">${c.related}</p>
          </div>
        </div>
        <aside class="cb-aside">
          <div class="layer">${c.layer}</div>
          <div class="analogy-title">💡 生活化类比</div>
          <div class="analogy">${c.analogy}</div>
          <div class="cb-viz">${conceptViz(c.id)}</div>
        </aside>
      </div>
      ${c.id === "skill" ? topSkillsHtml() : ""}
    `;
    highlightRelNode(c.id); // 概念 ⇄ 关系图联动：高亮对应节点
  }

  function topSkillsHtml() {
    return `
      <div class="top-skills">
        <h3>🔥 GitHub 上最火的 10 个 Agent Skill（按 Star 排名 · 2026）</h3>
        <p class="ts-sub">Agent Skill 是「教 AI 怎么做某类任务」的技能包。下面这 10 个是当前 GitHub 上星标最高的官方/社区 Skill，点链接可直达 GitHub 查看。</p>
        <div class="ts-grid">
          ${SKILLS_TOP.map(s => `
            <div class="ts-card">
              <div class="ts-head">
                <span class="ts-rank">#${s.rank}</span>
                <div class="ts-titles">
                  <div class="ts-name">${s.name}</div>
                  <div class="ts-cat">${s.cat}</div>
                </div>
                <span class="ts-stars">⭐ ${s.stars}</span>
              </div>
              <div class="ts-one">${s.one}</div>
              <ul class="ts-feat">${s.features.map(f => `<li>${f}</li>`).join("")}</ul>
              <div class="ts-scene">🎯 ${s.scene}</div>
              <div class="ts-trigger">💬 ${s.trigger}</div>
              <a class="ts-link" href="${s.url}" target="_blank" rel="noopener">GitHub 查看 →</a>
            </div>`).join("")}
        </div>
      </div>`;
  }
  tabsEl.addEventListener("click", e => {
    const b = e.target.closest(".ctab"); if (!b) return;
    activeConcept = b.dataset.id; renderConcept();
  });

  /* ---------- 关系图（可点击节点） ---------- */
  const relSvg = document.getElementById("relation-svg");
  const relDetail = document.getElementById("relation-detail");
  const relColors = { user:"#60a5fa", prompt:"#4cc2ff", skill:"#a78bfa", agent:"#34d399", mcp:"#60a5fa", token:"#f472b6", result:"#fbbf24" };

  function buildRelation() {
    const w = 360, nh = 46, gap = 26, pad = 10;
    const totalH = FLOW.length * nh + (FLOW.length - 1) * gap + pad * 2;
    let svg = `<svg viewBox="0 0 ${w} ${totalH}" xmlns="http://www.w3.org/2000/svg" font-family="sans-serif">`;
    FLOW.forEach((n, i) => {
      const y = pad + i * (nh + gap);
      const cy = y + nh / 2;
      if (i < FLOW.length - 1) {
        svg += `<line x1="${w/2}" y1="${y+nh}" x2="${w/2}" y2="${y+nh+gap}" stroke="#2a3342" stroke-width="2" marker-end="url(#rarrow)"/>`;
      }
      svg += `<g class="rel-node" data-id="${n.id}">
        <rect x="40" y="${y}" width="${w-80}" height="${nh}" rx="12" fill="#1a212e" stroke="${relColors[n.id]}" stroke-width="1.5"/>
        <text x="${w/2}" y="${cy+5}" fill="#e6edf3" font-size="13" text-anchor="middle">${n.label}</text>
      </g>`;
    });
    svg += `<defs><marker id="rarrow" markerWidth="8" markerHeight="8" refX="5" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#2a3342"/></marker></defs></svg>`;
    relSvg.innerHTML = svg;
    relSvg.querySelectorAll(".rel-node").forEach(node => {
      node.addEventListener("click", () => {
        relSvg.querySelectorAll(".rel-node").forEach(x => x.classList.remove("active"));
        node.classList.add("active");
        const d = FLOW.find(f => f.id === node.dataset.id);
        relDetail.innerHTML = `<h4>${d.label}</h4><p>${d.desc}</p>`;
        // 若节点对应某个概念，联动切换概念讲解
        if (CONCEPTS.some(c => c.id === node.dataset.id)) {
          activeConcept = node.dataset.id;
          renderConcept();
        }
      });
    });
  }

  // 概念 ⇄ 关系图联动：高亮 FLOW 中与该概念同 id 的节点
  function highlightRelNode(id) {
    if (!relSvg) return;
    relSvg.querySelectorAll(".rel-node").forEach(x => x.classList.toggle("active", x.dataset.id === id));
    const d = FLOW.find(f => f.id === id);
    if (d) relDetail.innerHTML = `<h4>${d.label}</h4><p>${d.desc}</p>`;
  }
  buildRelation();
  // 默认选中 Agent 节点做演示
  const defNode = relSvg.querySelector('[data-id="agent"]');
  if (defNode) { defNode.classList.add("active"); const d = FLOW.find(f => f.id === "agent"); relDetail.innerHTML = `<h4>${d.label}</h4><p>${d.desc}</p>`; }
  renderConcept(); // 关系图就绪后再首渲染概念（含联动高亮）

  /* ===================== 模块三：Agent ===================== */
  const agentGrid = document.getElementById("agent-grid");
  const agentCatEl = document.getElementById("agent-cat");
  const agentState = { region: "cn", q: "" };
  const REGION_LABELS = { cn: "🇨🇳 中国流行 Agent", us: "🇺🇸 美国流行 Agent", other: "🌐 国际 / 开源 Agent" };

  agentCatEl.innerHTML = AGENT_REGIONS.map(c =>
    `<button class="fbtn ${c.id === agentState.region ? "active" : ""}" data-region="${c.id}">${c.label}</button>`).join("");

  function agentMatches(a) {
    if (a.country !== agentState.region) return false;
    if (agentState.q && !(a.name + a.vendor + a.summary + a.scenes.join("")).toLowerCase().includes(agentState.q.toLowerCase()))
      return false;
    return true;
  }

  function renderAgents() {
    const list = AGENTS.filter(agentMatches);
    const head = `<div class="agent-board-head">${REGION_LABELS[agentState.region] || ""} · 共 ${list.length} 个</div>`;
    agentGrid.innerHTML = (list.length ? head : "") + (list.length
      ? list.map(a => `
        <article class="agent-card">
          <div class="ac-head">
            <div>
              <div class="ac-name">${a.name}</div>
              <div class="ac-vendor">${a.vendor}</div>
            </div>
            <div class="ac-badges">
              <span class="ac-badge">${a.badge}</span>
              <span class="ac-diff" data-level="${a.difficulty}">上手 · ${a.difficulty}</span>
            </div>
          </div>
          <div class="ac-summary">${a.summary}</div>
          <div class="ac-scenes">${a.scenes.map(s => `<span class="ac-scene">${s}</span>`).join("")}</div>
          <button type="button" class="ac-toggle">▾ 展开使用技巧与场景</button>
          <div class="ac-detail">
            <h5>🛠 使用技巧</h5>
            <ul>${a.tips.map(t => `<li>${t}</li>`).join("")}</ul>
            <h5>🎯 典型场景</h5>
            <ul>${a.scenes.map(s => `<li>${s}</li>`).join("")}</ul>
            <h5>👤 适合谁</h5>
            <div class="ac-extra">${a.forWhom}</div>
            <h5>🏆 差异化亮点</h5>
            <div class="ac-extra">${a.edge}</div>
            <h5>🔗 推荐搭配</h5>
            <div class="ac-extra">${a.stack}</div>
            <div class="ac-price"><b>价格：</b>${a.price}</div>
            <div class="ac-note">⚠️ ${a.note}</div>
          </div>
          ${a.site ? `<a class="ac-site" href="${a.site}" target="_blank" rel="noopener">🌐 前往官网 →</a>` : ""}
        </article>`).join("")
      : `<p style="color:var(--text-dim)">没有匹配的 Agent。</p>`);

    agentGrid.querySelectorAll(".agent-card").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest("a")) return; // 点官网链接不触发展开
        card.classList.toggle("open");
        const t = card.querySelector(".ac-toggle");
        t.textContent = card.classList.contains("open") ? "▴ 收起" : "▾ 展开使用技巧与场景";
      });
    });
  }

  agentCatEl.addEventListener("click", e => {
    const b = e.target.closest(".fbtn"); if (!b) return;
    agentState.region = b.dataset.region;
    agentCatEl.querySelectorAll(".fbtn").forEach(x => x.classList.toggle("active", x === b));
    renderAgents();
  });
  document.getElementById("agent-search").addEventListener("input", e => {
    agentState.q = e.target.value.trim(); renderAgents();
  });
  renderAgents();

  // 启动时按 URL hash 定位分区（支持分享链接 #models / #concepts / #agents）
  applyHash();

})();
