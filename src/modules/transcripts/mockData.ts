import type { Author, Transcript } from './types'

const SECTORS = [
  'SaaS',
  'Robotics',
  'Retail',
  'Healthcare',
  'FinTech',
  'Manufacturing',
  'Consumer',
  'Logistics',
  'Energy',
  'Media',
  'Education',
  'Real Estate',
  'Insurance',
  'Telecom',
  'Agriculture',
  'Hospitality',
  'Automotive',
  'Aerospace',
  'Biotech',
  'Cybersecurity',
  'Legal',
  'Gaming',
  'Travel',
  'Construction',
  'Pharma',
]

const FOCUS_AREAS = [
  '',
  'Software',
  'Hardware',
  'Services',
  'Analytics',
  'Infrastructure',
  'Operations',
  'Marketing',
  'Distribution',
  'Compliance',
  'Payments',
  'Data',
  'Cloud',
  'Mobile',
  'AI',
  'Security',
  'Supply Chain',
  'Customer Experience',
  'Sustainability',
  'Procurement',
]

const PREFIXES = ['', 'Enterprise ']

type DomainRecord = {
  name: string
  sector: string
  focus: string
}

const DOMAIN_RECORDS: DomainRecord[] = []
for (const prefix of PREFIXES) {
  for (const sector of SECTORS) {
    for (const focus of FOCUS_AREAS) {
      const name = `${prefix}${sector}${focus ? ` ${focus}` : ''}`
      DOMAIN_RECORDS.push({ name, sector, focus })
    }
  }
}

const DOMAINS = DOMAIN_RECORDS.map((d) => d.name)
const DOMAIN_LOOKUP = new Map(DOMAIN_RECORDS.map((d) => [d.name, d]))

const TITLE_TEMPLATES = [
  '{domain} trends heading into 2026',
  'What buyers actually care about in {domain}',
  '{domain}: an author\'s view from the field',
  'The economics of {domain} right now',
  'How leaders in {domain} are adapting this year',
]

const PREVIEW_TEMPLATES = [
  'A verified author speaks candidly about the shifts reshaping {domain}, drawing on direct operating experience rather than secondhand analysis.',
  'This conversation covers the practical realities of {domain} today, including where budgets are actually going and what is getting cut.',
  'A frank discussion on {domain}, focused on the tradeoffs decision-makers are weighing this quarter and why the obvious answer is often wrong.',
]

const FIRST_NAMES = [
  'James', 'Maria', 'Wei', 'Priya', 'Ahmed', 'Sofia', 'Daniel', 'Aisha', 'Lucas', 'Emma',
  'Raj', 'Grace', 'Noah', 'Mei', 'Carlos', 'Fatima', 'Oliver', 'Ananya', 'Ethan', 'Yuki',
]

const LAST_NAMES = [
  'Anderson', 'Garcia', 'Chen', 'Sharma', 'Khan', 'Rossi', 'Kim', 'Patel', 'Muller', 'Johnson',
  'Nguyen', 'Silva', 'Kumar', 'Tanaka', 'Novak', 'Hassan', 'Brown', 'Singh', 'Lopez', 'Watanabe',
]

const AUTHOR_TITLES = [
  'VP of Operations', 'Director of Strategy', 'Head of Product', 'Chief Revenue Officer',
  'Senior Manager', 'VP of Sales', 'Director of Engineering', 'Head of Growth',
  'Chief Operating Officer', 'Senior Director', 'VP of Marketing', 'Head of Partnerships',
]

const AUTHOR_COMPANIES = [
  'Northwind Industries', 'Vertex Holdings', 'Bluepeak Group', 'Cascade Partners', 'Meridian Corp',
  'Anchorline Ltd', 'Silverline Ventures', 'Redwood Systems', 'Harborview Inc', 'Ironclad Solutions',
  'Brightside Co', 'Summit & Co', 'Pinnacle Group', 'Lighthouse Partners', 'Crestline Industries',
]

// Simple seeded PRNG so the generated dataset is stable across reloads
const createRng = (seed: number) => {
  let state = seed
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0
    return state / 4294967296
  }
}

const rng = createRng(42)

const pick = <T>(items: T[]): T => items[Math.floor(rng() * items.length)]

const randomDate = (): string => {
  const start = new Date(2024, 0, 1).getTime()
  const end = new Date(2026, 6, 15).getTime()
  const date = new Date(start + rng() * (end - start))
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

const randomPrice = (): number => {
  const roll = rng()
  if (roll < 0.1) return 0
  if (roll < 0.45) return Math.round((20 + rng() * 79) / 5) * 5
  if (roll < 0.8) return Math.round((100 + rng() * 150) / 10) * 10
  return Math.round((250 + rng() * 250) / 10) * 10
}

const randomReadMinutes = (): number => {
  const roll = rng()
  if (roll < 0.2) return Math.round(5 + rng() * 9)
  if (roll < 0.55) return Math.round(15 + rng() * 15)
  if (roll < 0.85) return Math.round(31 + rng() * 29)
  return Math.round(61 + rng() * 40)
}

const generateAuthor = (): Author => {
  const firstName = pick(FIRST_NAMES)
  const lastName = pick(LAST_NAMES)
  const company = pick(AUTHOR_COMPANIES)
  const emailHandle = `${firstName}.${lastName}`.toLowerCase()
  const companyHandle = company.toLowerCase().replace(/[^a-z]+/g, '')

  return {
    name: `${firstName} ${lastName}`,
    title: pick(AUTHOR_TITLES),
    company,
    yearsOfExperience: Math.round(5 + rng() * 20),
    email: `${emailHandle}@${companyHandle}.com`,
    linkedinUrl: `https://linkedin.com/in/${emailHandle}`,
  }
}

const generateTranscript = (index: number): Transcript => {
  const domain = pick(DOMAINS)
  const record = DOMAIN_LOOKUP.get(domain)!
  const tags = [...new Set([domain, record.sector, record.focus].filter(Boolean))]
  const title = pick(TITLE_TEMPLATES).replace('{domain}', domain)
  const preview = pick(PREVIEW_TEMPLATES).replace('{domain}', domain)

  return {
    id: `${index + 1}`,
    title: `${title} #${index + 1}`,
    domain,
    tags,
    preview,
    price: randomPrice(),
    readMinutes: randomReadMinutes(),
    date: randomDate(),
    author: generateAuthor(),
  }
}

const HANDCRAFTED_TRANSCRIPTS: Transcript[] = [
  {
    id: '1',
    title: 'Enterprise SaaS pricing shifts in a post-AI market',
    domain: 'Enterprise SaaS',
    tags: ['Enterprise SaaS', 'Pricing strategy', 'Growth', 'B2B'],
    preview:
      'The consumption model that everyone rushed toward in 2023 is quietly being repriced. Most CIOs I speak with are asking for hybrid deals that put a floor under spend while still rewarding heavy usage, and vendors that refuse are being renewed to competitors who will.',
    price: 250,
    readMinutes: 20,
    date: 'Jul 3, 2026',
    author: {
      name: 'Sarah Mitchell',
      title: 'VP of Revenue Operations',
      company: 'Cloudscale Technologies',
      yearsOfExperience: 14,
      email: 'sarah.mitchell@cloudscale.com',
      linkedinUrl: 'https://linkedin.com/in/sarah-mitchell',
    },
  },
  {
    id: '2',
    title: 'Refurbished industrial robots: buyer economics in 2026',
    domain: 'Robotics',
    tags: ['Robotics', 'Industrial equipment', 'Supply chain', 'Manufacturing', 'Capex'],
    preview:
      'The global refurbished robots market is on track to reach roughly $3.7 billion by 2030. What buyers actually care about is not the headline number, it is the delta between a certified refurb and a new arm on a two-year payback.',
    price: 250,
    readMinutes: 18,
    date: 'Jun 28, 2026',
    author: {
      name: 'David Chen',
      title: 'Director of Procurement',
      company: 'Meridian Manufacturing',
      yearsOfExperience: 11,
      email: 'david.chen@meridianmfg.com',
      linkedinUrl: 'https://linkedin.com/in/david-chen',
    },
  },
  {
    id: '3',
    title: 'Customer loyalty in retail: what actually moves the needle',
    domain: 'Retail',
    tags: ['Retail', 'Loyalty', 'Consumer behavior'],
    preview:
      'Discounts drive short-term spikes, but experience compounds. We analyzed 200+ loyalty programs to understand what keeps customers coming back beyond the first purchase.',
    price: 200,
    readMinutes: 15,
    date: 'Jun 20, 2026',
    author: {
      name: 'Priya Nair',
      title: 'Head of Customer Strategy',
      company: 'Northgate Retail Group',
      yearsOfExperience: 9,
      email: 'priya.nair@northgateretail.com',
      linkedinUrl: 'https://linkedin.com/in/priya-nair',
    },
  },
]

const GENERATED_COUNT = 2000 - HANDCRAFTED_TRANSCRIPTS.length

export const MOCK_TRANSCRIPTS: Transcript[] = [
  ...HANDCRAFTED_TRANSCRIPTS,
  ...Array.from({ length: GENERATED_COUNT }, (_, i) => generateTranscript(i + HANDCRAFTED_TRANSCRIPTS.length)),
]

const domainCounts = new Map<string, number>()
for (const transcript of MOCK_TRANSCRIPTS) {
  domainCounts.set(transcript.domain, (domainCounts.get(transcript.domain) ?? 0) + 1)
}

export const DOMAIN_FILTER_OPTIONS = DOMAINS.map((domain) => ({
  label: domain,
  value: domain,
  count: domainCounts.get(domain) ?? 0,
})).sort((a, b) => b.count - a.count)
