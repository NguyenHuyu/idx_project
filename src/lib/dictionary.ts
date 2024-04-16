import 'server-only'
import type { Locale } from '@/i18n.config'

const dictionaries = {
  vi: () => import('@/i18n/vi.json').then((module) => module.default),
  en: () => import('@/i18n/en.json').then((module) => module.default)
}

// export const getDictionary = async (locale: Locale) => dictionaries[locale]()

export const getDictionary = async (locale: Locale) => {
  return locale == 'vi' ? dictionaries.vi() : dictionaries.en()
}
