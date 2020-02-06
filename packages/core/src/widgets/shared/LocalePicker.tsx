import React from 'react'
import { Locale } from '../../i18n/locales'
import * as R from 'ramda'

interface LocalePickerProps {
  locales: Locale[]
  currentLocale: Locale
  setLocale: React.Dispatch<React.SetStateAction<Locale>>
}

interface LocaleTabProps {
  locale: Locale
  active: boolean
  onClick: () => void
}

export const LocalePicker: React.FC<LocalePickerProps> = ({
  locales,
  currentLocale,
  setLocale,
}) => (
  <ul className="nav nav-tabs sticky-top border-0">
    {locales.map((locale: Locale) => (
      <LocaleTab
        key={locale}
        locale={locale}
        active={R.equals(currentLocale, locale)}
        onClick={(): void => setLocale(locale)}
      />
    ))}
  </ul>
)

const LocaleTab: React.FC<LocaleTabProps> = ({ locale, active, onClick }) => (
  <li className="nav-item">
    <button
      className={`nav-link ${active ? 'active' : ''}`}
      disabled={active}
      onClick={onClick}
    >
      {locale}
    </button>
  </li>
)
