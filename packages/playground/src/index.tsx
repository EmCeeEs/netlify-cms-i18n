import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import cms from 'netlify-cms-app'

import repoData from '../static/data'
import {
  createLocalizedWidget, Locale,
} from '@netlify-cms-i18n/core'

const LOCALES: Locale[] = ['en', 'de']

const createRoot = () => {
  const $root = document.createElement('div')
  document.body.appendChild($root)
  return $root
}

const CMS = () => {
  useEffect(() => {
  (window as any).repoFiles = repoData

  // The typings for CMS are suuuuuperbad
  cms.getWidgets().forEach((widget) => {
    const { name, control, preview } = createLocalizedWidget(widget, LOCALES)
    cms.registerWidget(name, control as any, preview as any)
  })

  cms.init()
  }, [])

  return <div id="nc-root"></div>
}

ReactDom.render(<CMS />, createRoot())
