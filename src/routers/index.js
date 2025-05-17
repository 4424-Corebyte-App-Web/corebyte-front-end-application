import { createRouter, createWebHistory} from "vue-router";
import RecoverCode from "../authentication/pages/recover-code.vue";
import FermentationStage from '../batch-management/pages/batch-management-fermentation-stage.component.vue';
import PressingStage from '../batch-management/pages/batch-management-pressing-stage.component.vue';
import ClarificationStage from '../batch-management/pages/batch-management-clarification-stage.component.vue';
import AgingStage from '../batch-management/pages/batch-management-aging-stage.component.vue';
import BottledStage from '../batch-management/pages/batch-management-bottled-stage.component.vue';

const StatusComponent = ()=> import("../history-status/pages/status.component.vue");
const RecordComponent = () => import("../history-status/pages/record.component.vue");
const PageNotFoundComponent = () => import("../public/pages/page-not-found.component.vue");
const LoginComponent = () => import('../authentication/pages/login.component.vue');
const RegisterComponent = () => import('../authentication/pages/register.component.vue');
const ConfirmationCode = () => import('../authentication/pages/confirmation-code.component.vue');
const PasswordRecovered = () => import('../authentication/pages/password-recover.component.vue');
const ProfileComponent = () => import('../profile-management/pages/profile.component.vue');
const Benefits = () => import('../profile-management/pages/benefits.component.vue');
const AccountTypes = () => import('../profile-management/pages/type-account.component.vue');
const PasswordRecoverComponent = () => import('../authentication/pages/password-recover.component.vue');
const RecoverCodes = () => import('../authentication/pages/recover-code.vue');

const routes = [
    // Rutas públicas
    { path: "/", redirect: '/login' },
    { path: "/login", name: "login", component: LoginComponent, meta: { title: "Login" } },
    { path: "/register", name: "register", component: RegisterComponent, meta: { title: "Register" } },
    { path: "/recuperar-codigo", name: "recuperarcodigo", component: ConfirmationCode, meta: { title: "Recuperar Código" } },
    { path: "/password-recovered", name: "passwordrecovered", component: PasswordRecovered, meta: { title: "Contraseña Recuperada" } },
    { path: "/recuperar", name: "recuperar", component: RecoverCodes, meta: { title: "Recuperar Gmail" } },

            // Dashboard u otra ruta por defecto
            { path: '', redirect: '/app/orders' },
            
            // Rutas de órdenes
            {
                path: '/orders',
                name: 'Orders',
                component: () => import('../orders/pages/order-table.component.vue'),
            },
            {
                path: '/orders/details/:id',
                name: 'OrderDetails',
                component: () => import('../orders/pages/view-details-orders.component.vue'),
            },
            {
                path: '/orders/register',
                name: 'RegisterOrder',
                component: () => import('../orders/pages/register-order.component.vue')
            },
            
            // Rutas de gestión de lotes
            {
                path: '/batch-management',
                name: 'BatchManagementOverview',
                redirect: '/app/batch-management/fermentation'
            },
            {
                path: '/batch-management/fermentation',
                name: 'FermentationStage',
                component: FermentationStage
            },
            {
                path: '/batch-management/pressing',
                name: 'PressingStage',
                component: PressingStage
            },
            {
                path: '/batch-management/clarification',
                name: 'ClarificationStage',
                component: ClarificationStage
            },
            {
                path: '/batch-management/aging',
                name: 'AgingStage',
                component: AgingStage
            },
            {
                path: '/batch-management/bottled',
                name: 'BottledStage',
                component: BottledStage
            },
            
            // Rutas de perfil
            { 
                path: '/profile', 
                name: 'profile', 
                component: ProfileComponent, 
                meta: { title: "Profile" } 
            },
            { 
                path: '/profile/benefits', 
                name: 'benefits', 
                component: Benefits, 
                meta: { title: "Benefits" } 
            },
            { 
                path: '/profile/type-account', 
                name: 'type-account', 
                component: AccountTypes, 
                meta: { title: "Account Type" } 
            },
            
            // Otras rutas
            { 
                path: '/status', 
                name: 'status', 
                component: StatusComponent, 
                meta: { title: "Status" } 
            },
            { 
                path: '/record', 
                name: 'record', 
                component: RecordComponent, 
                meta: { title: "Record" } 
            },
    

    { 
        path: "/:pathMatch(.*)*", 
        name: 'not-found', 
        component: PageNotFoundComponent, 
        meta: { title: "Page Not Found" }
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})


router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token') 
    
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'login' })
    } else if ((to.name === 'login' || to.name === 'register') && isAuthenticated) {
        next({ name: 'Orders' })
    } else {
        next()
    }
})

export default router;
