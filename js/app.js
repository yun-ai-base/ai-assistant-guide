/* ===================== AI 使用智能助理 · 学习向导 ===================== */
(function () {
  "use strict";

  /* ---------- 顶部导航 ---------- */
  const topnav = document.getElementById("topnav");
  const panels = {
    overview: document.getElementById("panel-overview"),
    models: document.getElementById("panel-models"),
    concepts: document.getElementById("panel-concepts"),
    agents: document.getElementById("panel-agents"),
    insights: document.getElementById("panel-insights"),
    toolkit: document.getElementById("panel-toolkit"),
    extensions: document.getElementById("panel-extensions"),
    knowledge: document.getElementById("panel-knowledge"),
    pitfalls: document.getElementById("panel-pitfalls"),
    creative: document.getElementById("panel-creative"),
    changelog: document.getElementById("panel-changelog")
  };
  let currentTab = "overview";

  /* ---------- 懒渲染：切到某模块时才渲染，首屏只加载概览，避免一次性渲染全部造成卡顿 ---------- */
  const _rendered = { overview: true };
  function ensureRendered(tab) {
    if (_rendered[tab]) return;
    _rendered[tab] = true;
    switch (tab) {
      case "models": renderModels(); break;
      case "concepts": initConcepts(); break;
      case "agents": renderAgents(); break;
      case "insights": renderInsight(); break;
      case "extensions": renderExt(); break;
      case "toolkit": renderToolkit(); break;
      case "knowledge": renderKnowledge(); break;
      case "pitfalls": renderPitfalls(); break;
      case "creative": renderCreative(); break;
      case "changelog": renderChangelog(); break;
    }
  }

  function switchTab(tab) {
    if (!panels[tab]) return;
    currentTab = tab;
    ensureRendered(tab); // 首次进入该模块时才渲染其内容
    topnav.querySelectorAll(".navbtn").forEach(b => b.classList.toggle("active", b.dataset.tab === tab));
    const activeBtn = topnav.querySelector(".navbtn.active");
    if (activeBtn) activeBtn.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
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

  /* ===================== 全局：搜索 + 对比收藏夹 ===================== */
  // ---- 对比收藏夹 ----
  const MAX_COMPARE = 4;
  const compareList = []; // [{type, id, name, tab}]
  const compareCountEl = document.getElementById("compare-count");
  function compareHas(t, id) { return compareList.some(x => x.type === t && x.id === id); }
  function cmpBtn(type, id, name) {
    const on = compareHas(type, id);
    return `<button type="button" class="cmp-add${on ? " on" : ""}" data-cmp-type="${type}" data-cmp-id="${id}" data-cmp-name="${name}" aria-pressed="${on}">${on ? "✓ 已加" : "＋ 对比"}</button>`;
  }
  function compareToggle(type, id, name, tab) {
    const i = compareList.findIndex(x => x.type === type && x.id === id);
    if (i >= 0) compareList.splice(i, 1);
    else {
      if (compareList.length >= MAX_COMPARE) { showToast("对比最多 " + MAX_COMPARE + " 个，先移除一个～"); return; }
      compareList.push({ type, id, name, tab });
    }
    renderCompareCount();
    syncCmpButtons();
  }
  function renderCompareCount() { compareCountEl.textContent = compareList.length; }
  function syncCmpButtons() {
    document.querySelectorAll(".cmp-add").forEach(b => {
      const on = compareHas(b.dataset.cmpType, b.dataset.cmpId);
      b.classList.toggle("on", on);
      b.textContent = on ? "✓ 已加" : "＋ 对比";
      b.setAttribute("aria-pressed", String(on));
    });
  }
  // 对比按钮：事件委托，覆盖所有面板重渲染
  document.addEventListener("click", e => {
    const b = e.target.closest(".cmp-add");
    if (!b) return;
    e.stopPropagation();
    const type = b.dataset.cmpType, id = b.dataset.cmpId, name = b.dataset.cmpName || b.textContent;
    const tabMap = { models: "models", agents: "agents", knowledge: "knowledge", creative: "creative" };
    compareToggle(type, id, name, tabMap[type]);
  });

  // ---- 对比弹层 ----
  const compareModal = document.createElement("div");
  compareModal.className = "compare-modal";
  compareModal.innerHTML = `<div class="compare-sheet">
    <div class="compare-head"><h3>⚖ 对比收藏夹（最多 ${MAX_COMPARE} 个）</h3><button type="button" class="compare-close" aria-label="关闭">×</button></div>
    <div class="compare-grid" id="compare-grid"></div>
  </div>`;
  document.body.appendChild(compareModal);
  compareModal.querySelector(".compare-close").addEventListener("click", () => compareModal.classList.remove("show"));
  compareModal.addEventListener("click", e => { if (e.target === compareModal) compareModal.classList.remove("show"); });
  document.getElementById("compare-btn").addEventListener("click", openCompare);

  function getItem(type, id) {
    if (type === "models") return MODELS.find(x => x.id === id);
    if (type === "agents") return AGENTS.find(x => x.id === id);
    if (type === "knowledge") return KNOWLEDGES.find(x => x.id === id);
    if (type === "creative") return CREATIVES.find(x => x.id === id);
    return null;
  }
  function compareRows(item, type) {
    if (type === "models") return [
      ["厂商", item.vendor], ["类型", item.type === "open" ? "开源" : "闭源"],
      ["版本", item.version], ["上下文", item.context], ["标签", item.tag],
      ["优势", item.strengths.join("、")], ["短板", item.weakness.join("、")],
      ["适用", item.scene], ["价格", item.price]
    ];
    if (type === "agents") return [
      ["厂商", item.vendor], ["难度", item.difficulty], ["简介", item.summary],
      ["场景", item.scenes.join("、")], ["价格", item.price]
    ];
    if (type === "knowledge") return [
      ["厂商", item.vendor], ["类型", item.kind === "pkm" ? "传统 PKM" : item.kind === "ai-native" ? "AI 原生" : "RAG 平台"],
      ["简介", item.summary], ["价格", item.price]
    ];
    if (type === "creative") return [
      ["厂商", item.vendor], ["类型", item.kind === "image" ? "图像生成" : item.kind === "video" ? "视频生成" : item.kind === "audio" ? "音乐/音频" : "综合创作"],
      ["简介", item.summary], ["价格", item.price]
    ];
    return [];
  }
  function openCompare() {
    const grid = compareModal.querySelector("#compare-grid");
    if (!compareList.length) {
      grid.innerHTML = `<div class="cmp-empty">收藏夹还是空的～<br>在模型 / Agent / 知识库卡片右上角点「＋ 对比」加入，最多 ${MAX_COMPARE} 个。</div>`;
    } else {
      grid.innerHTML = compareList.map(it => {
        const item = getItem(it.type, it.id);
        if (!item) return "";
        const rows = compareRows(item, it.type).map(r => `<div class="cmp-row"><b>${r[0]}：</b>${r[1]}</div>`).join("");
        const site = it.type === "models" ? (MODEL_SITES[it.id] || "") : (item.site || "");
        return `<div class="cmp-card">
          <h4>${item.name}</h4>
          <div class="cmp-vendor">${item.vendor}</div>
          ${rows}
          <button type="button" class="cmp-remove" data-cmp-type="${it.type}" data-cmp-id="${it.id}">移除</button>
          ${site ? `<a class="ac-site" href="${site}" target="_blank" rel="noopener" style="margin-top:8px">🌐 前往官网 →</a>` : ""}
        </div>`;
      }).join("");
      grid.querySelectorAll(".cmp-remove").forEach(btn => btn.addEventListener("click", () => {
        const i = compareList.findIndex(x => x.type === btn.dataset.cmpType && x.id === btn.dataset.cmpId);
        if (i >= 0) { compareList.splice(i, 1); renderCompareCount(); syncCmpButtons(); openCompare(); }
      }));
    }
    compareModal.classList.add("show");
  }

  // ---- 全局搜索 ----
  const searchInput = document.getElementById("global-search");
  const searchResultsEl = document.getElementById("search-results");
  const TYPE_LABEL = { models: "模型", agents: "Agent", knowledge: "知识库", concepts: "概念", creative: "创作", pitfalls: "避坑" };
  const searchIndex = [];
  MODELS.forEach(m => searchIndex.push({ type: "models", tab: "models", id: m.id, name: m.name, sub: m.vendor, cardId: "card-model-" + m.id, hay: (m.name + " " + m.vendor + " " + m.tag + " " + m.scene).toLowerCase() }));
  AGENTS.forEach(a => searchIndex.push({ type: "agents", tab: "agents", id: a.id, name: a.name, sub: a.vendor, cardId: "card-agent-" + a.id, hay: (a.name + " " + a.vendor + " " + a.summary + " " + a.scenes.join(" ")).toLowerCase() }));
  KNOWLEDGES.forEach(k => searchIndex.push({ type: "knowledge", tab: "knowledge", id: k.id, name: k.name, sub: k.vendor, cardId: "card-kb-" + k.id, hay: (k.name + " " + k.vendor + " " + k.badge + " " + k.summary).toLowerCase() }));
  CREATIVES.forEach(c => searchIndex.push({ type: "creative", tab: "creative", id: c.id, name: c.name, sub: c.vendor, cardId: "card-cr-" + c.id, hay: (c.name + " " + c.vendor + " " + c.badge + " " + c.summary).toLowerCase() }));
  PITFALLS.forEach(p => searchIndex.push({ type: "pitfalls", tab: "pitfalls", id: p.id, name: p.title, sub: p.cat, cardId: "card-pf-" + p.id, hay: (p.title + " " + p.cat + " " + p.scene + " " + p.what + " " + p.fix).toLowerCase() }));
  CONCEPTS.forEach(c => searchIndex.push({ type: "concepts", tab: "concepts", id: c.id, name: c.name, sub: "核心概念", cardId: null, gotoConcept: c.id, hay: (c.name + " " + c.oneLiner + " " + c.def + " " + c.points.join(" ")).toLowerCase() }));

  let srActive = -1;
  // 安全：转义用户输入，避免把搜索词直接当 HTML 注入（XSS）
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function renderSearch(q) {
    const hits = searchIndex.filter(x => x.hay.includes(q)).slice(0, 12);
    srActive = -1;
    if (!hits.length) { searchResultsEl.innerHTML = `<div class="sr-empty">没找到「${escapeHtml(q)}」相关结果</div>`; searchResultsEl.classList.add("show"); return; }
    searchResultsEl.innerHTML = hits.map((h, i) => `
      <div class="sr-item" data-i="${i}">
        <span class="sr-type ${h.type}">${TYPE_LABEL[h.type]}</span>
        <span class="sr-name">${h.name}</span>
        <span class="sr-sub">${h.sub}</span>
      </div>`).join("");
    searchResultsEl.classList.add("show");
    searchResultsEl.querySelectorAll(".sr-item").forEach(el => {
      el.addEventListener("click", () => goToSearchResult(hits[+el.dataset.i]));
    });
  }
  function flashCard(el) {
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.classList.remove("search-hit"); void el.offsetWidth; el.classList.add("search-hit");
      setTimeout(() => el.classList.remove("search-hit"), 1600);
    });
  }
  function goToSearchResult(item) {
    searchResultsEl.classList.remove("show");
    searchInput.value = "";
    if (item.gotoConcept) {
      switchTab("concepts");
      activeConcept = item.gotoConcept; renderConcept();
      return;
    }
    switchTab(item.tab);
    const el = document.getElementById(item.cardId);
    if (el) flashCard(el);
  }
  let searchTimer = null;
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.trim().toLowerCase();
    if (!q) { clearTimeout(searchTimer); searchResultsEl.classList.remove("show"); searchResultsEl.innerHTML = ""; return; }
    // 防抖：连续输入时只在停顿 120ms 后过滤一次，减少无谓的重复渲染
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => renderSearch(q), 120);
  });
  searchInput.addEventListener("keydown", e => {
    const items = [...searchResultsEl.querySelectorAll(".sr-item")];
    if (e.key === "ArrowDown") { e.preventDefault(); srActive = Math.min(srActive + 1, items.length - 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); srActive = Math.max(srActive - 1, 0); }
    else if (e.key === "Enter") {
      if (srActive >= 0 && items[srActive]) { const hits = searchIndex.filter(x => x.hay.includes(searchInput.value.trim().toLowerCase())); goToSearchResult(hits[+items[srActive].dataset.i]); }
      return;
    } else if (e.key === "Escape") { searchResultsEl.classList.remove("show"); searchInput.blur(); return; }
    items.forEach((el, i) => el.classList.toggle("active", i === srActive));
    if (items[srActive]) items[srActive].scrollIntoView({ block: "nearest" });
  });
  document.addEventListener("click", e => {
    if (!e.target.closest(".search-wrap")) searchResultsEl.classList.remove("show");
  });

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
        <article class="model-card ${m.country === "cn" ? "cn-click" : ""}" id="card-model-${m.id}">
          ${m.country === "cn" ? `<a class="mc-stretch" href="${site}" target="_blank" rel="noopener" aria-label="前往 ${m.name} 官网"></a>` : ""}
          ${cmpBtn("models", m.id, m.name)}
          <div class="mc-head">
            <div>
              <div class="mc-name">${m.name} <span class="flag ${m.country}">${m.country === "us" ? "🇺🇸 美国" : "🇨🇳 中国"}</span></div>
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
  // 首屏不立即渲染，改由 ensureRendered("models") 懒渲染

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

  function conceptIcon(id) {
    const I = {
      prompt: '<path d="M4 5h16v11H9l-4 4V5z"/><path d="M8 9h8M8 12h5"/>',
      skill: '<path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>',
      agent: '<rect x="5" y="8" width="14" height="10" rx="3"/><path d="M9 12h.01M15 12h.01"/><path d="M12 4v4"/>',
      mcp: '<circle cx="6" cy="6" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="12" cy="18" r="2.5"/><path d="M7.5 7.5l3 8M16.5 7.5l-3 8"/>',
      token: '<rect x="4" y="10" width="16" height="9" rx="2"/><path d="M8 10V7a4 4 0 018 0v3"/>'
    };
    const p = I[id] || I.prompt;
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + p + '</svg>';
  }
  function renderConcept() {
    const c = CONCEPTS.find(x => x.id === activeConcept);
    tabsEl.querySelectorAll(".ctab").forEach(b => b.classList.toggle("active", b.dataset.id === activeConcept));
    bodyEl.innerHTML = `
      <div class="cb-grid">
        <div>
          <div class="cb-icon">${conceptIcon(c.id)}</div>
          <div class="cb-title">${c.name}</div>
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
  // 概念模块初始化（懒渲染：首次进入 concepts tab 时才执行）
  function initConcepts() {
    buildRelation();
    // 默认选中 Agent 节点做演示
    const defNode = relSvg.querySelector('[data-id="agent"]');
    if (defNode) { defNode.classList.add("active"); const d = FLOW.find(f => f.id === "agent"); relDetail.innerHTML = `<h4>${d.label}</h4><p>${d.desc}</p>`; }
    renderConcept(); // 关系图就绪后再首渲染概念（含联动高亮）
  }

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
        <article class="agent-card" id="card-agent-${a.id}">
          ${cmpBtn("agents", a.id, a.name)}
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
        if (e.target.closest("a") || e.target.closest(".cmp-add")) return; // 点官网链接 / 对比按钮不触发展开
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
  // 懒渲染：由 ensureRendered("agents") 首次触发

  /* ===================== 模块七：AI 知识库 / PKM ===================== */
  const kbGrid = document.getElementById("kb-grid");
  const kbState = { country: "all", kind: "all", hot: "all", q: "" };
  function kbMatches(k) {
    if (kbState.country !== "all" && k.country !== kbState.country) return false;
    if (kbState.kind !== "all" && k.kind !== kbState.kind) return false;
    if (kbState.hot !== "all" && (kbState.hot === "1") !== !!k.hot) return false;
    if (kbState.q) {
      const s = (k.name + k.vendor + k.badge + k.summary).toLowerCase();
      if (!s.includes(kbState.q.toLowerCase())) return false;
    }
    return true;
  }
  function renderKnowledge() {
    const list = KNOWLEDGES.filter(kbMatches);
    const head = `<div class="agent-board-head">AI 知识库 / PKM · 共 ${list.length} 个</div>`;
    kbGrid.innerHTML = (list.length ? head : "") + (list.length
      ? list.map(k => `
        <article class="agent-card${k.hot ? " hot" : ""}" id="card-kb-${k.id}">
          ${cmpBtn("knowledge", k.id, k.name)}
          <div class="ac-head">
            <div>
              <div class="ac-name">${k.name}</div>
              <div class="ac-vendor">${k.vendor}</div>
            </div>
            <div class="ac-badges">
              <span class="ac-badge">${k.badge}</span>
              ${k.hot ? '<span class="kb-hot">★ 热门</span>' : ""}
              <span class="kb-kind" data-kind="${k.kind}">${k.kind === "pkm" ? "传统 PKM" : k.kind === "ai-native" ? "AI 原生" : "RAG 平台"}</span>
            </div>
          </div>
          <div class="ac-summary">${k.summary}</div>
          <button type="button" class="ac-toggle">▾ 展开详情与联动</button>
          <div class="ac-detail">
            <h5>核心特点</h5>
            <ul>${k.features.map(f => `<li>${f}</li>`).join("")}</ul>
            <h5>适合谁</h5>
            <div class="ac-extra">${k.forWhom}</div>
            <h5>与 MCP / RAG 联动</h5>
            <div class="ac-extra">${k.mcp}</div>
            <div class="ac-price"><b>价格：</b>${k.price}</div>
            <div class="ac-note">${k.note}</div>
          </div>
          ${k.site ? `<a class="ac-site" href="${k.site}" target="_blank" rel="noopener">🌐 前往官网 →</a>` : ""}
        </article>`).join("")
      : `<p style="color:var(--text-dim)">没有匹配的知识库。</p>`);

    kbGrid.querySelectorAll(".agent-card").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest("a") || e.target.closest(".cmp-add")) return;
        card.classList.toggle("open");
        const t = card.querySelector(".ac-toggle");
        t.textContent = card.classList.contains("open") ? "▴ 收起" : "▾ 展开详情与联动";
      });
    });
  }
  document.getElementById("kb-country").addEventListener("click", e => {
    const b = e.target.closest(".fbtn"); if (!b) return;
    if (b.dataset.hot) {
      kbState.hot = (kbState.hot === "1") ? "all" : "1";
      b.classList.toggle("active", kbState.hot === "1");
      renderKnowledge();
      return;
    }
    kbState.country = (b.dataset.country === kbState.country) ? "all" : b.dataset.country;
    document.getElementById("kb-country").querySelectorAll("[data-country]").forEach(x => x.classList.toggle("active", x.dataset.country === kbState.country));
    renderKnowledge();
  });
  document.getElementById("kb-kind").addEventListener("click", e => {
    const b = e.target.closest(".fbtn"); if (!b) return;
    kbState.kind = (b.dataset.kind === kbState.kind) ? "all" : b.dataset.kind;
    document.getElementById("kb-kind").querySelectorAll(".fbtn").forEach(x => x.classList.toggle("active", x.dataset.kind === kbState.kind));
    renderKnowledge();
  });
  document.getElementById("kb-search").addEventListener("input", e => {
    kbState.q = e.target.value.trim(); renderKnowledge();
  });
  // 懒渲染：由 ensureRendered("knowledge") 首次触发

  /* ===================== 模块四：AI 全景洞察 ===================== */
  const insTabsEl = document.getElementById("insight-tabs");
  const insBodyEl = document.getElementById("insight-body");
  let activeInsight = INSIGHTS[0].id;

  insTabsEl.innerHTML = INSIGHTS.map(c =>
    `<button class="ctab ${c.id === activeInsight ? "active" : ""}" data-id="${c.id}">
       <span class="ico">${c.icon}</span>${c.name.split("（")[0]}
     </button>`).join("");

  // 共享：把洞察类条目（INSIGHTS / EXTENSIONS）渲染成统一版式，支持 compare/flow/timeline/persona 特殊样式
  function renderInsightBody(bodyEl, c) {
    let extra = "";
    if (c.kind === "compare" && c.compare) {
      extra = `<div class="cmp-table"><table>
        <thead><tr>${c.compare.headers.map(h => `<th>${h}</th>`).join("")}</tr></thead>
        <tbody>${c.compare.rows.map(r => `<tr><th class="cmp-k">${r.k}</th>${r.v.map(x => `<td>${x}</td>`).join("")}</tr>`).join("")}</tbody>
      </table></div>`;
    } else if (c.kind === "flow") {
      const nodes = [
        ["🧑", "你（定目标）", "最外层 Prompt"],
        ["🤖", "Agent（执行）", "规划 + 动手 + 交付"],
        ["📘", "Skill（方法论）", "固化复用流程"],
        ["🔌", "MCP（连接）", "连外部工具 / 数据"],
        ["🧠", "模型（推理）", "靠 Token 逐个预测"],
        ["🔢", "Token（燃料）", "上下文窗口 + 计费"],
        ["✅", "结果（交付）", "完成的工作"]
      ];
      extra = `<div class="e2e">${nodes.map((n, i) => `
        <div class="e2e-node">
          <div class="e2e-ico">${n[0]}</div>
          <div class="e2e-txt"><div class="e2e-name">${n[1]}</div><div class="e2e-sub">${n[2]}</div></div>
        </div>${i < nodes.length - 1 ? `<div class="e2e-arrow">↓</div>` : ""}`).join("")}</div>`;
    } else if (c.kind === "timeline" && c.timeline) {
      extra = `<div class="tl">${c.timeline.map(t => `
        <div class="tl-item"><div class="tl-y">${t.y}</div><div class="tl-card"><div class="tl-t">${t.t}</div><div class="tl-d">${t.d}</div></div></div>`).join("")}</div>`;
    } else if (c.kind === "persona" && c.personas) {
      extra = `<div class="ps-grid">${c.personas.map(p => {
        const m = MODELS.find(x => x.id === p.id);
        return `<div class="ps-card ${m && m.country === "cn" ? "cn" : ""}">
          <div class="ps-top"><div class="ps-name">${m ? m.name : p.id}</div>${m ? `<span class="flag ${m.country}">${m.country === "us" ? "🇺🇸" : "🇨🇳"}</span>` : ""}</div>
          <div class="ps-style">${p.style}</div>
          <div class="ps-say">${p.say}</div>
        </div>`;
      }).join("")}</div>`;
    }
    const secHtml = (c.sections || []).map(s => {
      if (s.list) return `<div class="cb-block"><h4>${s.h}</h4><ul class="cb-points">${s.list.map(i => `<li>${i}</li>`).join("")}</ul></div>`;
      return `<div class="cb-block"><h4>${s.h}</h4><p>${s.p}</p></div>`;
    }).join("");
    bodyEl.innerHTML = `
      <div class="cb-grid">
        <div>
          <div class="cb-icon">${conceptIcon(c.id)}</div>
          <div class="cb-title">${c.name}</div>
          <div class="cb-oneliner">${c.oneLiner}</div>
          <div class="cb-def">${c.def}</div>
          ${secHtml}
          ${extra}
          <div class="cb-block related"><h4>🔗 关联模块</h4><p class="cb-rel">${c.related}</p></div>
        </div>
        <aside class="cb-aside">
          <div class="layer">${c.layer}</div>
          <div class="analogy-title">💡 一句话记住</div>
          <div class="analogy">${c.takeaway}</div>
        </aside>
      </div>`;
  }

  function renderInsight() {
    const c = INSIGHTS.find(x => x.id === activeInsight);
    insTabsEl.querySelectorAll(".ctab").forEach(b => b.classList.toggle("active", b.dataset.id === activeInsight));
    renderInsightBody(insBodyEl, c);
  }
  insTabsEl.addEventListener("click", e => {
    const b = e.target.closest(".ctab"); if (!b) return;
    activeInsight = b.dataset.id; renderInsight();
  });
  // 懒渲染：由 ensureRendered("insights") 首次触发

  /* ===================== 模块四-B：进阶延展（11 个内容模块） ===================== */
  const extTabsEl = document.getElementById("ext-tabs");
  const extBodyEl = document.getElementById("ext-body");
  let activeExt = EXTENSIONS[0].id;
  extTabsEl.innerHTML = EXTENSIONS.map(c =>
    `<button class="ctab ${c.id === activeExt ? "active" : ""}" data-id="${c.id}">
       <span class="ico">${c.icon}</span>${c.name.split("（")[0]}
     </button>`).join("");
  function renderExt() {
    const c = EXTENSIONS.find(x => x.id === activeExt);
    extTabsEl.querySelectorAll(".ctab").forEach(b => b.classList.toggle("active", b.dataset.id === activeExt));
    renderInsightBody(extBodyEl, c);
  }
  extTabsEl.addEventListener("click", e => {
    const b = e.target.closest(".ctab"); if (!b) return;
    activeExt = b.dataset.id; renderExt();
  });
  // 懒渲染：由 ensureRendered("extensions") 首次触发

  /* ===================== 模块五：工具箱（5 个交互工具） ===================== */
  const toolkitTabsEl = document.getElementById("toolkit-tabs");
  const toolkitBodyEl = document.getElementById("toolkit-body");
  const TOOL_LIST = [
    { id: "selector", icon: "🧭", name: "选型决策器" },
    { id: "calc", icon: "🧮", name: "成本计算器" },
    { id: "matrix", icon: "📋", name: "模型对比" },
    { id: "prompts", icon: "💡", name: "提示词库" },
    { id: "roadmap", icon: "🗺️", name: "学习路线" }
  ];
  let activeTool = "selector";
  let selState = {};
  let matrixData = [];
  toolkitTabsEl.innerHTML = TOOL_LIST.map(t =>
    `<button class="ctab ${t.id === activeTool ? "active" : ""}" data-id="${t.id}">
       <span class="ico">${t.icon}</span>${t.name}
     </button>`).join("");

  function selectorHtml() {
    return `<div class="tool-card">
      <p class="tool-intro">回答 4 个问题，给你一套「模型 + Agent + Skill」组合建议。</p>
      ${TOOLS.selector.steps.map(s => `
        <div class="sel-step" data-step="${s.id}">
          <div class="sel-q">${s.q}</div>
          <div class="sel-opts">
            ${s.opts.map(o => `<button type="button" class="sel-opt" data-tag="${o.tag}">${o.t}</button>`).join("")}
          </div>
        </div>`).join("")}
      <button type="button" class="tool-btn" id="sel-go">生成推荐方案 →</button>
      <div class="sel-result" id="sel-result"></div>
    </div>`;
  }

  function computeRec(a) {
    if (!a.task || !a.budget || !a.code || !a.data) return null;
    const models = [], agents = [], skills = [];
    if (a.task === "content") { models.push("豆包", "GLM"); agents.push("Coze"); skills.push("Brand Guidelines", "PPTX"); }
    else if (a.task === "code") { models.push("Claude", "DeepSeek"); agents.push("Cursor", "Claude Code"); skills.push("MCP Builder", "Webapp Testing"); }
    else if (a.task === "research") { models.push("Perplexity", "Kimi"); agents.push("Perplexity"); skills.push("PDF Processing"); }
    else if (a.task === "office") { models.push("WorkBuddy", "GLM"); agents.push("WorkBuddy", "Coze"); skills.push("XLSX", "PPTX", "Internal Comms"); }
    else { models.push("GPT", "通义千问"); agents.push("Manus"); skills.push("PPTX", "XLSX"); }
    if (a.budget === "free") { models.length = 0; models.push("DeepSeek", "Qwen", "GLM"); }
    else if (a.budget === "cheap") { models.push("DeepSeek", "Qwen"); }
    else { models.push("Claude", "GPT", "Gemini"); }
    if (a.code === "nocode") { agents.length = 0; agents.push("Coze", "WorkBuddy", "Manus"); }
    else if (a.code === "some") { agents.push("Cursor", "Qoder CN"); }
    else { agents.push("Claude Code", "Codex", "Cursor"); }
    if (a.data === "private") { models.push("DeepSeek(自部署)", "Qwen(自部署)"); agents.push("Dify", "Qoder CN", "OpenClaw"); }
    else { agents.push("ChatGPT Agent"); }
    const uniq = arr => [...new Set(arr)];
    return { models: uniq(models), agents: uniq(agents), skills: uniq(skills) };
  }

  function calcHtml() {
    return `<div class="tool-card">
      <p class="tool-intro">粘贴一段文字，估算各模型消耗的 Token 与（估算）成本。仅供参考，真实计费以厂商为准。</p>
      <textarea id="calc-text" class="calc-area" rows="5" placeholder="把要发给 AI 的文字粘这里，例如一段周报 / 一篇文案…"></textarea>
      <button type="button" class="tool-btn" id="calc-go">估算 →</button>
      <div class="calc-result" id="calc-result"></div>
    </div>`;
  }

  function matrixHtml() {
    matrixData = MODELS.map(m => ({
      name: m.name,
      country: m.country === "cn" ? "🇨🇳中国" : "🇺🇸美国",
      open: m.type === "open" ? "开源" : "闭源",
      ctx: m.context,
      cnCap: m.country === "cn" ? "强" : "中/英",
      multi: /多模态|视觉|图像|视频|音/.test(m.tag + m.strengths.join("")) ? "✅" : "—",
      price: m.price
    }));
    return `<div class="tool-card">
      <p class="tool-intro">12 个模型的横向对比。点表头可排序（国家 / 类型 / 中文 / 多模态）。</p>
      <div class="matrix-wrap">
      <table class="matrix" id="matrix-table">
        <thead><tr>
          <th data-k="name">模型</th><th data-k="country">国家</th><th data-k="open">类型</th>
          <th data-k="ctx">上下文</th><th data-k="cnCap">中文</th><th data-k="multi">多模态</th><th>价格</th>
        </tr></thead>
        <tbody>${matrixData.map(r => `<tr>
          <td class="m-name">${r.name}</td><td>${r.country}</td><td>${r.open}</td>
          <td>${r.ctx}</td><td>${r.cnCap}</td><td>${r.multi}</td><td class="m-price">${r.price}</td>
        </tr>`).join("")}</tbody>
      </table>
      </div>
    </div>`;
  }

  function promptsHtml() {
    return `<div class="tool-card">
      <p class="tool-intro">按场景分类的可复制 Prompt，点「复制」直接拿走用。</p>
      ${TOOLS.prompts.map(cat => `
        <div class="pc-cat"><h4>${cat.cat}</h4>
          <div class="pc-grid">
            ${cat.items.map(it => `
              <div class="pc-card">
                <div class="pc-title">${it.title}</div>
                <div class="pc-text">${it.text}</div>
                <button type="button" class="pc-copy" data-text="${encodeURIComponent(it.text)}">📋 复制</button>
              </div>`).join("")}
          </div>
        </div>`).join("")}
    </div>`;
  }

  function roadmapHtml() {
    const gotos = ["models", "agents", "insights", "extensions"];
    return `<div class="tool-card">
      <p class="tool-intro">从新手到专家的四级路线，每级给可做的动作，点卡片底部可跳对应模块。</p>
      <div class="rm">
        ${TOOLS.roadmap.map((r, i) => `
          <div class="rm-item">
            <div class="rm-stage">${r.stage}</div>
            <div class="rm-desc">${r.desc}</div>
            <ul class="rm-tips">${r.tips.map(t => `<li>${t}</li>`).join("")}</ul>
            <button type="button" class="rm-go" data-goto="${gotos[i] || "overview"}">${r.go}</button>
          </div>`).join("")}
      </div>
    </div>`;
  }

  function renderToolkit() {
    toolkitTabsEl.querySelectorAll(".ctab").forEach(b => b.classList.toggle("active", b.dataset.id === activeTool));
    if (activeTool === "selector") toolkitBodyEl.innerHTML = selectorHtml();
    else if (activeTool === "calc") toolkitBodyEl.innerHTML = calcHtml();
    else if (activeTool === "matrix") toolkitBodyEl.innerHTML = matrixHtml();
    else if (activeTool === "prompts") toolkitBodyEl.innerHTML = promptsHtml();
    else if (activeTool === "roadmap") toolkitBodyEl.innerHTML = roadmapHtml();
    bindTool();
  }

  function bindTool() {
    // 选型决策器
    toolkitBodyEl.querySelectorAll(".sel-opt").forEach(btn => {
      btn.addEventListener("click", () => {
        const step = btn.closest(".sel-step");
        step.querySelectorAll(".sel-opt").forEach(x => x.classList.remove("on"));
        btn.classList.add("on");
        selState[step.dataset.step] = btn.dataset.tag;
      });
    });
    const selGo = toolkitBodyEl.querySelector("#sel-go");
    if (selGo) selGo.addEventListener("click", () => {
      const rec = computeRec(selState);
      const box = toolkitBodyEl.querySelector("#sel-result");
      if (!rec) { box.innerHTML = `<p class="tool-note">请先回答全部 4 个问题 🙏</p>`; return; }
      box.innerHTML = `<div class="rec-block">
        <div class="rec-row"><span class="rec-k">🤖 推荐模型</span>${rec.models.map(x => `<span class="rec-chip">${x}</span>`).join("")}</div>
        <div class="rec-row"><span class="rec-k">🛠 推荐 Agent</span>${rec.agents.map(x => `<span class="rec-chip">${x}</span>`).join("")}</div>
        <div class="rec-row"><span class="rec-k">📘 推荐 Skill</span>${rec.skills.map(x => `<span class="rec-chip">${x}</span>`).join("")}</div>
        <p class="rec-tip">以上为基于你的选择做的通用推荐，具体选型以官方最新文档与你的实测为准。</p>
      </div>`;
    });
    // 成本计算器
    const calcGo = toolkitBodyEl.querySelector("#calc-go");
    if (calcGo) calcGo.addEventListener("click", () => {
      const text = toolkitBodyEl.querySelector("#calc-text").value;
      const box = toolkitBodyEl.querySelector("#calc-result");
      if (!text.trim()) { box.innerHTML = `<p class="tool-note">先粘点文字进来～</p>`; return; }
      const tokens = Math.max(1, Math.round(text.length / 1.6));
      const rows = TOOLS.pricing.map(p => ({ name: p.name, cost: tokens / 1e6 * p.perM, free: p.perM === 0 }))
        .sort((a, b) => a.cost - b.cost);
      box.innerHTML = `<p class="calc-sum">估算约 <b>${tokens.toLocaleString()}</b> tokens（中文≈1.6 字/token，仅估算）</p>
        <div class="matrix-wrap"><table class="matrix"><thead><tr><th>模型</th><th>估算单次成本</th></tr></thead>
        <tbody>${rows.map(r => `<tr><td class="m-name">${r.name}</td><td>${r.free ? "免费" : "$" + r.cost.toFixed(4)}</td></tr>`).join("")}</tbody></table></div>
        <p class="tool-note">价格为横向比较用的估算单价（输入/输出混合，≈USD/百万 token），国产模型官方常更低或免费，真实计费以厂商为准。</p>`;
    });
    // 模型对比排序
    const table = toolkitBodyEl.querySelector("#matrix-table");
    if (table) table.querySelectorAll("th[data-k]").forEach(th => {
      th.addEventListener("click", () => {
        const k = th.dataset.k;
        const sorted = [...matrixData].sort((a, b) => ("" + a[k]).localeCompare("" + b[k], "zh"));
        table.querySelector("tbody").innerHTML = sorted.map(r => `<tr>
          <td class="m-name">${r.name}</td><td>${r.country}</td><td>${r.open}</td>
          <td>${r.ctx}</td><td>${r.cnCap}</td><td>${r.multi}</td><td class="m-price">${r.price}</td>
        </tr>`).join("");
      });
    });
    // 提示词复制
    toolkitBodyEl.querySelectorAll(".pc-copy").forEach(btn => {
      btn.addEventListener("click", () => {
        const txt = decodeURIComponent(btn.dataset.text);
        const done = () => { btn.textContent = "✅ 已复制"; setTimeout(() => (btn.textContent = "📋 复制"), 1400); };
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(done).catch(() => fallbackCopy(txt, done));
        else fallbackCopy(txt, done);
      });
    });
    // 路线图跳转
    toolkitBodyEl.querySelectorAll(".rm-go").forEach(btn => {
      btn.addEventListener("click", () => switchTab(btn.dataset.goto));
    });
  }
  function fallbackCopy(txt, done) {
    const ta = document.createElement("textarea"); ta.value = txt; document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); done(); } catch (e) {}
    document.body.removeChild(ta);
  }

  toolkitTabsEl.addEventListener("click", e => {
    const b = e.target.closest(".ctab"); if (!b) return;
    activeTool = b.dataset.id; renderToolkit();
  });
  // 懒渲染：由 ensureRendered("toolkit") 首次触发

  /* ===================== 避坑指南 ===================== */
  const pfGrid = document.getElementById("pf-grid");
  const pfState = { cat: "all", q: "" };
  function pfMatches(p) {
    if (pfState.cat !== "all" && p.cat !== pfState.cat) return false;
    if (pfState.q) {
      const s = (p.title + p.cat + p.scene + p.what + p.result + p.fix + p.motto).toLowerCase();
      if (!s.includes(pfState.q.toLowerCase())) return false;
    }
    return true;
  }
  function renderPitfalls() {
    const list = PITFALLS.filter(pfMatches);
    pfGrid.innerHTML = list.length ? list.map(p => `
      <article class="pf-card level-${p.level}" id="card-pf-${p.id}">
        <div class="pf-head">
          <span class="pf-emoji">${p.emoji}</span>
          <div>
            <div class="pf-title">${p.title}</div>
            <div class="pf-tags"><span class="pf-cat">${p.cat}</span><span class="pf-level">${p.level}</span></div>
          </div>
        </div>
        <div class="pf-block"><b>场景：</b>${p.scene}</div>
        <div class="pf-block"><b>踩了什么：</b>${p.what}</div>
        <div class="pf-block"><b>后果：</b>${p.result}</div>
        <div class="pf-block fix"><b>正确做法：</b>${p.fix}</div>
        <div class="pf-motto">💡 口诀：${p.motto}</div>
      </article>`).join("")
      : `<p style="color:var(--text-dim)">没有匹配的坑点，试试调整筛选。</p>`;
  }
  document.getElementById("pf-cat").addEventListener("click", e => {
    const b = e.target.closest(".fbtn"); if (!b) return;
    pfState.cat = (b.dataset.cat === pfState.cat) ? "all" : b.dataset.cat;
    document.querySelectorAll("#pf-cat .fbtn").forEach(x => x.classList.toggle("active", x.dataset.cat === pfState.cat));
    renderPitfalls();
  });
  document.getElementById("pf-search").addEventListener("input", e => {
    pfState.q = e.target.value.trim(); renderPitfalls();
  });
  // 懒渲染：由 ensureRendered("pitfalls") 首次触发

  /* ===================== 多模态创作 ===================== */
  const crGrid = document.getElementById("cr-grid");
  const crState = { kind: "all", country: "all", q: "" };
  function crMatches(c) {
    if (crState.kind !== "all" && c.kind !== crState.kind) return false;
    if (crState.country !== "all" && c.country !== crState.country) return false;
    if (crState.q) {
      const s = (c.name + c.vendor + c.badge + c.summary).toLowerCase();
      if (!s.includes(crState.q.toLowerCase())) return false;
    }
    return true;
  }
  function crKindLabel(k) {
    return k === "image" ? "图像生成" : k === "video" ? "视频生成" : k === "audio" ? "音乐/音频" : k === "mix" ? "综合创作" : k;
  }
  function renderCreative() {
    const list = CREATIVES.filter(crMatches);
    const head = `<div class="agent-board-head">多模态创作 · 共 ${list.length} 个</div>`;
    crGrid.innerHTML = (list.length ? head : "") + (list.length
      ? list.map(c => `
        <article class="agent-card" id="card-cr-${c.id}">
          ${cmpBtn("creative", c.id, c.name)}
          <div class="ac-head">
            <div>
              <div class="ac-name">${c.name}</div>
              <div class="ac-vendor">${c.vendor}</div>
            </div>
            <div class="ac-badges">
              <span class="ac-badge">${c.badge}</span>
              <span class="kb-kind" data-kind="${c.kind}">${crKindLabel(c.kind)}</span>
            </div>
          </div>
          <div class="ac-summary">${c.summary}</div>
          <button type="button" class="ac-toggle">▾ 展开详情与联动</button>
          <div class="ac-detail">
            <h5>核心特点</h5>
            <ul>${c.features.map(f => `<li>${f}</li>`).join("")}</ul>
            <h5>适合谁</h5>
            <div class="ac-extra">${c.forWhom}</div>
            <h5>与工作流联动</h5>
            <div class="ac-extra">${c.link}</div>
            <div class="ac-price"><b>价格：</b>${c.price}</div>
            <div class="ac-note">${c.note}</div>
          </div>
          ${c.site ? `<a class="ac-site" href="${c.site}" target="_blank" rel="noopener">🌐 前往官网 →</a>` : ""}
        </article>`).join("")
      : `<p style="color:var(--text-dim)">没有匹配的创作工具。</p>`);

    crGrid.querySelectorAll(".agent-card").forEach(card => {
      card.addEventListener("click", e => {
        if (e.target.closest("a") || e.target.closest(".cmp-add")) return;
        card.classList.toggle("open");
        const t = card.querySelector(".ac-toggle");
        t.textContent = card.classList.contains("open") ? "▴ 收起" : "▾ 展开详情与联动";
      });
    });
  }
  document.getElementById("cr-kind").addEventListener("click", e => {
    const b = e.target.closest(".fbtn"); if (!b) return;
    crState.kind = (b.dataset.kind === crState.kind) ? "all" : b.dataset.kind;
    document.querySelectorAll("#cr-kind .fbtn").forEach(x => x.classList.toggle("active", x.dataset.kind === crState.kind));
    renderCreative();
  });
  document.getElementById("cr-country").addEventListener("click", e => {
    const b = e.target.closest(".fbtn"); if (!b) return;
    crState.country = (b.dataset.country === crState.country) ? "all" : b.dataset.country;
    document.querySelectorAll("#cr-country .fbtn").forEach(x => x.classList.toggle("active", x.dataset.country === crState.country));
    renderCreative();
  });
  document.getElementById("cr-search").addEventListener("input", e => {
    crState.q = e.target.value.trim(); renderCreative();
  });
  // 懒渲染：由 ensureRendered("creative") 首次触发

  /* ===================== 全局体验增强（v2） ===================== */
  // 1) 数据来源标注：每个带 sec-head 的面板加"内容基准"小字
  document.querySelectorAll(".sec-head").forEach(h => {
    const n = document.createElement("div");
    n.className = "data-note";
    n.textContent = "内容基准 2026-07 · 综合公开资料整理，仅供参考，以官方为准";
    h.appendChild(n);
  });

  // 2) 深浅色切换（跟随系统 + 记忆）
  const themeBtn = document.getElementById("theme-toggle");
  const savedTheme = localStorage.getItem("theme");
  const sysDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initTheme = savedTheme || (sysDark ? "dark" : "light");
  document.documentElement.dataset.theme = initTheme;
  themeBtn.textContent = initTheme === "dark" ? "☀ 浅色" : "🌙 深色";
  themeBtn.addEventListener("click", () => {
    const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
    themeBtn.textContent = next === "dark" ? "☀ 浅色" : "🌙 深色";
  });

  // 3) 阅读进度条 + 返回顶部
  const progress = document.getElementById("progress");
  const toTop = document.getElementById("to-top");
  let scrollTicking = false;
  function updateScroll() {
    scrollTicking = false;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h > 0 ? (window.scrollY / h) * 100 : 0;
    progress.style.width = p + "%";
    toTop.classList.toggle("show", window.scrollY > 400);
  }
  // rAF 节流：每帧最多计算一次，避免每个滚动事件都读 scrollHeight 触发强制重排（卡顿主因）
  function onScroll() {
    if (scrollTicking) return;
    scrollTicking = true;
    requestAnimationFrame(updateScroll);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // 4) 键盘快捷键：数字键 1-9 切模块
  const tabOrder = ["overview","models","concepts","agents","insights","toolkit","extensions","knowledge","pitfalls","creative","changelog"];
  let toastTimer;
  function showToast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; document.body.appendChild(el); }
    el.textContent = msg; el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1200);
  }
  window.addEventListener("keydown", e => {
    if (e.target.matches && e.target.matches("input, textarea, select")) return;
    const idx = parseInt(e.key, 10);
    if (idx >= 1 && idx <= tabOrder.length) {
      const t = tabOrder[idx - 1];
      switchTab(t);
      const tip = document.querySelector('.navbtn[data-tab="' + t + '"]');
      showToast("切换到：" + (tip ? tip.textContent.trim() : t));
    }
  });

  // 5) 更新日志
  function renderChangelog() {
    const log = [
      { date: "2026-07-16", title: "v2.1 · 避坑 + 多模态", desc: "新增 🛡 避坑指南（8 个真实风险：幻觉 / 隐私 / 过度授权 / 订阅陷阱等，附正确做法与口诀）与 🎨 多模态创作（12 个图像 / 视频 / 音乐工具：Midjourney / 可灵 / Suno / HeyGen 等，按类型与地区筛选、可加入对比）。全局搜索同步覆盖创作与避坑。" },
      { date: "2026-07-16", title: "v2 · 质感升级", desc: "新增深浅色切换（跟随系统 + 记忆）、阅读进度条、返回顶部、键盘快捷键（数字 1-9 切模块）、更新日志、概念线性图标、数据来源标注。" },
      { date: "2026-07-16", title: "v1.2 · AI 知识库模块", desc: "新增第⑦模块「AI 知识库 / PKM」：20 个产品（语雀 / 飞书 / IMA / Obsidian / Notion / Dify 等），含国内·海外·AI 原生·RAG 平台分类、热门筛选与暖金底色。" },
      { date: "2026-07-15", title: "v1.1 · 移动端与交互打磨", desc: "移动端导航横向滚动、卡片展开动画、成本计算器与模型卡价格对齐、性格拟人卡补全至 12/12。" },
      { date: "2026-07-15", title: "v1.0 · 核心六层", desc: "概览 + 中美模型(12) + 核心概念(5) + 流行 Agent(15) + 全景洞察(4) + 工具箱(5) + 进阶延展(11)，并部署至 GitHub Pages。" }
    ];
    const el = document.getElementById("changelog-body");
    if (!el) return;
    el.innerHTML = log.map(x => `
      <div class="cl-item">
        <div class="cl-date">${x.date}</div>
        <div class="cl-title">${x.title}</div>
        <div class="cl-desc">${x.desc}</div>
      </div>`).join("");
  }
  // 懒渲染：由 ensureRendered("changelog") 首次触发

  /* 所有模块定义完毕后，处理初始 URL hash（如 #creative 会懒渲染对应模块） */
  applyHash();

})();
