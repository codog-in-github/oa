import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/frame',
    component: () => import('@/view/MainFrame.vue'),
    children: [
      {
        path: '/frame',
        redirect: '/list/normal'
      }, {
        path: '/form',
        component: () => import('@/view/main/MainForm.vue')
      }, {
        path: '/form/:bkg_id/:mode',
        component: () => import('@/view/main/MainForm.vue')
      }, {
        path: '/list',
        component: () => import('@/view/main/BKGList.vue')
      }, {
        path: '/list/:state',
        component: () => import('@/view/main/BKGList.vue')
      }, {
        path: '/list/f/:status',
        component: () => import('@/view/main/BKGList2.vue')
      }, {
        path: '/container-list',
        component: () => import('@/view/main/ContainerList.vue')
      }, {
        path: '/req/:state',
        component: () => import('@/view/main/ReqList.vue')
      }, {
        path: '/calendar',
        component: () => import('@/view/CutCalendar.vue')
      }, {
        path: '/calendar-d',
        component: () => import('@/view/FreeCalendar.vue')
      }, {
        path: '/auth',
        component: () => import('@/view/system/PageAuth.vue')
      }, {
        path: '/booker',
        component: () => import('@/view/config/BookerList.vue')
      }, {
        path: '/country',
        component: () => import('@/view/config/PageCountry.vue')
      }, {
        path: '/hs',
        component: () => import('@/view/hs')
      }
    ]
  }, {
    path: '/login',
    component: () => import('@/view/PageLogin.vue')
  }
];

export const router = new VueRouter({
  routes
});
