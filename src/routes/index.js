import { createRouter, createWebHistory} from "vue-router";

const PageNotFoundComponent = () => import("../public/pages/page-not-found.component.vue");
const StatusComponent = ()=> import("../history-status/pages/status.component.vue");
const RecordComponent = () => import("../history-status/pages/record.component.vue");    

const routes = [
    {   path: "/status", name:'status', component: StatusComponent, meta: {title: "Status"} },
    {   path: "/record", name:'record', component: RecordComponent, meta: {title: "Record"} },
    {   path: "/:pathMatch(.*)*", name:'not-found', component: PageNotFoundComponent, meta: {title: "Page Not Found"}},
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;
