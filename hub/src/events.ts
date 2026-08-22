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
    status: 'upcoming',
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
        code: 'OAIC / GOSIM SZ26',
        organizer: 'Open Agentic Intelligence Community',
        name: 'International Hackathon for Agentic Factory & Grand Challenge',
        nameZh: '智能体工厂国际黑客松与大奖赛',
        description: 'Build and evaluate production-grade agent harnesses through an online qualifier and a live finale at GOSIM Shenzhen.',
        descriptionZh: '通过线上资格赛与 GOSIM 深圳现场终场，构建并评测达到生产级水平的智能体 Harness。',
        dates: 'September 7–October 17, 2026',
        datesZh: '2026 年 9 月 7 日–10 月 17 日',
        format: 'Online qualifier + Shenzhen finale',
        formatZh: '线上资格赛 + 深圳现场终场',
        status: 'open',
        href: '/factory26/',
      },
      {
        slug: 'survey26',
        code: 'GOSIM / OPEN SURVEY',
        organizer: 'GOSIM Foundation',
        name: 'Open Survey Agent Hackathon',
        nameZh: '巡天开源智能体黑客松',
        description: 'Build a digital observer that reads the night sky, weighs scientific and operational trade-offs, and chooses the next observation every 900 seconds.',
        descriptionZh: '构建一位能够读取夜空状态、权衡科学与运行取舍，并每 900 秒决定下一次观测的数字观测员。',
        dates: 'September 20–October 17, 2026',
        datesZh: '2026 年 9 月 20 日–10 月 17 日',
        format: 'Online training + competition + Shenzhen awards',
        formatZh: '线上培训 + 正式比赛 + 深圳颁奖',
        status: 'upcoming',
        href: '/survey26/',
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
]
