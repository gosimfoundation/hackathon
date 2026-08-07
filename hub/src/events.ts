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
    name: 'Harness Engineering Campathon & Grand Challenge',
    nameZh: 'Harness 工程训练营、黑客松与大奖赛',
    description: 'Build and evaluate production-grade agent harnesses through an online qualifier and a live finale at GOSIM Shenzhen.',
    descriptionZh: '通过线上资格赛与 GOSIM 深圳现场终场，构建并评测达到生产级水平的智能体 Harness。',
    dates: 'September 1–October 17, 2026',
    datesZh: '2026 年 9 月 1 日–10 月 17 日',
    location: 'Online + GOSIM Shenzhen',
    locationZh: '线上 + GOSIM 深圳',
    status: 'open',
    href: '/oaic-harness-2026/',
  },
]
