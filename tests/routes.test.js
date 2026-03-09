// ABOUTME: Tests for the research flow route configuration.
// ABOUTME: Validates that all four primary screens are defined with correct paths.

import test from 'node:test'
import assert from 'node:assert/strict'

import { routeConfig } from '../src/router/routeConfig.js'

test('route records expose the four primary screens', () => {
  const names = routeConfig.map((route) => route.name)
  assert.deepEqual(names.slice(0, 4), ['hub', 'articles', 'article', 'editor'])
})

test('editor is no longer mounted at the root path', () => {
  const editorRoute = routeConfig.find((route) => route.name === 'editor')
  assert.equal(editorRoute.path, '/editor')
})
