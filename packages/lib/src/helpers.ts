import { translate } from './lib'
import { Locale } from './locales'
import * as R from 'ramda'

export const setLocales = <T extends Locale>(locales: T[]) => locales

export const createTranslator = <T extends Locale>(fallbacks: T[]) => (
  locale: T,
) => translate(R.prepend(locale, fallbacks))
