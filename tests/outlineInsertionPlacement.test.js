// ABOUTME: Guards outline insertions while a different placeholder is still active.
// ABOUTME: Ensures section adds append at document end and clear stale placeholder context first.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const outlineAccordionSource = readFileSync(
  new URL('../src/components/OutlineAccordionList.vue', import.meta.url),
  'utf8',
)

test('outline insertions clear any previously active placeholder before mutating the document', () => {
  assert.match(
    outlineAccordionSource,
    /const\s*\{\s*clearActivePlaceholder\s*\}\s*=\s*usePlaceholderInteraction\(\)/,
  )
  assert.match(
    outlineAccordionSource,
    /function onInsertSectionHeading\(section,\s*index\)\s*\{[\s\S]*clearActivePlaceholder\(\)/,
  )
  assert.match(
    outlineAccordionSource,
    /function onInsertParagraph\(section,\s*index,\s*paragraph\)\s*\{[\s\S]*clearActivePlaceholder\(\)/,
  )
})

test('outline section heading insertion appends at the end of the document instead of splitting the active paragraph', () => {
  assert.match(
    outlineAccordionSource,
    /function onInsertSectionHeading\(section,\s*index\)\s*\{[\s\S]*const editor = getEditor\(\)[\s\S]*const endPos = editor\.state\.doc\.content\.size[\s\S]*insertContentAt\(endPos,/,
  )
  assert.doesNotMatch(
    outlineAccordionSource,
    /insertContent\(`<h2>\$\{section\.title\}<\/h2><p><\/p>`\)/,
  )
})
