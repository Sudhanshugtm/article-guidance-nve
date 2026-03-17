# Publish Reference Check Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a publish-time `Add reference` gate that mimics the production VisualEditor save check closely enough for research, including the `Add citation` / `No` decision and follow-up reason question.

**Architecture:** Keep publish orchestration in `EditorView.vue`, add a small `useReferenceCheck()` composable for deterministic reference-target detection and reference-card state, and reuse the existing `EditCheckCard.vue` shell for the new cards. Do not add a new generalized edit-check framework or a fake publish destination; successful publish remains a local resolved action on the same screen.

**Tech Stack:** Vue 3 composition API, TipTap document inspection, Codex buttons/cards/dialogs, node-based citation placeholder targeting, Node `node:test` regression tests, local-only localization workbench sheet sync.

---

## Chunk 1: Publish Gate Wiring And Deterministic Detection

### Task 1: Add failing tests for publish-time target selection

**Files:**
- Create: `tests/publishReferenceCheck.test.js`
- Reference: `src/utils/citationPlaceholders.js`
- Reference: `src/composables/usePlaceholderDetection.js`
- Reference: `src/composables/useCitationRegistry.js`
- Reference: `docs/superpowers/specs/2026-03-17-publish-reference-check-design.md`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test'
import assert from 'node:assert/strict'

import {
  findFirstPublishPlaceholderTarget,
  findFirstReferenceTarget,
} from '../src/composables/useReferenceCheck.js'

test('citation placeholders outrank uncited paragraphs during publish checks', () => {
  const doc = {
    type: 'doc',
    content: [
      { type: 'paragraph', textContent: 'This is a long uncited paragraph with more than fifty characters in it.' },
      {
        type: 'paragraph',
        content: [
          { type: 'text', text: 'Coffee spread globally.' },
          { type: 'citationSuperscript', attrs: { isPlaceholder: true, citationId: null } },
        ],
      },
    ],
  }

  const target = findFirstReferenceTarget(doc)

  assert.equal(target.kind, 'citation-placeholder')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/publishReferenceCheck.test.js`
Expected: FAIL because `useReferenceCheck.js` and the publish-target helpers do not exist yet.

- [ ] **Step 3: Write minimal detection helpers**

Create `src/composables/useReferenceCheck.js` with pure helper functions first:

```js
export function findFirstPublishPlaceholderTarget(doc) {
  // scan for first placeholderChip in document order
}

export function findFirstReferenceTarget(doc) {
  // stage 1: first citation placeholder
  // stage 2: first qualifying uncited paragraph
}
```

Keep the first pass focused on deterministic scanning and target payload creation:

- `kind`
- `paragraphRange`
- `insertionPos`
- `placeholderPos`

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/publishReferenceCheck.test.js`
Expected: PASS

- [ ] **Step 5: Commit**

```bash
git add tests/publishReferenceCheck.test.js src/composables/useReferenceCheck.js
git commit -m "Add publish reference target detection"
```

### Task 2: Wire the publish button into EditorView

**Files:**
- Modify: `src/components/ResearchToolbar.vue`
- Modify: `src/views/EditorView.vue`
- Create: `tests/publishGateWiring.test.js`

- [ ] **Step 1: Write the failing test**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const toolbarSource = readFileSync(new URL('../src/components/ResearchToolbar.vue', import.meta.url), 'utf8')
const editorViewSource = readFileSync(new URL('../src/views/EditorView.vue', import.meta.url), 'utf8')

test('publish button emits a publish event to EditorView', () => {
  assert.match(toolbarSource, /defineEmits\\(\\['cite', 'close', 'publish'\\]\\)/)
  assert.match(toolbarSource, /@click=\"emit\\('publish'\\)\"/)
  assert.match(editorViewSource, /<ResearchToolbar[\\s\\S]*@publish=\"onPublish\"/)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/publishGateWiring.test.js`
Expected: FAIL because `publish` is not emitted or handled yet.

- [ ] **Step 3: Implement minimal wiring**

In `ResearchToolbar.vue`:

```vue
<CdxButton
  class="research-toolbar__btn research-toolbar__btn--publish"
  action="progressive"
  weight="primary"
  :aria-label="locale.toolbar.publish"
  :disabled="!hasContent"
  @click="emit('publish')"
>
```

In `EditorView.vue`:

- add `@publish="onPublish"` to `ResearchToolbar`
- add `onPublish()` as the only publish entry point
- make `onPublish()` call placeholder gating first, then reference gating, then resolve locally with no navigation

- [ ] **Step 4: Run test to verify it passes**

Run: `node --test tests/publishGateWiring.test.js tests/publishReferenceCheck.test.js`
Expected: PASS

- [ ] **Step 5: Run focused verification**

Run: `npm run build`
Expected: build exits `0`

- [ ] **Step 6: Commit**

```bash
git add src/components/ResearchToolbar.vue src/views/EditorView.vue tests/publishGateWiring.test.js
git commit -m "Wire publish through editor gate sequence"
```

## Chunk 2: Reference Cards And Cite Targeting

### Task 3: Add the reference-check composable state and cards

**Files:**
- Modify: `src/composables/useReferenceCheck.js`
- Create: `src/components/AddReferenceCard.vue`
- Create: `src/components/AddReferenceReasonCard.vue`
- Modify: `src/views/EditorView.vue`
- Test: `tests/publishReferenceCheck.test.js`

- [ ] **Step 1: Extend the failing test for card state**

Add tests covering:

```js
test('choosing no opens the reference reason state', () => {
  const state = createReferenceCheckState()
  state.showReferenceChoice(sampleTarget)
  state.rejectReference()
  assert.equal(state.phase.value, 'awaiting-reference-reason')
})
```

and

```js
test('dismissing the initial card resets the attempt to idle', () => {
  const state = createReferenceCheckState()
  state.showReferenceChoice(sampleTarget)
  state.dismissChoice()
  assert.equal(state.phase.value, 'idle')
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/publishReferenceCheck.test.js`
Expected: FAIL because the state helpers and cards do not exist yet.

- [ ] **Step 3: Implement minimal reference-check state**

In `src/composables/useReferenceCheck.js`, add:

```js
const phase = ref('idle')
const activeTarget = ref(null)
const selectedReason = ref(null)

function showReferenceChoice(target) {
  activeTarget.value = target
  phase.value = 'awaiting-reference-choice'
}

function rejectReference() {
  phase.value = 'awaiting-reference-reason'
}
```

Keep `EditorView` as the top-level owner of when a publish attempt begins or resets.

- [ ] **Step 4: Implement the UI cards**

In `AddReferenceCard.vue`:

- reuse `EditCheckCard`
- title + description
- buttons for `Add citation` and `No`

In `AddReferenceReasonCard.vue`:

- reuse `EditCheckCard`
- question text
- four reason buttons

- [ ] **Step 5: Mount the cards in EditorView**

Add:

```vue
<AddReferenceCard />
<AddReferenceReasonCard />
```

Wire them so:

- `onPublish()` opens the reference choice card when needed
- `Add citation` targets the right location before opening `CiteDialog`
- `No` moves to the reason card
- choosing a reason resolves the local publish attempt

- [ ] **Step 6: Run tests to verify they pass**

Run: `node --test tests/publishReferenceCheck.test.js tests/publishGateWiring.test.js`
Expected: PASS

- [ ] **Step 7: Commit**

```bash
git add src/composables/useReferenceCheck.js src/components/AddReferenceCard.vue src/components/AddReferenceReasonCard.vue src/views/EditorView.vue tests/publishReferenceCheck.test.js
git commit -m "Add publish-time reference check cards"
```

### Task 4: Target cite insertion correctly from publish checks

**Files:**
- Modify: `src/views/EditorView.vue`
- Modify: `src/composables/useReferenceCheck.js`
- Reference: `src/components/CitationSuperscriptView.vue`
- Reference: `src/composables/useCitationRegistry.js`
- Test: `tests/publishReferenceCheck.test.js`

- [ ] **Step 1: Write the failing targeting tests**

Add tests for:

```js
test('publish-found citation placeholder uses placeholderPos for replacement', () => {
  const target = buildCitationPlaceholderTarget({ placeholderPos: 42, paragraphRange: { from: 10, to: 50 } })
  assert.equal(target.placeholderPos, 42)
})

test('publish-found uncited paragraph computes insertion before trailing punctuation', () => {
  const target = buildParagraphEndTarget('Coffee spread globally.', { from: 10, to: 33 })
  assert.equal(target.insertionPos, 32)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/publishReferenceCheck.test.js`
Expected: FAIL until the target helpers and targeting branch exist.

- [ ] **Step 3: Implement targeting in EditorView**

For `citation-placeholder` targets:

```js
setClickedCitationPos(target.placeholderPos)
citeDialogInitialTab.value = 'automatic'
citeDialogOpen.value = true
```

For `paragraph-end` targets:

```js
editor.chain().focus().setTextSelection(target.insertionPos).run()
clearClickedCitationPos()
citeDialogInitialTab.value = 'automatic'
citeDialogOpen.value = true
```

For cite-dialog open failure:

- reset attempt state to `idle`
- leave publish unresolved

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test tests/publishReferenceCheck.test.js`
Expected: PASS

- [ ] **Step 5: Run broader verification**

Run: `node --test tests/publishReferenceCheck.test.js tests/citationPlaceholderLocalization.test.js tests/editorChrome.test.js`
Expected: publish-reference tests pass; note any unrelated existing failures instead of hiding them

- [ ] **Step 6: Commit**

```bash
git add src/views/EditorView.vue src/composables/useReferenceCheck.js tests/publishReferenceCheck.test.js
git commit -m "Target publish reference checks into cite flow"
```

## Chunk 3: Localization, Sheet Draft, And Final Verification

### Task 5: Localize the new reference-check UI

**Files:**
- Modify: `src/config/locales/en.js`
- Modify: `src/config/locales/pt.js`
- Modify: `src/config/locales/tr.js`
- Modify: `tools/localization-workbench/drafts/ui-strings-review.json`
- Create: `tests/publishReferenceCheckLocalization.test.js`

- [ ] **Step 1: Write the failing localization test**

```js
import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const pt = readFileSync(new URL('../src/config/locales/pt.js', import.meta.url), 'utf8')
const tr = readFileSync(new URL('../src/config/locales/tr.js', import.meta.url), 'utf8')

test('pt and tr include publish reference check strings', () => {
  assert.match(pt, /addReference/)
  assert.match(tr, /addReference/)
})
```

- [ ] **Step 2: Run test to verify it fails**

Run: `node --test tests/publishReferenceCheckLocalization.test.js`
Expected: FAIL until the strings are added.

- [ ] **Step 3: Add locale strings**

Add a new locale section with keys for:

- title
- description
- add citation
- no
- rejection question
- four reasons

Keep labels short for buttons and choices.

- [ ] **Step 4: Update the reviewer draft**

Add the same strings to:

- `tools/localization-workbench/drafts/ui-strings-review.json`

Then publish them:

Run: `./tools/localization-workbench/scripts/publish-review-draft.sh`
Expected: `{"ok":true}`

- [ ] **Step 5: Run tests to verify they pass**

Run: `node --test tests/publishReferenceCheckLocalization.test.js tests/publishReferenceCheck.test.js`
Expected: PASS

- [ ] **Step 6: Commit**

```bash
git add src/config/locales/en.js src/config/locales/pt.js src/config/locales/tr.js tests/publishReferenceCheckLocalization.test.js
git commit -m "Localize publish reference check UI"
```

### Task 6: Final verification and scoped push

**Files:**
- Verify: `src/components/ResearchToolbar.vue`
- Verify: `src/views/EditorView.vue`
- Verify: `src/composables/useReferenceCheck.js`
- Verify: `src/components/AddReferenceCard.vue`
- Verify: `src/components/AddReferenceReasonCard.vue`
- Verify: `src/config/locales/en.js`
- Verify: `src/config/locales/pt.js`
- Verify: `src/config/locales/tr.js`
- Verify: `tests/publishReferenceCheck.test.js`
- Verify: `tests/publishReferenceCheckLocalization.test.js`

- [ ] **Step 1: Run focused automated verification**

Run:

```bash
node --test tests/publishReferenceCheck.test.js tests/publishReferenceCheckLocalization.test.js tests/citationPlaceholderLocalization.test.js tests/editorLoadingOverlay.test.js tests/editorRailDesktopScroll.test.js
```

Expected: all listed tests pass

- [ ] **Step 2: Run build**

Run: `npm run build`
Expected: exit `0`

- [ ] **Step 3: Run manual browser verification**

Check in the running dev server:

- no outline, long uncited paragraph, tap `Publish` -> `Add reference`
- outline with unresolved `[Add a citation]` -> `Add reference`
- unresolved `placeholderChip` -> `Complete section`
- `No` -> reason question
- choosing a reason -> publish resolves locally with no navigation
- `Add citation` on placeholder replaces the exact placeholder
- `pt` and `tr` strings render correctly

- [ ] **Step 4: Commit**

```bash
git add src/components/ResearchToolbar.vue src/views/EditorView.vue src/composables/useReferenceCheck.js src/components/AddReferenceCard.vue src/components/AddReferenceReasonCard.vue src/config/locales/en.js src/config/locales/pt.js src/config/locales/tr.js tests/publishReferenceCheck.test.js tests/publishReferenceCheckLocalization.test.js
git commit -m "Add publish-time reference edit check"
```

- [ ] **Step 5: Push only the intended branch**

```bash
git push origin HEAD:research-upstream-integration
```

Expected: push updates `origin/research-upstream-integration` only
