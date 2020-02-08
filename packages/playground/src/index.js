import React, { useEffect } from 'react'
import ReactDom from 'react-dom'
import cms from 'netlify-cms-app'

import repoData from '../static/data'
import {
  LocalizedStringWidget,
  LocalizedMarkdownWidget,
  createLocalizedWidget,
} from '@netlify-cms-i18n/core'

const LOCALES = ['en', 'de']

const createRoot = () => {
  const $root = document.createElement('div')
  document.body.appendChild($root)
  return $root
}

const CMS = () => {
  useEffect(() => {
    window.repoFiles = repoData

    //cms.registerWidget(LocalizedStringWidget(LOCALES))
    //cms.registerWidget(LocalizedMarkdownWidget(LOCALES))

    cms.getWidgets().forEach((widget) => cms.registerWidget(createLocalizedWidget(widget, LOCALES)))
    cms.init()
  }, [])

  return <div id="nc-root"></div>
}

ReactDom.render(<CMS />, createRoot())
