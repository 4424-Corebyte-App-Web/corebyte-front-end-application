
import { createRouter, createWebHistory } from "vue-router";
import RecoverCode from "../authentication/pages/recover-code.vue";

// Public Pages
const LandingComponent = () => import('../public/pages/landing.component.vue');
const PageNotFoundComponent = () => import("../public/pages/page-not-found.component.vue");

// History Status
const StatusComponent = () => import("../history-status/pages/status.component.vue");
const RecordComponent = () => import("../history-status/pages/record.component.vue");

// Authentication
const LoginComponent = () => import('../authentication/pages/login.component.vue');
const RegisterComponent = () => import('../authentication/pages/register.component.vue');
const ConfirmationCode = () => import('../authentication/pages/confirmation-code.component.vue');
const PasswordRecovered = () => import('../authentication/pages/password-recover.component.vue');

// Profile Management
const ProfileComponent = () => import('../profile-management/pages/profile.component.vue');
const AccountTypes = () => import('../profile-management/pages/type-account.component.vue');
const Benefits = () => import('../profile-management/pages/benefits.component.vue');
const PasswordRecoverComponent = () => import('../authentication/pages/password-recover.component.vue');
const RecoverCodes = () => import('../authentication/pages/recover-code.vue');
const routes = [
    { path: "/", name: "landing", component: LandingComponent, meta: { title: "Landing" } },
    { path: "/login", name: "login", component: LoginComponent, meta: { title: "Login" } },
    { path: "/register", name: "register", component: RegisterComponent, meta: { title: "Register" } },

    { path: "/status", name: "status", component: StatusComponent, meta: { title: "Status" } },
    { path: "/record", name: "record", component: RecordComponent, meta: { title: "Record" } },

    { path: "/profile", name: "profile", component: ProfileComponent, meta: { title: "Profile" } },
    { path: "/profile/type-account", name: "type-account", component: AccountTypes, meta: { title: "Type Account" } },
    { path: "/profile/benefits", name: "benefits", component: Benefits, meta: { title: "Benefits" } },
    
    { path: "/recuperar", name: "recuperar", component: RecoverCodes, meta: { title: "Recuperar Gmail" } },
    
    { path: "/recuperar-codigo", name: "recuperarcodigo", component: ConfirmationCode, meta: { title: "Recuperar Código" } },
    { path: "/password-recovered", name: "passwordrecovered", component: PasswordRecovered, meta: { title: "Contraseña Recuperada" } },

    { path: '/password-recovered', name: 'passwordrecovered', component: PasswordRecovered },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
