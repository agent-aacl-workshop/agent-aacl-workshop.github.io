// Update the workshop's public information here. Unknown details stay null;
// the site displays an announcement instead of inventing names or links.
export const workshop = {
  title: 'From Reasoning to Agency',
  subtitle: 'Learning, Acting, and Adapting with Foundation Models',
  conference: 'AACL-IJCNLP 2026',
  conferenceUrl: 'https://2026.aaclnet.org/',
  websiteUrl: 'https://agent-aacl-workshop.github.io/',
  venueUrl: 'https://2026.aaclnet.org/venue',
  location: 'Hengqin, Zhuhai, China',
  venue: 'Tianmu Melody Convention Exhibition Center',
  submissionUrl:
    'https://github.com/agent-aacl-workshop/agent-aacl-workshop.github.io.git' as string | null,
  contactEmail: null as string | null,
  // November 9–10 is the official workshop window, not a confirmed two-day event.
  workshopStart: '2026-11-09',
  workshopEnd: '2026-11-10',
  confirmedWorkshopDay: null as string | null,
  organizers: [
    { name: 'Jiaheng Liu', affiliation: 'Nanjing University' },
    { name: 'Yuxiang Ren', affiliation: 'Nanjing University' },
    { name: 'Zhen Zhang', affiliation: 'Nanjing University' },
    { name: 'Yanghai Wang', affiliation: 'Nanjing University' },
    { name: 'Yifan Yao', affiliation: 'Nanjing University' },
    { name: 'Xinping Lei', affiliation: 'Nanjing University' },
    { name: 'Yiyan Ji', affiliation: 'Nanjing University' },
    { name: 'Haoran Yang', affiliation: 'Central South University' },
    { name: 'Jiayi Tian', affiliation: 'Alibaba' },
  ] as Person[],
  speakers: [] as Person[],
}

export interface Person {
  name: string
  affiliation: string
  url?: string
  image?: string
}

export const topicFilters = [
  'All topics',
  'Reasoning',
  'Learning & adaptation',
  'Agentic systems',
] as const
export type TopicFilter = (typeof topicFilters)[number]

export const topics = [
  {
    id: '01',
    icon: 'reasoning',
    category: 'Reasoning',
    title: 'Reasoning & planning',
    description: 'Turning deliberation into decisions that work beyond a single response.',
    points: [
      'Chain-of-thought, search, and test-time scaling',
      'Long-horizon planning and task decomposition',
      'World models, causal and multimodal reasoning',
    ],
    tags: ['DELIBERATION', 'PLANNING'],
  },
  {
    id: '02',
    icon: 'learning',
    category: 'Learning & adaptation',
    title: 'Learning to act',
    description: 'Learning effective behavior from feedback, demonstrations, and interaction.',
    points: [
      'Reinforcement learning and verifiable rewards',
      'Imitation learning and trajectory optimization',
      'Process supervision and synthetic experience',
    ],
    tags: ['REINFORCEMENT LEARNING', 'FEEDBACK'],
  },
  {
    id: '03',
    icon: 'tools',
    category: 'Agentic systems',
    title: 'Tools & environments',
    description: 'Connecting foundation models to tools, computers, and the physical world.',
    points: [
      'Tool use, function calling, and orchestration',
      'Web, coding, and computer-use agents',
      'Embodied agents and multimodal interaction',
    ],
    tags: ['TOOL USE', 'INTERACTION'],
  },
  {
    id: '04',
    icon: 'memory',
    category: 'Learning & adaptation',
    title: 'Memory & adaptation',
    description: 'Building agents that retain experience and improve as their worlds change.',
    points: [
      'Episodic memory and context management',
      'Continual learning and test-time adaptation',
      'Self-reflection, skill discovery, and transfer',
    ],
    tags: ['MEMORY', 'CONTINUAL LEARNING'],
  },
  {
    id: '05',
    icon: 'collaboration',
    category: 'Agentic systems',
    title: 'Multi-agent collaboration',
    description: 'Studying how agents coordinate with each other and collaborate with people.',
    points: [
      'Communication, coordination, and cooperation',
      'Collective reasoning and multi-agent learning',
      'Human–agent interaction and shared control',
    ],
    tags: ['COORDINATION', 'HUMAN + AI'],
  },
  {
    id: '06',
    icon: 'evaluation',
    category: 'Agentic systems',
    title: 'Evaluation & responsible agency',
    description: 'Measuring meaningful progress toward reliable, efficient, and safe agents.',
    points: [
      'Benchmarks, reproducibility, and real-world validity',
      'Robustness, safety, alignment, and oversight',
      'Interpretability and compute–performance trade-offs',
    ],
    tags: ['EVALUATION', 'TRUSTWORTHINESS'],
  },
] as const

// Dates supplied by the AACL 2026 Workshop Chair. Every deadline is 23:59 AoE.
export const deadlines = [
  { id: 'cfp', label: 'Call for papers', date: '2026-09-01', note: 'The conversation begins' },
  {
    id: 'submission',
    label: 'Paper submission deadline',
    date: '2026-09-30',
    note: 'Submit your contribution',
  },
  {
    id: 'notification',
    label: 'Notification of acceptance',
    date: '2026-10-07',
    note: 'Decisions sent to authors',
  },
  {
    id: 'camera-ready',
    label: 'Camera-ready papers due',
    date: '2026-10-12',
    note: 'Final versions from authors',
  },
  {
    id: 'proceedings',
    label: 'Proceedings due',
    date: '2026-10-15',
    note: 'Organizers · if publishing proceedings',
  },
]

export const faqs = [
  {
    question: 'Is my work a good fit for this workshop?',
    answer:
      'If your work helps explain or improve how foundation models reason, learn, act, or adapt, we would like to hear from you. We welcome empirical and theoretical work, systems, datasets, benchmarks, position papers, and carefully analyzed negative results. The topic list is illustrative, not exhaustive; connections across research areas are especially welcome.',
  },
  {
    question: 'What are the paper format and review requirements?',
    answer:
      'Please use the official ACL/ARR template in review mode and submit an anonymized PDF. Review will be double-blind: author identities must not appear in the paper or supplementary materials. Final page limits will be announced here. Please follow the ACL guidance for citations and anonymized artifacts.',
  },
  {
    question: 'Can I submit a paper already reviewed by ARR?',
    answer:
      'An ACL Rolling Review (ARR) commitment route is under consideration. Eligibility, a dedicated commitment link, and any separate deadline will be published if this route is offered. Until then, September 30, 2026 is the announced paper submission deadline; no ARR extension is confirmed.',
  },
  {
    question: 'Will accepted papers appear in the ACL Anthology?',
    answer:
      'The publication policy, including whether proceedings will appear in the ACL Anthology, is to be confirmed. Archival status and policies affecting submission of the same work to other venues will be stated in the final guidelines. The October 15 proceedings deadline is for organizers if archival proceedings are produced; it is not an additional author deadline.',
  },
  {
    question: 'When and where will the workshop take place?',
    answer:
      'The AACL-IJCNLP 2026 workshop window is November 9–10, 2026 in Hengqin, Zhuhai, China, next to Macau. The main conference venue is Tianmu Melody Convention Exhibition Center. Our exact workshop day, room, presentation requirements, and any remote participation options will be announced after confirmation.',
  },
]
