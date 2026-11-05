export type EventStatus = 'open' | 'upcoming' | 'concluded'

export interface HackathonEvent {
  slug: string
  code: string
  organizer: string
  name: string
  nameZh: string
  description: string
  descriptionZh: string
  dates: string
  datesZh: string
  format: string
  formatZh: string
  status: EventStatus
  href: string
  cover?: { src: string; alt: string; altZh: string; zoom?: number }
}

export interface GosimEdition {
  slug: string
  city: string
  cityZh: string
  year: string
  status: EventStatus
  dates: string
  datesZh: string
  venue: string
  venueZh: string
  summary: string
  summaryZh: string
  image: string
  imageAlt: string
  imageAltZh: string
  href: string
  hackathons: HackathonEvent[]
}

export const eventGroups: GosimEdition[] = [
  {
    slug: 'shenzhen-2026',
    city: 'Shenzhen',
    cityZh: '深圳',
    year: '2026',
    status: 'concluded',
    dates: 'October 16–17, 2026',
    datesZh: '2026 年 10 月 16–17 日',
    venue: 'ADEN Hotel · Shenzhen',
    venueZh: '深圳南山伊敦酒店',
    summary: 'Open-source AI, robotics, edge systems, and developer infrastructure meet in China’s capital of innovation.',
    summaryZh: '开源 AI、机器人、边缘系统与开发者基础设施相聚中国创新之都。',
    image: '/images/shenzhen-2026.jpg',
    imageAlt: 'Shenzhen skyline at night',
    imageAltZh: '深圳夜景',
    href: 'https://shenzhen2026.gosim.org/',
    hackathons: [
      {
        slug: 'factory26',
        cover: { src: '/images/events/factory26.jpg', alt: 'Shenzhen skyline from the Software Factory event homepage', altZh: '软件工厂活动首页的深圳城市夜景' },
        code: 'OAIC / GOSIM SZ26',
        organizer: 'Open Agentic Intelligence Community',
        name: 'Agentic Software Factory Hackathon',
        nameZh: '智能体软件工厂 黑客松',
        description: 'Build and evaluate production-grade agent harnesses through an online qualifier and a live finale at GOSIM Shenzhen.',
        descriptionZh: '通过线上资格赛与 GOSIM 深圳收官活动，构建并评测达到生产级水平的智能体 Harness。',
        dates: 'September 7–October 17, 2026',
        datesZh: '2026 年 9 月 7 日–10 月 17 日',
        format: 'Online qualifier + Shenzhen finale',
        formatZh: '线上资格赛 + 深圳收官活动',
        status: 'concluded',
        href: '/factory26/',
      },
      {
        slug: 'survey26',
        cover: { src: '/images/events/survey26.jpg', alt: 'Stargazers beneath the Milky Way from the Observer event website', altZh: '巡天活动网站的银河与观星者' },
        code: 'GOSIM / OPEN SURVEY',
        organizer: 'GOSIM Foundation',
        name: 'Agentic Observer Hackathon',
        nameZh: '智能体巡天黑客松',
        description: 'Build a digital observer that reads the night sky, weighs scientific and operational trade-offs, and chooses the next observation every 15 simulated minutes.',
        descriptionZh: '构建一位能够读取夜空状态、权衡科学与运行取舍，并每 15 分钟（模拟时间）选择下一次观测的数字观测员。',
        dates: 'September 15–October 17, 2026',
        datesZh: '2026 年 9 月 15 日–10 月 17 日',
        format: 'Online training + hybrid finals at GOSIM Shenzhen',
        formatZh: '线上培训 + GOSIM 深圳线上及现场混合决赛',
        status: 'concluded',
        href: '/survey26/',
      },
      {
        slug: 'agenticapp26',
        cover: { src: '/images/events/agenticapp26.jpg', alt: 'People and an AI assistant in the Agentic App homepage illustration', altZh: '智能体应用活动首页的人机协作插画' },
        code: 'GOSIM / AGENTIC APP',
        organizer: 'OctoSense · AppCard · Rinx · hagency',
        name: 'Agentic App Hackathon',
        nameZh: '智能体应用 黑客松',
        description: 'Build open-source Agentic mini apps with OctoSense and Rinx to automate everyday tasks across email, messaging, and calendars.',
        descriptionZh: '基于 OctoSense 与 Rinx，围绕邮件、即时消息和日历等日常场景，构建开源智能体小程序。',
        dates: 'September 13–October 17, 2026',
        datesZh: '2026 年 9 月 13 日–10 月 17 日',
        format: 'Online competition + Shenzhen showcase & awards',
        formatZh: '线上竞赛 + 深圳现场展示与颁奖',
        status: 'concluded',
        href: '/agenticapp26/',
      },
    ],
  },
  {
    slug: 'paris-2026',
    city: 'Paris',
    cityZh: '巴黎',
    year: '2026',
    status: 'concluded',
    dates: 'May 5–6, 2026',
    datesZh: '2026 年 5 月 5–6 日',
    venue: 'STATION F · Paris',
    venueZh: '巴黎 · STATION F',
    summary: 'Two days of talks, workshops, and hands-on building with the global open-source agentic AI community.',
    summaryZh: '全球开源智能体 AI 社区齐聚一堂，共度两天的演讲、工作坊与动手创造。',
    image: '/images/paris-2026.jpg',
    imageAlt: 'GOSIM Paris 2026 at STATION F',
    imageAltZh: 'GOSIM Paris 2026 活动现场',
    href: 'https://paris2026.gosim.org/',
    hackathons: [
      {
        slug: 'agenticparis26',
        cover: { src: '/images/hackathon-hero.jpg', alt: 'Builders working together at GOSIM Paris', altZh: 'GOSIM 巴黎活动中的开发者共创现场' },
        code: 'GOSIM PARIS / 2026',
        organizer: 'GOSIM Foundation',
        name: 'GOSIM Agentic Hackathon 2026 — Paris',
        nameZh: 'GOSIM 智能体黑客松 2026 · 巴黎',
        description: 'Builders gathered at STATION F to create the next generation of agentic AI applications.',
        descriptionZh: '开发者齐聚巴黎 STATION F，共同构建下一代智能体 AI 应用。',
        dates: 'May 5–6, 2026',
        datesZh: '2026 年 5 月 5–6 日',
        format: 'In person · Paris',
        formatZh: '巴黎线下活动',
        status: 'concluded',
        href: '/agenticparis26/',
      },
    ],
  },
  {
    slug: 'hangzhou-2025',
    city: 'Hangzhou',
    cityZh: '杭州',
    year: '2025',
    status: 'concluded',
    dates: 'September 13–14, 2025',
    datesZh: '2025 年 9 月 13–14 日',
    venue: 'Hangzhou, Zhejiang',
    venueZh: '浙江杭州',
    summary: 'Agent developers gathered for Code Alert and the Super Agent Campathon at GOSIM Hangzhou.',
    summaryZh: '智能体开发者相聚 GOSIM 杭州，参与 Code Alert 与超级智能体大赛。',
    image: '',
    imageAlt: '',
    imageAltZh: '',
    href: 'https://hangzhou2025.gosim.org/',
    hackathons: [
      {
        slug: 'super-agent-2025',
        cover: { src: '/images/events/super-agent-2025.jpg', alt: 'On-device AI illustration from the Super Agent Campathon homepage', altZh: '超级智能体大赛首页的端侧智能设备插画' },
        code: 'MOFA / GOSIM 2025',
        organizer: 'MoFA',
        name: 'The 3rd Super Agent Campathon',
        nameZh: '第三届超级智能体大赛',
        description: 'An online training camp and hackathon focused on personalized, on-device agents built with MoFA, culminating in the GOSIM Hangzhou finals.',
        descriptionZh: '结合线上训练营与黑客松，基于 MoFA 构建个性化端侧智能体，并在 GOSIM 杭州进行现场决赛。',
        dates: 'August 24–September 14, 2025',
        datesZh: '2025 年 8 月 24 日–9 月 14 日',
        format: 'Online camp + Hangzhou finals',
        formatZh: '线上训练营 + 杭州现场决赛',
        status: 'concluded',
        href: 'https://mofa.ai/super-agent-hackathon/',
      },
      {
        slug: 'code-alert-2025',
        cover: { src: '/images/events/code-alert-2025.jpg', alt: 'Code Alert Hackathon event backdrop at GOSIM Hangzhou 2025', altZh: 'GOSIM 杭州 2025 Code Alert 黑客松活动主视觉', zoom: 1.3 },
        code: 'CODE ALERT / GOSIM 2025',
        organizer: 'MoFA',
        name: 'Code Alert AI Hackathon',
        nameZh: 'Code Alert AI 红警黑客松',
        description: 'Developers built AI agents that turn natural-language commands into Red Alert game actions, competing in online qualifiers and live final battles at GOSIM Hangzhou.',
        descriptionZh: '开发者构建能够将自然语言指令转化为红警游戏操作的 AI 智能体，经过线上初赛，在 GOSIM 杭州展开现场决赛。',
        dates: 'August 4–September 14, 2025',
        datesZh: '2025 年 8 月 4 日–9 月 14 日',
        format: 'Online qualifier + Hangzhou finals',
        formatZh: '线上初赛 + 杭州现场决赛',
        status: 'concluded',
        href: 'https://hackathon.mofa.ai/',
      },
    ],
  },
]

// GAAC is hosted independently; existing event routes remain archived here.
export const currentHackathons: HackathonEvent[] = [
  {
    slug: 'gaac',
    cover: { src: '/images/events/gaac.png', alt: 'GAAC application scenarios: editable presentations, financial analysis and research reports connected to EdgePod shared compute', altZh: 'GAAC 应用场景：可编辑演示文稿、金融分析与研究报告，通过 EdgePod 共享算力连接' },
    code: 'GAAC / OAIC',
    organizer: 'OAIC',
    name: 'Grand Agentic AI Challenge',
    nameZh: '智能体大奖赛',
    description: 'Build real-world agentic applications in a 168-hour challenge. Two stages, three application categories, and a $10,000 team grand prize.',
    descriptionZh: '用真实应用检验智能体全栈能力：每队 168 小时、两阶段、三类应用，争夺 10,000 美元团队大奖。',
    dates: 'Schedule to be announced',
    datesZh: '具体赛程由组委会公告',
    format: '168 hours per team · Two stages',
    formatZh: '每队 168 小时 · 两阶段赛制',
    status: 'open',
    href: 'https://gaac.gosim.org/',
  },
]
