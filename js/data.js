/*
 * AI 使用智能助理 · 学习向导 — 内容数据
 * 数据时间基准：2026 年中（综合 2026-06/07 多源实测与官方参数）
 * 版本号会随厂商迭代变化，本数据用于教学科普，实际选型以官方最新文档为准。
 *
 * 多维度字段说明（本轮深化）：
 *   模型 MODELS   : forWhom 选型建议 / tip 使用心法 / stack 常搭配的 Agent·Skill
 *   Agent AGENTS  : difficulty 上手难度 / forWhom 适合谁 / edge 差异化亮点 / stack 推荐搭配
 *   概念 CONCEPTS : myth 常见误区 / try 上手小实验 / related 关联概念
 *   Skill SKILLS  : trigger 怎么触发（触发词）
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
    forWhom: "几乎所有人的「默认主力」：日常办公、写作润色、多模态创作，不确定用哪个时先选它。",
    tip: "复杂任务先让它「列大纲 / 给步骤」再执行，跑题率大降；追求质量时在设置里切到深度思考模式。",
    stack: "搭配 ChatGPT Agent 跑网页 / 表单任务，配 PPTX·XLSX Skill 直接出办公文档。",
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
    forWhom: "开发者、工程师、长文档 / 合规写作人群——要把「编程」和「长程任务」做到极致就选它。",
    tip: "给「角色 + 约束 + 验收标准」比给「请帮我写」效果好得多；超大代码库直接 @ 整个仓库。",
    stack: "底层驱动 Claude Code / Cursor，配 MCP 接代码仓库与 CI 流水线。",
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
    forWhom: "科研 / 数据 / 长文档检索用户，以及需要「看图听音」原生多模态的场景。",
    tip: "超长上下文直接丢整本书 / 整份研报；Flash 版做高频低难任务性价比最高。",
    stack: "配 NotebookLM 做资料消化，配 Webapp Testing Skill 做前端验证。",
    price: "约 $0.1–0.4 每百万 token（Flash 版更便宜）",
    tag: "多模态 / 科学"
  },
  {
    id: "grok",
    name: "Grok 4.1",
    vendor: "xAI",
    country: "us",
    type: "closed",
    region: "美国",
    version: "Grok 4.1（2026）",
    context: "长上下文",
    strengths: ["实时接入 X 平台数据", "时事 / 社交舆情分析强", "风格直率"],
    weakness: ["通用中文场景非主战场", "国内访问受限"],
    scene: "实时资讯、社交分析、时事问答",
    forWhom: "关注实时舆情、社媒、时事的人群，尤其是 X 平台重度用户。",
    tip: "问「现在最新 / 实时」类问题最香；让它「引用来源」避免编造。",
    stack: "配合 Perplexity 做交叉事实核查，互补引用质量。",
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
    forWhom: "开发者、科研、企业私有化——预算敏感又想要强推理的人首选。",
    tip: "数学 / 代码任务直接给条件即可，省 token；自部署用 vLLM / Ollama 几分钟起。",
    stack: "是本地 OpenClaw / Hermes 的默认引擎，配 Codex 做云端并行。",
    price: "约 ¥1.5 / 百万 token（开源可自部署）",
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
    forWhom: "国产全能首选：智能体任务、编程、办公，想用开源又不想折腾的人。",
    tip: "Agent 任务用 Qwen-Max，coding 用 Qwen-Coder；海外调用价格约 1/10。",
    stack: "驱动 Qoder CN / Coze / Dify，配 MCP Builder 接业务系统。",
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
    forWhom: "中文日常聊天、短视频 / 小红书文案、多模态创作、C 端小白用户。",
    tip: "让它「模仿某博主语气」写文案很准；图片 / 视频生成直接说需求即可。",
    stack: "配 Coze 搭内容 bot，配 Brand Guidelines Skill 统一视觉。",
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
    forWhom: "中文深度创作、公文 / 营销、复杂逻辑与代码——要「中文最地道」的人。",
    tip: "中文长文先给「结构 + 受众 + 禁忌」三要素；代码任务 @ 仓库后给验收点。",
    stack: "驱动 Qoder CN，配 Internal Comms Skill 写周报 / 公告。",
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
    forWhom: "长文档 / 论文 / 法律研报阅读摘要——一次要「吃」几十万字的人。",
    tip: "直接上传 PDF 说「提取争议焦点 / 时间线」；超长对话开「长记忆」。",
    stack: "配 PDF Processing Skill 做批量抽取，配 Perplexity 做引用核查。",
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
    forWhom: "腾讯生态用户（微信 / 企微 / 腾讯文档），办公协作与内容生成。",
    tip: "在元宝里直接 @ 腾讯文档 / 会议纪要；复杂任务让 WorkBuddy 调它。",
    stack: "WorkBuddy 默认模型，配微信 / 企微连接器做消息流转。",
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
    forWhom: "超长上下文、编程 Agent、多模态（文 / 图 / 音 / 视频）生成、企业 API。",
    tip: "长文档用 1M 窗口一次喂完；视频 / 语音走海螺，文本走 M3。",
    stack: "配 MCP 接业务数据，配 Algorithmic Art Skill 出视觉。",
    price: "开源权重 + Plus 约 $20/月（含约 125 亿 tokens）",
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
    forWhom: "智能设备 / 端侧场景、编程 Agent、全模态交互、想 MIT 全量商用的人。",
    tip: "端侧用轻量版，云端用 Pro；和「小爱同学」联动做家居 / 座舱。",
    stack: "小米生态内置，配 Codex / Claude Code 做复杂工程。",
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
    layer: "最底层：所有能力的起点",
    myth: "误区一：『Prompt 越短越酷』——其实越具体越有用；误区二：『AI 应该懂我』——它只懂你写出来的，没写的它只能猜。",
    try: "复制这句对比效果：「你是有 10 年经验的运营。帮我写一条小红书标题，受众 25 岁女性，风格活泼，给 5 个选项并说明差异。」再对比你平时随便问的写法。",
    related: "Skill（把好 Prompt 固化复用）、Agent（消费 Prompt 去执行任务）"
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
    layer: "包装层：把 Prompt 沉淀为可复用能力",
    myth: "误区：『Skill 会自己思考』——它只是把预设流程 / 知识『喂』给模型，真正的推理还是模型做；Skill 强在『不跑题、不漏步骤』。",
    try: "在支持 Skill 的客户端说「用 Internal Comms 帮我写本周 3P 周报」，看它自动套模板、补结构。",
    related: "Prompt（Skill 是 Prompt 的封装）、MCP（Skill 管方法论，MCP 管连接）"
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
    layer: "执行层：干活的『工人』",
    myth: "误区一：『Agent 啥都能干』——它擅长边界清晰、可验证的任务；误区二：『Agent 不会出错』——关键决策仍需人审。",
    try: "给 Manus / ChatGPT Agent 一个明确交付目标：「整理我 Gmail 里本周重要邮件，写成 3 条摘要发到 Slack」，观察它自主循环。",
    related: "Prompt（任务入口）、Skill（方法论）、MCP（工具手）、Token（燃料）"
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
    layer: "集成层：工人手里的『万能工具接口』",
    myth: "误区一：『MCP 让 AI 变聪明』——它只解决『连得上』，聪明与否还是模型；误区二：『接了就安全』——需鉴权与最小权限。",
    try: "在 Claude Desktop 里连一个文件系统 MCP，然后说「读我桌面那个 notes.txt 并总结」，看它直接操作本地文件。",
    related: "Agent（调用方）、Token（连接定义常驻上下文窗口）"
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
    layer: "燃料层：一切运行的底层计量单位",
    myth: "误区一：『中文按字算 token』——其实是按子词拆分，不同模型规则不同；误区二：『token 越多越贵就一定越好』——要控上下文省成本。",
    try: "把同一段话分别丢进中英模型，看『用量 / 价格』统计，直观理解上下文窗口与计费。",
    related: "MCP / Skill（都吃上下文窗口）、模型（窗口大小决定能记多少）"
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
    trigger: "说「用 Algorithmic Art 生成一张流场风格的壁纸，主色蓝紫」",
    url: "https://github.com/anthropics/skills/tree/main/skills/algorithmic-art"
  },
  {
    rank: 2, name: "Internal Comms", stars: "47.1k", cat: "团队协作 / 职场写作",
    one: "帮团队写专业、规范的内部沟通文档",
    features: ["3P 周报模板（Progress/Plans/Problems）", "公司公告与 FAQ", "项目更新与事故报告", "符合企业标准格式"],
    scene: "周报、领导简报、团队公告、事故复盘",
    trigger: "说「用 Internal Comms 按 3P 模板写本周周报」",
    url: "https://github.com/anthropics/skills/tree/main/skills/internal-comms"
  },
  {
    rank: 3, name: "Frontend Design", stars: "43.7k", cat: "前端 / UI·UX",
    one: "前端界面设计最佳实践指南",
    features: ["响应式设计规范", "组件设计模式", "无障碍（A11y）指南", "现代 CSS 与动效技巧"],
    scene: "构建 Web 应用时确保界面美观且实用，告别「AI 味」设计",
    trigger: "说「用 Frontend Design 给我这个登录页提改进建议并给代码」",
    url: "https://github.com/anthropics/skills/tree/main/skills/frontend-design"
  },
  {
    rank: 4, name: "Slack GIF Creator", stars: "42.8k", cat: "沟通 / 趣味",
    one: "生成适配 Slack 的动图与自定义 emoji",
    features: ["适配尺寸（128/480px）", "内置平台合规校验", "丰富动画原语（shake/pulse/bounce…）", "智能文件体积优化"],
    scene: "为团队 Slack 频道做专属动图与表情",
    trigger: "说「用 Slack GIF Creator 做个庆祝上线的动图」",
    url: "https://github.com/anthropics/skills/tree/main/skills/slack-gif-creator"
  },
  {
    rank: 5, name: "PDF Processing", stars: "40.5k", cat: "文档处理",
    one: "PDF 文档处理的「瑞士军刀」",
    features: ["文本与表格提取", "创建 / 合并 / 拆分", "表单填写与处理", "水印与密码保护"],
    scene: "从 PDF 抽取数据做分析、批量处理合同文档",
    trigger: "说「用 PDF 提取这份合同的关键条款做成表格」",
    url: "https://github.com/anthropics/skills/tree/main/skills/pdf"
  },
  {
    rank: 6, name: "Brand Guidelines", stars: "37.8k", cat: "品牌 / 设计",
    one: "保持品牌视觉一致性",
    features: ["品牌色系统应用", "智能字体风格匹配", "系统字体自动回退", "形状与强调色循环"],
    scene: "品牌相关的 PPT、文档、视觉内容统一规范",
    trigger: "说「用 Brand Guidelines 检查这页 PPT 是否符合我们品牌色」",
    url: "https://github.com/anthropics/skills/tree/main/skills/brand-guidelines"
  },
  {
    rank: 7, name: "Webapp Testing", stars: "35.4k", cat: "开发 / 测试",
    one: "用 Playwright 做 Web 应用自动化测试",
    features: ["本地 Web 应用自动测试", "浏览器截图捕获", "查看控制台日志", "管理服务生命周期"],
    scene: "验证前端功能、调试 UI 行为、生成可靠测试脚本",
    trigger: "说「用 Webapp Testing 帮我测这个本地站点登录流程」",
    url: "https://github.com/anthropics/skills/tree/main/skills/webapp-testing"
  },
  {
    rank: 8, name: "MCP Builder", stars: "34.4k", cat: "开发 / 集成",
    one: "创建 MCP Server 的专业指南（呼应上方 MCP 概念）",
    features: ["MCP 协议实践", "Server 脚手架", "Tools / Resources / Prompts 定义", "把外部工具接入 Agent"],
    scene: "给 Agent 接入自定义外部工具或数据源",
    trigger: "说「用 MCP Builder 把我们的订单系统做成 MCP Server」",
    url: "https://github.com/anthropics/skills/tree/main/skills/mcp-builder"
  },
  {
    rank: 9, name: "XLSX（Excel）", stars: "32.9k", cat: "办公 / 数据",
    one: "用自然语言处理 Excel 表格",
    features: ["人话写公式", "数据分析与制图", "表格增删改查", "批量报表生成"],
    scene: "财务报表、数据分析、批量表格处理",
    trigger: "说「用 XLSX 把这堆销售数据按地区汇总并出图」",
    url: "https://github.com/anthropics/skills/tree/main/skills/xlsx"
  },
  {
    rank: 10, name: "PPTX（PowerPoint）", stars: "32.9k", cat: "办公 / 演示",
    one: "自然语言生成幻灯片",
    features: ["大纲一键转幻灯片", "版式规范", "内容润色", "图表与配图建议"],
    scene: "工作汇报、融资路演、培训材料",
    trigger: "说「用 PPTX 把这份大纲做成 10 页融资路演」",
    url: "https://github.com/anthropics/skills/tree/main/skills/pptx"
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
    difficulty: "中等",
    site: "https://manus.im",
    summary: "给定目标后自主规划多步任务，调用浏览器、代码编辑器与文件系统，端到端交付成品。",
    forWhom: "想「雇个 AI 员工」做交付的个人 / 小团队，不愿自己拆步骤的人。",
    edge: "端到端交付成品而非给建议，最接近「AI 员工」的通用 Agent。",
    stack: "底层模型常切 Claude / GLM，配 PPTX·XLSX Skill 出办公文档。",
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
    difficulty: "进阶",
    site: "https://claude.ai/code",
    summary: "在终端直接读写整个代码库、跑测试、做 Git 操作，适合大型复杂工程任务。",
    forWhom: "开发者、工程团队，要拿它跑真实代码库任务的人。",
    edge: "终端原生、复杂代码库推理断层领先，是众多 IDE 的底层引擎。",
    stack: "Claude 模型 + MCP + Agent Teams 多体协作。",
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
    difficulty: "简单",
    site: "https://cursor.com",
    summary: "VS Code 原生的 AI IDE，Tab 补全 + 完整 Agent 工作流，企业采用率最高。",
    forWhom: "所有写代码的程序员，尤其 IDE 重度用户。",
    edge: "VS Code 原生、企业采用率最高、@ 引用让上下文超精准。",
    stack: "Claude / GLM / DeepSeek 可换底层 + Background Agents 后台跑。",
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
    difficulty: "简单",
    site: "https://www.coze.cn",
    summary: "可视化拖拽搭建智能体，内置插件、知识库与工作流，个人与企业都能用。",
    forWhom: "零代码用户、运营 / 产品想快速搭 bot 的人。",
    edge: "可视化拖拽、多渠道一键发布，门槛最低。",
    stack: "字节生态 + 插件（底层多走 MCP）+ 知识库。",
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
    difficulty: "中等",
    site: "https://dify.ai",
    summary: "开源的可视化 LLMOps 平台，搭 Agent 工作流、RAG、模型路由，企业可自托管。",
    forWhom: "开发者 / 企业，要私有化与 RAG 工作流的人。",
    edge: "开源可自托管、数据不出域，生产级落地友好。",
    stack: "多模型 + MCP + 知识库组合。",
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
    difficulty: "中等",
    site: "https://lingma.aliyun.com/",
    summary: "阿里云的 AI 智能体编程平台（2026-05-20 由「通义灵码」升级更名）：覆盖 IDE / 插件 / CLI / 云端，Quest 模式可把复杂研发任务自动拆解为步骤、端到端交付工程级成果。",
    forWhom: "国内研发团队、对数据安全要求高的企业私有化研发。",
    edge: "Quest 模式端到端交付 + 国产模型合规部署，Gartner 唯一入围中国厂商。",
    stack: "GLM / DeepSeek / Kimi / MiniMax 可切 + 专家团子智能体协作。",
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
    difficulty: "进阶",
    site: "https://www.crewai.com",
    summary: "Python 框架，给 Agent 分配角色（研究员/写手/编辑），多体协作完成复杂任务。",
    forWhom: "开发者，要多 Agent 角色化协作流水线的人。",
    edge: "角色化多体协作，适合「一人分饰多角」会累的复杂流程。",
    stack: "LangChain / MCP + 任意 LLM 可组合。",
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
    difficulty: "进阶",
    site: "https://github.com/Significant-Gravitas/AutoGPT",
    summary: "开源 Agent 鼻祖，给定目标后自主循环：规划→执行→评估→迭代。",
    forWhom: "爱折腾的自托管玩家、想完全掌控流程的人。",
    edge: "最成熟的开源鼻祖，自主循环范式开山之作。",
    stack: "自托管 LLM + 市场预置 agent 快速起步。",
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
    difficulty: "简单",
    site: "https://www.perplexity.ai",
    summary: "从 AI 搜索进化为 Agent 平台，带可验证引用的研究与『Computer』浏览器操作。",
    forWhom: "做研究 / 竞品 / 学术、要可引用来源的人。",
    edge: "引用质量一流、带 Computer 浏览器多步操作。",
    stack: "o3-pro / Claude 每步自动选模 + 多源交叉。",
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
    difficulty: "进阶",
    site: "https://github.com/search?q=OpenClaw+open+source+AI+agent&type=repositories",
    summary: "可自托管的个人 Agent，连接 25+ 消息频道，语音唤醒 + 实时画布，原生接 Claude。",
    forWhom: "想完全掌控数据、会自托管的极客。",
    edge: "25+ 频道、完全数据所有权、可换任意 LLM 后端。",
    stack: "任意 LLM + 飞书 / 钉钉 / 微信连接器。",
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
    difficulty: "进阶",
    site: "https://github.com/search?q=Hermes+Agent+Nous+Research&type=repositories",
    summary: "Nous Research 于 2026-02 推出的开源自主 Agent 框架，因英文名撞奢侈品被国内开发者戏称「爱马仕」。最大特点是『自我进化』：从任务中自动提炼、迭代技能卡，跨平台记忆（微信 / QQ / 飞书互通）。",
    forWhom: "想『养马』、让 Agent 自己从任务里长能力的人。",
    edge: "从任务中自生成技能卡、跨平台记忆，『会动脑的学徒』。",
    stack: "微信 / QQ / 飞书 + 自写运行时架构。",
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
    difficulty: "中等",
    site: "https://www.microsoft.com/en-us/microsoft-copilot/microsoft-copilot-studio",
    summary: "在 Microsoft 365 内无代码搭建自定义 Agent，活在 Teams/Outlook/Excel 里。",
    forWhom: "已用 M365 的企业 / 团队，不想离开生态的人。",
    edge: "活在 Teams/Outlook/Excel 里、企业合规与集成强。",
    stack: "Power Platform + M365 生态打通。",
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
    difficulty: "简单",
    site: "https://chatgpt.com",
    summary: "接管浏览器做自主任务：填表、下单、安排行程，随时可由用户接管。",
    forWhom: "普通用户，要 AI 代填表 / 下单 / 安排行程的人。",
    edge: "视觉-动作循环操作网页，复杂表单也能填，随时手动接管。",
    stack: "ChatGPT 原生模型 + 浏览器。",
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
    difficulty: "中等",
    site: "https://www.codebuddy.cn/work/",
    summary: "腾讯出品的「全场景 AI 桌面助理」（被戏称『腾讯版 OpenClaw』）：既能聊天问答，也能直接读改写本地文件、连微信 / 企微 / 飞书 / 钉钉，内置 20+ 技能与 MCP，默认腾讯混元并兼容 DeepSeek / GLM / Kimi / MiniMax 等国产模型。",
    forWhom: "国内个人 / 企业，要『住进电脑的助理』、打通本地与多平台的人。",
    edge: "本地文件读写 + 多连接器 + 模型无关，国产全场景 Agent 代表。",
    stack: "混元 / DeepSeek / GLM 可换 + 20+ Skill + MCP。",
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
    difficulty: "进阶",
    site: "https://openai.com/codex/",
    summary: "OpenAI 的云端自主编程 Agent（同时开源 Rust CLI）：在隔离沙箱里并行跑任务——写代码、跑测试、提 PR、做代码审查，由 GPT-5-Codex 驱动。",
    forWhom: "开发者，要云端并行跑工程任务、不想占本地资源的人。",
    edge: "隔离沙箱并行执行、直接开 PR / 做审查，与 Claude Code 形成云 vs 本地对照。",
    stack: "GPT-5-Codex + GitHub 深度集成。",
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

// ============ 模块四：AI 全景洞察（深度拓展，跳出具体产品） ============
// 字段：icon 图标 / name 名称 / oneLiner 一句话 / def 定义 / layer 定位 / takeaway 一句话记住
//        sections 多维度小节（h 标题 / p 段落 或 list 列表） / related 关联模块
const INSIGHTS = [
  {
    id: "vibe",
    icon: "🎨",
    name: "Vibe Coding（氛围编程）",
    oneLiner: "用自然语言指挥 AI 写代码——你负责『说想要什么』，AI 负责『怎么写』。",
    def: "Vibe Coding（氛围编程）由 Andrej Karpathy 于 2025 年初提出：你完全沉浸在『想要什么』的氛围里，用大白话对 AI 描述需求，由 AI 把代码写出来，你基本『忘记代码本身』。它把编程从『写语法』变成『描述意图 + 验收』，是 2025–2026 年最火的开发范式之一。",
    layer: "开发范式 · 人与代码关系重构",
    takeaway: "你不必记住语法，但得会『说清要什么』和『判断写得对不对』。",
    sections: [
      { h: "🧠 核心理念", p: "从『我写代码』变成『我说需求，AI 写代码，我验收』。重点不是你会不会敲键盘，而是你能不能把想要的东西描述清楚、能不能看出结果对不对。" },
      { h: "🛠 怎么玩（工具链）", list: [
        "编辑器内：Cursor / Windsurf——用自然语言改代码、加功能，边说边看",
        "终端 / 云端：Claude Code / Codex——把整个工程交给它自主跑（见模块三）",
        "预览即反馈：网页/App 跑起来，错了就说『把按钮改成圆角、间距再大点』",
        "国内可走 Qoder CN（通义灵码升级版）做国产化 Vibe Coding"
      ] },
      { h: "💡 上手心法", list: [
        "把需求讲成『故事 + 验收标准』，别只抛一句『做个网站』",
        "小步快跑：改一点、看一眼、再说下一句，比一次塞一大段更稳",
        "让 AI 解释它写的代码，你做『架构与边界』的验收，别当甩手掌柜"
      ] },
      { h: "🚫 常见误区", p: "『不用学编程了』——其实你要会验收、会调试、会判断架构好坏；完全放手容易堆出『能跑但难维护』的代码。Vibe Coding 降低的是『动手门槛』，不是『思考门槛』。" },
      { h: "🧪 上手实验", p: "打开 Cursor（或任意支持 Agent 的 IDE），说：『用 HTML+CSS 做一个待办清单，能添加/删除/勾选，粉色主题，带完成动画』，看它 1 分钟内给你出成品，再让它改细节。" }
    ],
    related: "关联：模块三 Claude Code / Cursor / Codex / Qoder CN；概念 Skill（把常用的改码流程固化复用）。"
  },
  {
    id: "future",
    icon: "🚀",
    name: "AI 未来发展趋势",
    oneLiner: "从『会聊』到『会干』，再到『会自主思考』——Agent 化、多模态、端侧化是主线。",
    def: "2026 年被称作『Agent 元年』，AI 的重心正从『回答你的问题』转向『替你完成事情』。往后几年，能力边界、使用形态、落地场景都会持续重塑。下面几条是当前最确定的主线。",
    layer: "产业大势 · 看清方向",
    takeaway: "趋势不是『更聪明』一件事，而是『更会干、更随身、更便宜、更落地』。",
    sections: [
      { h: "🤖 Agent 化（自主执行）", p: "重心从对话转向自主执行：Agent 接管多步任务、并行工作、直接交付成果（见模块三各类 Agent）。" },
      { h: "🌈 多模态统一", p: "文本 / 图像 / 语音 / 视频 / 动作统一进一个模型，AI 理解世界的方式更完整（国产豆包、MiniMax、MiMo 已原生多模态）。" },
      { h: "📱 端侧 / 本地化", p: "手机、PC 本地跑大模型，隐私更好、延迟更低、可离线（如小米 MiMo 端侧版、各类端侧小模型）。" },
      { h: "🧠 长上下文 + 记忆", p: "上下文窗口持续变大、跨会话记忆让 AI 越来越『懂你』，从工具变伙伴。" },
      { h: "💰 模型商品化 + 成本骤降", p: "强模型越来越便宜，推理像水电一样按需取用，普及门槛大幅下降。" },
      { h: "🦾 具身智能", p: "模型走进机器人 / 座舱 / 家居，从『软件智能』走向『物理世界智能』。" },
      { h: "⚖️ 监管与对齐", p: "各国加速立法，安全、版权、内容对齐成为厂商必答题，合规即竞争力。" }
    ],
    related: "关联：模块一模型能力、模块三 Agent、概念 MCP（连接现实系统）。"
  },
  {
    id: "job",
    icon: "💼",
    name: "职业替代与机遇",
    oneLiner: "AI 不取代人，但『会用 AI 的人』会取代『不会用的人』。",
    def: "与其焦虑『我会被取代吗』，不如看清『哪些环节被自动化、哪些能力更值钱』。AI 重塑的是工作流，而不是简单地消灭岗位。关键在:你把 AI 当对手，还是当 Copilot。",
    layer: "个人发展 · 怎么不被落下",
    takeaway: "被取代的是『旧工作流』，升值的会是『会指挥 AI 的人』。",
    sections: [
      { h: "⚠️ 高替代风险", list: [
        "内容初稿：文案、翻译、基础写作、营销套件",
        "初级客服 / 电话销售 / 标准化咨询",
        "数据录入、报表生成、基础分析",
        "样板化编程、重复性测试"
      ] },
      { h: "🛡️ 相对安全 / 被增强", list: [
        "需要人际信任：医疗、教育、心理咨询",
        "复杂决策与责任承担（AI 给依据，人拍板）",
        "创意判断与跨域整合（审美、战略）",
        "线下与手工实操（难以数字化部分）"
      ] },
      { h: "🌱 新兴职业", list: [
        "AI 训练师 / 数据标注师 / 模型微调师",
        "Agent 编排师 / Prompt 架构师",
        "AI 审计与合规、AI 安全",
        "人机协作设计师、AI 产品经理"
      ] },
      { h: "🧭 应对心法", p: "把 AI 当 Copilot：你定方向，它做执行。深耕不可替代能力（审美、判断、责任、共情），学会『指挥 AI』比『和 AI 竞争』更划算；用本项目模块三的 Agent 把自己从重复劳动里解放出来。" },
      { h: "🚫 误区", p: "『我被取代了』——更准确是『我的旧工作流被取代』，工作内容升级而非消失。恐慌没用，先学会用再说。" }
    ],
    related: "关联：概念 Agent（自主执行）、模块三 WorkBuddy（办公自动化）、Copilot 类工具。"
  },
  {
    id: "roles",
    icon: "🎭",
    name: "AI 扮演的角色与功能",
    oneLiner: "同一套模型，可以是助手、副驾、代理、顾问、创作者——角色不同，你的用法也不同。",
    def: "AI 不是只有『聊天机器人』一种样子。根据参与度从低到高，它能在工作里扮演不同角色。看懂这些角色，才知道什么任务该交给哪个（见模块一模型 / 模块三 Agent）。",
    layer: "认知框架 · 怎么用 AI",
    takeaway: "先想清楚『我要 AI 当什么角色』，再选工具——角色选错，再强的模型也别扭。",
    sections: [
      { h: "💬 助手 Assistant", p: "问答式：你问它答。适合查资料、答疑、闲聊。例：ChatGPT / 豆包日常对话。" },
      { h: "🧑‍✈️ 副驾 Copilot", p: "人机协作：你在 App 里干活，它给建议 / 补全，你保有决策权。例：IDE 代码补全、Office 改写、Copilot Studio。" },
      { h: "🤖 代理 Agent", p: "自主执行：你给目标，它自己规划 + 动手 + 交付。例：Manus、Claude Code、WorkBuddy。" },
      { h: "🧠 顾问 Advisor", p: "分析建议：给方案、做对比、出报告，你拍板。例：Perplexity 深度研究、Claude 长文档分析。" },
      { h: "🎨 创作者 Creator", p: "生成内容：写文章、画图、做视频、产代码。例：豆包 / 海螺多模态、Algorithmic Art Skill。" },
      { h: "🧭 怎么选角色", p: "要快答→助手；要边干边帮→副驾；要甩手交付→代理；要决策依据→顾问；要产出物→创作者。一个复杂项目里，这五种角色往往同时上场。" }
    ],
    related: "关联：概念 Agent（与 Copilot 的区别）、模块三各类 Agent 按角色归类。"
  }
];

// ============ 模块四-B：进阶延展（11 个内容模块，跳出具体产品做主题深化） ============
// kind: "compare" 对照表 / "flow" 全景流 / "timeline" 时间线 / "persona" 性格卡 / 缺省=多维度小节
const EXTENSIONS = [
  {
    id: "compare", icon: "⚖️", name: "Prompt / Skill / MCP / Agent 怎么选",
    oneLiner: "四个概念最容易混。一张表说清『谁解决什么问题』，该用哪个。",
    def: "这几个词常被一起提，但层次完全不同：Prompt 是『怎么跟 AI 说话』，Skill 是『把话术固化复用』，MCP 是『让 AI 连上外部工具』，Agent 是『让 AI 自己动手干活』。选错层，问题就解决不了。",
    layer: "概念辨析 · 选型地图",
    takeaway: "按『我要解决什么』倒推：说话→Prompt；复用→Skill；连接→MCP；执行→Agent。",
    kind: "compare",
    compare: {
      headers: ["维度", "Prompt", "Skill", "MCP", "Agent"],
      rows: [
        { k: "解决什么", v: ["怎么下达指令", "怎么复用方法论", "怎么连接外部系统", "怎么自主完成任务"] },
        { k: "所在层", v: ["最底层入口", "提示/知识层", "集成层", "执行层"] },
        { k: "谁来做", v: ["你写", "你封装/系统自动匹配", "开发者搭建", "AI 自主跑循环"] },
        { k: "典型产物", v: ["一段指令", "可复用技能包", "工具接口", "完成的工作"] },
        { k: "举个例子", v: ["『写 5 个小红书标题』", "『用 Internal Comms 写周报』", "『连上日历/邮箱』", "『Manus 整理我的邮件』"] }
      ]
    },
    related: "关联：概念页五个概念逐一讲解；模块三 Agent 是它们的『集大成者』。"
  },
  {
    id: "benchmark", icon: "📊", name: "AI 评测 / Benchmark 怎么读",
    oneLiner: "厂商跑分看着吓人，但『数字高』≠『你好用』。看懂评测的套路。",
    def: "Benchmark 是给 AI 出的『标准化考卷』，用来横向比较能力。但分数很容易被『刷题』（针对榜单训练）抬高，且和你真实场景未必相关。",
    layer: "认知工具 · 别被营销带跑",
    takeaway: "看分看『测了什么』和『像不像你的活』，别只看一个数。",
    sections: [
      { h: "📝 常见榜单", list: [
        "MMLU / MMLU-Pro：多学科知识选择题，测『知识面』",
        "Humanity's Last Exam：极难综合推理，测『人类极限外』能力",
        "SWE-bench：真实 GitHub Issue 修 bug，测『编程实战』（Claude ~64-69%、DeepSeek 80%+）",
        "MATH-500：竞赛数学，测『硬核推理』（DeepSeek 96.8%）",
        "GPQA：研究生级科学问答"
      ] },
      { h: "🕳️ 常见陷阱", list: [
        "『刷榜』：针对榜单数据训练，分数虚高",
        "『总分高』但你的场景只占一小块，体验未必好",
        "不同版本/设置下分数差很多，别拿旧榜当现在",
        "中文/本地化能力常不在国际榜单里，国产模型需另看"
      ] },
      { h: "🧭 怎么读分", p: "先问『这榜测的是我关心的活吗』；再看是否多榜一致；最后看『官方 demo 实际用起来』。本站点模型卡片的『优势/短板』已做人工归纳，比单看分数更贴近使用。" }
    ],
    related: "关联：模块一各模型 strengths 里引用了具体榜单数字。"
  },
  {
    id: "rag", icon: "🧩", name: "RAG / 微调 / 蒸馏：三个进阶概念",
    oneLiner: "想让 AI『懂你家的业务』，靠这三招：检索增强、微调、蒸馏。",
    def: "当通用大模型不够用时，工程师有三把钥匙：RAG（外挂知识库）、微调（改模型权重）、蒸馏（大模型教小模型）。它们解决『知识更新 / 专属能力 / 成本』三类问题。",
    layer: "进阶概念 · 真要落地才用",
    takeaway: "要『新知识』用 RAG，要『新能力』用微调，要『低成本』用蒸馏。",
    sections: [
      { h: "📚 RAG（检索增强生成）", p: "让 AI 先去你的文档库『查资料』再回答，知识实时更新、数据不出域。Dify/Coze 知识库底层就是它。适合『问答基于私有文档』。" },
      { h: "🎯 微调 Fine-tuning", p: "用你的数据继续训练模型，把『专属风格/能力』写进权重。成本高、需数据，适合『要模型本身具备某能力』（如特定语气、专业判断）。" },
      { h: "🪶 蒸馏 Distillation", p: "用大模型产出的结果去训练小模型，让小模型『接近大模型效果但更便宜更快』。端侧/低成本部署常用（如小模型跑在手机）。" },
      { h: "🧭 怎么选", list: ["知识常变→RAG", "要专属能力且数据稳→微调", "要大模型效果但压成本→蒸馏", "三者可组合：RAG+微调+蒸馏并存"] }
    ],
    related: "关联：概念 MCP（连数据）、模块三 Dify/Coze（RAG 平台）。"
  },
  {
    id: "security", icon: "🔒", name: "安全与隐私：你的数据去哪了",
    oneLiner: "AI 越强，越要搞清楚『我的数据会不会被偷看 / 泄露』。",
    def: "用云端 AI，你的输入通常会离开本机。理解『数据怎么流动』，才知道什么场景能用、什么要小心、什么必须私有化。",
    layer: "必知 · 用 AI 的底线意识",
    takeaway: "公开模型别说秘；敏感数据走私有化/本地；看清厂商隐私条款。",
    sections: [
      { h: "🌐 数据怎么出域", p: "云端对话默认传去厂商服务器（用于推理，部分用于训练，可在设置关）。公开聊天别含密码、密钥、个人隐私、商业机密。" },
      { h: "🏠 私有化 / 本地", list: [
        "Dify、Qoder CN 可自托管，数据不出企业内网",
        "DeepSeek/MiMo/Qwen 等开源权重可本地跑（Ollama/vLLM）",
        "OpenClaw/Hermes 自托管，完全掌控",
        "WorkBuddy 本地文件读写，但需留意同步范围"
      ] },
      { h: "⚠️ 风险与对策", list: [
        "提示注入：别让 AI 执行来源不明的指令（尤其接了 MCP 工具时）",
        "最小权限：MCP 连接只授权必要范围",
        "合规：金融/政务等选国产合规部署（见 Qoder CN）",
        "脱敏：上传文档前去掉敏感字段"
      ] }
    ],
    related: "关联：概念 MCP（连接需鉴权）、模块三 Dify/Qoder CN/OpenClaw（私有化）。"
  },
  {
    id: "endtoend", icon: "🔗", name: "端到端全景流程图",
    oneLiner: "把『你 → Agent → Skill → MCP → 模型 → Token → 结果』串成一张图。",
    def: "前面分别讲了模型、概念、Agent。这一张图把它们串成一次完整任务的全过程：你下指令，Agent 接手，Skill 补方法论，MCP 连工具，模型靠 Token 推理，最终交付结果。点图里各环节，回想对应概念。",
    layer: "总览 · 把全站串成网",
    takeaway: "一次『帮我干活』背后是整条链：人定目标，Agent 执行，Skill/MCP 是手脚，Token 是燃料。",
    kind: "flow",
    related: "关联：概念页五个概念、模块三 Agent、本页其他延展。"
  },
  {
    id: "timeline", icon: "🕰️", name: "AI 发展时间线",
    oneLiner: "从 2017 Transformer 到 2026 Agent 元年，一张图看懂来时路。",
    def: "AI 不是突然火的。关键节点串起来，能帮你理解『为什么现在是 Agent 时代』。",
    layer: "历史坐标 · 看懂趋势来源",
    takeaway: "Transformer 奠基 → ChatGPT 出圈 → Agent 接管执行，能力一步步从『懂』到『干』。",
    kind: "timeline",
    timeline: [
      { y: "2017", t: "Transformer 架构提出", d: "Google 论文《Attention Is All You Need》，奠定现代大模型基础。" },
      { y: "2018-19", t: "BERT / GPT-2", d: "预训练语言模型成熟，『理解』能力跃升。" },
      { y: "2020", t: "GPT-3（1750 亿参数）", d: "少样本学习惊艳，『提示词』开始重要。" },
      { y: "2022-11", t: "ChatGPT 上线", d: "对话式 AI 破圈，全民可用，引爆 AIGC 浪潮。" },
      { y: "2023", t: "GPT-4 / 多模态 / 插件", d: "能力大幅增强，开始连外部工具。" },
      { y: "2024-11", t: "MCP 协议发布", d: "Anthropic 提出统一连接标准，Agent 生态提速。" },
      { y: "2025", t: "DeepSeek 开源 / Vibe Coding", d: "强模型开源拉低门槛；『氛围编程』流行，Agent 进入日常开发。" },
      { y: "2026", t: "Agent 元年", d: "重心从『回答』转『完成』，自主 Agent 与多模态全面落地。" }
    ],
    related: "关联：模块一模型、模块三 Agent、洞察『未来趋势』。"
  },
  {
    id: "persona", icon: "🎭", name: "模型『性格』拟人卡",
    oneLiner: "同一道题，不同模型答得『气质』不同。给它们贴个标签，选起来不纠结。",
    def: "模型没有真性格，但训练数据和定位让它们各有『风格』。用统一维度描述，降低选型焦虑——你不是在选『最聪明』，是在选『最合你味』。",
    layer: "选型直觉 · 把参数变成感受",
    takeaway: "要稳选 Claude/GLM，要便宜选 DeepSeek/Qwen，要中文灵选豆包，要长文选 Kimi。",
    kind: "persona",
    personas: [
      { id: "claude", style: "严谨工程师", say: "『我先把边界和验收写清楚，再动手。』" },
      { id: "gpt", style: "全能老好人", say: "『啥都能聊，给你个均衡方案。』" },
      { id: "deepseek", style: "性价比学霸", say: "『数学代码我强，还免费可自部署。』" },
      { id: "doubao", style: "活泼段子手", say: "『小红书文案我拿手，语气我包了。』" },
      { id: "kimi", style: "安静书虫", say: "『几十万字我慢慢读，给你摘要。』" },
      { id: "glm", style: "公文笔杆子", say: "『中文最地道，结构我帮你理。』" },
      { id: "gemini", style: "科学极客", say: "『看图听音做实验，我快又准。』" },
      { id: "qwen", style: "国产万金油", say: "『Agent/编程/办公我都能搭。』" },
      { id: "grok", style: "毒舌时事咖", say: "『实时热点我最快，X 上的瓜我替你吃。』" },
      { id: "hunyuan", style: "生态连接器", say: "『微信/企微/腾讯文档我都能接，办公就找我。』" },
      { id: "minimax", style: "多模态玩家", say: "『文/图/音/视频我都能生，长文本也不怕。』" },
      { id: "mimo", style: "端侧全能娃", say: "『手机/座舱里我也能跑，MIT 开源随便用。』" }
    ],
    related: "关联：模块一 12 个模型的『选型建议』。"
  },
  {
    id: "industry", icon: "🏭", name: "AI 落地行业图谱",
    oneLiner: "教育/医疗/法律/电商/制造，各自怎么用 AI？每个行业链回具体 Agent。",
    def: "AI 不是悬浮的技术，它正嵌进每个行业的工作流。下面按行业拆解『典型用法 + 对应工具』。",
    layer: "落地视角 · 看见真实场景",
    takeaway: "每个行业都在『用 AI 重写工作流』，重点是找到你行业里可自动化的那一段。",
    sections: [
      { h: "🎓 教育", list: ["个性化答疑 / 出题（豆包、Kimi）", "课件与讲义生成（PPTX Skill）", "批改与学情分析（Claude 长文）"] },
      { h: "🏥 医疗", list: ["文献与指南检索（Perplexity）", "影像/报告辅助（需合规私有化）", "患者沟通话术（需脱敏）"] },
      { h: "⚖️ 法律", list: ["合同审查 / 条款抽取（PDF Processing Skill）", "案例检索（Kimi 长文）", "文书起草（GLM 公文）"] },
      { h: "🛒 电商", list: ["商品文案 / 短视频脚本（豆包）", "客服 bot（Coze）", "选品与评论分析（Manus）"] },
      { h: "🏗️ 制造", list: ["设备文档问答（Dify 知识库）", "质检图像分析（多模态模型）", "排产与工单（WorkBuddy/Coze）"] }
    ],
    related: "关联：模块三各类 Agent 按行业对号入座。"
  },
  {
    id: "ecosystem", icon: "🌍", name: "开源 vs 闭源 / 中美模型生态",
    oneLiner: "为什么有的模型能下载自己跑，有的只能联网用？生态差异在哪？",
    def: "AI 模型分『开源（权重公开，可自部署）』与『闭源（厂商托管，API 调用）』；中美在大模型生态上也走了不同路线。理解差异，才能理解『为什么要有国产模型』。",
    layer: "格局视角 · 看清供给端",
    takeaway: "开源重可控/低成本，闭源重省心/强能力；国产模型补的是『自主可控』这一环。",
    sections: [
      { h: "🔓 开源", list: [
        "DeepSeek / Qwen / GLM / MiniMax / MiMo 等国产开源",
        "优点：可私有化、可改、成本低、数据不出域",
        "代价：需一定工程力部署与运维",
        "适合：企业自托管、研究者、隐私敏感场景"
      ] },
      { h: "🔒 闭源", list: [
        "GPT / Claude / Gemini / Grok / 豆包 / 混元等",
        "优点：开箱即用、能力强、持续更新",
        "代价：按量付费、数据上云、受厂商策略影响",
        "适合：个人日常、快速验证、不想运维"
      ] },
      { h: "🇨🇳🇺🇸 中美生态差异（技术商业视角）", list: [
        "美国：GPT/Claude/Gemini 三强领跑，生态与资本强",
        "中国：国产军团在性价比、中文、合规上差异化",
        "『自主可控』是国产模型核心诉求：数据主权、供应安全",
        "同任务可『国产替代』，且成本常更低"
      ] }
    ],
    related: "关联：模块一模型 type 字段（开源/闭源）、对比矩阵工具。"
  },
  {
    id: "ethics", icon: "⚖️", name: "AI 伦理与对齐",
    oneLiner: "AI 会一本正经胡说、会有偏见、能造假。负责任使用，先懂风险。",
    def: "能力越强，越要守住边界。AI 的几类典型风险——幻觉、偏见、深度伪造——以及我们怎么负责任地使用它。",
    layer: "责任视角 · 用得安心",
    takeaway: "关键事实交叉验证、敏感决策人拍板、不拿 AI 当权威，是对齐的基本功。",
    sections: [
      { h: "🌀 幻觉 Hallucination", p: "AI 会编造看似合理的错内容。对策：关键事实让它『给来源』并交叉验证（如 Perplexity）；别把 AI 当权威，当『需核实的助手』。" },
      { h: "⚖️ 偏见 Bias", p: "训练数据带社会偏见，输出可能不公。对策：明确约束『中立、尊重』，重要场景人工复核。" },
      { h: "🎭 深度伪造 Deepfake", p: "换脸/拟声可造假。对策：不传播未核实音视频，用 AI 检测工具，遵守法律底线。" },
      { h: "🧭 负责任使用", list: ["敏感/高危决策人把关", "标注 AI 生成内容，不冒充真人", "保护隐私，不喂机密", "遵守平台与法律规则"] }
    ],
    related: "关联：洞察『职业替代』（人的判断更值钱）、概念 Token（成本与滥用）。"
  },
  {
    id: "action", icon: "✅", name: "普通人行动清单：10 条不被落下",
    oneLiner: "焦虑没用，行动有用。给『不想被 AI 替代』的你，10 条可马上做。",
    def: "把『职业替代』的担忧落成动作。这 10 条不需要你会编程，今天就能开始。",
    layer: "行动指南 · 从知道到做到",
    takeaway: "每天用一点 AI，把重复活交给它，把自己升级成『会指挥 AI 的人』。",
    sections: [
      { h: "🚀 10 条马上做", list: [
        "1. 选一个主力模型（如豆包/GPT）当日常助手，每天用",
        "2. 学写 Prompt：角色+任务+格式，记 3 个常用模板",
        "3. 用 Agent（Coze/WorkBuddy）自动化一件重复事",
        "4. 装一个 Skill（如 XLSX/PPTX）处理表格和汇报",
        "5. 把『查资料』交给 Perplexity，自己只做判断",
        "6. 试一次 Vibe Coding，让 AI 帮你做个小工具",
        "7. 用 AI 做『第二大脑』：整理笔记/摘要（Kimi/GLM）",
        "8. 关注本行业 AI 用法，找可自动化的那段工作",
        "9. 提升不可替代力：审美、判断、沟通、责任",
        "10. 教身边人用 AI，教学相长"
      ] },
      { h: "🧠 心态", p: "别和 AI 比『谁记得多、写得多』，要比『谁会提需求、做判断、负责任的决策』。你是指挥，它是兵。" }
    ],
    related: "关联：洞察『职业替代与机遇』『Vibe Coding』『角色与功能』。"
  }
];

// ============ 工具箱（5 个交互工具） ============
// 价格单位：估算 ≈ USD / 百万 token（仅作横向比较；国产模型官方定价常为 ¥ 且常免费）
const TOOLS = {
  // ① 选型决策器
  selector: {
    steps: [
      { id: "task", q: "你主要想让 AI 帮你做什么？", opts: [
        { t: "写文案 / 做内容", tag: "content" },
        { t: "写代码 / 做开发", tag: "code" },
        { t: "查资料 / 做研究", tag: "research" },
        { t: "办公 / 自动化", tag: "office" },
        { t: "啥都要（通用）", tag: "all" }
      ] },
      { id: "budget", q: "你的预算？", opts: [
        { t: "免费优先", tag: "free" },
        { t: "性价比（便宜大碗）", tag: "cheap" },
        { t: "不差钱（要最强）", tag: "best" }
      ] },
      { id: "code", q: "你会编程吗？", opts: [
        { t: "不会", tag: "nocode" },
        { t: "会一点", tag: "some" },
        { t: "熟练", tag: "pro" }
      ] },
      { id: "data", q: "数据敏感吗（机密 / 隐私）？", opts: [
        { t: "是，要私有化", tag: "private" },
        { t: "否，能用云端", tag: "cloud" }
      ] }
    ]
  },
  // ② Token / 成本计算器（估算单价）
  pricing: [
    { id: "gpt", name: "GPT-5.5/5.6", perM: 10 },
    { id: "claude", name: "Claude Opus 4.7/4.8", perM: 15 },
    { id: "gemini", name: "Gemini 3.1 Pro", perM: 0.3 },
    { id: "grok", name: "Grok", perM: 5 },
    { id: "deepseek", name: "DeepSeek V4", perM: 0.2 },
    { id: "qwen", name: "通义千问 Qwen3", perM: 0.6 },
    { id: "doubao", name: "豆包 Seed 2.0", perM: 0 },
    { id: "glm", name: "智谱 GLM-5.1", perM: 1.2 },
    { id: "kimi", name: "Kimi k2", perM: 0.8 },
    { id: "hunyuan", name: "腾讯混元", perM: 0 },
    { id: "minimax", name: "MiniMax M3", perM: 1.0 },
    { id: "mimo", name: "小米 MiMo-V2.5", perM: 0.8 }
  ],
  // ④ 提示词模板库
  prompts: [
    { cat: "✍️ 文案创作", items: [
      { title: "小红书标题", text: "你是有 10 年经验的运营。帮我写 5 个小红书标题，受众 25 岁女性，风格活泼，并说明每个的差异。" },
      { title: "朋友圈文案", text: "用口语化、有温度的方式，写一条朋友圈文案，主题是『周末去爬山』，带一点小感悟，不超过 40 字。" },
      { title: "短视频脚本", text: "写一个 30 秒抖音口播脚本，主题『AI 真能帮写周报吗』，开头 3 秒抓人，结尾引导点赞。" }
    ] },
    { cat: "💻 编程开发", items: [
      { title: "代码审查", text: "你是资深工程师。请审查下面这段代码，指出潜在 bug、性能与安全问题，并给出修改建议：[贴代码]" },
      { title: "补测试用例", text: "为下面这个函数写单元测试（覆盖正常、边界、异常三种情况），用项目现有测试框架：[贴函数]" },
      { title: "解释陌生代码", text: "用通俗语言解释这段代码在做什么、关键逻辑是什么，并举一个调用示例：[贴代码]" }
    ] },
    { cat: "📊 办公效率", items: [
      { title: "周报（3P）", text: "用 Internal Comms 的 3P 模板（Progress/Plans/Problems）帮我写本周周报，要点：完成登录模块、下周做支付、卡点是联调环境。" },
      { title: "会议纪要", text: "把下面会议记录整理成纪要：结论、待办、负责人、截止时间，用表格呈现：[贴记录]" },
      { title: "邮件润色", text: "把下面这封中文邮件改成专业、礼貌、简洁的英文商务邮件，保持原意：[贴邮件]" }
    ] },
    { cat: "🔬 研究分析", items: [
      { title: "文献摘要", text: "用 3 句话总结这篇论文的核心贡献、方法、局限，并用『小白能懂』的话解释它的意义：[贴摘要]" },
      { title: "竞品分析", text: "对比 A 和 B 两个产品，从功能、价格、人群、优缺点四个维度做表格，并给出选型建议。" }
    ] }
  ],
  // ⑤ 学习路线图
  roadmap: [
    { stage: "🌱 新手村", desc: "先让 AI 成为日常助手，学会把需求说清楚。", tips: ["选一个主力模型每天用", "学写 Prompt：角色+任务+格式", "试模型卡片里的『使用心法』"], go: "去模型模块 →" },
    { stage: "🌿 进阶", desc: "把重复活交给 Agent，用 Skill 提效。", tips: ["用 Coze/WorkBuddy 自动化一件重复事", "装 XLSX/PPTX/Internal Comms 等 Skill", "把『查资料』交给 Perplexity"], go: "去 Agent 模块 →" },
    { stage: "🌳 高阶", desc: "让 AI 帮你『造东西』，进入 Vibe Coding。", tips: ["用 Cursor/Claude Code 做一次小项目", "试 Qoder CN 的 Quest 模式", "用 Dify/Coze 搭自己的知识库 bot"], go: "去 Vibe Coding 洞察 →" },
    { stage: "🏔️ 专家", desc: "私有化部署、编排多 Agent，成为『指挥者』。", tips: ["自托管开源模型（DeepSeek/MiMo）", "用 CrewAI 编排多 Agent 协作", "学 MCP 把业务系统接进来"], go: "去安全/生态延展 →" }
  ]
};

/* ===================== 模块七：AI 知识库 / PKM ===================== */
const KNOWLEDGES = [
  {
    id: "yuque",
    name: "语雀",
    vendor: "阿里",
    country: "cn",
    kind: "pkm",
    badge: "团队文档知识库",
    summary: "阿里出品的在线文档与知识库，结构化文档 + 知识库空间，国内团队协作常用。",
    forWhom: "需要沉淀团队文档、产品/研发 wiki 的中小团队。",
    features: ["结构化文档树 + 知识库空间，适合团队沉淀", "支持思维导图、表格、画板多种载体", "可与钉钉等打通，权限管理细"],
    mcp: "可把语雀文档作为知识源，通过开放 API 接 MCP 喂给 Agent 问答。",
    site: "https://www.yuque.com",
    price: "个人免费版可用，团队版按席位订阅",
    note: "重『文档结构』而非『双向链接』，个人 PKM 自由度不如 Obsidian。"
  },
  {
    id: "feishu",
    hot: true,
    name: "飞书知识库",
    vendor: "字节跳动",
    country: "cn",
    kind: "pkm",
    badge: "协作文档 + 知识库",
    summary: "飞书文档/知识库一体，文档、表格、多维表格打通，企业协作首选。",
    forWhom: "已用飞书办公、想在一个平台沉淀知识的企业。",
    features: ["文档/多维表格/知识库打通，信息不孤岛", "搜索与权限强，企业知识集中管理", "妙记可把会议录音转成可检索笔记"],
    mcp: "飞书开放平台提供文档/多维表格 MCP，Agent 能直接读写飞书知识。",
    site: "https://www.feishu.cn",
    price: "飞书基础功能免费，高级套件付费",
    note: "强在『协作与打通』，个人轻量笔记稍重。"
  },
  {
    id: "tdoc",
    name: "腾讯文档 AI",
    vendor: "腾讯",
    country: "cn",
    kind: "pkm",
    badge: "在线文档 + AI",
    summary: "腾讯文档内置 AI，能写、能总结、能问答，轻量协作够用。",
    forWhom: "习惯微信/QQ 生态、要轻量在线文档+AI 的人。",
    features: ["多人实时协作，微信里直接打开", "AI 帮你写、扩写、总结、翻译", "表格/收集表/智能表齐全"],
    mcp: "可通过腾讯文档开放 API 接 MCP，让 Agent 读写表格与文档。",
    site: "https://docs.qq.com",
    price: "免费可用，AI 权益部分需会员",
    note: "轻量好上手，重型知识库管理能力弱于语雀/飞书。"
  },
  {
    id: "wps",
    name: "WPS AI",
    vendor: "金山",
    country: "cn",
    kind: "pkm",
    badge: "办公套件 AI",
    summary: "WPS 文字/表格/演示内置 AI，写公文、做 PPT、处理表格一站式。",
    forWhom: "重度依赖 Office 文档、要国产化办公套件的人。",
    features: ["AI 写作/改写/总结嵌入 WPS 全家桶", "一键生成 PPT 大纲与排版", "本土化模板丰富，公文场景强"],
    mcp: "WPS 开放接口可接业务系统，文档处理类 Agent 常用作执行端。",
    site: "https://www.wps.cn",
    price: "WPS 会员 + AI 权益包",
    note: "胜在『Office 兼容 + 国产』，知识库属性弱，偏办公执行。"
  },
  {
    id: "wolai",
    name: "Wolai 我来",
    vendor: "我来科技",
    country: "cn",
    kind: "pkm",
    badge: "双向链接笔记",
    summary: "国产 Notion + Roam 融合体，块编辑 + 双向链接，个人 PKM 体验顺滑。",
    forWhom: "想要双向链接、块编辑，又偏好国内服务的个人用户。",
    features: ["块编辑器 + 双向链接 + 关系图谱", "模板中心丰富，搭建个人 wiki 快", "界面现代，移动端体验好"],
    mcp: "可导出/API 同步，作为个人知识底座接 Agent（社区有第三方接法）。",
    site: "https://www.wolai.com",
    price: "免费版有限额，会员解锁高级块",
    note: "体验接近国外双链工具，但生态与插件不如 Obsidian 丰富。"
  },
  {
    id: "ima",
    hot: true,
    name: "IMA",
    vendor: "腾讯",
    country: "cn",
    kind: "ai-native",
    badge: "AI 知识库 + 笔记",
    summary: "腾讯 IMA 主打『喂资料→问 IMA』，把你的文档/网页变成可对话的知识库。",
    forWhom: "想建个人/团队 AI 知识库、用自然语言查自己资料的人。",
    features: ["上传文档/网页/笔记，AI 基于私域资料问答", "有 PC/小程序，微信里也能问", "支持共享知识库，团队协作"],
    mcp: "本身就是 RAG 知识库形态，可看作『给 Agent 喂私域知识的现成入口』。",
    site: "https://ima.qq.com",
    price: "目前免费可用",
    note: "最贴近『个人 AI 知识库』的产品形态，和本站点 MCP/RAG 概念直接呼应。"
  },
  {
    id: "tongyi",
    name: "通义·资料库",
    vendor: "阿里",
    country: "cn",
    kind: "ai-native",
    badge: "AI 资料库",
    summary: "通义千问旗下的资料库，上传文件后让大模型基于你的资料对话、总结。",
    forWhom: "阿里通义生态用户，想把资料集中管理并问答的人。",
    features: ["上传 PDF/文档/网页，AI 总结与问答", "与通义千问对话无缝衔接", "支持长文档与多文件管理"],
    mcp: "可视为 RAG 入口，资料经向量化后供模型检索（通义生态内闭环）。",
    site: "https://tongyi.aliyun.com",
    price: "通义免费额度可用",
    note: "和 IMA 思路一致，绑定通义模型，跨模型灵活度低。"
  },
  {
    id: "yuanbao",
    name: "元宝·资料库",
    vendor: "腾讯",
    country: "cn",
    kind: "ai-native",
    badge: "AI 资料库",
    summary: "腾讯元宝内置资料库，上传文件后让元宝基于你的私域内容对话。",
    forWhom: "用元宝做日常助手、想让它记住自己资料的人。",
    features: ["上传文档让元宝基于资料回答", "与元宝对话/搜索打通", "移动端体验好，微信生态便捷"],
    mcp: "资料库即 RAG，可作为 Agent 的私域知识源（腾讯生态内）。",
    site: "https://yuanbao.tencent.com",
    price: "免费可用",
    note: "入口轻，重度知识管理不如专业 PKM 工具。"
  },
  {
    id: "obsidian",
    hot: true,
    name: "Obsidian",
    vendor: "Obsidian",
    country: "us",
    kind: "pkm",
    badge: "本地双链笔记",
    summary: "纯本地 Markdown 笔记，双向链接 + 关系图谱，数据完全自己掌控。",
    forWhom: "重视数据主权、爱折腾插件、做长期个人知识库的人。",
    features: ["本地 Markdown 文件，离线可用、永不过期", "双向链接 + 图谱视图，知识网络清晰", "插件生态极丰富（含 Copilot/智能插件）"],
    mcp: "可装本地 MCP 插件，把笔记当知识库喂给 Claude/本地模型做 RAG。",
    site: "https://obsidian.md",
    price: "个人免费，商业版/同步服务付费",
    note: "自由度最高，但上手需折腾；是『第二大脑』流派代表。"
  },
  {
    id: "logseq",
    name: "Logseq",
    vendor: "Logseq",
    country: "us",
    kind: "pkm",
    badge: "开源双链大纲",
    summary: "开源大纲式双链笔记，块引用 + 本地优先，隐私友好。",
    forWhom: "偏好大纲式思考、要开源/本地优先的用户。",
    features: ["大纲块编辑 + 双向链接，结构强", "完全本地/开源，隐私可控", "支持闪卡复习，偏『知识管理+学习』"],
    mcp: "本地数据库可被脚本/插件接出，作为 Agent 的私有知识源。",
    site: "https://logseq.com",
    price: "开源免费",
    note: "大纲流派的 Roam 开源替代，适合爱折腾的极客。"
  },
  {
    id: "notion",
    hot: true,
    name: "Notion",
    vendor: "Notion",
    country: "us",
    kind: "pkm",
    badge: "数据库 + AI 笔记",
    summary: "块编辑器 + 数据库全能工作区，Notion AI 能写能总结，团队与个人通吃。",
    forWhom: "要『文档+数据库+项目管理』一站式的人/团队。",
    features: ["块编辑 + 多维数据库，搭系统灵活", "Notion AI 写作/问答/自动填充", "模板市场庞大，协作能力强"],
    mcp: "Notion 官方提供 MCP，Agent 可直接读写页面与数据库。",
    site: "https://www.notion.so",
    price: "免费版可用，AI 与团队功能付费",
    note: "万能工作区，但本地数据主权弱、离线差；AI 需另购。"
  },
  {
    id: "roam",
    hot: true,
    name: "Roam Research",
    vendor: "Roam",
    country: "us",
    kind: "pkm",
    badge: "块引用始祖",
    summary: "双链笔记的『祖师爷』，块引用 + 每日笔记，学术/研究流偏好。",
    forWhom: "做研究、重连接思考、愿为工具付费的人。",
    features: ["块级引用，知识互联最彻底", "每日笔记 + 双向链接原生", "Graph 视图呈现思想网络"],
    mcp: "可通过社区脚本导出，作为研究型知识源接 Agent。",
    site: "https://roamresearch.com",
    price: "订阅制，偏贵",
    note: "理念开创者，但价格高、本土化弱，已被 Logseq/Obsidian 分流。"
  },
  {
    id: "mem",
    name: "Mem.ai",
    vendor: "Mem",
    country: "us",
    kind: "ai-native",
    badge: "AI 原生笔记",
    summary: "为 AI 而生：你只管记，它自动关联、整理、帮你回忆。",
    forWhom: "想要『记完不用整理』的轻量知识捕获者。",
    features: ["AI 自动关联相关笔记，免手动链接", "智能搜索/回忆，问 Mem 就能找到", "极简捕获，弱化文件夹结构"],
    mcp: "AI 自动关联本质就是 RAG，可看作『隐式知识库』。",
    site: "https://mem.ai",
    price: "订阅制",
    note: "最『AI-native』的笔记，但结构化能力弱、锁定性强。"
  },
  {
    id: "reflect",
    name: "Reflect",
    vendor: "Reflect",
    country: "us",
    kind: "ai-native",
    badge: "AI 笔记 + 反向链接",
    summary: "极简双链笔记，AI 帮你生成反向链接、转写、总结。",
    forWhom: "要干净写作体验 + 智能链接的轻量用户。",
    features: ["AI 自动建议反向链接，省手动", "端到端加密，隐私友好", "日历/书签集成，捕获顺畅"],
    mcp: "可通过 API 同步，作为知识源喂 Agent。",
    site: "https://reflect.app",
    price: "订阅制，有免费档",
    note: "体验精致，但功能深度不如 Obsidian，偏写作流。"
  },
  {
    id: "tana",
    name: "Tana",
    vendor: "Tana",
    country: "us",
    kind: "ai-native",
    badge: "超块 AI 工作区",
    summary: "『超级块』结构 + AI 指令，把笔记变成可查询的知识操作系统。",
    forWhom: "想要结构化、可检索、AI 驱动知识系统的人。",
    features: ["超级块（Supertag）灵活建模知识", "AI 指令即时生成内容/查询", "大纲 + 数据库融合，强于检索"],
    mcp: "结构化数据天然适合接 Agent 做 RAG。",
    site: "https://tana.inc",
    price: "订阅制",
    note: "概念先进但学习曲线陡，仍在快速演进。"
  },
  {
    id: "dify",
    hot: true,
    name: "Dify",
    vendor: "LangGenius",
    country: "us",
    kind: "rag",
    badge: "开源 LLMOps 平台",
    summary: "开源 Agent/RAG 平台，可视化搭工作流，知识库 RAG 开箱即用。",
    forWhom: "想自己搭 AI 应用、私有化知识库的开发/团队。",
    features: ["可视化工作流 + 知识库 RAG 一体化", "开源可自托管，数据可控", "模型/工具/MCP 插件丰富"],
    mcp: "本身就是 MCP 生态玩家，知识库即 RAG 后端，Agent 可直接调用。",
    site: "https://dify.ai",
    price: "开源免费，云服务按量",
    note: "搭建私有知识库 bot 的『标配』，呼应本站点 RAG/MCP 概念。"
  },
  {
    id: "fastgpt",
    name: "FastGPT",
    vendor: "FastGPT",
    country: "cn",
    kind: "rag",
    badge: "国产知识库 AI",
    summary: "国内开源知识库问答平台，文档喂进去就能产出专属 AI 客服/助手。",
    forWhom: "要国内合规、中文知识库问答的团队。",
    features: ["中文文档解析强，知识库问答开箱即用", "可视化编排 + 工作流", "支持私有化部署"],
    mcp: "提供 API/MCP，可作为企业 Agent 的知识中枢。",
    site: "https://fastgpt.io",
    price: "开源免费，云服务付费",
    note: "国内落地知识库应用的高频选择。"
  },
  {
    id: "anythingllm",
    name: "AnythingLLM",
    vendor: "Mintplex",
    country: "us",
    kind: "rag",
    badge: "桌面级 RAG",
    summary: "开源桌面/服务端 RAG 客户端，把本地文件变成可对话的私有知识库。",
    forWhom: "想本地跑、数据不出机、自建知识库的人。",
    features: ["本地优先，文档/网页/YouTube 都能喂", "多模型后端，隐私可控", "桌面版零部署门槛"],
    mcp: "原生 RAG 客户端，是『给本地模型接私域知识』的现成方案。",
    site: "https://anythingllm.com",
    price: "开源免费",
    note: "隐私党的轻量 RAG 首选，企业级能力弱于 Dify。"
  },
  {
    id: "maxkb",
    name: "MaxKB",
    vendor: "MaxKB",
    country: "cn",
    kind: "rag",
    badge: "开箱知识库",
    summary: "国产开源知识库问答，专注企业级文档问答与智能客服。",
    forWhom: "要快速搭建企业知识库/智能客服的团队。",
    features: ["开箱即用文档问答，中文优化", "支持多种模型后端", "可嵌入网站/工单系统"],
    mcp: "API 可接业务系统，作 Agent 知识后端。",
    site: "https://maxkb.cn",
    price: "开源免费",
    note: "定位企业知识库，部署简单。"
  },
  {
    id: "ragflow",
    name: "RAGFlow",
    vendor: "InfiniFlow",
    country: "cn",
    kind: "rag",
    badge: "深度文档 RAG",
    summary: "开源 RAG 引擎，强在复杂格式文档解析（PDF/表格/扫描件）的精准切分。",
    forWhom: "文档类型杂、要高精度检索的开发者/团队。",
    features: ["深度文档理解，表格/版式还原好", "可解释引用，答案有出处", "开源可私有化"],
    mcp: "作为 RAG 检索后端接 Agent，补给『带出处的答案』。",
    site: "https://ragflow.com",
    price: "开源免费",
    note: "复杂文档 RAG 的强手，偏技术向。"
  }
];
