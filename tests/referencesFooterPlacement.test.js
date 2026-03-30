// ABOUTME: Guards the research editor behavior once the references section exists.
// ABOUTME: Ensures guided content inserts above the references footer and the footer stays last.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

import { getArticleContentInsertionPos } from '../src/utils/outlineInsertion.js'

const outlineAccordionSource = readFileSync(
  new URL('../src/components/OutlineAccordionList.vue', import.meta.url),
  'utf8',
)

const citationSuperscriptSource = readFileSync(
  new URL('../src/extensions/citationSuperscript.js', import.meta.url),
  'utf8',
)

test('article content insertion position resolves before a references section when present', () => {
  const doc = {
    content: { size: 27 },
    forEach(callback) {
      callback({ type: { name: 'heading' } }, 0)
      callback({ type: { name: 'paragraph' } }, 8)
      callback({ type: { name: 'referencesSection' } }, 19)
    },
  }

  assert.equal(getArticleContentInsertionPos(doc), 19)
})

test('article content insertion position falls back to the document end without references', () => {
  const doc = {
    content: { size: 14 },
    forEach(callback) {
      callback({ type: { name: 'heading' } }, 0)
      callback({ type: { name: 'paragraph' } }, 7)
    },
  }

  assert.equal(getArticleContentInsertionPos(doc), 14)
})

test('outline append-style insertions use the footer-aware insertion helper', () => {
  assert.match(
    outlineAccordionSource,
    /getArticleContentInsertionPos/,
  )
})
