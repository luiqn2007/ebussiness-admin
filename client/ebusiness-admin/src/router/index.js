import {createRouter, createWebHistory} from 'vue-router'

import HomeView from "../views/admin/HomeView.vue";
import TypeManage from "../views/admin/TypeManage.vue";
import GoodsManage from "../views/admin/GoodsManage.vue";
import OrderManage from "../views/admin/OrderManage.vue";
import LoginView from "../views/admin/LoginView.vue";
import SalesStatistics from "../views/admin/SalesStatistics.vue";
import OrderStatistics from "../views/admin/OrderStatistics.vue";

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
            path: 'goodsmanage',
            component: GoodsManage,
        }, {
            path: 'ordermanage',
            component: OrderManage,
        }, {
            path: 'typemanage',
            component: TypeManage,
        }, {
            path: 'salesstatistics',
            component: SalesStatistics,
        }, {
            path: 'orderstatistics',
            component: OrderStatistics,
        }
    ]
}]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL),
})

router.beforeEach((to, from) => {
    if (to.meta.auth) {
        if (window.sessionStorage.getItem('uname') == null) {
            alert("您没有登录，无权访问")
            return {
                path: '/',
                query: {
                    redirect: to.fullPath
                }
            }
        }
    }
})

export default router
