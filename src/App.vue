<template>
  <div class="app-shell">
    <router-view />
  </div>
</template>

<style scoped>
.app-shell {
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: var(--background-color-base);
}

@media (min-width: 768px) {
  .app-shell {
    width: min(calc(100vw - 32px), var(--prototype-shell-max-width));
    height: calc(100dvh - 32px);
    margin: 16px auto;
    border: 1px solid var(--border-color-subtle);
    border-radius: 24px;
    overflow-y: auto;
    overflow-x: hidden;
    box-shadow: 0 24px 64px rgba(0, 0, 0, 0.16);
  }
}
</style>
