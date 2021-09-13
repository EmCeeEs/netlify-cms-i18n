import React, {
  useCallback,
  forwardRef,
  ComponentType,
  RefAttributes,
  ForwardRefExoticComponent,
  PropsWithoutRef,
} from 'react'
import * as R from 'ramda'

import { LocalePicker } from './LocalePicker'
import { Locale } from '../i18n/locales'
import { getTranslation, uppendTranslation } from '../i18n'
import { extractAsJS, fromJS } from './helpers'

export interface Widget {
  name: string
  control: ComponentType<WidgetControlProps & RefAttributes<unknown>>
  preview: ComponentType<WidgetPreviewProps & RefAttributes<unknown>>
}

interface WidgetControlProps {
  onChange: (newValue: any) => void
  value?: any
}

interface WidgetPreviewProps {
  value?: any
}

export const createLocalizedWidget = (Widget: Widget, locales: Locale[]) => {
  const LocalizedControl: ForwardRefExoticComponent<PropsWithoutRef<
    WidgetControlProps
  > &
    React.RefAttributes<unknown>> =
    // eslint-disable-next-line react/display-name
    forwardRef((props, ref) => {
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
          <Widget.control
            {...props}
            ref={ref}
            key={locale}
            onChange={handleChange}
            value={getValue()}
          />
        </div>
      )
    })

  const LocalizedPreview: ForwardRefExoticComponent<PropsWithoutRef<
    WidgetPreviewProps
  > &
    React.RefAttributes<unknown>> =
    // eslint-disable-next-line react/display-name
    forwardRef((props, ref) => {
      const { value } = props

      const [locale, setLocale] = React.useState<Locale>(
        R.head(locales) as Locale,
      )

      const collection = extractAsJS(value)

      const getValue = () => {
        return fromJS(getTranslation<string>(locale)(collection))
      }

      return (
        <div>
          <LocalePicker
            locales={locales}
            currentLocale={locale}
            setLocale={setLocale}
          />
          <Widget.preview
            {...props}
            ref={ref}
            key={locale}
            value={getValue()}
          />
        </div>
      )
    })

  return {
    name: R.pipe<Widget, string, string>(
      R.prop('name'),
      R.concat('i18n-'),
    )(Widget),
    control: LocalizedControl,
    preview: LocalizedPreview,
  }
}
