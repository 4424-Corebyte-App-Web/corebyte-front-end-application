import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/orders'
    },
    {
        path: '/orders',
        name: 'Orders',
        component: () => import('./../orders/pages/order-table.component.vue'),
    },
    {
        path: '/orders/details/:id',
        name: 'OrderDetails',
        component: () => import('./../orders/pages/view-details-orders.component.vue'),

    }
    ,
    {
        path: '/orders/register',
        name: 'RegisterOrder',
        component: () => import('../orders/pages/register-order.component.vue') // o el archivo correcto
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
