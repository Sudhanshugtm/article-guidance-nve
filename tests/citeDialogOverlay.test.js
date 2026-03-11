// ABOUTME: Guards the desktop cite dialog overlay behavior.
// ABOUTME: Prevents the closed dialog shell from intercepting editor clicks.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const citeDialogSource = readFileSync(
  new URL('../src/components/CiteDialog.vue', import.meta.url),
  'utf8',
)

test('desktop cite dialog wrapper is non-interactive until the dialog content is rendered', () => {
  assert.match(
    citeDialogSource,
    /@media \(min-width: 768px\) \{[\s\S]*\.cite-dialog\s*\{[\s\S]*position:\s*absolute;[\s\S]*inset:\s*0;[\s\S]*pointer-events:\s*none;/,
  )
  assert.match(
    citeDialogSource,
    /\.cite-dialog :deep\(\.cdx-dialog-backdrop\)\s*\{[\s\S]*pointer-events:\s*auto\s*!important;/,
  )
  assert.match(
    citeDialogSource,
    /\.cite-dialog :deep\(\.cdx-dialog\)\s*\{[\s\S]*pointer-events:\s*auto\s*!important;/,
  )
})
