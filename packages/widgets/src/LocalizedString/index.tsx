import { createLocalizedStringControl } from './control'
import { TranslationCollection } from '@netlify-cms-i18n/i18n'
import { Locale } from '@netlify-cms-i18n/i18n'

export type LocalizedString = TranslationCollection<string>

export const LocalizedStringWidget = (locales: Locale[], opts = {}) => ({
  name: 'i18n-string',
  controlComponent: createLocalizedStringControl(locales),
  ...opts,
})
