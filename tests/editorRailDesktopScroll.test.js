// ABOUTME: Guards the desktop collapsed rail layout in the research editor.
// ABOUTME: Prevents the hidden rail body from introducing a horizontal scrollbar.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const editorRailSource = readFileSync(
  new URL('../src/components/EditorRail.vue', import.meta.url),
  'utf8',
)

test('desktop editor rail hides the rail body while collapsed', () => {
  assert.match(
    editorRailSource,
    /@media \(min-width: 768px\) \{[\s\S]*\.editor-rail:not\(\.is-open\) \.rail-body \{[\s\S]*display:\s*none;/,
  )
})
