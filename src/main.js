import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n";
import PrimeVue from 'primevue/config';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import SelectButton from 'primevue/selectbutton';
import 'primeicons/primeicons.css'

const app = createApp(App); 
app.use(i18n);
app.use(PrimeVue, { ripple: true });

app.component("pv-menu", Menu);
app.component("pv-avatar", Avatar); 
app.component("pv-selectbutton", SelectButton);
app.mount('#app');
