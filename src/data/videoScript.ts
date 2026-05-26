export interface ScriptSegment {
  time: string
  timeSeconds: number
  title: { ru: string; en: string; kz: string }
  text: { ru: string; en: string; kz: string }
}

export const videoScript: ScriptSegment[] = [
  {
    time: '0:00',
    timeSeconds: 0,
    title: { ru: 'О себе', en: 'About Me', kz: 'Өзім туралы' },
    text: {
      ru: 'Привет! Меня зовут Омар Аким, мне 20 лет, я из Алматы. Я Full Stack Developer и AI Engineer с 2+ годами коммерческого опыта. Я люблю создавать продукты, которые решают реальные задачи.',
      en: "Hi! My name is Omar Akim, I'm 20 years old, from Almaty. I'm a Full Stack Developer and AI Engineer with 2+ years of commercial experience. I love building products that solve real problems.",
      kz: 'Сәлем! Менің атым Омар Аким, маған 20 жас, Алматыданмын. Мен 2+ жыл коммерциялық тәжірибесі бар Full Stack Developer және AI Engineer болып табыламын.',
    },
  },
  {
    time: '0:15',
    timeSeconds: 15,
    title: { ru: 'Опыт', en: 'Experience', kz: 'Тәжірибе' },
    text: {
      ru: 'Я работал в МФО TAS Finance Group, где строил финтех-системы на C# и .NET. Сейчас я AI Engineer в Евразийском Капитале — внедряю LLM и RAG-системы для корпоративного использования.',
      en: "I worked at MFO TAS Finance Group building fintech systems in C# and .NET. Now I'm an AI Engineer at Eurasian Capital — implementing LLM and RAG systems for enterprise use.",
      kz: 'Мен MFO TAS Finance Group компаниясында C# және .NET тілдерінде fintech жүйелерін жасадым. Қазір мен Еуразиялық Капиталдың AI Engineer болып жұмыс істеймін.',
    },
  },
  {
    time: '0:40',
    timeSeconds: 40,
    title: { ru: 'Проекты', en: 'Projects', kz: 'Жобалар' },
    text: {
      ru: 'Среди моих проектов: imperium.kz — интернет-магазин мебели, autopro.kz — аренда авто по Казахстану, и ai.imperium.kz — AI-платформа, моя дипломная работа. Всё живое, всё работает.',
      en: 'My projects include: imperium.kz — furniture online store, autopro.kz — car rental across Kazakhstan, and ai.imperium.kz — AI platform, my graduation project. All live, all working.',
      kz: 'Менің жобаларым: imperium.kz — жиһаз интернет-дүкені, autopro.kz — Қазақстан бойынша автокөлік жалдау, ai.imperium.kz — AI платформасы, дипломдық жұмысым.',
    },
  },
  {
    time: '1:00',
    timeSeconds: 60,
    title: { ru: 'Цели', en: 'Goals', kz: 'Мақсаттар' },
    text: {
      ru: 'Моя цель — строить AI-продукты мирового уровня. Хочу создать собственный AI-стартап, который упростит жизнь миллионам людей. Если у вас есть интересный проект — давайте поговорим!',
      en: 'My goal is to build world-class AI products. I want to create my own AI startup that will simplify life for millions of people. If you have an interesting project — let\'s talk!',
      kz: "Менің мақсатым — әлемдік деңгейдегі AI өнімдер жасау. Миллиондаған адамдардың өмірін жеңілдететін өз AI стартапымды жасағым келеді. Қызықты жобаңыз болса — сөйлесейік!",
    },
  },
]
