import React, { useCallback } from 'react'
import * as R from 'ramda'

import { LocalePicker } from '../shared/LocalePicker'
import { Locale } from '../../i18n/locales'
import { getTranslation, uppendTranslation } from '../../i18n'
import { extractAsJS, fromJS } from '../shared/helpers'

interface WidgetProps {
  onChange: (newValue: any) => void
  value?: any
}

export const createLocalizedWidget = (Widget: any, locales: Locale[]) => {
  const LocalizedWidget: React.FC<WidgetProps> = props => {
    const { value, onChange } = props

    const [locale, setLocale] = React.useState<Locale>(
      R.head(locales) as Locale,
    )

    const collection = extractAsJS(value)

    const getValue = () => {
      return fromJS(getTranslation<string>(locale)(collection))
    }

    const handleChange = useCallback(
      (newValue: any) => {
        const newCollection = uppendTranslation(locale, newValue)(collection)
        onChange(fromJS(newCollection))
      },
      [collection, locale, onChange],
    )

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
          onChange={handleChange}
          value={getValue()}
        />
      </div>
    )
  }

  return LocalizedWidget
}
