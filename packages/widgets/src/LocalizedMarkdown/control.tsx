import React from 'react'
import { isImmutable, Map, List, fromJS } from 'immutable'
import * as R from 'ramda'

import {
  getTranslation,
  uppendTranslation,
  TranslationCollection,
} from '@netlify-cms-i18n/i18n'
import { Locale } from '@netlify-cms-i18n/i18n'
import { LocalePicker } from '../shared/LocalePicker'
import  MarkdownWidget  from 'netlify-cms-widget-markdown'

const MarkdownControl = MarkdownWidget.controlComponent

// netlify CMS markdown widget properties
export interface MarkdownWidgetProps {
  onChange: Function
  onAddAsset: Function
  getAsset: Function
  classNameWrapper: string
  editorControl: Function
  value?: string // defaults to empty string
  field: Map<string, any>
  getEditorComponents?: Function
}

// actual properties with updated value field
export interface LocalizedMarkdownWidgetProps {
  onChange: Function
  onAddAsset?: Function // not used at all
  getAsset?: Function // not used at all
  classNameWrapper?: string
  value?: List<Map<any, any>>
  field: Map<string, any> // according to docs should support 'default' (it doesn't) and 'buttons' (working)
  editorControl?: Function // JSX element used for plugins (needed when plugins enabled)
  getEditorComponents: Function // returns list of plugins
  // purely optional
  setActiveStyle?: Function // not working
  setInactiveStyle?: Function // not working
}

export const createLocalizedMarkdownControl = (locales: Locale[]) => {
  const LocalizedMarkdownControl: React.FC<LocalizedMarkdownWidgetProps> = props => {
    const [locale, setLocale] = React.useState<Locale>(
      R.head(locales) as Locale,
    )
    const collection = extractAsJS(props.value)

    const getValue = (locale: Locale) =>
      fromJS(getTranslation<string>(locale)(collection))

    const handleChange = (locale: Locale) => (newValue: any) => {
      props.onChange(fromJS(uppendTranslation(locale, newValue)(collection)))
    }

    return (
      <div>
        <LocalePicker
          locales={locales}
          currentLocale={locale}
          setLocale={setLocale}
        />
        <MarkdownControl
          {...props}
          key={locale}
          onChange={handleChange(locale)}
          value={getValue(locale)}
        />
      </div>
    )
  }
  return LocalizedMarkdownControl
}

const toJS = (value: any) => value.toJS()

const extractAsJS: (value: any) => TranslationCollection<any> = R.cond([
  [R.isNil, R.always([])],
  [isImmutable, toJS],
  [R.T, R.identity],
])
