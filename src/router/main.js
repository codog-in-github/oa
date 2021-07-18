import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/view/login.vue'

Vue.use(VueRouter);

let routes = [
    {
        path:'/',
        redirect:'/login',
    },
    {
        path:'/frame',
        component:()=>import('@/view/newFrame.vue'),
        children:[
            {
                path:'/frame',
                redirect:'/frame/list',
            },
            {
                path:'/frame/index',
                component:()=>import('@/view/main/index.vue'),
            },{
                path:'/frame/form',
                component:()=>import('@/view/main/form.vue'),
            },{
                path:'/frame/form/:bkg_id',
                component:()=>import('@/view/main/form.vue'),
            },{
                path:'/frame/list',
                component:()=>import('@/view/main/BKGList.vue'),
            },{
                path:'/frame/list/:state',
                component:()=>import('@/view/main/BKGList.vue'),
            },
        ],
    },{
        path:'/login',
        component:()=>import('@/view/login.vue'),
        // component:Login,
    },
]

export const router = new VueRouter({
    routes,
})