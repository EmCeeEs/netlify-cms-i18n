import { createLocalizedStringControl } from './control'
import { TranslationCollection } from '../../i18n'
import { Locale } from '../../i18n/locales'
import { JSONPreview } from '../shared/Preview'

export type LocalizedString = TranslationCollection<string>

export const LocalizedStringWidget = (locales: Locale[], opts = {}) => ({
  name: 'i18n-string',
  controlComponent: createLocalizedStringControl(locales),
  previewComponent: JSONPreview,
  ...opts,
})
