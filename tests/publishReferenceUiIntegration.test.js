// ABOUTME: Guards publish-time reference check UI wiring in the research editor.
// ABOUTME: Ensures the publish button emits events and publish-only cards can bypass rail pagination.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const toolbarSource = readFileSync(
  new URL('../src/components/ResearchToolbar.vue', import.meta.url),
  'utf8',
)

const editorViewSource = readFileSync(
  new URL('../src/views/EditorView.vue', import.meta.url),
  'utf8',
)

const editCheckCardSource = readFileSync(
  new URL('../src/components/EditCheckCard.vue', import.meta.url),
  'utf8',
)

const reasonCardSource = readFileSync(
  new URL('../src/components/AddReferenceReasonCard.vue', import.meta.url),
  'utf8',
)

test('research toolbar exposes a publish event from the publish button', () => {
  assert.match(toolbarSource, /defineEmits\(\['cite', 'close', 'publish'\]\)/)
  assert.match(toolbarSource, /research-toolbar__btn--publish[\s\S]*@click="emit\('publish'\)"/)
})

test('shared edit check card can suppress pagination for publish-only checks', () => {
  assert.match(editCheckCardSource, /showPagination:\s*\{\s*type:\s*Boolean,\s*default:\s*true\s*\}/)
  assert.match(
    editCheckCardSource,
    /v-if="showPagination && activeGroupCheckCount > 1"/,
  )
})

test('editor view wires publish through the reference-check flow', () => {
  assert.match(editorViewSource, /<ResearchToolbar[\s\S]*@publish="onPublish"/)
  assert.match(editorViewSource, /<AddReferenceCard[\s\S]*@add-citation="onAddReferenceCitation"/)
  assert.match(editorViewSource, /<AddReferenceReasonCard[\s\S]*@select-reason="onSelectReferenceReason"/)
  assert.match(editorViewSource, /function onPublish\(\)/)
})

test('reference reason card uses a feedback-form layout instead of direct action buttons', () => {
  assert.match(reasonCardSource, /locale\.editChecks\.addReference\.reasonTitle/)
  assert.match(reasonCardSource, /locale\.editChecks\.addReference\.reasonDescription/)
  assert.match(reasonCardSource, /<CdxRadio/)
  assert.match(reasonCardSource, /selectedReason/)
  assert.match(reasonCardSource, /@click="onSubmit"/)
  assert.match(reasonCardSource, /@click="\$emit\('back'\)"/)
  assert.match(reasonCardSource, /:disabled="!selectedReason"/)
})
