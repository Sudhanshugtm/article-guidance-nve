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
    redlinkExplain: 'This page has not yet been created.',
    redlinkCreate: 'Create page',
    redlinkLeave: 'No, thanks.',
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

  // Coffee article outline section titles and descriptions
  coffeeSections: [
    {
      title: 'Introduction',
      description: 'A short summary of the topic.',
      paragraphs: [
        { title: 'What coffee is', description: 'A brief description of coffee as a drink.' },
        { title: 'Why it matters', description: 'Its place in the world today.' },
      ],
    },
    {
      title: 'History',
      description: 'Where coffee comes from and how it spread.',
      paragraphs: [
        { title: 'Early origins', description: 'How coffee was first discovered and used.' },
        { title: 'Spread around the world', description: 'How coffee reached other continents.' },
      ],
    },
    {
      title: 'The coffee plant',
      description: 'What the plant looks like and where it grows.',
      paragraphs: [
        { title: 'Main varieties', description: 'The most common types of coffee plants.' },
        { title: 'Where it grows', description: 'The climate and regions suited for growing coffee.' },
      ],
    },
    {
      title: 'Preparation',
      description: 'How coffee is prepared as a drink.',
      paragraphs: [],
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
    website: 'Website',
    book: 'Book',
    news: 'News',
    journal: 'Journal',
    basic: 'Basic',
    reuse: 'Re-use',
    reusePlaceholder: 'Search within current citations',
    discover: 'Discover',
    discoverPlaceholder: 'Search citations in other projects',
    filter: 'Filter',
    add: 'Add',
    read: 'Read',
  },

  editChecks: {
    addReference: {
      title: 'Add reference',
      description: 'This paragraph may need a citation before publishing.',
      addCitation: 'Add citation',
      reject: 'No',
      reasonPrompt: 'Why are you not adding a citation?',
      reasonTitle: 'Why are you not adding a citation?',
      reasonDescription: 'Other editors would value learning more about your decision not to add a citation.',
      back: 'Back',
      submit: 'Submit',
      reasons: [
        { id: 'uncertain', label: "I'm not sure what citation to add" },
        { id: 'common-knowledge', label: "The information I'm adding is widely known" },
        { id: 'irrelevant', label: "I don't think citations are relevant to the change I'm making" },
        { id: 'other', label: 'Other' },
      ],
    },
  },

  // Count labels
  counts: {
    reference: 'reference',
    references: 'references',
  },
}
