// ABOUTME: Wikimedia sister project sources for Coffee (Discover tab in CiteDialog).
// ABOUTME: Mirrors referenceSources.js structure with source cards and individual references.

export const coffeeReferenceSources = [
  {
    id: 'commons',
    title: 'Commons',
    description: 'Free media collection',
    locales: {
      pt: {
        title: 'Wikimedia Commons',
        description: 'Coleção de multimédia livre',
        references: {
          'ico-history':
            'Organização Internacional do Café. "A história do café". ico.org. Consultado em 2024.',
          'fao-production-2023':
            'Organização das Nações Unidas para a Alimentação e a Agricultura (2023). "Estatísticas de produção de café". Base de dados FAOSTAT.',
        },
      },
      tr: {
        title: 'Wikimedia Commons',
        description: 'Ücretsiz medya koleksiyonu',
        references: {
          'ico-history':
            'Uluslararası Kahve Organizasyonu. "Kahvenin Hikâyesi". ico.org. 2024 yılında erişildi.',
          'fao-production-2023':
            'Birleşmiş Milletler Gıda ve Tarım Örgütü (2023). "Kahve üretim istatistikleri". FAOSTAT veritabanı.',
        },
      },
    },
    url: 'https://commons.wikimedia.org/wiki/Category:Coffee',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/4a/Commons-logo.svg',
    references: [
      {
        id: 'ico-history',
        text: 'International Coffee Organization. "The Story of Coffee". ico.org. Retrieved 2024.',
      },
      {
        id: 'fao-production-2023',
        text: 'Food and Agriculture Organization of the United Nations (2023). "Coffee production statistics". FAOSTAT database.',
      },
    ],
  },
  {
    id: 'wikidata',
    title: 'Wikidata',
    description: 'Free knowledge base',
    locales: {
      pt: {
        title: 'Wikidata',
        description: 'Base de conhecimento livre',
        references: {
          'britannica-coffee':
            'Encyclopaedia Britannica. "Café: planta, bebida e mercadoria". britannica.com.',
        },
      },
      tr: {
        title: 'Vikiveri',
        description: 'Özgür bilgi tabanı',
        references: {
          'britannica-coffee':
            'Encyclopaedia Britannica. "Kahve: bitki, içecek ve emtia". britannica.com.',
        },
      },
    },
    url: 'https://www.wikidata.org/wiki/Q8486',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Wikidata-logo.svg',
    references: [
      {
        id: 'britannica-coffee',
        text: 'Encyclopaedia Britannica. "Coffee: plant, beverage, and commodity". britannica.com.',
      },
    ],
  },
  {
    id: 'wiktionary',
    title: 'Wiktionary',
    description: 'Free dictionary',
    locales: {
      pt: {
        title: 'Wikcionário',
        description: 'Dicionário livre',
        references: {
          'etymology-ottoman':
            'Do turco otomano قهوه (kahve), do árabe قَهْوَة (qahwa). Primeira ocorrência em inglês em 1582.',
        },
      },
      tr: {
        title: 'Vikisözlük',
        description: 'Özgür sözlük',
        references: {
          'etymology-ottoman':
            'Osmanlı Türkçesi قهوه (kahve) sözcüğünden, o da Arapça قَهْوَة (qahwa) kelimesinden gelir. İngilizcede ilk kullanım 1582 yılında görülür.',
        },
      },
    },
    url: 'https://en.wiktionary.org/wiki/coffee',
    thumbnailUrl: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Wiktionary-logo.svg',
    references: [
      {
        id: 'etymology-ottoman',
        text: 'From Ottoman Turkish قهوه (kahve), from Arabic قَهْوَة (qahwa). First attested in English in 1582.',
      },
    ],
  },
]
