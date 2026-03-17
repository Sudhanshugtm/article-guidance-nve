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

### Add reference decision flow

The `Add reference` card should present two actions:

- `Add citation`
- `No`

If the user chooses `Add citation`:

- Open the existing cite dialog.
- Stop the current publish attempt.
- Let the user return to publishing later after adding or reusing a citation.

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

## Detection Rules

### Placeholder gate

This continues using the existing placeholder detection flow:

- Any unresolved `placeholderChip` node blocks publish through the existing `Complete section` check.

### Citation placeholder gate

If the editor contains unresolved localized `[Add a citation]` placeholder chips, publish should surface `Add reference`.

This ensures outline-generated sections still trigger the reference check even before the user has written enough plain text to cross the uncited-paragraph threshold.

### Uncited paragraph gate

For this prototype, a paragraph qualifies for the reference check if all of the following are true:

- It is a root-level paragraph in the main article body.
- It is not a heading.
- Its plain-text length is at least `50` characters.
- It does not already contain a citation superscript.
- It does not already contain an unresolved citation placeholder chip.

This approximates the most important production signal from `AddReferenceEditCheck` without requiring document-diff tracking.

## Architecture

### Publish gate coordinator

Add a small publish-gate coordinator in `EditorView.vue` that owns the publish attempt sequence.

Responsibilities:

- receive a `publish` event from `ResearchToolbar`
- check placeholder state first
- check reference state second
- open the correct card or dialog
- continue the prototype publish path when all gates are clear

### Reference-check state

Add a focused composable, tentatively `useReferenceCheck()`.

Responsibilities:

- inspect the current editor document
- find the first qualifying uncited paragraph or unresolved citation placeholder
- expose `isReferenceCardVisible`
- expose `isReferenceReasonCardVisible`
- manage the temporary reason-selection flow for the current publish attempt

This composable should be intentionally prototype-scoped and avoid trying to generalize into a full edit-check framework.

### UI cards

Add two cards that both reuse the existing shared shell in `EditCheckCard.vue`:

- `AddReferenceCard.vue`
- `AddReferenceReasonCard.vue`

This keeps appearance and desktop-shell behavior consistent with the current local checks.

## Integration Points

- `ResearchToolbar.vue`
  - emit a `publish` event instead of leaving publish as a dead-end button
- `EditorView.vue`
  - own publish gating and mount the new reference-check cards
- `useCitationRegistry.js`
  - used to detect existing citation superscripts
- `citationPlaceholders.js`
  - used to detect unresolved localized citation placeholders
- `usePlaceholderDetection.js`
  - remains the source for unresolved content placeholders

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

- If no editor instance exists, publish gating should no-op safely instead of throwing.
- If `Add citation` is chosen but the cite dialog cannot open, the publish attempt should remain blocked and fail closed.
- If the user dismisses the card without choosing a reason, publish should remain blocked until they explicitly resolve the gate.

## Testing

Add regression coverage for:

- publish with unresolved placeholder chips -> `Complete section`
- publish with unresolved citation placeholders -> `Add reference`
- publish with long uncited freeform paragraph and no outline use -> `Add reference`
- `Add citation` action opens cite dialog
- `No` action opens the reason follow-up card
- choosing a reason allows publish flow to continue
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
