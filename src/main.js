import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n";
import PrimeVue from 'primevue/config';
import router from './routers/index.js';
import {jsPDF} from 'jspdf';
import autoTable from 'jspdf-autotable';
import Password from 'primevue/password'
import Paginator from 'primevue/paginator';
import {
    Menu,
    Avatar,
    SelectButton, 
    DatePicker,
    Textarea,
    AutoComplete,
    ToastService,
    Button,
    DataTable,
    Column,
    Dialog,
    Checkbox,
    CheckboxGroup,
    InputNumber,
    InputText,
    Dropdown,
    Panel,
} from "primevue";
import 'primeicons/primeicons.css';


const app = createApp(App); 
app.use(i18n);
app.use(PrimeVue);
app.use(ToastService);
app.use(router);
app.component("pv-menu", Menu);
app.component("pv-avatar", Avatar); 
app.component("pv-selectbutton", SelectButton);
app.component("pv-autocomplete", AutoComplete);
app.component("pv-button", Button);
app.component("pv-inputnumber", InputNumber);
app.component("pv-inputtext", InputText);
app.component("pv-dropdown", Dropdown);
app.component("pv-textarea", Textarea);
app.component("pv-datepicker", DatePicker);
app.component("pv-datatable", DataTable);
app.component("pv-column", Column);
app.component("pv-dialog", Dialog);
app.component("pv-checkbox", Checkbox);
app.component("pv-checkboxgroup", CheckboxGroup);
app.component("pv-password", Password);
app.component("pv-paginator", Paginator);
app.component("pv-panel", Panel);
window.jsPDF = jsPDF;
window.autoTable = autoTable;
app.mount('#app');
