// ABOUTME: English UI locale bundle for the article creation prototype.
// ABOUTME: Contains only user-facing chrome strings, not article body content.

import wikipediaWordmarkEnUrl from '@/assets/wikipedia-wordmark-en.svg'

export default {
  // Reading page chrome
  reading: {
    wordmarkUrl: wikipediaWordmarkEnUrl,
    wordmarkAlt: 'Wikipedia',
    mainMenu: 'Main menu',
    search: 'Search',
    tagline: 'From Wikipedia, the free encyclopedia',
    articleTab: 'Article',
    talkTab: 'Talk',
  },

  // Flow pages
  flow: {
    hubSubtitle: 'Select a language to start the article creation flow.',
    openArticleList: 'Open article list',
    back: 'Back',
    articleListSubtitle: 'Select an article to read.',
  },

  // Editor toolbar
  toolbar: {
    close: 'Close',
    undo: 'Undo',
    styleText: 'Style text',
    bold: 'Bold',
    italic: 'Italic',
    cite: 'Cite',
    link: 'Link',
    switchEditor: 'Switch editor',
    publish: 'Publish',
  },

  // Editor entry point
  entryPoint: {
    addContent: 'Add content',
    editorPlaceholder: 'Start writing or tap the +',
    tapPrompt: 'Tap here to continue...',
  },

  // Editor rail / popover navigation
  rail: {
    outline: 'Outline',
    outlineDesc: 'Build off similar articles',
    verifiedFacts: 'Verified facts',
    verifiedFactsDesc: 'From Wikidata',
    references: 'References',
    referencesDesc: 'In other projects',
  },

  // Outline section titles and descriptions (displayed in accordion UI)
  sections: [
    {
      title: 'Introduction',
      description: 'A short summary of the topic.',
      paragraphs: [
        { title: 'Short overview', description: 'A brief introduction to the topic.' },
        { title: 'Taxonomy in brief', description: 'How it is classified scientifically.' },
      ],
    },
    {
      title: 'Characteristics',
      description: 'Physical traits and appearance.',
      paragraphs: [
        { title: 'Body size', description: 'Dimensions and weight of adults.' },
        { title: 'Coat and markings', description: 'Fur colour, stripe pattern and seasonal changes.' },
      ],
    },
    {
      title: 'Distribution and habitat',
      description: 'Where it lives and its environment.',
      paragraphs: [
        { title: 'Geographic range', description: 'Countries and regions where it is found.' },
        { title: 'Preferred habitat', description: 'Types of terrain and vegetation it occupies.' },
      ],
    },
    {
      title: 'Ecology and behaviour',
      description: 'Diet, activity and social behaviour.',
    },
  ],

  // Outline actions
  outline: {
    addSectionLabel: 'Add {section title} section',
  },

  // Cite dialog
  cite: {
    title: 'Add a citation',
    automatic: 'Automatic',
    automaticDesc: 'Enter a link or reference code (ISBN, DOI or other) to create a citation',
    create: 'Create',
    placeholder: 'e.g. http://www.example.com',
    scanIsbn: 'Scan ISBN barcode',
    manual: 'Manual',
    reuse: 'Re-use',
    reusePlaceholder: 'Search within current citations',
    discover: 'Discover',
    discoverPlaceholder: 'Search citations in other projects',
    filter: 'Filter',
    add: 'Add',
    read: 'Read',
  },

  // Count labels
  counts: {
    reference: 'reference',
    references: 'references',
  },
}
