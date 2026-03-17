# Publish-Time Reference Check Design

## Context

The research prototype already has three local edit checks in the editor:

- `Pasted content`
- `Revise Tone`
- `Complete section`

It does not currently gate the `Publish` action with a reference check. In production VisualEditor, `AddReferenceEditCheck` runs on save, offers an `Add citation` action, and if the user declines, follows up with a short reason-selection question before allowing the workflow to continue.

For this prototype, we want to mimic that publish-time behavior closely enough for research without importing VisualEditor's full edit-check engine or save diff model.

## Goals

- Add a publish-time `Add reference` check to the prototype.
- Make it work whether the editor content came from article guidance or from freeform typing.
- Preserve the existing `Complete section` gate for unresolved placeholder chips.
- Mimic the key production behavior:
  - intercept publish
  - offer `Add citation` or `No`
  - if `No`, ask why
  - after answering why, allow publish flow to continue
- Reuse the prototype's existing edit-check card patterns instead of adding a new UI system.

## Non-Goals

- Do not implement mid-edit suggestion behavior.
- Do not port VisualEditor's full `BaseEditCheck` eligibility logic.
- Do not diff the edited document against an original baseline to determine only newly added ranges.
- Do not add namespace, user-type, category, template, or disambiguation-page checks.
- Do not add production-grade persistence or analytics for rejection reasons.

## Product Behavior

### Publish gate order

When the user taps `Publish`, the editor should run checks in this order:

1. If unresolved placeholder chips remain, show `Complete section` and stop the publish attempt.
2. Else, if unresolved citation placeholders remain, show `Add reference` and stop the publish attempt.
3. Else, if a qualifying uncited paragraph exists, show `Add reference` and stop the publish attempt.
4. Else, continue the prototype's publish flow with no intervention.

Precedence between gate types is strict:

- unresolved content placeholders always win over reference checks
- unresolved citation placeholders always win over uncited-paragraph detection
- document order only decides between candidates of the same gate type

Deterministic selection algorithm:

1. Scan the document in order for the first unresolved `placeholderChip`.
2. If none are found, scan the document in order for the first unresolved citation placeholder node.
3. If none are found, scan root-level paragraphs in document order for the first qualifying uncited paragraph.
4. Use the first match from the first non-empty stage above.

### Prototype publish success handoff

The current prototype does not have a real publish destination, save request, or success screen. To avoid inventing unrelated product behavior, a successful publish attempt in this feature means:

- all publish-time gates have cleared
- no additional edit-check UI is shown
- the button tap resolves without navigation
- the editor remains on the same screen

Implementation should treat this as a local resolved action, not as a new fake publish workflow. Tests should assert that the gate is cleared and that no blocking card remains, rather than expecting a route change.

### Add reference decision flow

The `Add reference` card should present two actions:

- `Add citation`
- `No`

If the user chooses `Add citation`:

- Open the existing cite dialog.
- Stop the current publish attempt.
- Let the user return to publishing later after adding or reusing a citation.
- If the surfaced target was an unresolved citation placeholder, the cite flow must replace that exact placeholder.
- If the surfaced target was an uncited paragraph, the cite flow must insert at that paragraph's computed `insertionPos`.

If the user chooses `No`:

- Replace the first card with a short follow-up question.
- Require one reason choice before continuing.

Reason choices:

- `I'm not sure how`
- `This is common knowledge`
- `A citation is not needed here`
- `Other`

After the user chooses a reason:

- Dismiss the reference check for the current publish attempt.
- Continue the prototype's publish flow.

### Publish-attempt state machine

The reference gate should use an explicit per-attempt state machine so reset behavior is not implicit.

States:

- `idle`
- `checking`
- `awaiting-reference-choice`
- `awaiting-reference-reason`
- `awaiting-cite-dialog`
- `resolved`

Rules:

- Every `Publish` tap starts a fresh attempt from `checking`.
- If `checking` finds a reference candidate, the attempt moves to `awaiting-reference-choice`.
- Choosing `Add citation` moves to `awaiting-cite-dialog`.
- Closing the cite dialog without adding a citation returns the system to `idle`; the next `Publish` tap re-evaluates from scratch.
- If the cite dialog cannot be opened after `Add citation` is chosen, the attempt returns to `idle`, publish remains unresolved, and the editor stays on the same screen.
- Successfully inserting a citation returns the system to `idle`; the next `Publish` tap re-evaluates from scratch.
- Choosing `No` moves to `awaiting-reference-reason`.
- Choosing a reason moves the current attempt to `resolved` and allows the publish tap to complete.
- Any document change while a publish-time reference card is open resets the attempt to `idle` so the next `Publish` tap recomputes against current content.
- Closing or dismissing the initial `Add reference` card without choosing `Add citation` or `No` resets the attempt to `idle` and leaves publish unresolved.
- Closing or dismissing the reason card without choosing a reason resets the attempt to `idle` and leaves publish unresolved.
- Retrying `Publish` after any reset starts a brand-new evaluation with no carry-over dismissal state from the prior attempt.

## Detection Rules

### Placeholder gate

This uses the placeholder node model already present in the editor, but it must not rely on the existing paragraph-exit detection UI state.

- On `Publish`, scan the full current document for any unresolved `placeholderChip` node.
- Any unresolved `placeholderChip` node blocks publish through the existing `Complete section` check.
- This scan is the source of truth for publish gating, even if the user never triggered the local paragraph-exit detection that powers rail indicators and the current `Complete section` card.
- Citation placeholders are explicitly excluded from this gate because they are represented by `citationSuperscript` placeholder nodes, not by `placeholderChip` nodes.
- The active publish-time placeholder target is the first unresolved `placeholderChip` in document order.
- To reuse the existing `Complete section` UI deterministically, the publish gate should register or synthesize a placeholder detection for the paragraph containing that chip, then open the existing card against that paragraph.

### Citation placeholder gate

If the editor contains unresolved localized `[Add a citation]` placeholder nodes, publish should surface `Add reference`.

This ensures outline-generated sections still trigger the reference check even before the user has written enough plain text to cross the uncited-paragraph threshold.

### Uncited paragraph gate

For this prototype, a paragraph qualifies for the reference check if all of the following are true:

- It is a root-level paragraph in the main article body.
- It is not a heading.
- Its plain-text length is at least `50` characters.
- It does not already contain a citation superscript.
- It does not already contain an unresolved citation placeholder chip.

This approximates the most important production signal from `AddReferenceEditCheck` without requiring document-diff tracking.

### Reference target payload

When the reference check finds a candidate, it should return a concrete target payload that the publish gate and cite dialog can share.

Target shape:

```js
{
  kind: 'citation-placeholder' | 'paragraph-end',
  paragraphRange: { from, to },
  insertionPos: number,
  placeholderPos: number | null
}
```

Rules:

- For an unresolved citation placeholder, use:
  - `kind: 'citation-placeholder'`
  - `paragraphRange` = the enclosing paragraph content range
  - `placeholderPos` = the placeholder citation node position
  - `insertionPos` = same position for convenience
- For an uncited paragraph, use:
  - `kind: 'paragraph-end'`
  - `placeholderPos: null`
  - `insertionPos` = the paragraph end, adjusted before trailing punctuation

This keeps `Add citation` deterministic and removes any dependency on the user's current cursor position.

## Architecture

### Publish gate coordinator

Add a small publish-gate coordinator in `EditorView.vue` that owns the publish attempt sequence.

Responsibilities:

- receive a `publish` event from `ResearchToolbar`
- manage the publish-attempt state machine
- check placeholder state first
- check reference state second
- open the correct card or dialog
- resolve the local publish attempt when all gates are clear

When `Add citation` is chosen:

- if the target is a citation placeholder, set the existing citation placeholder targeting state so the cite flow replaces that placeholder
- if the target is a paragraph-end insertion point, move selection to `insertionPos` before opening the cite dialog

This preserves the existing cite dialog contract and avoids special insertion logic inside the dialog itself.

### Reference-check state

Add a focused composable, tentatively `useReferenceCheck()`.

Responsibilities:

- inspect the current editor document
- perform whole-document scans for unresolved content placeholders and unresolved citation placeholders
- find the first qualifying uncited paragraph or unresolved citation placeholder
- choose the first qualifying reference candidate only after the publish gate has already ruled out unresolved content placeholders
- apply document order only within the active reference candidate type
- expose the current reference target payload
- expose `isReferenceCardVisible`
- expose `isReferenceReasonCardVisible`
- manage reference-specific UI state and reason selection inside the active publish attempt

Ownership boundary:

- `EditorView.vue` is the single source of truth for overall publish sequencing and attempt resets
- `useReferenceCheck()` is the single source of truth for reference-specific target selection and reference-card visibility
- `useReferenceCheck()` must not own a second independent top-level publish state machine

This composable should be intentionally prototype-scoped and avoid trying to generalize into a full edit-check framework.

### UI cards

Add two cards that both reuse the existing shared shell in `EditCheckCard.vue`:

- `AddReferenceCard.vue`
- `AddReferenceReasonCard.vue`

This keeps appearance and desktop-shell behavior consistent with the current local checks.

### Relationship to existing local check pagination

The new publish-time reference cards should deliberately bypass `useEditCheckPagination()` and the rail-indicator grouping system.

Reasons:

- they are triggered only by `Publish`, not by paragraph rail indicators
- they do not represent persistent paragraph warnings during normal editing
- they should not change rail indicator counts or reuse the per-paragraph card carousel

They may still reuse `EditCheckCard.vue` as the visual shell, but they should not register as paginated local checks.

## Integration Points

- `ResearchToolbar.vue`
  - emit a `publish` event instead of leaving publish as a dead-end button
- `EditorView.vue`
  - own publish gating and mount the new reference-check cards
- `useEditorInstance.js`
  - source for current editor access during publish-time scans
- `useCitationRegistry.js`
  - used to detect existing citation superscripts and to target placeholder replacement through existing citation selection state
- `citationPlaceholders.js`
  - used to detect unresolved localized citation placeholders
- `usePlaceholderDetection.js`
  - remains the source for editing behavior, but not the sole source of truth for publish-time unresolved placeholder detection

## Localization

The new reference-check UI must be localized in:

- `en`
- `pt`
- `tr`

Strings required:

- add-reference title
- add-reference description
- add-citation action
- no action
- rejection question
- four rejection reasons

These strings should also be added to the localization review draft in `tools/localization-workbench/` if they are intended for reviewer visibility.

## Error Handling

- If no editor instance exists, publish gating should fail closed: do not navigate, do not resolve publish, do not show a false success state, and return the attempt to `idle` without throwing.
- If `Add citation` is chosen but the cite dialog cannot open, the publish attempt should remain blocked and fail closed.
- If the user dismisses the card without choosing a reason, publish should remain blocked until they explicitly resolve the gate.
- If a publish-time reference target becomes stale because the document changed, the current attempt should reset to `idle` and recompute on the next `Publish` tap.
- Citation placeholder detection must use stable node attributes and helper utilities, not visible localized label text.

## Testing

Add regression coverage for:

- publish with unresolved placeholder chips -> `Complete section`
- unresolved placeholders that were never surfaced by paragraph-exit detection still block publish
- when both an earlier uncited paragraph and a later citation placeholder exist, the citation placeholder wins
- publish with unresolved citation placeholders -> `Add reference`
- publish with long uncited freeform paragraph and no outline use -> `Add reference`
- `Add citation` action opens cite dialog
- `Add citation` on a publish-found paragraph targets the paragraph end instead of the current cursor
- `Add citation` on a publish-found citation placeholder replaces that exact placeholder
- `No` action opens the reason follow-up card
- choosing a reason allows publish flow to continue
- choosing `No`, then tapping `Publish` again after edits re-runs detection from scratch
- cite dialog close without insertion leaves the next publish attempt blocked
- cite dialog open failure returns the attempt to `idle` without allowing publish through
- localized strings render for `pt` and `tr`

## Risks

- The uncited-paragraph heuristic may prompt on content that production VE would ignore because the prototype does not diff against original content.
- A single publish-time gate means repeated attempts may feel stricter than production if we do not store dismissals per paragraph.

These tradeoffs are acceptable for the prototype because they preserve the main research-visible behavior without adding large new infrastructure.

## Recommendation

Implement the publish-time reference gate as a narrow prototype feature:

- preserve the existing `Complete section` gate
- add a prototype-scoped `Add reference` gate
- mimic production's `Add citation` vs `No` flow
- mimic production's rejection follow-up question
- avoid full VE save diff logic or generalized edit-check plumbing
