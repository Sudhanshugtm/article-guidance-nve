// ABOUTME: Portuguese UI locale bundle for the article creation prototype.
// ABOUTME: Contains only user-facing chrome strings, not article body content.

import wikipediaWordmarkPtUrl from '@/assets/wikipedia-wordmark-pt.svg'

export default {
  reading: {
    wordmarkUrl: wikipediaWordmarkPtUrl,
    wordmarkAlt: 'Wikipédia',
    mainMenu: 'Menu principal',
    search: 'Pesquisar',
    tagline: 'Da Wikipédia, a enciclopédia livre',
    articleTab: 'Artigo',
    talkTab: 'Discuss\u00e3o',
    redlinkExplain: 'Esta p\u00e1gina ainda n\u00e3o foi criada.',
    redlinkCreate: 'Criar p\u00e1gina',
    redlinkLeave: 'N\u00e3o, obrigado',
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

  // Coffee article outline section titles, descriptions, and fill-in-the-blank content
  coffeeSections: [
    {
      title: 'Introdução',
      description: 'Um breve resumo do tema.',
      paragraphs: [
        {
          title: 'O que é o café',
          description: 'Uma breve descrição do café como bebida.',
          content: 'O café é uma bebida preparada a partir das sementes torradas da planta {{plant name}}, nativa de {{region of origin}}.[Add a citation] É uma das bebidas mais consumidas no mundo, com cerca de {{number of people}} pessoas a bebê-lo diariamente.[Add a citation]',
        },
        {
          title: 'Por que é importante',
          description: 'O seu lugar no mundo atual.',
          content: 'O café é o segundo {{type of product}} mais comercializado no mundo, depois de {{comparison product}}.[Add a citation] A indústria global do café sustenta a subsistência de aproximadamente {{number of workers}} pessoas em mais de {{number of countries}} países.[Add a citation]',
        },
      ],
    },
    {
      title: 'História',
      description: 'De onde vem o café e como se espalhou.',
      paragraphs: [
        {
          title: 'Origens remotas',
          description: 'Como o café foi descoberto e utilizado pela primeira vez.',
          content: 'O café foi descoberto pela primeira vez em {{country of origin}} por volta do {{century of discovery}}.[Add a citation] Segundo a lenda, um {{occupation of discoverer}} chamado {{figure in the legend}} notou que as suas cabras ficavam invulgarmente enérgicas depois de comerem bagas de uma determinada árvore.[Add a citation]',
        },
        {
          title: 'Expansão pelo mundo',
          description: 'Como o café chegou a outros continentes.',
          content: 'No {{century of spread}}, o café já havia chegado a {{first regions outside origin}} através de rotas comerciais.[Add a citation] Os primeiros cafés europeus abriram em {{first European city}} em {{year or decade}}, e a bebida rapidamente se tornou um elemento social e intelectual em todo o continente.[Add a citation]',
        },
      ],
    },
    {
      title: 'A planta do café',
      description: 'Como é a planta e onde cresce.',
      paragraphs: [
        {
          title: 'Principais variedades',
          description: 'Os tipos mais comuns de plantas de café.',
          content: 'As duas espécies mais cultivadas são {{first species common name}} e {{second species common name}}.[Add a citation] {{First species}} representa cerca de {{percentage}}% da produção mundial e é geralmente considerada como tendo um sabor mais suave e complexo.[Add a citation]',
        },
        {
          title: 'Onde cresce',
          description: 'O clima e as regiões adequados para o cultivo do café.',
          content: 'As plantas de café prosperam em climas {{climate type}} entre os trópicos de {{northern tropic}} e {{southern tropic}}, uma região frequentemente chamada de {{nickname for region}}.[Add a citation] Os maiores países produtores atualmente são {{top producer}}, {{second producer}} e {{third producer}}.[Add a citation]',
        },
      ],
    },
    {
      title: 'Preparação',
      description: 'Como o café é preparado como bebida.',
      paragraphs: [],
    },
  ],

  outline: {
    addSectionLabel: 'Adicionar seção {section title}',
  },

  cite: {
    title: 'Adicionar uma cita\u00e7\u00e3o',
    automatic: 'Autom\u00e1tico',
    automaticDesc: 'Insira um link ou c\u00f3digo de refer\u00eancia (ISBN, DOI ou outro) para criar uma cita\u00e7\u00e3o',
    create: 'Criar',
    placeholder: 'ex. http://www.example.com',
    scanIsbn: 'Ler c\u00f3digo de barras ISBN',
    manual: 'Manual',
    website: 'S\u00edtio web',
    book: 'Livro',
    news: 'Not\u00edcia',
    journal: 'Revista',
    basic: 'B\u00e1sico',
    reuse: 'Reutilizar',
    reusePlaceholder: 'Pesquisar nas cita\u00e7\u00f5es atuais',
    discover: 'Descobrir',
    discoverPlaceholder: 'Pesquisar cita\u00e7\u00f5es em outros projetos',
    filter: 'Filtrar',
    add: 'Adicionar',
    read: 'Ler',
  },

  editChecks: {
    addReference: {
      title: 'Adicionar referência',
      description: 'Este parágrafo pode precisar de uma citação antes de publicar.',
      addCitation: 'Adicionar citação',
      reject: 'Não',
      reasonPrompt: 'Porque não adicionou uma citação?',
      reasonTitle: 'Porque não adicionou uma citação?',
      reasonDescription: 'Os outros editores gostariam de saber mais sobre a sua decisão de não adicionar uma citação.',
      back: 'Anterior',
      submit: 'Submeter',
      reasons: [
        { id: 'uncertain', label: 'Não tenho certeza de que citação adicionar' },
        { id: 'common-knowledge', label: 'A informação que estou a adicionar é muito conhecida' },
        { id: 'irrelevant', label: 'Não acho que as citações sejam relevantes para a mudança que estou a fazer' },
        { id: 'other', label: 'Outra' },
      ],
    },
  },

  counts: {
    reference: 'refer\u00eancia',
    references: 'refer\u00eancias',
  },
}
