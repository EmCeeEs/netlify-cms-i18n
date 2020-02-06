import React, { useEffect } from 'react'
import { render } from 'react-dom'
import cms from 'netlify-cms-app'
import repoData from './static/data'
import { LocalizedStringWidget } from '@netlify-cms-i18n/string'

const createRoot = () => {
  const $root = document.createElement('div')
  document.body.appendChild($root)
  return $root
}

const CMS = () => {
  useEffect(() => {
    window.repoFiles = repoData

    cms.registerWidget(LocalizedStringWidget(['en', 'de']))
    cms.registerPreviewStyle('./preview.css')
    cms.init()
  }, [])

  return <div id="nc-root"></div>
}

render(<CMS />, createRoot())
