import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './en'
import ru from './ru'
import kz from './kz'

const savedLang = localStorage.getItem('portfolio-lang') || 'ru'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ru: { translation: ru },
    kz: { translation: kz },
  },
  lng: savedLang,
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
