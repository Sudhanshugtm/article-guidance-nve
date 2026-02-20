import '@wikimedia/codex/dist/codex.style.css'
import '@wikimedia/codex-design-tokens/dist/theme-wikimedia-ui.css'
import './styles/global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
