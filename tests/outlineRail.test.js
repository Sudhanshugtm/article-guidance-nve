// ABOUTME: Guards the outline rail action visibility in the research editor.
// ABOUTME: Keeps the add-section affordance consistently visible on all addable sections.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const outlineAccordionSource = readFileSync(
  new URL('../src/components/OutlineAccordionList.vue', import.meta.url),
  'utf8',
)

test('outline accordion keeps the add action always visible for every non-introduction section', () => {
  assert.match(outlineAccordionSource, /:action-icon="index === 0 \? null : cdxIconAdd"/)
  assert.match(outlineAccordionSource, /:action-always-visible="index !== 0"/)
  assert.doesNotMatch(outlineAccordionSource, /:action-always-visible="index !== 0 && isSectionEmpty\(section\)"/)
})
