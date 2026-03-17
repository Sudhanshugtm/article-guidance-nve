// ABOUTME: Guards research-only verified fact coverage for the coffee prototype.
// ABOUTME: Ensures each coffee paragraph has at least one supported blank and the list stays concise.

import test from 'node:test'
import assert from 'node:assert/strict'

import { coffeeSections } from '../src/config/coffeeSections.js'
import { coffeeVerifiedFacts } from '../src/config/coffeeVerifiedFacts.js'

const PLACEHOLDER_PATTERN = /\{\{([^}]+)\}\}/g

function extractPlaceholders(text) {
  return [...text.matchAll(PLACEHOLDER_PATTERN)].map((match) => match[1])
}

test('coffee verified facts stay within the research-friendly count range', () => {
  assert.equal(coffeeVerifiedFacts.length >= 12, true)
  assert.equal(coffeeVerifiedFacts.length <= 16, true)
})

test('coffee outline keeps one standalone add-only section for lighter research flows', () => {
  assert.deepEqual(
    coffeeSections.map((section) => section.title),
    ['Introduction', 'History', 'The coffee plant', 'Preparation'],
  )
  assert.deepEqual(coffeeSections.at(-1)?.paragraphs ?? [], [])
})

test('each coffee verified fact declares which blanks it can support', () => {
  for (const fact of coffeeVerifiedFacts) {
    assert.equal(Array.isArray(fact.supports), true, fact.title)
    assert.equal(fact.supports.length > 0, true, fact.title)
  }
})

test('each coffee paragraph has at least one supported placeholder', () => {
  const supportedPlaceholders = new Set(coffeeVerifiedFacts.flatMap((fact) => fact.supports))
  const uncoveredParagraphs = []

  for (const section of coffeeSections) {
    for (const paragraph of section.paragraphs) {
      const placeholders = extractPlaceholders(paragraph.content)
      const hasSupportedPlaceholder = placeholders.some((placeholder) =>
        supportedPlaceholders.has(placeholder),
      )

      if (!hasSupportedPlaceholder) {
        uncoveredParagraphs.push(`${section.title} / ${paragraph.title}`)
      }
    }
  }

  assert.deepEqual(uncoveredParagraphs, [])
})
