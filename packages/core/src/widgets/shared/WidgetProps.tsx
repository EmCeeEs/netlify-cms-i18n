import React from 'react'

export interface WidgetProps {
  value?: any
  forID?: string
  classNameWrapper: string
  onChange: (value: any) => void
  setActiveStyle?: React.FocusEventHandler
  setInactiveStyle?: React.FocusEventHandler
}
