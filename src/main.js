import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n";
import PrimeVue from 'primevue/config';
import router from './router/index.js';

const app = createApp(App); 
app.use(i18n);
app.use(PrimeVue);
app.use(router);
app.mount('#app');
