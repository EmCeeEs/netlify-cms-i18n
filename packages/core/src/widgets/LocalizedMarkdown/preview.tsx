import React from 'react'

import { getTranslation } from '../../i18n'
import { Locale } from '../../i18n/locales'
import { WidgetProps } from '../shared/WidgetProps'
import MarkdownWidget from 'netlify-cms-widget-markdown'
import { extractAsJS, fromJS } from '../shared/helpers'

const MarkdownPreview = MarkdownWidget.previewComponent

export const createLocalizedMarkdownPreview = (locales: Locale[]) => {
  const LocalizedMarkdownPreview: React.FC<WidgetProps> = props => {
    const collection = extractAsJS(props.value)

    const getValue = (locale: Locale) =>
      fromJS(getTranslation<string>(locale)(collection))

    return (
      <div>
        {locales.map(locale => (
          <MarkdownPreview {...props} key={locale} value={getValue(locale)} />
        ))}
      </div>
    )
  }
  return LocalizedMarkdownPreview
}
