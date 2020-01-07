import { Union } from 'ts-toolbelt'
import { TranslationCollection } from './lib'

// In this file we explore the possibilty to localize a
// tree with primitive values as leaves by localiing each leaf.

type Leaf = string | number | boolean

interface Translation<T> {
  locale: string
  value: T
}

type LocalizedLeaf = Translation<Leaf>[]

type Tree = {
  [key: string]: Leaf | Tree
}

interface LocalizedTree {
  [key: string]: LocalizedLeaf | LocalizedTree
}

// Recursive types are supported only since typescript 3.7
// https://github.com/microsoft/TypeScript/pull/33050

// Fix 'Index signature is missing in type' when using 'extends Tree'
type AsLocalized<O extends object> = {
  [K in keyof O]: O[K] extends object
    ? AsLocalized<O[K]>
    : Union.Replace<O[K], Leaf, TranslationCollection<O[K]>>
}

type AsTranslated<O extends object> = {
  [K in keyof O]: O[K] extends TranslationCollection<infer T>
    ? Union.Replace<O[K], TranslationCollection<T>, T>
    : O[K] extends object
    ? AsTranslated<O[K]>
    : never
}

// tests
interface Hero {
  title: string
  meta: {
    description: string
    keys: string
  }
}

interface LocalizedHero extends AsLocalized<Hero> {
  title: TranslationCollection<string>
  meta: {
    description: TranslationCollection<string>
    keys: TranslationCollection<string>
  }
}

export const hero: AsTranslated<LocalizedHero> = {
  title: 'myTitle',
  meta: {
    description: 'hero section',
    keys: 'webpage',
  },
}

export const localizedHero: AsLocalized<Hero> = {
  title: [{ locale: 'en', value: 'myTitle' }],
  meta: {
    description: [{ locale: 'en', value: 'hero section' }],
    keys: [{ locale: 'en', value: 'webpage' }],
  },
}
