/*
 * AI 使用智能助理 · 学习向导 — 内容数据
 * 数据时间基准：2026 年中（综合 2026-06/07 多源实测与官方参数）
 * 版本号会随厂商迭代变化，本数据用于教学科普，实际选型以官方最新文档为准。
 */

// ============ 模块一：中美主流 AI 模型 ============
const MODELS = [
  // ---------- 美国 ----------
  {
    id: "gpt",
    name: "GPT-5.5 / 5.6",
    vendor: "OpenAI",
    country: "us",
    type: "closed",
    region: "美国",
    version: "GPT-5.5 / 5.6（2026 年中）",
    context: "100 万+ tokens",
    strengths: ["综合能力最均衡", "插件 / 生态最成熟", "多模态创作强", "复杂推理稳定"],
    weakness: ["中文创意与深层文化表达弱于国产", "API 价格偏高"],
    scene: "日常对话、复杂推理、多模态创作、通用场景",
    price: "约 $1.25–5 / $10–30 每百万 token（依版本）",
    tag: "全能均衡"
  },
  {
    id: "claude",
    name: "Claude Opus 4.7 / 4.8",
    vendor: "Anthropic",
    country: "us",
    type: "closed",
    region: "美国",
    version: "Claude Opus 4.7 / 4.8（2026）",
    context: "100 万 tokens",
    strengths: ["编程能力断层领先（SWE-bench ~64–69%）", "Agent / 长程任务最强", "代码缺陷显著少于同类", "长文档与合规写作佳"],
    weakness: ["API 成本高", "中文深层文化理解弱于国产模型"],
    scene: "大型项目开发、长程 Agent 任务、代码审查",
    price: "约 $5 / $25 每百万 token",
    tag: "编程之王"
  },
  {
    id: "gemini",
    name: "Gemini 3.1 Pro",
    vendor: "Google DeepMind",
    country: "us",
    type: "closed",
    region: "美国",
    version: "Gemini 3.1 Pro（2026）",
    context: "约 200 万 tokens",
    strengths: ["科学推理全球顶尖", "原生多模态（图文/音视频）", "响应速度极快", "超长上下文检索"],
    weakness: ["细节偶尔出错", "本土化 / 中文语感偏弱"],
    scene: "科学计算、音视频理解、长文档检索、数据分析",
    price: "约 $0.1–0.4 每百万 token（Flash 版更便宜）",
    tag: "多模态 / 科学"
  },
  {
    id: "grok",
    name: "Grok",
    vendor: "xAI",
    country: "us",
    type: "closed",
    region: "美国",
    version: "Grok（2025–2026）",
    context: "长上下文",
    strengths: ["实时接入 X 平台数据", "时事 / 社交舆情分析强", "风格直率"],
    weakness: ["通用中文场景非主战场", "国内访问受限"],
    scene: "实时资讯、社交分析、时事问答",
    price: "订阅制（含于 X Premium）",
    tag: "实时资讯"
  },

  // ---------- 中国 ----------
  {
    id: "deepseek",
    name: "DeepSeek V4 / V4-Pro",
    vendor: "深度求索",
    country: "cn",
    type: "open",
    region: "中国",
    version: "DeepSeek V4 / V4-Pro（2026）",
    context: "100 万 tokens（MoE 1.6 万亿 / 激活 490 亿）",
    strengths: ["数学推理顶尖（MATH-500 96.8%）", "开源、API 极低价", "SWE-bench 80.6%", "企业私有化友好"],
    weakness: ["多模态非最强项", "超长文档弱于 Kimi"],
    scene: "数理科研、数据分析、企业私有化部署、批量编程",
    price: "约 ¥1.5 / 千 token（开源可自部署）",
    tag: "开源性价比王"
  },
  {
    id: "qwen",
    name: "通义千问 Qwen3",
    vendor: "阿里巴巴",
    country: "cn",
    type: "open",
    region: "中国",
    version: "Qwen3 系列（Max / Coder 等，2026）",
    context: "100 万 tokens",
    strengths: ["国产第一梯队、全球评测前列", "智能体能力广度深度兼备", "超高性价比（海外 1/10）", "开源生态活跃"],
    weakness: ["极硬核编程略逊 Claude", "顶尖多模态弱于 Gemini"],
    scene: "智能体任务、编程、办公生产力、企业部署",
    price: "约 ¥2.5 / ¥7.5 每百万 token",
    tag: "国产全能"
  },
  {
    id: "doubao",
    name: "豆包 Seed 2.0 / 2.1",
    vendor: "字节跳动",
    country: "cn",
    type: "closed",
    region: "中国",
    version: "豆包 Seed 2.0 / 2.1 Pro（2026）",
    context: "多模态长上下文",
    strengths: ["多模态最强、C 端体验最佳", "中文口语化表达自然", "短视频 / 自媒体文案爆款适配高"],
    weakness: ["深度科研 / 硬核编程非主战场", "闭源不可私有化"],
    scene: "中文聊天、短视频脚本、小红书文案、多模态创作",
    price: "国内免费 + 企业 API",
    tag: "中文 / 多模态"
  },
  {
    id: "glm",
    name: "智谱 GLM-5.1 / 5.2",
    vendor: "智谱 AI（清华系）",
    country: "cn",
    type: "open",
    region: "中国",
    version: "GLM-5.1 / 5.2（2026）",
    context: "100 万 tokens",
    strengths: ["国产最强逻辑 / 推理 / 代码之一", "中文理解独一档、公文营销地道", "编程得分全场前列", "开源友好"],
    weakness: ["生态规模小于头部大厂", "闭源版价格随能力上探"],
    scene: "复杂任务、科研、逻辑推理、中文创作",
    price: "约 $1.18 / 百万 token（开源可选）",
    tag: "中文推理"
  },
  {
    id: "kimi",
    name: "Kimi k2 系列",
    vendor: "月之暗面",
    country: "cn",
    type: "closed",
    region: "中国",
    version: "Kimi k2.x（2026）",
    context: "超长上下文（20 万+ tokens）",
    strengths: ["超长文档处理强", "论文 / 长文阅读摘要佳", "长程记忆好"],
    weakness: ["通用编程非最强", "闭源"],
    scene: "长文档、论文研读、法律 / 研报分析",
    price: "免费 + API",
    tag: "超长文档"
  },
  {
    id: "hunyuan",
    name: "腾讯混元 / 元宝",
    vendor: "腾讯",
    country: "cn",
    type: "closed",
    region: "中国",
    version: "混元（元宝接入，2026）",
    context: "多模态长上下文",
    strengths: ["多模态与社交生态结合", "办公 / 内容场景落地快", "支持 MCP 连接"],
    weakness: ["通用排名非最前", "闭源"],
    scene: "社交、办公协作、内容生成、Agent 接入",
    price: "免费 + 企业 API",
    tag: "生态落地"
  },
  {
    id: "minimax",
    name: "MiniMax M3 / 海螺",
    vendor: "MiniMax（稀宇科技）",
    country: "cn",
    type: "open",
    region: "中国",
    version: "MiniMax M3（2026-06，开源）",
    context: "1M 上下文（01 系列曾达 4M）",
    strengths: ["原生多模态（文本/图像/视频/音频）", "MSA 稀疏注意力，长上下文强、效率高", "前沿编程与 Agent 能力", "开源权重 + 海螺视频/语音生成", "Token 吞吐高、性价比好"],
    weakness: ["顶级闭源对标仍有差距", "生态规模小于头部大厂"],
    scene: "超长上下文、编程 Agent、多模态生成、企业 API",
    price: "开源权重 + Plus 约 $20≈12.5B tokens/月",
    tag: "长上下文/多模态"
  },
  {
    id: "mimo",
    name: "小米 MiMo-V2.5",
    vendor: "小米",
    country: "cn",
    type: "open",
    region: "中国",
    version: "MiMo-V2.5 / V2.5-Pro（2026，开源 MIT）",
    context: "100 万 tokens",
    strengths: ["推理与 Agent/Coding 强（ClawEval 开源前列）", "原生全模态（文本/图像/视频/音频）", "Token 效率高（比同类省 40–50%）", "全量开源 MIT、可商用", "深度集成小爱同学/智能家居/座舱"],
    weakness: ["通用创意弱于头部", "闭源版能力上限待追"],
    scene: "智能设备端、编程 Agent、全模态交互、私有化部署",
    price: "开源 MIT + Token Plan（夜间折扣）",
    tag: "开源全模态/生态"
  }
];

// ============ 模块二：AI 周边核心概念 ============
const CONCEPTS = [
  {
    id: "prompt",
    name: "Prompt（提示词）",
    icon: "💬",
    oneLiner: "你跟 AI 说话的方式，也是你给 AI 的指令。",
    def: "Prompt 就是你输入给 AI 的那段文字。随口一问是 Prompt，精心设计的指令也是 Prompt。区别在于：精心设计的 Prompt 会写明角色、任务、格式与约束，让 AI 更懂你。",
    analogy: "像一个超级能干但不认识你的新助手说话。你说『把那个弄一下』他懵了；你说『把桌上那叠发票按日期排好，用回形针别住』他秒懂。",
    points: [
      "本质：你越会说话，AI 越懂你",
      "好 Prompt = 角色 + 任务 + 上下文 + 格式 + 约束",
      "是一切 AI 交互的最基础入口",
      "Prompt Engineering 是『怎么写好指令』"
    ],
    layer: "最底层：所有能力的起点"
  },
  {
    id: "skill",
    name: "Skill（技能包）",
    icon: "📘",
    oneLiner: "打包好的『身份 + 能力 + 工作流程』，像快捷键 / 操作手册。",
    def: "Skill 是一个预设的『身份 + 能力 + 流程』组合。把常用的复杂 Prompt 封装成 Skill 后，以后只需说『用 XX 助手帮我做…』，它自动补齐角色、结构与常用动作，省掉重复输入。技术上它是『提示/知识层』的渐进式披露：先加载名称+描述（约100 token），匹配到了才加载完整指令，需要深度信息时再加载附录。",
    analogy: "像键盘上的快捷键 / 员工手边的 SOP 操作手册。点了『销售分析助手』，它自动把你那套精心设计的 Prompt 填进去。",
    points: [
      "解决『怎么做某类任务』（方法论）",
      "渐进式披露：只加载当前需要的上下文，省 Token",
      "与 Slash Command 不同：Skill 是自动触发匹配",
      "典型层：Prompt / 知识层（区别于 MCP 的集成层）"
    ],
    layer: "包装层：把 Prompt 沉淀为可复用能力"
  },
  {
    id: "agent",
    name: "Agent（智能体）",
    icon: "🤖",
    oneLiner: "有『手』的 AI——不只是聊天，能自己动手干活。",
    def: "普通 AI 是『你问→它答』（纯文字）。Agent 是：你布置任务→它自己上网查、调用工具、分步骤执行，最后交付结果。它运行『感知—推理—规划—行动—观察』循环，直到任务完成，而非等你每一步的指令。",
    analogy: "普通 AI 是咨询顾问（只动嘴），Agent 是执行助理（动嘴+动手）。你说『帮我订周五去北京的机票』，它自己比价、自己下单。",
    points: [
      "核心：能规划多步任务、使用工具、自主迭代",
      "区别于 Chatbot：交付『完成的工作』而非『一段回答』",
      "区别于 Copilot：Copilot 在 App 里给建议，Agent 直接接管执行",
      "2026 被称为『Agent 元年』，重心从『回答』转向『完成』"
    ],
    layer: "执行层：干活的『工人』"
  },
  {
    id: "mcp",
    name: "MCP（模型上下文协议）",
    icon: "🔌",
    oneLiner: "AI 的『USB-C / 万能遥控器』——标准化连接外部工具与数据。",
    def: "MCP（Model Context Protocol）是 Anthropic 于 2024-11 发布的开放协议，用 JSON-RPC 2.0 在『客户端-主机-服务器』架构下，标准化 AI 应用与外部系统的交互。它定义了三类原语：Tools（模型可调用的函数）、Resources（给模型的上下文数据）、Prompts（预定义提示模板）。没有 MCP 时，每个 AI 连日历/邮箱/网盘都要单独开发接口；有了 MCP，只要外部工具支持该标准，AI『插上就能用』。",
    analogy: "像家里的万能遥控器：电视、空调、机顶盒原本各一个遥控器乱成一团；统一标准后一个遥控器全搞定。AI 也一样，外部工具支持 MCP，即插即用。",
    points: [
      "解决『能不能连上外部世界』（Access / 连接）",
      "在 Function Calling 之上的协议层：决定『函数去哪、怎么调、怎么发现』",
      "已捐赠给 Linux 基金会（Agentic AI Foundation），OpenAI/Google/Microsoft 均已支持",
      "代价：工具定义常驻上下文会吃 Token，需维护连接、注意安全风险"
    ],
    layer: "集成层：工人手里的『万能工具接口』"
  },
  {
    id: "token",
    name: "Token（令牌 / 词元）",
    icon: "🔢",
    oneLiner: "AI 的『记忆颗粒』和『计费单位』——一次一个吐出来。",
    def: "Token 是 AI 理解和生成文字的最小单位。你说的话被拆成 token 喂给 AI，AI 的回答也是一个 token 一个 token 吐出来的。一个 token ≈ 1 个汉字，或英文约 0.75 个单词（具体会拆分/合并）。AI 的底层就是『文字接龙』：接收 N 个 token → 预测第 N+1 个 → 吐出 → 再猜下一个 → 循环。",
    analogy: "像读书时的『页』。AI 看书不按字数算，按『页（token）』算；一页约等于一个意思单元。",
    points: [
      "决定 AI 的『记忆力上限』：即上下文窗口（如 DeepSeek ~12.8 万、Kimi ~20 万 token）",
      "决定计费：企业 API 按 token 收费（『一千 token 多少钱』）",
      "一段对话塞太多内容超过窗口，AI 会『忘掉』最早说的",
      "MCP/Skill 的设计核心之一，就是管好这有限的上下文窗口"
    ],
    layer: "燃料层：一切运行的底层计量单位"
  }
];

// 概念协作关系（用于关系图）
const FLOW = [
  { id: "user", label: "用户指令", desc: "你说：『帮我整理今天邮件，挑重要的发摘要到群里』——这是最外层的 Prompt。" },
  { id: "prompt", label: "Prompt", desc: "把目标说清楚。越结构化（角色+任务+格式），AI 越懂你。" },
  { id: "skill", label: "Skill 加载", desc: "系统自动匹配『邮件整理技能包』，补齐『什么是重要邮件』的判断标准与摘要格式（SOP）。" },
  { id: "agent", label: "Agent 执行", desc: "Agent 本体接到任务：打开邮箱→逐封分析→筛选→生成摘要→发群，自主跑完循环。" },
  { id: "mcp", label: "MCP 连接", desc: "『打开邮箱』『发飞书消息』等操作，全部通过 MCP 协议统一连接外部系统。" },
  { id: "token", label: "Token 计量", desc: "贯穿全程的燃料：上下文窗口决定能记多少，API 按 token 计费。" },
  { id: "result", label: "交付结果", desc: "最终产出：一份重要邮件摘要已发到群里。任务完成，而非一段文字。" }
];

// GitHub 上最火的 10 个 Agent Skill（按 Star 排名，2026 榜单，Anthropic 官方 skills 仓库）
const SKILLS_TOP = [
  {
    rank: 1, name: "Algorithmic Art", stars: "51.7k", cat: "创意 / 生成艺术",
    one: "用 p5.js 生成可复现的算法艺术",
    features: ["种子随机、结果可复现", "实时参数调节与可视化", "流场 / 粒子系统等多种风格", "输出交互式 HTML 文件"],
    scene: "独特视觉作品、数据可视化背景、品牌视觉元素",
    url: "https://github.com/anthropics/skills"
  },
  {
    rank: 2, name: "Internal Comms", stars: "47.1k", cat: "团队协作 / 职场写作",
    one: "帮团队写专业、规范的内部沟通文档",
    features: ["3P 周报模板（Progress/Plans/Problems）", "公司公告与 FAQ", "项目更新与事故报告", "符合企业标准格式"],
    scene: "周报、领导简报、团队公告、事故复盘",
    url: "https://github.com/anthropics/skills"
  },
  {
    rank: 3, name: "Frontend Design", stars: "43.7k", cat: "前端 / UI·UX",
    one: "前端界面设计最佳实践指南",
    features: ["响应式设计规范", "组件设计模式", "无障碍（A11y）指南", "现代 CSS 与动效技巧"],
    scene: "构建 Web 应用时确保界面美观且实用，告别「AI 味」设计",
    url: "https://github.com/anthropics/skills"
  },
  {
    rank: 4, name: "Slack GIF Creator", stars: "42.8k", cat: "沟通 / 趣味",
    one: "生成适配 Slack 的动图与自定义 emoji",
    features: ["适配尺寸（128/480px）", "内置平台合规校验", "丰富动画原语（shake/pulse/bounce…）", "智能文件体积优化"],
    scene: "为团队 Slack 频道做专属动图与表情",
    url: "https://github.com/anthropics/skills"
  },
  {
    rank: 5, name: "PDF Processing", stars: "40.5k", cat: "文档处理",
    one: "PDF 文档处理的「瑞士军刀」",
    features: ["文本与表格提取", "创建 / 合并 / 拆分", "表单填写与处理", "水印与密码保护"],
    scene: "从 PDF 抽取数据做分析、批量处理合同文档",
    url: "https://github.com/anthropics/skills"
  },
  {
    rank: 6, name: "Brand Guidelines", stars: "37.8k", cat: "品牌 / 设计",
    one: "保持品牌视觉一致性",
    features: ["品牌色系统应用", "智能字体风格匹配", "系统字体自动回退", "形状与强调色循环"],
    scene: "品牌相关的 PPT、文档、视觉内容统一规范",
    url: "https://github.com/anthropics/skills"
  },
  {
    rank: 7, name: "Webapp Testing", stars: "35.4k", cat: "开发 / 测试",
    one: "用 Playwright 做 Web 应用自动化测试",
    features: ["本地 Web 应用自动测试", "浏览器截图捕获", "查看控制台日志", "管理服务生命周期"],
    scene: "验证前端功能、调试 UI 行为、生成可靠测试脚本",
    url: "https://github.com/anthropics/skills"
  },
  {
    rank: 8, name: "MCP Builder", stars: "34.4k", cat: "开发 / 集成",
    one: "创建 MCP Server 的专业指南（呼应上方 MCP 概念）",
    features: ["MCP 协议实践", "Server 脚手架", "Tools / Resources / Prompts 定义", "把外部工具接入 Agent"],
    scene: "给 Agent 接入自定义外部工具或数据源",
    url: "https://github.com/anthropics/skills"
  },
  {
    rank: 9, name: "XLSX（Excel）", stars: "32.9k", cat: "办公 / 数据",
    one: "用自然语言处理 Excel 表格",
    features: ["人话写公式", "数据分析与制图", "表格增删改查", "批量报表生成"],
    scene: "财务报表、数据分析、批量表格处理",
    url: "https://github.com/anthropics/skills"
  },
  {
    rank: 10, name: "PPTX（PowerPoint）", stars: "32.9k", cat: "办公 / 演示",
    one: "自然语言生成幻灯片",
    features: ["大纲一键转幻灯片", "版式规范", "内容润色", "图表与配图建议"],
    scene: "工作汇报、融资路演、培训材料",
    url: "https://github.com/anthropics/skills"
  }
];

// ============ 模块三：流行 AI Agent（按 中美 / 国际 分区） ============
const AGENTS = [
  {
    id: "manus",
    name: "Manus",
    vendor: "Monica · 中国团队",
    country: "cn",
    category: "general",
    badge: "通用云端 Agent",
    site: "https://manus.im",
    summary: "给定目标后自主规划多步任务，调用浏览器、代码编辑器与文件系统，端到端交付成品。",
    tips: [
      "把任务说成一个『可交付的结果』而非问句：『做一个 SaaS 落地页』而非『落地页怎么写』",
      "复杂任务单次消耗 500–900 积分，先用免费额度（每日 300 积分）试小任务",
      "实时任务执行面板可观察它每一步在做什么，便于中途纠偏"
    ],
    scenes: ["市场调研报告", "建站 / 做 PPT", "数据分析", "内容生成"],
    price: "免费额度 + 扩展版约 $200/月",
    note: "最接近『AI 员工』的通用 Agent；积分消耗快，垂直场景非专精。"
  },
  {
    id: "claude-code",
    name: "Claude Code",
    vendor: "Anthropic",
    country: "us",
    category: "coding",
    badge: "终端编程 Agent",
    site: "https://claude.ai/code",
    summary: "在终端直接读写整个代码库、跑测试、做 Git 操作，适合大型复杂工程任务。",
    tips: [
      "用自然语言下达工程指令：『找出并修复 checkout 流程的空指针异常』",
      "支持后台 Agent、多文件编辑、MCP 工具扩展",
      "速率限制较严格，长任务注意消耗；可配合 Agent Teams 多体协作"
    ],
    scenes: ["大型重构", "遗留代码迁移", "代码审查", "Bug 修复"],
    price: "含于 Claude Pro $20/月起",
    note: "复杂代码库推理一流、终端原生；是 Cursor/Windsurf 等 IDE 的底层引擎之一。"
  },
  {
    id: "cursor",
    name: "Cursor",
    vendor: "Anysphere",
    country: "us",
    category: "coding",
    badge: "IDE 编程 Agent",
    site: "https://cursor.com",
    summary: "VS Code 原生的 AI IDE，Tab 补全 + 完整 Agent 工作流，企业采用率最高。",
    tips: [
      "用 @ 引用文件 / 文件夹，让 Agent 精准理解上下文",
      "Background Agents 可在后台跑长任务，前台继续写代码",
      "选对底层模型：硬核编程用 Claude / GLM，性价比用 DeepSeek / Qwen"
    ],
    scenes: ["日常编码", "功能开发", "测试生成", "代码解释"],
    price: "Hobby 免费 → Ultra $200/月",
    note: "财富 500 强半数在用；积分消耗随模型浮动，企业采购占大头。"
  },
  {
    id: "coze",
    name: "扣子 Coze",
    vendor: "字节跳动",
    country: "cn",
    category: "platform",
    badge: "无代码 Agent 搭建平台",
    site: "https://www.coze.cn",
    summary: "可视化拖拽搭建智能体，内置插件、知识库与工作流，个人与企业都能用。",
    tips: [
      "从模板起步，先搭一个『客服 / 助手』bot 跑通流程",
      "用知识库喂私有文档，用插件扩能力（很多底层走 MCP）",
      "发布到飞书 / 微信 / 抖音等多渠道"
    ],
    scenes: ["个人助手", "企业客服", "内容 bot", "流程自动化"],
    price: "免费 + 按量",
    note: "零代码上手快；深度定制与私有化弱于 Dify。"
  },
  {
    id: "dify",
    name: "Dify",
    vendor: "Dify（开源社区）",
    country: "cn",
    category: "platform",
    badge: "开源 Agent 工作流平台",
    site: "https://dify.ai",
    summary: "开源的可视化 LLMOps 平台，搭 Agent 工作流、RAG、模型路由，企业可自托管。",
    tips: [
      "用工作流编排多步骤任务，比纯提示词更可控",
      "自托管保障数据不出域，适合合规敏感业务",
      "配合 MCP / 多模型，做生产级落地"
    ],
    scenes: ["企业知识库", "RAG 应用", "工作流自动化", "私有化部署"],
    price: "开源免费 + 云服务",
    note: "开发者友好、可私有化；需要一定运维能力。"
  },
  {
    id: "qoder",
    name: "Qoder CN（通义灵码）",
    vendor: "阿里云",
    country: "cn",
    category: "coding",
    badge: "智能体编程平台",
    site: "https://lingma.aliyun.com/",
    summary: "阿里云的 AI 智能体编程平台（2026-05-20 由「通义灵码」升级更名）：覆盖 IDE / 插件 / CLI / 云端，Quest 模式可把复杂研发任务自动拆解为步骤、端到端交付工程级成果。",
    tips: [
      "用 Quest 模式下达完整目标（如『实现并测试登录模块』），它自主规划 + 执行",
      "模型可切 GLM / DeepSeek / Kimi / MiniMax 等国产大模型，数据国内合规部署",
      "专家团子智能体可协作前后端 / 数据库 / 运维 / 测试，复杂任务分而治之",
      "国内部署 + 私域知识增强，适合金融 / 政务等对数据安全要求高的场景"
    ],
    scenes: ["软件开发全流程", "多文件 Agent 编辑", "单元测试生成", "企业私有化研发"],
    price: "订阅席位 + Credits 机制（个人版可免费）",
    note: "Gartner 2026 企业级 AI 代码智能体魔力象限唯一入围中国厂商；从『补全工具』升级为『自主研发助手』。"
  },
  {
    id: "crewai",
    name: "CrewAI",
    vendor: "CrewAI（开源社区）",
    country: "us",
    category: "platform",
    badge: "多 Agent 协作框架",
    site: "https://www.crewai.com",
    summary: "Python 框架，给 Agent 分配角色（研究员/写手/编辑），多体协作完成复杂任务。",
    tips: [
      "先定义清晰角色与交接物，再让 Agent 组队",
      "适合『一人分饰多角』会累的复杂流程",
      "与 LangChain / MCP 可组合"
    ],
    scenes: ["多角色协作", "调研+写作流水线", "批量内容生产", "复杂编排"],
    price: "开源免费",
    note: "角色化协作强；编排不当易『跑偏』，需设好校验。"
  },
  {
    id: "autogpt",
    name: "AutoGPT",
    vendor: "开源社区",
    country: "other",
    category: "open",
    badge: "开源通用 Agent",
    site: "https://github.com/Significant-Gravitas/AutoGPT",
    summary: "开源 Agent 鼻祖，给定目标后自主循环：规划→执行→评估→迭代。",
    tips: [
      "自托管只需小额 VPS，成本主要是底层 LLM API",
      "用可视化 Agent Builder / 市场预置 agent 快速起步",
      "适合『周级重复监控』类任务（竞品追踪、报告）"
    ],
    scenes: ["竞品监控", "内容管线", "自动化研究", "通用实验"],
    price: "开源免费（自托管）",
    note: "最成熟的开源 Agent 框架；运维与体验不如商业产品。"
  },
  {
    id: "perplexity",
    name: "Perplexity",
    vendor: "Perplexity AI",
    country: "us",
    category: "research",
    badge: "研究 Agent",
    site: "https://www.perplexity.ai",
    summary: "从 AI 搜索进化为 Agent 平台，带可验证引用的研究与『Computer』浏览器操作。",
    tips: [
      "做深度研究时要求『给出可点击来源』，质量最高",
      "Perplexity Computer 可多步浏览网页、用软件",
      "每步自动选模型（含 o3-pro / Claude Opus）"
    ],
    scenes: ["带引用研究", "竞品分析", "学术辅助", "实时资讯"],
    price: "免费 → Max $200/月",
    note: "引用质量一流；Max 较贵，Agent 功能不如核心搜索成熟。"
  },
  {
    id: "openclaw",
    name: "OpenClaw",
    vendor: "开源社区",
    country: "other",
    category: "open",
    badge: "开源个人 AI 助理",
    site: "",
    summary: "可自托管的个人 Agent，连接 25+ 消息频道，语音唤醒 + 实时画布，原生接 Claude。",
    tips: [
      "自托管获得『完全数据所有权』，无供应商锁定",
      "接入飞书 / 钉钉 / 微信等频道，一句话就干活",
      "可换任意 LLM 后端，灵活度最高"
    ],
    scenes: ["个人全场景助理", "消息/日程自动化", "团队通知", "自建 bot"],
    price: "开源免费（自托管）",
    note: "2026 年现象级开源项目；需要自托管技术。"
  },
  {
    id: "hermes",
    name: "Hermes Agent（爱马仕）",
    vendor: "Nous Research（开源）",
    country: "other",
    category: "open",
    badge: "自进化开源 Agent",
    site: "",
    summary: "Nous Research 于 2026-02 推出的开源自主 Agent 框架，因英文名撞奢侈品被国内开发者戏称「爱马仕」。最大特点是『自我进化』：从任务中自动提炼、迭代技能卡，跨平台记忆（微信 / QQ / 飞书互通）。",
    tips: [
      "给目标即可，它自己写 Skill、自己装工具，越用越聪明（俗称『养马』）",
      "支持一键接入微信 / QQ / 飞书，手机端可经 Termux 离线常驻",
      "与 OpenClaw 对照：OpenClaw 像『执行管家』，Hermes 像『会动脑的学徒』",
      "经验沉淀要『学对东西』，错误路径被写进技能反而易带偏后续任务"
    ],
    scenes: ["自主任务执行", "跨平台个人助理", "技能自生成", "手机端离线 Agent"],
    price: "开源免费（自托管）",
    note: "2026 年现象级开源项目；『可写运行时』架构让 Agent 自己编写并优化能力，是 OpenClaw 之后的新晋热门。"
  },
  {
    id: "copilot-studio",
    name: "Microsoft Copilot Studio",
    vendor: "Microsoft",
    country: "us",
    category: "platform",
    badge: "企业 Agent 平台",
    site: "https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio",
    summary: "在 Microsoft 365 内无代码搭建自定义 Agent，活在 Teams/Outlook/Excel 里。",
    tips: [
      "已用 M365 的团队首选，无需离开生态",
      "搭『监控邮箱 / 纪要 / 路由工单 / 周报』类 agent",
      "与 Power Platform 打通做企业流程"
    ],
    scenes: ["HR 入职助手", "工单路由", "会议纪要", "企业报表"],
    price: "约 $30/用户/月起",
    note: "企业合规与集成强；绑定微软生态。"
  },
  {
    id: "chatgpt-agent",
    name: "ChatGPT Agent",
    vendor: "OpenAI",
    country: "us",
    category: "general",
    badge: "浏览器任务 Agent",
    site: "https://chatgpt.com",
    summary: "接管浏览器做自主任务：填表、下单、安排行程，随时可由用户接管。",
    tips: [
      "用『视觉-动作循环』操作网页，复杂表单也能填",
      "给每个网站写自定义指示，提升准确率",
      "高风险操作随时手动接管"
    ],
    scenes: ["表单填写", "下单购买", "行程安排", "网页操作"],
    price: "含于 Plus $20 / Pro $200",
    note: "原生 OpenAI 模型；仅限浏览器，复杂工作流准确率参差。"
  },
  {
    id: "workbuddy",
    name: "WorkBuddy",
    vendor: "腾讯",
    country: "cn",
    category: "general",
    badge: "全场景 AI 桌面助理",
    site: "https://www.codebuddy.cn/work/",
    summary: "腾讯出品的「全场景 AI 桌面助理」（被戏称『腾讯版 OpenClaw』）：既能聊天问答，也能直接读改写本地文件、连微信 / 企微 / 飞书 / 钉钉，内置 20+ 技能与 MCP，默认腾讯混元并兼容 DeepSeek / GLM / Kimi / MiniMax 等国产模型。",
    tips: [
      "把它当『住在你电脑里的助理』：直接让它整理桌面、批量改文件、写脚本",
      "用技能（Skill）与连接器把微信 / 企微 / 飞书 / 钉钉接进来，消息自动流转",
      "模型可换：默认混元，复杂任务切 DeepSeek / GLM，性价比高",
      "100+ 专家虚拟团队可分工协作，适合个人与企业落地"
    ],
    scenes: ["本地文件处理", "办公自动化", "跨平台消息流转", "企业 Agent 落地"],
    price: "免费试用 + Credits 计费 + 订阅制",
    note: "2026-03-09 发布；强项是本地操作 + 多连接器 + 模型无关，国产全场景 Agent 代表。"
  },
  {
    id: "codex",
    name: "Codex",
    vendor: "OpenAI",
    country: "us",
    category: "coding",
    badge: "云端自主编程 Agent",
    site: "https://openai.com/codex/",
    summary: "OpenAI 的云端自主编程 Agent（同时开源 Rust CLI）：在隔离沙箱里并行跑任务——写代码、跑测试、提 PR、做代码审查，由 GPT-5-Codex 驱动。",
    tips: [
      "在网页 / CLI / IDE 插件里给它一个清晰工单，它并行开工",
      "适合『边界清晰』的工程任务：修复 bug、写测试、迁移代码",
      "与 GitHub 深度集成，可直接开 PR、做 PR 审查",
      "长任务在云沙箱跑，不占本地资源；Plus $20/月即含额度"
    ],
    scenes: ["自主写代码", "PR 审查", "测试编写", "代码迁移"],
    price: "含于 ChatGPT Plus $20 / Pro $200 每月",
    note: "云端异步执行是最大特点；与 Claude Code（终端式）形成『云 vs 本地』对照。"
  }
];

// Agent 分区标签（中美 / 国际）
const AGENT_REGIONS = [
  { id: "cn", label: "🇨🇳 中国" },
  { id: "us", label: "🇺🇸 美国" },
  { id: "other", label: "🌐 国际 / 开源" }
];
