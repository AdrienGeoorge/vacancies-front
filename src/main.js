import {createApp} from 'vue'
import App from './App.vue'
import router from './router/router.js'
import './assets/styles/app.scss'

import { reactive } from 'vue'

const globalState = reactive({
    APP_NAME: import.meta.env.VITE_APP_NAME,
});

const app = createApp(App)
app.provide('globalState', globalState)
app.use(router)
app.mount('#app');