import test from 'tape'
import {
  findTranslation,
  uppendTranslation,
  isTranslationCollection,
  TranslationCollection,
  translate,
  getTranslation,
} from './'

const cat: TranslationCollection<string> = [
  {
    locale: 'de',
    value: 'Katze',
  },
  {
    locale: 'en',
    value: 'cat',
  },
]

test('isTranslationCollection', assert => {
  assert.false(isTranslationCollection([]), 'false for empty arrays')
  assert.false(isTranslationCollection({}), 'false for empty objects')
  assert.true(
    isTranslationCollection(cat),
    'true for arrays of objects with exactly two keys: "locale" and "value"',
  )
  assert.false(
    isTranslationCollection([{ value: 'Katze' }]),
    'false for arrays of objects without "locale" key',
  )
  assert.false(
    isTranslationCollection([{ locale: 'de' }]),
    'false for arrays of objects without "value" key',
  )
  assert.false(
    isTranslationCollection([{ locale: 'de', value: 'Katze', name: 'Paula' }]),
    'false for arrays of objects with more than two keys',
  )
  assert.end()
})

test('getTranslation', assert => {
  assert.equals(getTranslation('en')(cat), 'cat', 'gets existing translation')
  assert.equals(
    getTranslation('es')(cat),
    undefined,
    'returns undefined if translation does not exist',
  )
  assert.end()
})

test('uppendTranslation', assert => {
  assert.deepEqual(
    uppendTranslation('de', 'Kater')(cat),
    [
      {
        locale: 'en',
        value: 'cat',
      },
      {
        locale: 'de',
        value: 'Kater',
      },
    ],
    'uppend (remove existing and append updated) translation for known locale',
  )
  assert.deepEqual(
    uppendTranslation('es', 'gato')(cat),
    [
      {
        locale: 'de',
        value: 'Katze',
      },
      {
        locale: 'en',
        value: 'cat',
      },
      {
        locale: 'es',
        value: 'gato',
      },
    ],
    'adds new translation for unknown locale',
  )
  assert.deepEqual(
    uppendTranslation('de', '')(cat),
    [
      {
        locale: 'en',
        value: 'cat',
      },
    ],
    'removes translation if value is empty string',
  )
  assert.end()
})

test('findTranslation', assert => {
  assert.deepEquals(
    findTranslation(['de', 'en'])(cat),
    'Katze',
    'returns demanded translation',
  )
  assert.equal(
    findTranslation(['es', 'en'])(cat),
    'cat',
    'returns fallback translation',
  )
  assert.equal(
    findTranslation(['de', 'en'])([{ locale: 'es', value: 'gato' }]),
    undefined,
    'returns undefined if no matching translations exist',
  )
  assert.end()
})

test('translate', assert => {
  assert.deepEquals(
    translate(['en'])({ favoriteAnimal: cat }),
    { favoriteAnimal: 'cat' },
    'returns matching translation',
  )
  assert.deepEquals(
    translate(['es'])({ favoriteAnimal: cat }),
    { favoriteAnimal: undefined },
    'by default: no fallback',
  )
  assert.deepEquals(
    translate(['es', 'de-AT', 'de'])({ favoriteAnimal: cat }),
    { favoriteAnimal: 'Katze' },
    'finds fallback locale',
  )

  const persona = {
    name: 'Jahriza Harisson',
    age: 29,
    favoriteAnimal: cat,
    posts: [{ title: 'About a cat.' }],
    logins: { last: '2000-20-04' },
  }
  assert.deepEquals(
    translate(['de'])(persona),
    {
      name: 'Jahriza Harisson',
      age: 29,
      favoriteAnimal: 'Katze',
      posts: [{ title: 'About a cat.' }],
      logins: { last: '2000-20-04' },
    },
    'only translate TranslationCollections',
  )
  assert.end()
})
