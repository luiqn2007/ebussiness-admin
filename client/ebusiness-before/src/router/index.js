import {createRouter, createWebHistory} from 'vue-router'

import IndexView from "../views/IndexView.vue";
import GoodsDetailView from "../views/GoodsDetailView.vue";
import RegisterView from "../views/RegisterView.vue";
import LoginView from "../views/LoginView.vue";
import MyselfInfoView from "../views/MyselfInfoView.vue";
import MyOrderView from "../views/MyOrderView.vue";
import MyFocusView from "../views/MyFocusView.vue";
import MyCartView from "../views/MyCartView.vue";

const routes = [{
    path: '/',
    name: 'index',
    component: IndexView,
}, {
    path: '/goodsDetail',
    name: 'goodsDetail',
    component: GoodsDetailView,
}, {
    path: '/register',
    name: 'register',
    component: RegisterView,
}, {
    path: '/login',
    name: 'login',
    component: LoginView,
}, {
    path: '/myselfinfo',
    name: 'myselfinfo',
    component: MyselfInfoView,
    meta: {auth: true},
}, {
    path: '/myorder',
    name: 'myorder',
    component: MyOrderView,
    meta: {auth: true},
}, {
    path: '/myfocus',
    name: 'myfocus',
    component: MyFocusView,
    meta: {auth: true},
}, {
    path: '/mycart',
    name: 'mycart',
    component: MyCartView,
    meta: {auth: true},
}, ]

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
