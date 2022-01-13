import { router } from '@/router/main'
import Vue from 'vue'
import Vuex from 'vuex'
import form from './modules/form'
// import { doLogin } from '../axios/main';

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loginState: {
            info: { },
            logined: false
        }
    },
    mutations: {
        doLogin ({ loginState }, info) {
            loginState.info = info
            loginState.logined = true
            sessionStorage.setItem('logined', true)
            router.push('/frame')
        },
        logout ({ loginState }) {
            loginState.info = {}
            loginState.logined = false
            sessionStorage.setItem('logined', false)
        }
    },
    actions: {
        // 强制退出
        logoutEnforce ({ commit }) {
            commit('logout')
            router.push('/login')
        }
    },
    modules: {
        form
    }
})
