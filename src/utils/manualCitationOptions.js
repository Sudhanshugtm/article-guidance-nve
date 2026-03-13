// ABOUTME: Builds the static manual citation option list from the active locale bundle.
// ABOUTME: Keeps the screenshot-style manual tab localized without adding interaction yet.

const FALLBACK_LABELS = {
  website: 'Website',
  book: 'Book',
  news: 'News',
  journal: 'Journal',
  basic: 'Basic',
}

export function getManualCitationOptionGroups(locale) {
  const cite = locale?.cite ?? {}

  return [
    [
      { id: 'website', label: cite.website || FALLBACK_LABELS.website },
      { id: 'book', label: cite.book || FALLBACK_LABELS.book },
      { id: 'news', label: cite.news || FALLBACK_LABELS.news },
      { id: 'journal', label: cite.journal || FALLBACK_LABELS.journal },
    ],
    [{ id: 'basic', label: cite.basic || FALLBACK_LABELS.basic }],
  ]
}
