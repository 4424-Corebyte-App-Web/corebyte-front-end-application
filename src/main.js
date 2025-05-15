import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n";
import PrimeVue from 'primevue/config';
import Menu from 'primevue/menu';
import Avatar from 'primevue/avatar';
import SelectButton from 'primevue/selectbutton';
import 'primeicons/primeicons.css';
import AutoComplete from 'primevue/autocomplete';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import router from './routes/index.js';
import Dialog from 'primevue/dialog';
import Checkbox from 'primevue/checkbox';
import CheckboxGroup from 'primevue/checkboxgroup';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';


const app = createApp(App); 
app.use(i18n);
app.use(PrimeVue);
app.use(router);
app.component("pv-menu", Menu);
app.component("pv-avatar", Avatar); 
app.component("pv-selectbutton", SelectButton);
app.component("pv-autocomplete", AutoComplete);
app.component("pv-button", Button);
app.component("pv-datatable", DataTable);
app.component("pv-column", Column);
app.component("pv-dialog", Dialog);
app.component("pv-checkbox", Checkbox);
app.component("pv-checkboxgroup", CheckboxGroup);
// Make jsPDF and autoTable available globally
window.jsPDF = jsPDF;
window.autoTable = autoTable;
app.mount('#app');
