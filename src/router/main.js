import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/view/login.vue'

Vue.use(VueRouter);

let routes = [
    {
        path:'/',
        component:()=>import('@/view/newFrame.vue'),
        children:[
            {
                path:'',
                component:()=>import('@/view/main/index.vue'),
            },{
                path:'/calender',
                component:()=>import('@/view/main/index.vue'),
            },{
                path:'/calender',
                component:()=>import('@/view//main/index.vue'),
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