import React, { Component } from 'react'
import { fromJS, isImmutable } from 'immutable'

import { getTranslation, uppendTranslation } from '../../i18n'
import { Locale } from '../../i18n/locales'
import { WidgetProps } from '../shared/WidgetProps'
import MarkdownWidget from 'netlify-cms-widget-markdown'

const MarkdownPreview = MarkdownWidget.previewComponent

export const createLocalizedMarkdownPreview = (locales: Locale[]) => {
  return class LocalizedMarkdownPreview extends Component<WidgetProps> {
    getWidgetState = () => {
      const { value } = this.props
      return !value ? [] : isImmutable(value) ? value.toJS() : value
    }

    getValue = (locale: Locale) =>
      getTranslation<object>(locale)(this.getWidgetState())

    handleChange = (locale: Locale) => (newValue: any) => {
      this.props.onChange(
        uppendTranslation(locale, newValue)(this.getWidgetState()),
      )
    }

    updateProps = (locale: Locale) => ({
      ...this.props,
      key: locale,
      onChange: this.handleChange(locale),
      value: fromJS(this.getValue(locale)),
    })

    render = () => (
      <div>
        {locales.map(locale => (
          <MarkdownPreview {...this.updateProps(locale)} />
        ))}
      </div>
    )
  }
}
