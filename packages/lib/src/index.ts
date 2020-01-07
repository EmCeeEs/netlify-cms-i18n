import { setLocales, createTranslator } from './helpers'

export const LOCALES = setLocales(['en', 'de'])
export type Locale = typeof LOCALES[number]
export const translate = createTranslator(LOCALES)
