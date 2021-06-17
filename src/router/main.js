import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '@/view/login.vue'

Vue.use(VueRouter);

let routes = [
    {
        path:'/',
        component:()=>import('@/view/frame.vue'),
        children:[
            {
                path:'',
                component:()=>import('@/view/main/calender.vue'),
            },{
                path:'/calender',
                component:()=>import('@/view/main/calender.vue'),
            },{
                path:'/calender',
                component:()=>import('@/view//main/calender.vue'),
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