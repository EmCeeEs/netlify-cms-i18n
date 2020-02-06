import * as R from 'ramda'
import { isImmutable, fromJS } from 'immutable'
import { TranslationCollection } from '@netlify-cms-i18n/i18n'

const toJS = (value: any) => value.toJS()

export const extractAsJS: (value: any) => TranslationCollection<any> = R.cond([
  [R.isNil, R.always([])],
  [isImmutable, toJS],
  [R.T, R.identity],
])

export { fromJS }
