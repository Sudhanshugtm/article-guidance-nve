<template>
  <div class="app-shell">
    <div class="app-shell__viewport">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.app-shell {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background-color: var(--background-color-base);
}

.app-shell__viewport {
  flex: 1;
  min-height: 0;
}

@media (min-width: 768px) {
  .app-shell {
    width: min(calc(100vw - 32px), var(--prototype-shell-max-width));
    height: calc(100dvh - 32px);
    margin: 16px auto;
    border: 1px solid var(--border-color-subtle);
    border-radius: 24px;
    overflow: hidden;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  }

  .app-shell__viewport {
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .app-shell__viewport::-webkit-scrollbar {
    display: none;
    width: 0;
    height: 0;
  }
}
</style>
