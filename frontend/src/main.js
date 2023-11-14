import "@/assets/main.css";
import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router' // import the router configuration

createApp(App).use(router).mount('#app') // use the router configuration
