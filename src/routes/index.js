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
const BenefitsComponent = () => import('../profile-management/pages/benefits.component.vue');
const AccountTypes = () => import('../profile-management/pages/type-account.component.vue');
const PasswordRecoverComponent = () => import('../authentication/pages/password-recover.component.vue');
const RecoverCodes = () => import('../authentication/pages/recover-code.vue');
const RegisterReplenishment = () => import('../replenishment/pages/register-replenishment.component.vue');
const ReplenishmentComponent = () => import('../replenishment/pages/replenishment.component.vue');
const AlertDashboardComponent = () => import('../alerts/pages/alert-dashboard.component.vue');
const FermentationRegister = () => import('../batch-management/pages/Fermentation-register.component.vue');
const PressingRegister = () => import('../batch-management/pages/Pressing-register.component.vue');
const ClarificationRegister = () => import('../batch-management/pages/Clarification-register.component.vue');
const AgingRegister = () => import('../batch-management/pages/Aging-register.component.vue');
const BottledRegister = () => import('../batch-management/pages/Bottled-register.component.vue');
const ClarificationUpdate = () => import('../batch-management/pages/Clarification-update.component.vue');
const UpdateReplenishment = () => import('../replenishment/pages/update-replenishment.component.vue');


const routes = [
    // Rutas públicas
    { path: "/", redirect: '/login' },
    { path: "/login", name: "login", component: LoginComponent, meta: { title: "Login" } },
    { path: "/register", name: "register", component: RegisterComponent, meta: { title: "Register" } },
    { path: "/confirmation-code", name: "confirmation-code", component: ConfirmationCode, meta: { title: "Recuperar Código" } },
    { path: "/password-recovered", name: "password-recovered", component: PasswordRecovered, meta: { title: "Contraseña Recuperada" } },
    { path: "/recover-code", name: "recover-code", component: RecoverCodes, meta: { title: "Recuperar Gmail" } },
    {path: '/orders',ame: 'Orders',component: () => import('../orders/pages/order-table.component.vue'),},
    {path: '/orders/details/:id',name: 'OrderDetails',component: () => import('../orders/pages/view-details-orders.component.vue'),},
    {path: '/orders/register',name: 'RegisterOrder',component: () => import('../orders/pages/register-order.component.vue'),},
    {path: '/batch-management',name: 'BatchManagementOverview',redirect: '/batch-management/fermentation',},
    {path: '/batch-management/fermentation',name: 'FermentationStage',component: FermentationStage},
    {path: '/batch-management/fermentation/register',name: 'FermentationRegister',component: FermentationRegister},
    {path: '/batch-management/pressing',name: 'PressingStage',component: PressingStage},
    {path: '/batch-management/pressing/register',name: 'PressingRegister',component: PressingRegister},
    {path: '/batch-management/clarification',name: 'ClarificationStage',component: ClarificationStage},
    {path: '/batch-management/clarification/register',name: 'ClarificationRegister',component: ClarificationRegister},
    {path: '/batch-management/clarification/update',name: 'ClarificationUpdate',component: ClarificationUpdate},
    {path: '/batch-management/aging',name: 'AgingStage',component: AgingStage},
    {path: '/batch-management/aging/register',name: 'AgingRegister',component: AgingRegister},
    {path: '/batch-management/bottled',name: 'BottledStage',component: BottledStage},
    {path: '/batch-management/bottled/register',name: 'BottledRegister',component: BottledRegister},
    { path: '/profile', name: 'profile', component: ProfileComponent, meta: { title: "Profile" } },
    { path: '/profile/benefits', name: 'benefits', component: BenefitsComponent, meta: { title: "Benefits" } },
    { path: '/profile/type-account', name: 'type-account', component: AccountTypes, meta: { title: "Account Type" } },
    { path: '/status', name: 'status', component: StatusComponent, meta: { title: "Status" } },
    { path: '/record', name: 'record', component: RecordComponent, meta: { title: "Record" } },
    {path: "/:pathMatch(.*)*", name: 'not-found', component: PageNotFoundComponent, meta: { title: "Page Not Found" }},
    { path: '/replenishment',name: 'Replenishment',component: ReplenishmentComponent,meta: { title: "Replenishment" }},
    {path: '/replenishment/register',name: 'RegisterReplenishment',component: RegisterReplenishment,meta: { title: "Register Replenishment" }},
    {path: '/replenishment/update/:id',name: 'UpdateReplenishment',component: UpdateReplenishment,meta: { title: "Update Replenishment" }},
    {path: '/alerts',name: 'AlertDashboard',component: AlertDashboardComponent,meta: { title: "Alert Dashboard" }},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;
