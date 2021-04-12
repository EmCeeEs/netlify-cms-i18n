import React from 'react'
import { Locale } from '../i18n/locales'
import * as R from 'ramda'

interface LocalePickerProps {
  locales: Locale[]
  currentLocale: Locale
  setLocale: React.Dispatch<React.SetStateAction<Locale>>
  className?: string
}

interface LocaleTabProps {
  className?: string
  locale: Locale
  active: boolean
  onClick: () => void
}

const ulStyle = {
  listStyleType: 'none',
  // marginTop: '0px',
  // marginBottom: '0px',
}

const liStyle = {
  display: 'inline-block',
}

export const LocalePicker: React.FC<LocalePickerProps> = ({
  locales,
  currentLocale,
  setLocale,
  className,
}) => (
  <ul style={ulStyle}>
    {locales.map((locale: Locale) => (
      <LocaleTab
        className={className}
        key={locale}
        locale={locale}
        active={R.equals(currentLocale, locale)}
        onClick={(): void => setLocale(locale)}
      />
    ))}
  </ul>
)

const LocaleTab: React.FC<LocaleTabProps> = ({
  locale,
  active,
  onClick,
  className,
}) => (
  <li className={className} style={liStyle}>
    <button className={className} disabled={active} onClick={onClick}>
      {locale}
    </button>
  </li>
)
