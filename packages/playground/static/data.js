const content = {
  "title": [
    {
      "locale": "en",
      "value": "Once Upon a Time in the West"
    },
    {
      "locale": "de",
      "value": "Spiel mir das Lied vom Tod"
    }
  ],
  "body": [
    {
      "locale": "en",
      "value": "> Once Upon a Time in the West (Italian: C'era una volta il West, \"Once upon a time (there was) the West\") is a 1968 epic Spaghetti Western film directed by Sergio Leone, who co-wrote it with Sergio Donati based on a story by Dario Argento, Bernardo Bertolucci, and Leone. It stars Henry Fonda, cast against type, as the villain, Charles Bronson as his nemesis, Jason Robards as a bandit, and Claudia Cardinale as a newly widowed homesteader. The widescreen cinematography was by Tonino Delli Colli, and the acclaimed film score was by Ennio Morricone.\n\n -- [wikipedia](https://en.wikipedia.org/wiki/Once_Upon_a_Time_in_the_West)"
    },
    {
      "locale": "de",
      "value": "> Spiel mir das Lied vom Tod (Originaltitel: C’era una volta il West; englischer Titel: Once Upon a Time in the West) ist ein von Sergio Leone inszenierter Italowestern aus dem Jahr 1968. Die italienisch-US-amerikanische Koproduktion zählt zu den erfolgreichsten Filmen dieses Genres. Die Uraufführung war am 21. Dezember 1968 in Rom. Der Kinostart in der Bundesrepublik Deutschland war am 14. August 1969. „Spiel mit das Lied vom Tod“ erreichte (2020) Platz 68 auf \"They Shoot Pictures\". Für den online verfügbaren Katalog der 1.000 besten Filme wurden über 9.000 Listen mit Filmkritiken ausgewertet.\n\n -- [wikipedia](https://de.wikipedia.org/wiki/Spiel_mir_das_Lied_vom_Tod)"
    }
  ]
}

export default {
  _data: {
      'home.json': {
        content: JSON.stringify(content, null, 2)
      },
  },
}
