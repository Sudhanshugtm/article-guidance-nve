// ABOUTME: Tests research-specific editor chrome overrides in the integration branch.
// ABOUTME: Verifies the settings button is hidden by the surrounding research flow.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const editorViewSource = readFileSync(
  new URL('../src/views/EditorView.vue', import.meta.url),
  'utf8',
)
const textEditorSource = readFileSync(
  new URL('../src/components/TextEditor.vue', import.meta.url),
  'utf8',
)
const sharedToolbarSource = readFileSync(
  new URL('../src/components/CdxToolbar.vue', import.meta.url),
  'utf8',
)
const researchToolbarSource = readFileSync(
  new URL('../src/components/ResearchToolbar.vue', import.meta.url),
  'utf8',
)
const editorInstanceSource = readFileSync(
  new URL('../src/composables/useEditorInstance.js', import.meta.url),
  'utf8',
)

test('research editor passes a hidden settings-button override into TextEditor', () => {
  assert.match(editorViewSource, /:show-settings-button="false"/)
})

test('research editor mounts a research-specific toolbar instead of the shared toolbar', () => {
  assert.match(editorViewSource, /<ResearchToolbar[\s\S]*@cite="onOpenCiteDefault"[\s\S]*@close="onCloseEditor"/)
  assert.match(editorViewSource, /import ResearchToolbar from '@\/components\/ResearchToolbar\.vue'/)
  assert.doesNotMatch(editorViewSource, /<CdxToolbar/)
})

test('TextEditor exposes a showSettingsButton prop and gates the settings button with it', () => {
  assert.match(
    textEditorSource,
    /showSettingsButton:\s*\{\s*type:\s*Boolean,\s*default:\s*true,?\s*\}/,
  )
  assert.match(textEditorSource, /<CdxButton\s+v-if="showSettingsButton"[\s\S]*class="settings-btn"/)
})

test('toolbar disables undo until the editor has an undoable change', () => {
  assert.match(researchToolbarSource, /aria-label="Undo"[\s\S]*:disabled="!canUndo"/)
  assert.match(
    researchToolbarSource,
    /const\s*\{\s*hasContent,\s*getEditor,\s*canUndo\s*\}\s*=\s*useEditorInstance\(\)/,
  )
})

test('research toolbar preserves cite badge wiring and adds the limited style menu', () => {
  assert.match(
    researchToolbarSource,
    /defineProps\(\{[\s\S]*citeBadgeCount:\s*\{\s*type:\s*Number,\s*default:\s*0\s*\}/,
  )
  assert.match(researchToolbarSource, /defineEmits\(\['cite', 'close'\]\)/)
  assert.match(researchToolbarSource, /aria-label="Style text"[\s\S]*@click="toggleStyleMenu"/)
  assert.match(researchToolbarSource, /const isBoldActive = ref\(false\)/)
  assert.match(researchToolbarSource, /const isItalicActive = ref\(false\)/)
  assert.match(researchToolbarSource, /function refreshStyleState\(\)/)
  assert.match(researchToolbarSource, />\s*Bold\s*</)
  assert.match(researchToolbarSource, />\s*Italic\s*</)
  assert.doesNotMatch(researchToolbarSource, />\s*Remove\s*</)
  assert.doesNotMatch(researchToolbarSource, />\s*More\s*</)
  assert.match(researchToolbarSource, /toggleBold\(\)\.run\(\)/)
  assert.match(researchToolbarSource, /toggleItalic\(\)\.run\(\)/)
  assert.match(researchToolbarSource, /research-toolbar__btn--active/)
  assert.match(researchToolbarSource, /research-toolbar__style-item--active/)
  assert.match(researchToolbarSource, /width:\s*292px;/)
  assert.match(researchToolbarSource, /background-color:\s*#f0f4ff;/)
  assert.match(researchToolbarSource, /color:\s*#36c;/)
})

test('research style menu relies on the outer popover shell for chrome and sits flush under the trigger', () => {
  assert.doesNotMatch(researchToolbarSource, /border:\s*1px solid #c8ccd1;/)
  assert.match(researchToolbarSource, /:deep\(\.cdx-popover\)\s*\{[\s\S]*padding:\s*0\s*!important;/)
  assert.match(researchToolbarSource, /:deep\(\.cdx-popover\)\s*\{[\s\S]*margin-top:\s*-15px\s*!important;/)
  assert.match(researchToolbarSource, /:deep\(\.cdx-popover__arrow\)\s*\{[\s\S]*display:\s*none\s*!important;/)
})

test('shared toolbar remains available as Amin-style baseline chrome', () => {
  assert.match(sharedToolbarSource, /aria-label="Style text"/)
  assert.match(sharedToolbarSource, /aria-label="Switch editor"/)
})

test('editor instance exposes reactive undo availability and TextEditor keeps it updated', () => {
  assert.match(editorInstanceSource, /const canUndo = ref\(false\)/)
  assert.match(editorInstanceSource, /function updateUndoAvailability\(editor = editorInstance\.value\)/)
  assert.match(editorInstanceSource, /canUndo\.value = editor \? editor\.can\(\)\.undo\(\) : false/)
  assert.match(editorInstanceSource, /setEditor\(editor\)[\s\S]*updateUndoAvailability\(editor\)/)
  assert.match(editorInstanceSource, /canUndo,/)
  assert.match(textEditorSource, /const\s*\{\s*setEditor,\s*hasContent,\s*updateUndoAvailability\s*\}\s*=\s*useEditorInstance\(\)/)
  assert.match(textEditorSource, /onTransaction\(\{ transaction, editor: editorRef \}\)[\s\S]*updateUndoAvailability\(editorRef\)/)
  assert.match(textEditorSource, /if \(editor\.value\) \{[\s\S]*setEditor\(editor\.value\)[\s\S]*updateUndoAvailability\(editor\.value\)/)
})
