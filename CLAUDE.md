# Article Creation Editor

Vue 3 + TipTap rich text editor for Wikipedia-style article creation, styled with Wikimedia Codex design system.

## Commands

| Command | Description |
|---------|-------------|
| `npm install` | Install dependencies (requires Node >=20) |
| `npm run dev` | Vite dev server on port 5173 |
| `npm run build` | Production build |
| `npm run lint` | Oxlint + ESLint with auto-fix |
| `npm run format` | Prettier format src/ |

## Architecture

```
src/
  components/       # Vue SFCs (PascalCase)
  views/            # Page-level layouts (single route: EditorView)
  composables/      # Shared reactive logic (useEditorSettings, useEditorInstance, useTextPositionReporter)
  config/           # Static data & defaults (articleSections, editorSettings, verifiedFacts)
  extensions/       # Custom TipTap extensions (annotationHighlight)
  utils/            # Helpers (prosemirrorPositions)
  styles/           # Global CSS
  router/           # Vue Router (single "/" route)
```

## Key Files

- `src/views/EditorView.vue` — Main layout: toolbar + editor + rail/popover orchestration
- `src/components/TextEditor.vue` — TipTap editor with floating action button
- `src/components/EditorRail.vue` — Slide-in side panel with tabs (outline, facts, citations)
- `src/components/OutlinePopover.vue` — Alternative popover-based outline UI
- `src/components/OutlineAccordionList.vue` — Section list with insert-on-click cards
- `src/components/VerifiedFactsList.vue` — Wikidata facts panel
- `src/components/CdxToolbar.vue` — Top toolbar (formatting, cite, publish)
- `src/components/SettingsDialog.vue` — UI settings modal
- `src/components/CiteDialog.vue` — Citation dialog with tabs
- `src/composables/useEditorInstance.js` — Global TipTap editor ref, shared across components
- `src/composables/useEditorSettings.js` — Settings ↔ URL query param sync
- `src/config/editorSettings.js` — Default settings + display labels
- `src/config/articleSections.js` — Article section templates (Siberian tiger content)
- `src/extensions/annotationHighlight.js` — Custom TipTap mark extension

## UI Components (Codex)

All UI uses Wikimedia Codex (`@wikimedia/codex`). Available components already imported:

CdxButton, CdxIcon, CdxMenuButton, CdxPopover, CdxAccordion, CdxCard, CdxDialog, CdxLabel, CdxRadio, CdxTabs, CdxTab, CdxSearchInput

Icons from `@wikimedia/codex-icons`:
cdxIconAdd, cdxIconSettings, cdxIconClose, cdxIconUndo, cdxIconTextStyle, cdxIconExpand, cdxIconQuotes, cdxIconLink, cdxIconEdit, cdxIconNext, cdxIconListBullet, cdxIconCheckAll, cdxIconReference, cdxIconLogoWikidata

## Styling

- All styling uses Codex CSS custom properties — never hardcode colors/spacing
- Token categories: `--color-*`, `--background-color-*`, `--border-*`, `--spacing-*`, `--font-*`, `--line-height-*`
- Common tokens: `--color-base`, `--color-subtle`, `--color-progressive`, `--background-color-neutral-subtle`, `--spacing-50/75/100`, `--font-family-system-sans`, `--font-family-serif`
- Use `:deep()` in `<style scoped>` to override Codex component internals
- Scoped styles are the default — every component uses `<style scoped>`

## Code Style

- No semicolons, single quotes, 100 char width (Prettier)
- 2-space indentation, PascalCase .vue files, camelCase .js files
- All components use `<script setup>` syntax
- Props: `defineProps({ name: { type: String, required: true } })`
- Emits: `defineEmits(['content-inserted', 'close'])`
- V-model: `defineModel('open', { type: Boolean, default: false })`
- Reactive state: `ref()` for primitives, `computed()` for derived

## Layout System

EditorView uses a sliding panel pattern:
- `.editor-wrapper` is a flex row with two full-width columns (editor + rail)
- Opening the rail applies `translateX(calc(-100vw + 88px))` with 0.3s ease transition
- Clicking the main editor area closes the rail
- Alternative: popover mode shows outline as a CdxPopover instead of the rail

## Settings System

Settings persist in URL query params only (no localStorage/DB).

Default structure (`src/config/editorSettings.js`):
```js
{ entryPoint: { style: 'quiet' }, outline: { location: 'rail', persistence: 'close' } }
```

To add a new setting:
1. Add default value + label in `src/config/editorSettings.js`
2. Add radio/control in `SettingsDialog.vue`
3. Consume via `useEditorSettings()` composable in target component

Flow: User changes setting → `updateSettings()` → `router.replace({ query })` → URL updates → `settings` computed re-evaluates → components re-render.

## Content Insertion Pattern

Components that insert content into the editor:
1. Import `useEditorInstance()` to get the TipTap editor ref
2. Call editor methods to insert content (e.g., `editor.value.commands.insertContent()`)
3. Emit `'content-inserted'` event
4. EditorView handles closing/keeping-open the panel based on `outline.persistence` setting

## Gotchas

- TipTap heading levels 2-4 only (h1 disabled in StarterKit config)
- No test framework configured — no tests exist
- `import.meta.env.DEV` exposes editor to `window.__editor` for console debugging
- Floating button width changes dynamically: 220px (quiet+animated) → 32px (icon-only or post-typing)
- ProseMirror positions ≠ text offsets — use `src/utils/prosemirrorPositions.js` for conversion
- Deployed on Vercel as SPA (rewrites all routes to /index.html)
