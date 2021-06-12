import Vue from 'vue';
import Vuex from 'vuex';
// import { doLogin } from '../axios/main';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state:{
        loginState:{
            info:{

            },
            logined:false,
        },
    },
    mutations:{
        doLogin({loginState},info){
            loginState.info = info;
            loginState.logined = true;
        },
        logout({loginState}){
            loginState.info = {};
            loginState.logined = false;
        },
    },
    actions:{
        //强制退出
        logoutEnforce({commit}, router){
            commit('logout');
            router.push('/login');
        }
    }
})            