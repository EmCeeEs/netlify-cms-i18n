import CMS from 'netlify-cms-app'
import React, { Component } from 'react'
import { fromJS, isImmutable } from 'immutable'

import { getTranslation, uppendTranslation } from '@netlify-cms-i18n/i18n'
import { Locale } from '@netlify-cms-i18n/i18n'
import { WidgetProps } from '../shared/WidgetProps'

const MarkdownPreview = CMS.getWidget('markdown').preview

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
