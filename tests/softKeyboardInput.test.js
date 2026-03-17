// ABOUTME: Guards the soft keyboard input plumbing for the research editor.
// ABOUTME: Ensures the rendered keyboard has real handlers for typing and layout toggling.

import test from 'node:test'
import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'

const helperModule = await import('../src/utils/softKeyboardInput.js').catch(() => null)

test('soft keyboard input helper exists', () => {
  assert.ok(helperModule, 'Expected softKeyboardInput.js to exist')
})

test('soft keyboard helper inserts and deletes text for focused inputs', () => {
  assert.ok(helperModule, 'Expected softKeyboardInput.js to exist')

  const { applySoftKeyboardInputButton } = helperModule

  assert.deepEqual(
    applySoftKeyboardInputButton(
      { value: 'cofe', selectionStart: 4, selectionEnd: 4 },
      'e',
    ),
    { value: 'cofee', selectionStart: 5, selectionEnd: 5 },
  )

  assert.deepEqual(
    applySoftKeyboardInputButton(
      { value: 'coffee', selectionStart: 6, selectionEnd: 6 },
      '{backspace}',
    ),
    { value: 'coffe', selectionStart: 5, selectionEnd: 5 },
  )

  assert.deepEqual(
    applySoftKeyboardInputButton(
      { value: 'coffee', selectionStart: 0, selectionEnd: 6 },
      '{space}',
    ),
    { value: ' ', selectionStart: 1, selectionEnd: 1 },
  )
})

test('soft keyboard helper toggles shift layout and resets after a character', () => {
  assert.ok(helperModule, 'Expected softKeyboardInput.js to exist')

  const { getNextSoftKeyboardLayout } = helperModule

  assert.equal(getNextSoftKeyboardLayout('default', '{shift}'), 'shift')
  assert.equal(getNextSoftKeyboardLayout('shift', '{shift}'), 'default')
  assert.equal(getNextSoftKeyboardLayout('shift', 'Q'), 'default')
  assert.equal(getNextSoftKeyboardLayout('default', 'q'), 'default')
})

test('soft keyboard component uses real key handlers instead of noop callbacks', async () => {
  const source = await readFile(
    new URL('../src/components/SoftKeyboard.vue', import.meta.url),
    'utf8',
  )

  assert.doesNotMatch(source, /onChange:\s*\(\)\s*=>\s*\{\}/)
  assert.doesNotMatch(source, /onKeyPress:\s*\(\)\s*=>\s*\{\}/)
  assert.match(source, /handleSoftKeyboardPress/)
  assert.match(source, /applySoftKeyboardInputButton/)
})
