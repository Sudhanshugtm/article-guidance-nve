// ABOUTME: Guards against extra blank space when filling a section after staging its heading.
// ABOUTME: Ensures outline paragraph insertion reuses the staged empty paragraph under an H2.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const outlineAccordionSource = readFileSync(
  new URL('../src/components/OutlineAccordionList.vue', import.meta.url),
  'utf8',
)

test('outline paragraph insertion reuses a staged empty section paragraph', () => {
  assert.match(
    outlineAccordionSource,
    /findReusableSectionParagraphRange\(\s*editor\.state\.doc,\s*section\.title,\s*\)/,
  )
  assert.match(
    outlineAccordionSource,
    /if \(reusableSectionParagraph\) \{/,
  )
  assert.match(
    outlineAccordionSource,
    /deleteRange\(\{\s*[\s\S]*from:\s*reusableSectionParagraph\.from,\s*[\s\S]*to:\s*reusableSectionParagraph\.to,\s*[\s\S]*\}\)/,
  )
  assert.match(
    outlineAccordionSource,
    /insertContentAt\(reusableSectionParagraph\.from,\s*paragraphNode\)/,
  )
})

test('outline paragraph insertion adjusts placeholder search positions after removing the initial empty paragraph', () => {
  assert.match(
    outlineAccordionSource,
    /const removedLeadingParagraphSize = firstChild\.nodeSize/,
  )
  assert.match(
    outlineAccordionSource,
    /searchFrom = Math\.max\(0,\s*searchFrom - removedLeadingParagraphSize\)/,
  )
  assert.match(
    outlineAccordionSource,
    /searchTo = Math\.max\(searchFrom,\s*searchTo - removedLeadingParagraphSize\)/,
  )
})
