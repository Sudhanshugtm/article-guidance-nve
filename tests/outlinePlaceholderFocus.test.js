// ABOUTME: Guards the cursor placement after guided outline insertion in the research editor.
// ABOUTME: Ensures placeholder activation waits to refocus the editor onto the first blank.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const editorInstanceSource = readFileSync(
  new URL('../src/composables/useEditorInstance.js', import.meta.url),
  'utf8',
)

test('placeholder activation defers focus to the first inserted blank before settling active state', () => {
  assert.match(
    editorInstanceSource,
    /function activatePlaceholder\(chipPos,\s*editor = editorInstance\.value\)/,
  )
  assert.match(
    editorInstanceSource,
    /requestAnimationFrame\(\(\) => \{[\s\S]*editor\.commands\.focus\(\)[\s\S]*editor\.commands\.setTextSelection\(targetPos\)[\s\S]*markActivePlaceholderSettled\(\)/,
  )
  assert.doesNotMatch(editorInstanceSource, /editor\.commands\.focus\(targetPos\)/)
})
