// ABOUTME: Verifies publish-time reference checks scan ProseMirror-style docs deterministically.
// ABOUTME: Guards placeholder, citation-placeholder, and uncited-paragraph selection for publish.

import test from 'node:test'
import assert from 'node:assert/strict'
import { Schema } from '@tiptap/pm/model'

import {
  buildCitationPlaceholderTarget,
  buildParagraphEndTarget,
  findFirstCitationPlaceholderTarget,
  findFirstPublishPlaceholderTarget,
  findFirstQualifyingUncitedParagraphTarget,
  findFirstReferenceTarget,
} from '../src/composables/useReferenceCheck.js'

const schema = new Schema({
  nodes: {
    doc: { content: 'block+' },
    paragraph: { group: 'block', content: 'inline*' },
    heading: { group: 'block', content: 'inline*' },
    blockquote: { group: 'block', content: 'block+' },
    text: { group: 'inline' },
    placeholderChip: {
      group: 'inline',
      inline: true,
      atom: true,
      attrs: {
        label: { default: '' },
      },
    },
    citationSuperscript: {
      group: 'inline',
      inline: true,
      atom: true,
      attrs: {
        label: { default: 'Add a citation' },
        citationId: { default: null },
        isPlaceholder: { default: false },
      },
    },
  },
})

function doc(...content) {
  return schema.node('doc', null, content)
}

function paragraph(...content) {
  return schema.node('paragraph', null, normalizeInline(content))
}

function heading(...content) {
  return schema.node('heading', null, normalizeInline(content))
}

function blockquote(...content) {
  return schema.node('blockquote', null, content)
}

function placeholderChip(label) {
  return schema.node('placeholderChip', { label })
}

function citationPlaceholder(attrs = {}) {
  return schema.node('citationSuperscript', {
    label: 'Add a citation',
    citationId: null,
    isPlaceholder: true,
    ...attrs,
  })
}

function citation(attrs = {}) {
  return schema.node('citationSuperscript', {
    label: '1',
    citationId: 'cite-1',
    isPlaceholder: false,
    ...attrs,
  })
}

function normalizeInline(content) {
  return content.map((item) => (typeof item === 'string' ? schema.text(item) : item))
}

function findNodePos(node, predicate) {
  let match = null

  node.descendants((child, pos) => {
    if (match !== null) return false
    if (!predicate(child, pos)) return true
    match = pos
    return false
  })

  return match
}

function findTopLevelChildPos(node, index) {
  let childPos = null

  node.forEach((_child, offset, childIndex) => {
    if (childIndex === index) {
      childPos = offset
      return false
    }

    return true
  })

  return childPos
}

test('publish placeholder detection returns the first unresolved placeholder chip in document order', () => {
  const articleDoc = doc(
    paragraph('Intro paragraph without placeholders.'),
    paragraph('First unresolved ', placeholderChip('citation needed'), ' chip.'),
    paragraph('Later unresolved ', placeholderChip('expand this'), ' chip.'),
  )

  const target = findFirstPublishPlaceholderTarget(articleDoc)
  const paragraphPos = findTopLevelChildPos(articleDoc, 1)

  assert.deepEqual(target, {
    chipPos: findNodePos(articleDoc, (node) => node.type.name === 'placeholderChip'),
    paragraphPos,
    paragraphRange: {
      from: paragraphPos + 1,
      to: paragraphPos + articleDoc.child(1).nodeSize - 1,
    },
  })
})

test('citation placeholder detection uses stable placeholder attributes instead of the visible label', () => {
  const articleDoc = doc(
    paragraph('Resolved claim.', citation()),
    paragraph(
      'Coffee spread globally through colonial trade routes.',
      citationPlaceholder({ label: 'Adicionar uma citação' }),
    ),
  )

  const target = findFirstCitationPlaceholderTarget(articleDoc)
  const placeholderPos = findNodePos(
    articleDoc,
    (node) =>
      node.type.name === 'citationSuperscript' &&
      node.attrs.isPlaceholder === true &&
      node.attrs.label === 'Adicionar uma citação',
  )
  const paragraphPos = findTopLevelChildPos(articleDoc, 1)

  assert.deepEqual(target, buildCitationPlaceholderTarget({
    placeholderPos,
    paragraphRange: {
      from: paragraphPos + 1,
      to: paragraphPos + articleDoc.child(1).nodeSize - 1,
    },
  }))
})

test('citation placeholders outrank uncited paragraphs during publish checks', () => {
  const articleDoc = doc(
    paragraph('This is a long uncited paragraph with more than fifty characters in it.'),
    paragraph(
      'Coffee spread globally.',
      citationPlaceholder({ label: 'Kaynak ekle' }),
    ),
  )

  const target = findFirstReferenceTarget(articleDoc)

  assert.equal(target.kind, 'citation-placeholder')
})

test('qualifying uncited paragraph detection only considers root-level paragraphs without citations', () => {
  const articleDoc = doc(
    heading('This heading is long but should never qualify for the publish reference check.'),
    paragraph('Too short to qualify.'),
    paragraph(
      'This paragraph already has a citation and should be skipped during publish checks.',
      citation(),
    ),
    paragraph(
      'This paragraph has a localized placeholder and should be surfaced as a placeholder instead.',
      citationPlaceholder({ label: 'Adicionar uma citação' }),
    ),
    blockquote(
      paragraph(
        'This nested paragraph is long enough to qualify but must be ignored because it is not a root-level paragraph.',
      ),
    ),
    paragraph(
      'This qualifying root-level paragraph has enough plain text to require a reference before publishing.',
    ),
  )

  const target = findFirstQualifyingUncitedParagraphTarget(articleDoc)
  const paragraphPos = findTopLevelChildPos(articleDoc, 5)

  assert.deepEqual(target, {
    kind: 'paragraph-end',
    paragraphRange: {
      from: paragraphPos + 1,
      to: paragraphPos + articleDoc.child(5).nodeSize - 1,
    },
    insertionPos: paragraphPos + articleDoc.child(5).nodeSize - 2,
    placeholderPos: null,
  })
})

test('paragraph-end targets insert before trailing punctuation', () => {
  assert.deepEqual(
    buildParagraphEndTarget('Coffee spread globally.', { from: 10, to: 33 }),
    {
      kind: 'paragraph-end',
      paragraphRange: { from: 10, to: 33 },
      insertionPos: 32,
      placeholderPos: null,
    },
  )
})
