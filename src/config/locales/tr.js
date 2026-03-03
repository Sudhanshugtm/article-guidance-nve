// ABOUTME: Turkish locale bundle for the article creation prototype.
// ABOUTME: Reading page content is complete; editor sections/facts are placeholders for the team.

export default {
  name: 'T\u00FCrk\u00E7e',
  code: 'tr',
  dir: 'ltr',

  // Reading page — Wikipedia article fetched via FakeWiki
  article: {
    wikiBase: 'https://tr.wikipedia.org/',
    title: 'T\u00FCrkiye\'deki mill\u00EE parklar listesi',
    sectionHeading: '\u00D6nemli parklar',
    listItems: [
      {
        title: 'G\u00F6reme Tarih\u00EE Mill\u00EE Park\u0131',
        exists: true,
        url: 'https://tr.wikipedia.org/wiki/G%C3%B6reme_Tarih%C3%AE_Mill%C3%AE_Park%C4%B1',
      },
      {
        title: 'Olimpos Beyda\u011Flar\u0131 Mill\u00EE Park\u0131',
        exists: true,
        url: 'https://tr.wikipedia.org/wiki/Olimpos_Beyda%C4%9Flar%C4%B1',
      },
      {
        title: 'Dilek Yar\u0131madas\u0131 Mill\u00EE Park\u0131',
        exists: true,
        url: 'https://tr.wikipedia.org/wiki/Dilek_Yar%C4%B1madas%C4%B1-B%C3%BCy%C3%BCk_Menderes_Deltas%C4%B1_Milli_Park%C4%B1',
      },
      { title: 'Alt\u0131ndere Vadisi Mill\u00EE Park\u0131', exists: false },
      {
        title: 'Kovada G\u00F6l\u00FC Mill\u00EE Park\u0131',
        exists: true,
        url: 'https://tr.wikipedia.org/wiki/Kovada_G%C3%B6l%C3%BC_Milli_Park%C4%B1',
      },
    ],
  },

  // UI strings — reading page
  reading: {
    wordmark: 'Vikipedi',
    loading: 'Y\u00FCkleniyor\u2026',
    error: 'Madde y\u00FCklenemedi.',
    footer: 'Vikipedi, \u00F6zg\u00FCr ansiklopediden i\u00E7erik',
  },

  // UI strings — editor toolbar
  toolbar: {
    close: 'Kapat',
    undo: 'Geri al',
    styleText: 'Metin stili',
    cite: 'Kaynak',
    link: 'Ba\u011Flant\u0131',
    switchEditor: 'D\u00FCzenleyici de\u011Fi\u015Ftir',
    publish: 'Yay\u0131mla',
  },

  // UI strings — editor rail
  rail: {
    outline: 'Ana hat',
    verifiedFacts: 'Do\u011Frulanm\u0131\u015F bilgiler',
    references: 'Kaynaklar',
    close: 'Kapat',
  },

  // Editor content — placeholder sections (team fills in during the week)
  sections: [
    {
      title: 'Giri\u015F',
      description: 'Konunun k\u0131sa \u00F6zeti.',
      paragraphs: [
        {
          title: 'K\u0131sa genel bak\u0131\u015F',
          description: 'Konuya k\u0131sa bir giri\u015F.',
          content: '{{Alt\u0131ndere Vadisi Mill\u00EE Park\u0131}}, T\u00FCrkiye\'nin {{il}} ilinde yer alan bir mill\u00EE parkt\u0131r.',
        },
      ],
    },
    {
      title: '\u00D6zellikler',
      description: 'Fiziksel \u00F6zellikler ve g\u00F6r\u00FCn\u00FCm.',
      paragraphs: [],
    },
    {
      title: 'Co\u011Frafya',
      description: 'Nerede bulundu\u011Fu ve \u00E7evresi.',
      paragraphs: [],
    },
    {
      title: 'Ekoloji',
      description: 'Do\u011Fal ya\u015Fam ve biyolojik \u00E7e\u015Fitlilik.',
    },
  ],

  // Editor content — placeholder facts (team fills in during the week)
  facts: [
    {
      title: 'Alt\u0131ndere Vadisi',
      description: 'mill\u00EE park ad\u0131',
      references: [{ url: 'https://tr.wikipedia.org/wiki/Alt%C4%B1ndere_Vadisi_Milli_Park%C4%B1' }],
      wikidataUrl: 'https://www.wikidata.org/wiki/Q2180816',
    },
    {
      title: 'Trabzon',
      description: 'il',
      references: [{ url: 'https://tr.wikipedia.org/wiki/Trabzon' }],
      wikidataUrl: 'https://www.wikidata.org/wiki/Q132852',
    },
  ],
}
