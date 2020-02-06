import React from 'react'

import { WidgetProps } from './WidgetProps'
import { extractAsJS } from './helpers'

export const JSONPreview: React.FC<WidgetProps> = props => {
  const collection = extractAsJS(props.value)

  return <p>{JSON.stringify(collection)}</p>
}
