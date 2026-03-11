// ABOUTME: Portuguese UI locale bundle for the article creation prototype.
// ABOUTME: Contains only user-facing chrome strings, not article body content.

import wikipediaWordmarkPtUrl from '@/assets/wikipedia-wordmark-pt.svg'

export default {
  reading: {
    wordmarkUrl: wikipediaWordmarkPtUrl,
    wordmarkAlt: 'Wikipédia',
    mainMenu: 'Menu principal',
    search: 'Pesquisar',
    tagline: 'Origem: Wikip\u00e9dia, a enciclop\u00e9dia livre',
    articleTab: 'Artigo',
    talkTab: 'Discuss\u00e3o',
  },

  flow: {
    hubSubtitle: 'Selecione um idioma para iniciar o fluxo de cria\u00e7\u00e3o de artigos.',
    openArticleList: 'Abrir lista de artigos',
    back: 'Voltar',
    articleListSubtitle: 'Selecione um artigo para ler.',
  },

  toolbar: {
    close: 'Fechar',
    undo: 'Desfazer',
    styleText: 'Estilo do texto',
    bold: 'Negrito',
    italic: 'It\u00e1lico',
    cite: 'Citar',
    link: 'Liga\u00e7\u00e3o',
    switchEditor: 'Mudar editor',
    publish: 'Publicar',
  },

  entryPoint: {
    addContent: 'Adicionar conte\u00fado',
    editorPlaceholder: 'Comece a escrever ou toque no +',
    tapPrompt: 'Toque aqui para continuar\u2026',
  },

  rail: {
    outline: 'Esbo\u00e7o',
    outlineDesc: 'Baseie-se em artigos semelhantes',
    verifiedFacts: 'Fatos verificados',
    verifiedFactsDesc: 'Do Wikidata',
    references: 'Refer\u00eancias',
    referencesDesc: 'Em outros projetos',
  },

  // Outline section titles and descriptions
  sections: [
    {
      title: 'Introdu\u00e7\u00e3o',
      description: 'Um breve resumo do tema.',
      paragraphs: [
        { title: 'Vis\u00e3o geral', description: 'Uma breve introdu\u00e7\u00e3o ao tema.' },
        { title: 'Taxonomia resumida', description: 'Como \u00e9 classificado cientificamente.' },
      ],
    },
    {
      title: 'Caracter\u00edsticas',
      description: 'Tra\u00e7os f\u00edsicos e apar\u00eancia.',
      paragraphs: [
        { title: 'Tamanho corporal', description: 'Dimens\u00f5es e peso dos adultos.' },
        { title: 'Pelagem e marca\u00e7\u00f5es', description: 'Cor da pelagem, padr\u00e3o de listras e mudan\u00e7as sazonais.' },
      ],
    },
    {
      title: 'Distribui\u00e7\u00e3o e habitat',
      description: 'Onde vive e seu ambiente.',
      paragraphs: [
        { title: 'Distribui\u00e7\u00e3o geogr\u00e1fica', description: 'Pa\u00edses e regi\u00f5es onde \u00e9 encontrado.' },
        { title: 'Habitat preferido', description: 'Tipos de terreno e vegeta\u00e7\u00e3o que ocupa.' },
      ],
    },
    {
      title: 'Ecologia e comportamento',
      description: 'Dieta, atividade e comportamento social.',
    },
  ],

  outline: {
    addSectionLabel: 'Adicionar se\u00e7\u00e3o {section title}',
  },

  cite: {
    title: 'Adicionar uma cita\u00e7\u00e3o',
    automatic: 'Autom\u00e1tico',
    automaticDesc: 'Insira um link ou c\u00f3digo de refer\u00eancia (ISBN, DOI ou outro) para criar uma cita\u00e7\u00e3o',
    create: 'Criar',
    placeholder: 'ex. http://www.example.com',
    scanIsbn: 'Ler c\u00f3digo de barras ISBN',
    manual: 'Manual',
    reuse: 'Reutilizar',
    reusePlaceholder: 'Pesquisar nas cita\u00e7\u00f5es atuais',
    discover: 'Descobrir',
    discoverPlaceholder: 'Pesquisar cita\u00e7\u00f5es em outros projetos',
    filter: 'Filtrar',
    add: 'Adicionar',
    read: 'Ler',
  },

  counts: {
    reference: 'refer\u00eancia',
    references: 'refer\u00eancias',
  },
}
