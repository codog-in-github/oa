import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/view/login.vue'

Vue.use(VueRouter);

let routes = [
    {
        path:'/',
        component:()=>import('@/view/main.vue'),
    },{
        path:'/login',
        // component:()=>import('@/view/login.vue'),
        component:Login,
    },
]

export const router = new VueRouter({
    routes,
})