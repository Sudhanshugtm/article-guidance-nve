// ABOUTME: Guards the shared desktop constraint for editor check cards.
// ABOUTME: Ensures paste/tone/placeholder cards align to the centered prototype shell.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const editCheckCardSource = readFileSync(
  new URL('../src/components/EditCheckCard.vue', import.meta.url),
  'utf8',
)

test('desktop check cards use the centered editor shell width and offset', () => {
  assert.match(
    editCheckCardSource,
    /@media \(min-width: 768px\) \{[\s\S]*\.edit-check-card \{[\s\S]*left:\s*var\(--editor-shell-offset\);[\s\S]*width:\s*var\(--editor-shell-width\);/,
  )
})
