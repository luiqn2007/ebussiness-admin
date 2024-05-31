import {createRouter, createWebHistory} from 'vue-router'

import HomeView from "../views/admin/HomeView.vue";
import TypeManage from "../views/admin/TypeManage.vue";
import GoodsManage from "../views/admin/GoodsManage.vue";
import OrderManage from "../views/admin/OrderManage.vue";
import LoginView from "../views/admin/LoginView.vue";
import SalesStatistics from "../views/admin/SalesStatistics.vue";
import OrderStatistics from "../views/admin/OrderStatistics.vue";
import * as process from "echarts";

const routes = [{
    path: '/',
    component: LoginView,
}, {
    path: '/home',
    component: HomeView,
    redirect: '/home/typemanage',
    meta: {auth: true},
    children: [
        {
            path: '/home/goodsmanage',
            component: GoodsManage,
        }, {
            path: '/home/ordermanage',
            component: OrderManage,
        }, {
            path: '/home/typemanage',
            component: TypeManage,
        }, {
            path: '/home/salesstatistics',
            component: SalesStatistics,
        }, {
            path: '/home/orderstatistics',
            component: OrderStatistics,
        }
    ]
}]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

export default router