// ABOUTME: Portuguese locale bundle for the article creation prototype.
// ABOUTME: Reading page content is complete; editor sections/facts are placeholders for the team.

export default {
  name: 'Portugu\u00EAs',
  code: 'pt',
  dir: 'ltr',

  // Reading page — Wikipedia article fetched via FakeWiki
  article: {
    wikiBase: 'https://pt.wikipedia.org/',
    title: 'Parques nacionais do Brasil',
    sectionHeading: 'Parques not\u00E1veis',
    listItems: [
      {
        title: 'Parque Nacional da Tijuca',
        exists: true,
        url: 'https://pt.wikipedia.org/wiki/Parque_Nacional_da_Tijuca',
      },
      {
        title: 'Parque Nacional do Igua\u00E7u',
        exists: true,
        url: 'https://pt.wikipedia.org/wiki/Parque_Nacional_do_Igua%C3%A7u',
      },
      {
        title: 'Parque Nacional da Chapada dos Veadeiros',
        exists: true,
        url: 'https://pt.wikipedia.org/wiki/Parque_Nacional_da_Chapada_dos_Veadeiros',
      },
      { title: 'Parque Nacional do Superag\u00FCi', exists: false },
      {
        title: 'Parque Nacional de Jericoacoara',
        exists: true,
        url: 'https://pt.wikipedia.org/wiki/Parque_Nacional_de_Jericoacoara',
      },
    ],
  },

  // UI strings — reading page
  reading: {
    wordmark: 'Wikip\u00E9dia',
    loading: 'Carregando\u2026',
    error: 'N\u00E3o foi poss\u00EDvel carregar o artigo.',
    footer: 'Conte\u00FAdo da Wikip\u00E9dia, a enciclop\u00E9dia livre',
  },

  // UI strings — editor toolbar
  toolbar: {
    close: 'Fechar',
    undo: 'Desfazer',
    styleText: 'Estilo do texto',
    cite: 'Citar',
    link: 'Liga\u00E7\u00E3o',
    switchEditor: 'Mudar editor',
    publish: 'Publicar',
  },

  // UI strings — editor rail
  rail: {
    outline: 'Esbo\u00E7o',
    verifiedFacts: 'Fatos verificados',
    references: 'Refer\u00EAncias',
    close: 'Fechar',
  },

  // Editor content — placeholder sections (team fills in during the week)
  sections: [
    {
      title: 'Introdu\u00E7\u00E3o',
      description: 'Um breve resumo do tema.',
      paragraphs: [
        {
          title: 'Vis\u00E3o geral',
          description: 'Uma breve introdu\u00E7\u00E3o ao tema.',
          content: 'O {{Parque Nacional do Superag\u00FCi}} \u00E9 uma unidade de conserva\u00E7\u00E3o localizada no estado do {{estado}}, Brasil.',
        },
      ],
    },
    {
      title: 'Caracter\u00EDsticas',
      description: 'Tra\u00E7os f\u00EDsicos e apar\u00EAncia.',
      paragraphs: [],
    },
    {
      title: 'Geografia',
      description: 'Onde se localiza e seu ambiente.',
      paragraphs: [],
    },
    {
      title: 'Ecologia',
      description: 'Vida selvagem e biodiversidade.',
    },
  ],

  // Editor content — placeholder facts (team fills in during the week)
  facts: [
    {
      title: 'Parque Nacional do Superag\u00FCi',
      description: 'nome da unidade de conserva\u00E7\u00E3o',
      references: [{ url: 'https://pt.wikipedia.org/wiki/Parque_Nacional_do_Superag%C3%BCi' }],
      wikidataUrl: 'https://www.wikidata.org/wiki/Q2052498',
    },
    {
      title: 'Paran\u00E1',
      description: 'estado',
      references: [{ url: 'https://pt.wikipedia.org/wiki/Paran%C3%A1' }],
      wikidataUrl: 'https://www.wikidata.org/wiki/Q15499',
    },
  ],
}
