<template>
  <div class="editor-toolbar">
    <div class="toolbar-tools" ref="toolbarContainer"></div>
  </div>
</template>

<script setup>
/* global OO, $ */
import { ref, onMounted, onBeforeUnmount } from 'vue'

const toolbarContainer = ref(null)
let toolbar = null

function defineTools(toolFactory) {
  // Close tool
  function CloseTool() {
    CloseTool.super.apply(this, arguments)
  }
  OO.inheritClass(CloseTool, OO.ui.Tool)
  CloseTool.static.name = 'close'
  CloseTool.static.icon = 'close'
  CloseTool.static.title = 'Close'
  CloseTool.prototype.onSelect = function () {
    this.setActive(false)
  }
  CloseTool.prototype.onUpdateState = function () {}
  toolFactory.register(CloseTool)

  // Undo tool
  function UndoTool() {
    UndoTool.super.apply(this, arguments)
  }
  OO.inheritClass(UndoTool, OO.ui.Tool)
  UndoTool.static.name = 'undo'
  UndoTool.static.icon = 'undo'
  UndoTool.static.title = 'Undo'
  UndoTool.prototype.onSelect = function () {
    this.setActive(false)
  }
  UndoTool.prototype.onUpdateState = function () {}
  toolFactory.register(UndoTool)

  // Bold tool (style dropdown)
  function BoldTool() {
    BoldTool.super.apply(this, arguments)
  }
  OO.inheritClass(BoldTool, OO.ui.Tool)
  BoldTool.static.name = 'bold'
  BoldTool.static.icon = 'bold'
  BoldTool.static.title = 'Bold'
  BoldTool.prototype.onSelect = function () {
    this.setActive(false)
  }
  BoldTool.prototype.onUpdateState = function () {}
  toolFactory.register(BoldTool)

  // Italic tool (style dropdown)
  function ItalicTool() {
    ItalicTool.super.apply(this, arguments)
  }
  OO.inheritClass(ItalicTool, OO.ui.Tool)
  ItalicTool.static.name = 'italic'
  ItalicTool.static.icon = 'italic'
  ItalicTool.static.title = 'Italic'
  ItalicTool.prototype.onSelect = function () {
    this.setActive(false)
  }
  ItalicTool.prototype.onUpdateState = function () {}
  toolFactory.register(ItalicTool)

  // Remove/Clear tool (style dropdown, starts disabled)
  function ClearTool() {
    ClearTool.super.apply(this, arguments)
  }
  OO.inheritClass(ClearTool, OO.ui.Tool)
  ClearTool.static.name = 'clear'
  ClearTool.static.icon = 'cancel'
  ClearTool.static.title = 'Remove'
  ClearTool.prototype.onSelect = function () {
    this.setActive(false)
  }
  ClearTool.prototype.onUpdateState = function () {
    this.setDisabled(true)
  }
  toolFactory.register(ClearTool)

  // More tool (style dropdown, expand toggle placeholder)
  function MoreTool() {
    MoreTool.super.apply(this, arguments)
  }
  OO.inheritClass(MoreTool, OO.ui.Tool)
  MoreTool.static.name = 'more'
  MoreTool.static.icon = 'expand'
  MoreTool.static.title = 'More'
  MoreTool.prototype.onSelect = function () {
    this.setActive(false)
  }
  MoreTool.prototype.onUpdateState = function () {}
  toolFactory.register(MoreTool)

  // Citation tool (quotes icon, standalone bar button)
  function CitationTool() {
    CitationTool.super.apply(this, arguments)
  }
  OO.inheritClass(CitationTool, OO.ui.Tool)
  CitationTool.static.name = 'citation'
  CitationTool.static.icon = 'quotes'
  CitationTool.static.title = 'Cite'
  CitationTool.prototype.onSelect = function () {
    this.setActive(false)
  }
  CitationTool.prototype.onUpdateState = function () {}
  toolFactory.register(CitationTool)

  // Link tool
  function LinkTool() {
    LinkTool.super.apply(this, arguments)
  }
  OO.inheritClass(LinkTool, OO.ui.Tool)
  LinkTool.static.name = 'link'
  LinkTool.static.icon = 'link'
  LinkTool.static.title = 'Link'
  LinkTool.prototype.onSelect = function () {
    this.setActive(false)
  }
  LinkTool.prototype.onUpdateState = function () {}
  toolFactory.register(LinkTool)

  // Visual editing tool (editMode dropdown, starts active)
  function VisualEditingTool() {
    VisualEditingTool.super.apply(this, arguments)
  }
  OO.inheritClass(VisualEditingTool, OO.ui.Tool)
  VisualEditingTool.static.name = 'visualEditing'
  VisualEditingTool.static.icon = 'eye'
  VisualEditingTool.static.title = 'Visual editing'
  VisualEditingTool.prototype.onSelect = function () {
    this.setActive(true)
  }
  VisualEditingTool.prototype.onUpdateState = function () {
    this.setActive(true)
  }
  toolFactory.register(VisualEditingTool)

  // Source editing tool (editMode dropdown)
  function SourceEditingTool() {
    SourceEditingTool.super.apply(this, arguments)
  }
  OO.inheritClass(SourceEditingTool, OO.ui.Tool)
  SourceEditingTool.static.name = 'sourceEditing'
  SourceEditingTool.static.icon = 'wikiText'
  SourceEditingTool.static.title = 'Source editing'
  SourceEditingTool.prototype.onSelect = function () {
    this.setActive(false)
  }
  SourceEditingTool.prototype.onUpdateState = function () {}
  toolFactory.register(SourceEditingTool)
}

onMounted(() => {
  const toolFactory = new OO.ui.ToolFactory()
  const toolGroupFactory = new OO.ui.ToolGroupFactory()

  defineTools(toolFactory)

  toolbar = new OO.ui.Toolbar(toolFactory, toolGroupFactory)

  toolbar.setup([
    { name: 'close', type: 'bar', include: ['close'] },
    { name: 'history', type: 'bar', include: ['undo'] },
    {
      name: 'style',
      type: 'list',
      icon: 'textStyle',
      label: 'Style text',
      invisibleLabel: true,
      indicator: '',
      include: ['bold', 'italic', 'clear', 'more'],
    },
    { name: 'citation', type: 'bar', include: ['citation'] },
    { name: 'link', type: 'bar', include: ['link'] },
    {
      name: 'editMode',
      type: 'list',
      icon: 'edit',
      label: 'Switch editor',
      invisibleLabel: true,
      indicator: '',
      include: ['visualEditing', 'sourceEditing'],
    },
  ])

  // Add custom CSS classes to tool groups for targeted styling
  const groupNames = ['close', 'history', 'style', 'citation', 'link', 'editMode']
  toolbar.items.forEach((group, index) => {
    if (groupNames[index]) {
      group.$element.addClass('toolbar-group-' + groupNames[index])
    }
  })

  $(toolbarContainer.value).append(toolbar.$element)
  toolbar.initialize()
  toolbar.emit('updateState')
})

onBeforeUnmount(() => {
  if (toolbar) {
    toolbar.destroy()
    toolbar = null
  }
})
</script>

<style scoped>
/* === Container === */
.editor-toolbar {
  height: 48px;
  background-color: var(--background-color-base, #fff);
  box-shadow:
    0px 1px 1px 0px rgba(0, 0, 0, 0.1),
    inset 0px -1px 0px 0px #c8ccd1;
  position: relative;
  flex-shrink: 0;
}

.toolbar-tools {
  height: 100%;
}

/* === Reset OOUI toolbar chrome === */
.toolbar-tools :deep(.oo-ui-toolbar) {
  border: 0;
  height: 100%;
}

.toolbar-tools :deep(.oo-ui-toolbar-bar) {
  border: 0;
  background: none;
  box-shadow: none;
  height: 100%;
}

/* === Flex layout for equal-width groups === */
.toolbar-tools :deep(.oo-ui-toolbar-tools) {
  display: flex;
  height: 100%;
  white-space: nowrap;
}

.toolbar-tools :deep(.oo-ui-toolbar-tools > .oo-ui-toolGroup) {
  flex: 1 0 0;
  display: flex;
  min-width: 0;
}

.toolbar-tools :deep(.oo-ui-toolbar-tools > .toolbar-group-close) {
  flex: 0 0 44px;
  max-width: 44px;
}

/* === Bar tool group internals === */
.toolbar-tools :deep(.oo-ui-barToolGroup-tools) {
  display: flex;
  width: 100%;
}

.toolbar-tools :deep(.oo-ui-barToolGroup-tools > .oo-ui-tool) {
  display: flex;
  flex: 1;
}

.toolbar-tools :deep(.oo-ui-barToolGroup-tools > .oo-ui-tool + .oo-ui-tool) {
  margin-left: 0;
}

/* Bar tool links — SCOPED to bar groups only (not popup menus!) */
.toolbar-tools :deep(.oo-ui-barToolGroup-tools > .oo-ui-tool > .oo-ui-tool-link) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  padding: 0;
  box-sizing: border-box;
}

/* Close button: constrained padding for 44px (12 + 20 icon + 12) */
.toolbar-tools :deep(.toolbar-group-close .oo-ui-barToolGroup-tools > .oo-ui-tool > .oo-ui-tool-link) {
  padding-left: 12px;
  padding-right: 12px;
}

/* Bar tool icons — SCOPED to bar groups only */
.toolbar-tools :deep(.oo-ui-barToolGroup-tools > .oo-ui-tool > .oo-ui-tool-link > .oo-ui-iconElement-icon) {
  position: static;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
}

/* === Popup (list) group handles — targets handle only, not dropdown === */
.toolbar-tools :deep(.oo-ui-popupToolGroup > .oo-ui-popupToolGroup-handle) {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  padding: 0;
  box-sizing: border-box;
}

.toolbar-tools :deep(.oo-ui-popupToolGroup > .oo-ui-popupToolGroup-handle > .oo-ui-iconElement-icon) {
  position: static;
  width: 20px;
  height: 20px;
  min-width: 20px;
  min-height: 20px;
}

/* === Hide structural elements === */
.toolbar-tools :deep(.oo-ui-toolbar-bar > div[style*="clear"]) {
  display: none;
}

.toolbar-tools :deep(.oo-ui-toolbar-after) {
  display: none;
}
</style>
