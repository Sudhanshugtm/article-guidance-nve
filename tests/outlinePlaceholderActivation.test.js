// ABOUTME: Guards the outline-to-verified-facts handoff in the research editor.
// ABOUTME: Ensures inserted outline placeholders become active for the next + action.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const outlineAccordionSource = readFileSync(
  new URL('../src/components/OutlineAccordionList.vue', import.meta.url),
  'utf8',
)

test('outline paragraph insertion activates the first inserted placeholder for follow-up verified facts', () => {
  assert.match(
    outlineAccordionSource,
    /const\s*\{\s*getEditor,\s*activatePlaceholder\s*\}\s*=\s*useEditorInstance\(\)/,
  )
  assert.match(
    outlineAccordionSource,
    /if \(firstChipPos !== null\) \{[\s\S]*activatePlaceholder\(firstChipPos,\s*editor\)/,
  )
})
