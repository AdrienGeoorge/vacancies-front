import {createApp} from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/router.js'
import './assets/styles/app.scss'

const app = createApp(App)

app.use(router)
app.use(createPinia())
app.mount('#app')