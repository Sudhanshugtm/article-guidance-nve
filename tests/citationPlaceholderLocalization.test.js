// ABOUTME: Verifies the inline citation placeholder label localizes without coupling behavior to English text.
// ABOUTME: Guards pt/tr placeholder labels and stable placeholder-node detection.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

import {
  getCitationPlaceholderLabel,
  isCitationPlaceholderNode,
} from '../src/utils/citationPlaceholders.js'

test('citation placeholder label follows the active locale bundle', () => {
  assert.equal(getCitationPlaceholderLabel({ cite: { title: 'Add a citation' } }), 'Add a citation')
  assert.equal(
    getCitationPlaceholderLabel({ cite: { title: 'Adicionar uma citação' } }),
    'Adicionar uma citação',
  )
  assert.equal(getCitationPlaceholderLabel({ cite: { title: 'Kaynak ekle' } }), 'Kaynak ekle')
})

test('citation placeholder label falls back to English when cite title is missing', () => {
  assert.equal(getCitationPlaceholderLabel({ cite: {} }), 'Add a citation')
  assert.equal(getCitationPlaceholderLabel({}), 'Add a citation')
})

test('placeholder-node detection uses a stable attribute instead of the English label', () => {
  assert.equal(
    isCitationPlaceholderNode({
      type: { name: 'citationSuperscript' },
      attrs: { label: 'Adicionar uma citação', isPlaceholder: true },
    }),
    true,
  )
  assert.equal(
    isCitationPlaceholderNode({
      type: { name: 'citationSuperscript' },
      attrs: { label: 'Kaynak ekle', isPlaceholder: false },
    }),
    false,
  )
  assert.equal(
    isCitationPlaceholderNode({
      type: { name: 'citationSuperscript' },
      attrs: { label: '1', citationId: 'abc', isPlaceholder: false },
    }),
    false,
  )
})

test('citation placeholder consumers rely on isPlaceholder in the editor flow', async () => {
  const [citationView, factsList, outlineList] = await Promise.all([
    readFile(
      new URL('../src/components/CitationSuperscriptView.vue', import.meta.url),
      'utf8',
    ),
    readFile(
      new URL('../src/components/VerifiedFactsList.vue', import.meta.url),
      'utf8',
    ),
    readFile(
      new URL('../src/components/OutlineAccordionList.vue', import.meta.url),
      'utf8',
    ),
  ])

  assert.match(citationView, /isCitationPlaceholderNode/)
  assert.match(factsList, /isCitationPlaceholderNode/)
  assert.match(outlineList, /getCitationPlaceholderLabel\(locale\.value\)/)
  assert.match(outlineList, /isPlaceholder:\s*true/)
})
