import { router } from '@/router/main'
import Vue from 'vue'
import Vuex from 'vuex'
import form from './modules/form'

Vue.use(Vuex)

export const store = new Vuex.Store({
    state: {
        loginState: {
            info: {},
            logined: false
        }
    },
    mutations: {
        clearUserInfo ({ loginState }) {
            loginState.info = {}
            loginState.logined = false
            sessionStorage.setItem('logined', false)
        },

        updateUserInfo ({ loginState }, userInfo) {
            loginState.info = userInfo
            loginState.logined = true
            sessionStorage.setItem('logined', true)
        }
    },
    actions: {
        login ({ commit }, userInfo) {
            commit('updateUserInfo', userInfo)
            if (userInfo.index) {
                router.push(userInfo.index)
            } else {
                router.push('/frame')
            }
        },

        logout ({ commit }) {
            commit('clearUserInfo')
            router.push('/login')
        }

    },
    modules: {
        form
    }
})
