const homeContent = {
  title: [{ locale: 'en', value: 'Hello World!'}, {locale: 'de', value: 'Hallo Welt!' }],
  body: [{locale: 'en', value: 'Hi I like you.'}],
}

export default {
  _data: {
    '_home.json': {
      content: JSON.stringify(homeContent, null, 2),
    },
  },
}
