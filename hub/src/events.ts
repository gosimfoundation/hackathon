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
  location: string
  locationZh: string
  status: EventStatus
  href: string
}

export const events: HackathonEvent[] = [
  {
    slug: 'oaic-harness-2026',
    code: 'OAIC · 2026',
    organizer: 'Open Agentic Intelligence Community',
    name: 'International Hackathon for Agentic Factory & Grand Challenge',
    nameZh: '智能体工厂国际黑客松与大奖赛',
    description: 'Build and evaluate production-grade agent harnesses through an online qualifier and a live finale at GOSIM Shenzhen.',
    descriptionZh: '通过线上资格赛与 GOSIM 深圳现场终场，构建并评测达到生产级水平的智能体 Harness。',
    dates: 'September 1–October 17, 2026',
    datesZh: '2026 年 9 月 1 日–10 月 17 日',
    location: 'Online + GOSIM Shenzhen',
    locationZh: '线上 + GOSIM 深圳',
    status: 'open',
    href: '/oaic-harness-2026/',
  },
  {
    slug: 'agentic-hackathon-paris-2026',
    code: 'GOSIM PARIS · 2026',
    organizer: 'GOSIM Foundation',
    name: 'GOSIM Agentic Hackathon 2026 — Paris',
    nameZh: 'GOSIM 智能体黑客松 2026 · 巴黎',
    description: 'Builders gathered at STATION F to create the next generation of agentic AI applications.',
    descriptionZh: '开发者齐聚巴黎 STATION F，共同构建下一代智能体 AI 应用。',
    dates: 'May 5–6, 2026',
    datesZh: '2026 年 5 月 5–6 日',
    location: 'STATION F · Paris',
    locationZh: '巴黎 · STATION F',
    status: 'concluded',
    href: '/agentic-hackathon-paris-2026/',
  },
]
