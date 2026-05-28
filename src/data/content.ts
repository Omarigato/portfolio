export interface Experience {
  id: string
  company: { ru: string; en: string; kz: string }
  role: string
  period: { start: string; end: string | null }
  stack: string[]
  achievements: { ru: string[]; en: string[]; kz: string[] }
}

export interface Project {
  id: string
  name: string
  url: string
  description: { ru: string; en: string; kz: string }
  type: 'live' | 'github'
  stack: string[]
  github?: string
}

export interface SkillCategory {
  id: string
  name: { ru: string; en: string; kz: string }
  skills: string[]
  icon: 'cpu' | 'server' | 'code' | 'cloud' | 'tools'
}

export interface Certificate {
  id: string
  name: string
  issuer: string
  year: number
  url: string
}

export const personalInfo = {
  name: { ru: 'Омар Аким', en: 'Omar Akim', kz: 'Омар Аким' },
  fullName: {
    ru: 'Аким Омар Абдукаримович',
    en: 'Omar Akim Abdukarimuly',
    kz: 'Аким Омар Абдукарымұлы',
  },
  nickname: 'Omarigato',
  role: 'Full Stack Developer & AI Engineer',
  age: 20,
  location: { ru: 'Алматы, Казахстан', en: 'Almaty, Kazakhstan', kz: 'Алматы, Қазақстан' },
  github: 'https://github.com/Omarigato',
  contacts: {
    whatsapp: '+77056948240',
    whatsappLink: 'https://wa.me/77056948240',
    telegram: '@Omarigato',
    telegramLink: 'https://t.me/Omarigato',
    instagram: '@omarigatoo',
    instagramLink: 'https://instagram.com/omarigatoo',
    email: 'omarakim2005@gmail.com',
  },
}

export const experiences: Experience[] = [
  {
    id: 'eurasian',
    company: {
      ru: 'Евразийский Капитал, АО',
      en: 'Eurasian Capital JSC',
      kz: 'Еуразиялық Капитал, АҚ',
    },
    role: 'AI Engineer',
    period: { start: 'Апр 2026 / Apr 2026 / Сәу 2026', end: null },
    stack: ['Python', 'FastAPI', 'Qdrant', 'Docker', 'PostgreSQL', 'LLM', 'RAG', 'OCR'],
    achievements: {
      ru: [
        'Внедрил оффлайн LLM-инфраструктуру для корпоративного использования',
        'Разработал RAG-систему поиска по внутренним документам компании',
        'Настроил пайплайн OCR для автоматической обработки документов',
      ],
      en: [
        'Implemented offline LLM infrastructure for enterprise use',
        'Built a RAG-based document search system for internal knowledge base',
        'Set up an OCR pipeline for automated document processing',
      ],
      kz: [
        'Корпоративті пайдалану үшін оффлайн LLM инфрақұрылымын енгіздім',
        'Ішкі құжаттар бойынша RAG іздеу жүйесін жасадым',
        'Құжаттарды автоматты өңдеу үшін OCR конвейерін орнаттым',
      ],
    },
  },
  {
    id: 'nsk',
    company: {
      ru: 'Страховая компания НСК',
      en: 'Insurance Company NSK',
      kz: 'НСК Сақтандыру компаниясы',
    },
    role: 'Fullstack Developer',
    period: { start: 'Фев 2026 / Feb 2026 / Ақп 2026', end: null },
    stack: ['React', 'TypeScript', 'REST API'],
    achievements: {
      ru: [
        'Разрабатываю корпоративный веб-портал для страховых операций',
        'Реализую интеграцию с внутренними REST API сервисами',
      ],
      en: [
        'Developing a corporate web portal for insurance operations',
        'Implementing integration with internal REST API services',
      ],
      kz: [
        'Сақтандыру операциялары үшін корпоративті веб-порталды дамытудамын',
        'Ішкі REST API қызметтерімен интеграцияны жүзеге асырудамын',
      ],
    },
  },
  {
    id: 'nuba',
    company: {
      ru: 'ТОО Nuba Solutions',
      en: 'Nuba Solutions LLP',
      kz: 'Nuba Solutions ЖШС',
    },
    role: 'Fullstack Developer',
    period: { start: 'Ноя 2025 / Nov 2025 / Қар 2025', end: 'Янв 2026 / Jan 2026 / Қаң 2026' },
    stack: ['C#', '.NET 8', 'SQLite', 'WPF'],
    achievements: {
      ru: ['Разработал настольное приложение на WPF для управления данными', 'Проектировал базу данных на SQLite с оптимизированными запросами'],
      en: ['Developed a WPF desktop application for data management', 'Designed SQLite database with optimized queries'],
      kz: ['Деректерді басқаруға арналған WPF жұмыс үстелі қосымшасын жасадым', 'Оңтайландырылған сұраулармен SQLite дерекқорын жобаладым'],
    },
  },
  {
    id: 'tas',
    company: {
      ru: 'МФО TAS Finance Group',
      en: 'MFO TAS Finance Group',
      kz: 'МҚҰ TAS Finance Group',
    },
    role: 'Fullstack Developer',
    period: { start: 'Янв 2024 / Jan 2024 / Қаң 2024', end: 'Окт 2025 / Oct 2025 / Қаз 2025' },
    stack: ['C#', '.NET', 'MS SQL Server', 'Dapper', 'JavaScript', 'React', 'REST API', 'Git'],
    achievements: {
      ru: [
        'Разработал систему верификации кредитных заявок',
        'Реализовал скоринг-систему для оценки кредитоспособности',
        'Настроил интеграцию с Государственным кредитным бюро (ГКБ)',
      ],
      en: [
        'Developed a loan application verification system',
        'Implemented a credit scoring system for creditworthiness assessment',
        'Set up integration with the State Credit Bureau (GCB)',
      ],
      kz: [
        'Несие өтінімдерін тексеру жүйесін жасадым',
        'Несиелік қабілеттілікті бағалаудың скоринг жүйесін жүзеге асырдым',
        'Мемлекеттік несиелік бюромен (МНБ) интеграцияны орнаттым',
      ],
    },
  },
]

export const projects: Project[] = [
  {
    id: 'imperium',
    name: 'imperium.kz',
    url: 'https://imperium.kz',
    description: {
      ru: 'Интернет-магазин мебели с системой доставки по Казахстану. Каталог, фильтрация, корзина, оформление заказа.',
      en: 'Online furniture store with delivery system across Kazakhstan. Catalog, filtering, cart, order checkout.',
      kz: 'Қазақстан бойынша жеткізу жүйесі бар жиһаз интернет-дүкені. Каталог, сүзгілеу, себет, тапсырыс рәсімдеу.',
    },
    type: 'live',
    stack: ['React', 'TypeScript', 'REST API', 'CSS'],
  },
  {
    id: 'autopro',
    name: 'autopro.kz',
    url: 'https://autopro.kz',
    description: {
      ru: 'Платформа аренды авто и спецтехники по всему Казахстану. Поиск, бронирование, управление парком.',
      en: 'Car and special equipment rental platform across Kazakhstan. Search, booking, fleet management.',
      kz: 'Қазақстан бойынша автомобиль және арнайы техника жалдау платформасы. Іздеу, брондау, паркті басқару.',
    },
    type: 'live',
    stack: ['React', 'TypeScript', 'REST API'],
  },
  {
    id: 'ai-imperium',
    name: 'ai.imperium.kz',
    url: 'https://ai.imperium.kz',
    description: {
      ru: 'AI-платформа — дипломная работа. Интеграция LLM для умного подбора мебели и консультаций.',
      en: 'AI platform — graduation project. LLM integration for smart furniture selection and consultations.',
      kz: 'AI платформасы — дипломдық жұмыс. Жиһазды ақылды таңдауға арналған LLM интеграциясы.',
    },
    type: 'live',
    stack: ['React', 'Python', 'FastAPI', 'LLM', 'RAG'],
  },
  {
    id: 'finance-analyzer',
    name: 'FinanceAnalyzer',
    url: 'https://github.com/Omarigato/FinanceAnalyzer',
    description: {
      ru: 'Анализатор личных финансов на Python с визуализацией данных и категоризацией расходов.',
      en: 'Personal finance analyzer in Python with data visualization and expense categorization.',
      kz: 'Деректерді визуализациялау және шығындарды санаттаумен Python тілінде жеке қаржы анализаторы.',
    },
    type: 'github',
    stack: ['Python', 'Pandas', 'Matplotlib'],
    github: 'https://github.com/Omarigato/FinanceAnalyzer',
  },
  {
    id: 'weather-mcp',
    name: 'WeatherMcpServer',
    url: 'https://github.com/Omarigato/WeatherMcpServer',
    description: {
      ru: 'MCP-сервер для получения погодных данных, написанный на C#. Интеграция с внешними API.',
      en: 'MCP server for weather data retrieval, written in C#. Integration with external APIs.',
      kz: 'C# тілінде жазылған ауа-райы деректерін алуға арналған MCP сервері. Сыртқы API-мен интеграция.',
    },
    type: 'github',
    stack: ['C#', '.NET', 'MCP', 'REST API'],
    github: 'https://github.com/Omarigato/WeatherMcpServer',
  },
  {
    id: 'tamak-time',
    name: 'TamakTime',
    url: 'https://github.com/Omarigato/TamakTime',
    description: {
      ru: 'Веб-приложение для планирования питания и рецептов на JavaScript. "Тамақ" — еда на казахском.',
      en: 'JavaScript web app for meal planning and recipes. "Tamak" means food in Kazakh.',
      kz: 'Тамақ жоспарлау және рецептерге арналған JavaScript веб-қосымшасы.',
    },
    type: 'github',
    stack: ['JavaScript', 'HTML', 'CSS'],
    github: 'https://github.com/Omarigato/TamakTime',
  },
]

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai',
    name: { ru: 'AI / ML', en: 'AI / ML', kz: 'AI / ML' },
    skills: ['Python', 'FastAPI', 'LLM', 'RAG', 'Qdrant', 'Embeddings', 'OCR', 'n8n', 'Claude API'],
    icon: 'cpu',
  },
  {
    id: 'backend',
    name: { ru: 'Backend', en: 'Backend', kz: 'Backend' },
    skills: ['C#', '.NET', 'MS SQL Server', 'PostgreSQL', 'Dapper', 'REST API', 'Docker'],
    icon: 'server',
  },
  {
    id: 'frontend',
    name: { ru: 'Frontend', en: 'Frontend', kz: 'Frontend' },
    skills: ['React', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Tailwind CSS', 'Vite'],
    icon: 'code',
  },
  {
    id: 'devops',
    name: { ru: 'DevOps', en: 'DevOps', kz: 'DevOps' },
    skills: ['Linux', 'Git', 'Docker', 'Vercel', 'GitHub Actions'],
    icon: 'cloud',
  },
  {
    id: 'tools',
    name: { ru: 'Инструменты', en: 'Tools', kz: 'Құралдар' },
    skills: ['VS Code', 'Cursor', 'GitHub', 'Postman', 'Figma'],
    icon: 'tools',
  },
]

export const certificates: Certificate[] = [
  {
    id: 'prompt-eng',
    name: 'Prompt Engineering for ChatGPT',
    issuer: 'Vanderbilt University',
    year: 2025,
    url: 'https://coursera.org',
  },
  {
    id: 'ai-everyone',
    name: 'AI for Everyone',
    issuer: 'DeepLearning.AI',
    year: 2025,
    url: 'https://coursera.org',
  },
  {
    id: 'ai-cybersec',
    name: 'Introduction to AI for Cybersecurity',
    issuer: 'Coursera',
    year: 2025,
    url: 'https://coursera.org',
  },
  {
    id: 'linux-tools',
    name: 'Linux Tools for Developers',
    issuer: 'Linux Foundation',
    year: 2025,
    url: 'https://coursera.org',
  },
  {
    id: 'oss-dev',
    name: 'Open Source Software Development',
    issuer: 'Linux Foundation',
    year: 2024,
    url: 'https://coursera.org',
  },
  {
    id: 'linux-dev',
    name: 'Linux for Developers',
    issuer: 'Linux Foundation',
    year: 2024,
    url: 'https://coursera.org',
  },
  {
    id: 'git-dist',
    name: 'Using Git for Distributed Development',
    issuer: 'Linux Foundation',
    year: 2023,
    url: 'https://coursera.org',
  },
]
