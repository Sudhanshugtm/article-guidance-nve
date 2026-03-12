// ABOUTME: Guards the outline rail action visibility in the research editor.
// ABOUTME: Hides add-section affordances on collapsed sections that still have guided content.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const outlineAccordionSource = readFileSync(
  new URL('../src/components/OutlineAccordionList.vue', import.meta.url),
  'utf8',
)

test('outline accordion keeps the add action always visible for every non-introduction section', () => {
  assert.match(
    outlineAccordionSource,
    /function shouldShowSectionAddAction\(section,\s*index\)\s*\{[\s\S]*if \(index === 0\) return false[\s\S]*return isSectionEmpty\(section\) \|\| accordionStates\.value\[index\]/,
  )
  assert.match(
    outlineAccordionSource,
    /:action-icon="shouldShowSectionAddAction\(section,\s*index\) \? cdxIconAdd : null"/,
  )
  assert.match(
    outlineAccordionSource,
    /:action-always-visible="shouldShowSectionAddAction\(section,\s*index\)"/,
  )
  assert.doesNotMatch(outlineAccordionSource, /:action-always-visible="index !== 0"/)
})
