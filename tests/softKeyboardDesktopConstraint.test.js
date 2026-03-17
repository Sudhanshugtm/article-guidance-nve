// ABOUTME: Guards the soft keyboard desktop shell constraint.
// ABOUTME: Ensures the desktop keyboard aligns with the centered prototype shell.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const softKeyboardSource = readFileSync(
  new URL('../src/components/SoftKeyboard.vue', import.meta.url),
  'utf8',
)

test('desktop soft keyboard uses the centered editor shell bounds', () => {
  assert.match(
    softKeyboardSource,
    /@media \(min-width: 768px\) \{[\s\S]*\.soft-keyboard-wrapper \{[\s\S]*left:\s*var\(--editor-shell-offset\);[\s\S]*width:\s*var\(--editor-shell-width\);[\s\S]*bottom:\s*16px;[\s\S]*border-bottom-left-radius:\s*24px;[\s\S]*border-bottom-right-radius:\s*24px;/,
  )
})
