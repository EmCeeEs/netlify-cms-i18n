import React from 'react'
import * as R from 'ramda'

import { LocalePicker } from './LocalePicker'
import { Locale } from './i18n/locales'
import { getTranslation, uppendTranslation } from './i18n'
import { extractAsJS, fromJS } from './helpers'

interface WidgetProps {
  onChange: (newValue: any) => void
  value?: any
}

export const createLocalizedWidget = (Widget: any, locales: Locale[]) => {
  const LocalizedWidget: React.FC<WidgetProps> = props => {
    // eslint-disable-next-line react/prop-types
    const { value, onChange } = props

    console.log('props:', props)
    const [locale, setLocale] = React.useState<Locale>(
      R.head(locales) as Locale,
    )

    const collection = extractAsJS(value)

    const getValue = (locale: Locale) => {
      console.log(fromJS(getTranslation<string>(locale)(collection)))
      return fromJS(getTranslation<string>(locale)(collection))
    }

    const handleChange = (locale: Locale) => (newValue: any) => {
      console.log(fromJS(uppendTranslation(locale, newValue)(collection)))
      onChange(fromJS(uppendTranslation(locale, newValue)(collection)))
    }

    return (
      <div>
        <LocalePicker
          locales={locales}
          currentLocale={locale}
          setLocale={setLocale}
        />
        <Widget
          {...props}
          key={locale}
          onChange={handleChange(locale)}
          value={getValue(locale)}
        />
      </div>
    )
  }

  return LocalizedWidget
}
