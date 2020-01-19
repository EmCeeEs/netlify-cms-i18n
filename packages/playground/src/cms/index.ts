import CMS from 'netlify-cms-app'
import { createLocalizedWidget } from '@netlify-cms-i18n/widget'

const StringWidget = CMS.getWidget('string')
const LocalizedControl = createLocalizedWidget(StringWidget.control, [
  'de',
  'en',
])
console.log('preview', StringWidget.preview)
const LocalizedPreview = createLocalizedWidget(StringWidget.preview, [
  'de',
  'en',
])

CMS.registerWidget('localizedString', LocalizedControl, LocalizedPreview)
CMS.init()
