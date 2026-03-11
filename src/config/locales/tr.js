// ABOUTME: Turkish UI locale bundle for the article creation prototype.
// ABOUTME: Contains only user-facing chrome strings, not article body content.

import wikipediaWordmarkTrUrl from '@/assets/wikipedia-wordmark-tr.svg'

export default {
  reading: {
    wordmarkUrl: wikipediaWordmarkTrUrl,
    wordmarkAlt: 'Vikipedi',
    mainMenu: 'Ana men\u00fc',
    search: 'Ara',
    tagline: 'Vikipedi, \u00f6zg\u00fcr ansiklopedi',
    articleTab: 'Madde',
    talkTab: 'Tart\u0131\u015fma',
  },

  flow: {
    hubSubtitle: 'Madde olu\u015fturma ak\u0131\u015f\u0131n\u0131 ba\u015flatmak i\u00e7in bir dil se\u00e7in.',
    openArticleList: 'Madde listesini a\u00e7',
    back: 'Geri',
    articleListSubtitle: 'Okumak i\u00e7in bir madde se\u00e7in.',
  },

  toolbar: {
    close: 'Kapat',
    undo: 'Geri al',
    styleText: 'Metin stili',
    bold: 'Kal\u0131n',
    italic: '\u0130talik',
    cite: 'Kaynak',
    link: 'Ba\u011flant\u0131',
    switchEditor: 'D\u00fczenleyici de\u011fi\u015ftir',
    publish: 'Yay\u0131mla',
  },

  entryPoint: {
    addContent: '\u0130\u00e7erik ekle',
    editorPlaceholder: 'Yazmaya ba\u015flay\u0131n veya + simgesine dokunun',
    tapPrompt: 'Devam etmek i\u00e7in buraya dokunun\u2026',
  },

  rail: {
    outline: 'Ana hat',
    outlineDesc: 'Benzer maddelerden yararlan\u0131n',
    verifiedFacts: 'Do\u011frulanm\u0131\u015f bilgiler',
    verifiedFactsDesc: "Vikiveri'den",
    references: 'Kaynaklar',
    referencesDesc: 'Di\u011fer projelerde',
  },

  // Outline section titles and descriptions
  sections: [
    {
      title: 'Giri\u015f',
      description: 'Konunun k\u0131sa bir \u00f6zeti.',
      paragraphs: [
        { title: 'K\u0131sa genel bak\u0131\u015f', description: 'Konuya k\u0131sa bir giri\u015f.' },
        { title: 'K\u0131saca taksonomi', description: 'Bilimsel olarak nas\u0131l s\u0131n\u0131fland\u0131r\u0131l\u0131r.' },
      ],
    },
    {
      title: '\u00d6zellikler',
      description: 'Fiziksel \u00f6zellikler ve g\u00f6r\u00fcn\u00fcm.',
      paragraphs: [
        { title: 'V\u00fccut boyutu', description: 'Yeti\u015fkinlerin boyutlar\u0131 ve a\u011f\u0131rl\u0131\u011f\u0131.' },
        { title: 'K\u00fcrk ve i\u015faretler', description: 'K\u00fcrk rengi, \u00e7izgi deseni ve mevsimsel de\u011fi\u015fimler.' },
      ],
    },
    {
      title: 'Da\u011f\u0131l\u0131m ve ya\u015fam alan\u0131',
      description: 'Nerede ya\u015far ve \u00e7evresi.',
      paragraphs: [
        { title: 'Co\u011frafi da\u011f\u0131l\u0131m', description: 'Bulundu\u011fu \u00fclkeler ve b\u00f6lgeler.' },
        { title: 'Tercih edilen ya\u015fam alan\u0131', description: 'Ya\u015fad\u0131\u011f\u0131 arazi ve bitki \u00f6rt\u00fcs\u00fc t\u00fcrleri.' },
      ],
    },
    {
      title: 'Ekoloji ve davran\u0131\u015f',
      description: 'Beslenme, aktivite ve sosyal davran\u0131\u015f.',
    },
  ],

  outline: {
    addSectionLabel: '{section title} b\u00f6l\u00fcm\u00fcn\u00fc ekle',
  },

  cite: {
    title: 'Kaynak ekle',
    automatic: 'Otomatik',
    automaticDesc: 'Kaynak olu\u015fturmak i\u00e7in bir ba\u011flant\u0131 veya referans kodu (ISBN, DOI vb.) girin',
    create: 'Olu\u015ftur',
    placeholder: '\u00f6r. http://www.example.com',
    scanIsbn: 'ISBN barkodunu tara',
    manual: 'Manuel',
    reuse: 'Yeniden kullan',
    reusePlaceholder: 'Mevcut kaynaklar i\u00e7inde ara',
    discover: 'Ke\u015ffet',
    discoverPlaceholder: 'Di\u011fer projelerde kaynak ara',
    filter: 'Filtrele',
    add: 'Ekle',
    read: 'Oku',
  },

  counts: {
    reference: 'kaynak',
    references: 'kaynak',
  },
}
