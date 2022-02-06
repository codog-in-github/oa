import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/frame',
        component: () => import('@/view/newFrame.vue'),
        children: [
            {
                path: '/frame',
                redirect: '/list/normal'
            }, {
                path: '/form',
                component: () => import('@/view/main/form.vue')
            }, {
                path: '/form/:bkg_id/:mode',
                component: () => import('@/view/main/form.vue')
            }, {
                path: '/list',
                component: () => import('@/view/main/BKGList.vue')
            }, {
                path: '/list/:state',
                component: () => import('@/view/main/BKGList.vue')
            }, {
                path: '/container-list',
                component: () => import('@/view/main/ContainerList.vue')
            }, {
                path: '/req/:state',
                component: () => import('@/view/main/ReqList.vue')
            }, {
                path: '/calendar',
                component: () => import('@/view/CutCalendar.vue')
            }

        ]
    }, {
        path: '/login',
        component: () => import('@/view/login.vue')
    }
]

export const router = new VueRouter({
    routes
})
