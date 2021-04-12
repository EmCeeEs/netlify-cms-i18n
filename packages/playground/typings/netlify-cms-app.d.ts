import { Widget } from 'netlify-cms-i18n'

declare module 'netlify-cms-core' {
  interface CMS {
    getWidgets: () => Widget[]
  }
}