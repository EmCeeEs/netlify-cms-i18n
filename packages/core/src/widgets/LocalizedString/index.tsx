import { createLocalizedStringControl } from './control'
import { TranslationCollection } from '../../i18n'
import { Locale } from '../../i18n/locales'

export type LocalizedString = TranslationCollection<string>

export const LocalizedStringWidget = (locales: Locale[], opts = {}) => ({
  name: 'i18n-string',
  controlComponent: createLocalizedStringControl(locales),
  ...opts,
})
