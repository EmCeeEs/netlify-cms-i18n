import { ComponentType } from "react";
import { Widget } from '@netlify-cms-i18n/core'

declare module 'netlify-cms-core' {
  interface CMS {
    getWidgets: () => Widget[]
  }
}