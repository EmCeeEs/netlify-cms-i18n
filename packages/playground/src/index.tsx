import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import cms from 'netlify-cms-app'

import repoFiles from '../static/data'

import {
  createLocalizedWidget, Locale,
} from 'netlify-cms-i18n'

const LOCALES: Locale[] = ['en', 'de']

const createRoot = () => {
  const $root = document.createElement('div')
  document.body.appendChild($root)
  return $root
}

const CMS = () => {
  useEffect(() => {
    (window as any).repoFiles = repoFiles

    cms.getWidgets().forEach((widget) => {
      const { name, control, preview } = createLocalizedWidget(widget, LOCALES)
      cms.registerWidget(name, control, preview)
    })

    cms.init()
  }, [])

  return <div id="nc-root"></div>
}

ReactDom.render(<CMS />, createRoot())
