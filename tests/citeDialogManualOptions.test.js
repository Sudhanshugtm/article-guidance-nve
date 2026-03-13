// ABOUTME: Verifies the cite dialog manual tab exposes the static citation-type layout.
// ABOUTME: Guards locale-backed labels and the non-interactive screenshot-style structure.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import { getManualCitationOptionGroups } from '../src/utils/manualCitationOptions.js'

test('manual citation options localize for supported UI languages', () => {
  assert.deepEqual(
    getManualCitationOptionGroups({
      cite: {
        website: 'Website',
        book: 'Book',
        news: 'News',
        journal: 'Journal',
        basic: 'Basic',
      },
    }),
    [
      [
        { id: 'website', label: 'Website' },
        { id: 'book', label: 'Book' },
        { id: 'news', label: 'News' },
        { id: 'journal', label: 'Journal' },
      ],
      [{ id: 'basic', label: 'Basic' }],
    ],
  )

  assert.deepEqual(
    getManualCitationOptionGroups({
      cite: {
        website: 'Sítio web',
        book: 'Livro',
        news: 'Notícia',
        journal: 'Revista',
        basic: 'Básico',
      },
    })[0].map((item) => item.label),
    ['Sítio web', 'Livro', 'Notícia', 'Revista'],
  )

  assert.deepEqual(
    getManualCitationOptionGroups({
      cite: {
        website: 'Web sitesi',
        book: 'Kitap',
        news: 'Haber',
        journal: 'Dergi',
        basic: 'Temel',
      },
    })[1],
    [{ id: 'basic', label: 'Temel' }],
  )
})

test('manual citation options fall back to English labels when locale keys are missing', () => {
  assert.deepEqual(
    getManualCitationOptionGroups({ cite: {} }),
    [
      [
        { id: 'website', label: 'Website' },
        { id: 'book', label: 'Book' },
        { id: 'news', label: 'News' },
        { id: 'journal', label: 'Journal' },
      ],
      [{ id: 'basic', label: 'Basic' }],
    ],
  )
})

test('manual cite tab renders screenshot-style static layout', async () => {
  const source = await readFile(
    new URL('../src/components/CiteDialog.vue', import.meta.url),
    'utf8',
  )

  assert.match(source, /cite-dialog__manual/)
  assert.match(source, /cite-dialog__manual-grid/)
  assert.match(source, /cite-dialog__manual-divider/)
  assert.match(source, /cite-dialog__manual-option/)
  assert.match(source, /getManualCitationOptionGroups/)
  assert.doesNotMatch(source, /@click=.*manual/)
})
