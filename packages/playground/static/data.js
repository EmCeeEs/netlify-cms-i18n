const homeContent = {
  title: { en: 'Hello World!', de: 'Hallo Welt!' },
}

export default {
  _data: {
    '_home.json': {
      content: JSON.stringify(homeContent, null, 2),
    },
  },
}
