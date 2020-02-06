import * as React from 'react'
import * as R from 'ramda'
import { getTranslation, uppendTranslation } from '@netlify-cms-i18n/i18n'
import { Locale } from '@netlify-cms-i18n/i18n'
import { WidgetProps} from '../shared/WidgetProps'


type ChangeEvent = React.ChangeEvent<HTMLInputElement>

export const createLocalizedStringControl = (locales: Locale[]) => {
  return class LocalizedStringControl extends React.Component<
WidgetProps  > {

    getWidgetState = () => {
      const { value: state } = this.props
      return !state ? [] : R.is(Array, state) ? state : state.toJS()
    }

    changeHandler = (locale: Locale) => (event: ChangeEvent) =>
      this.props.onChange(
        uppendTranslation(locale, event.target.value)(this.getWidgetState()),
      )

    getValue = (locale: Locale) =>
      getTranslation<string>(locale)(this.getWidgetState())

    render = () => {
      const {
        classNameWrapper,
        forID,
        setActiveStyle,
        setInactiveStyle,
      } = this.props

      return (
        <div className={classNameWrapper} id={forID}>
          {locales.map((locale: Locale) => (
            <InputField
              classNameWrapper={classNameWrapper}
              key={locale}
              locale={locale}
              onChange={this.changeHandler(locale)}
              value={this.getValue(locale)}
              setActiveStyle={setActiveStyle}
              setInactiveStyle={setInactiveStyle}
            />
          ))}
        </div>
      )
    }
  }
}

interface InputFieldProps {
  locale: Locale
  value: string | undefined
  onChange: (Event: React.ChangeEvent<HTMLInputElement>) => void
  classNameWrapper: string
  setActiveStyle?: React.FocusEventHandler
  setInactiveStyle?: React.FocusEventHandler
}

const InputField: React.FunctionComponent<InputFieldProps> = ({
  locale,
  onChange,
  value,
  classNameWrapper,
  setActiveStyle,
  setInactiveStyle,
}) => {
  return (
    <div>
      <label htmlFor={locale}>{locale}</label>
      <input
        id={locale}
        className={classNameWrapper}
        type="text"
        value={value || ''}
        onChange={onChange}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      />
    </div>
  )
}
