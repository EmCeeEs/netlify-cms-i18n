import React, {
  useCallback,
  RefForwardingComponent,
  forwardRef,
  ComponentType,
  RefAttributes,
} from 'react'
import * as R from 'ramda'

import { LocalePicker } from './LocalePicker'
import { Locale } from '../i18n/locales'
import { getTranslation, uppendTranslation } from '../i18n'
import { extractAsJS, fromJS } from './helpers'

export interface Widget {
  name: string
  control: ComponentType<WidgetProps & RefAttributes<unknown>>
  preview: ComponentType<WidgetProps & RefAttributes<unknown>>
}

interface WidgetProps {
  onChange: (newValue: any) => void
  value?: any
}

export const createLocalizedWidget = (Widget: Widget, locales: Locale[]) => {
  const LocalizedControl: RefForwardingComponent<{}, WidgetProps> =
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

  const JSONPreview: React.FC<WidgetProps> = props => {
    const collection = extractAsJS(props.value)

    return <p>{JSON.stringify(collection)}</p>
  }

  const LocalizedPreview: RefForwardingComponent<{}, WidgetProps> =
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
    //preview: JSONPreview,
  }
}
