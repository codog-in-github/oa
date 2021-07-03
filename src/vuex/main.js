import Vue from 'vue';
import Vuex from 'vuex';
import header from './modules/header'
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
            sessionStorage.setItem('logined',true);
        },
        logout({loginState}){
            loginState.info = {};
            loginState.logined = false;
            sessionStorage.setItem('logined',false);
        },
    },
    actions:{
        //强制退出
        logoutEnforce({commit}, vm){
            commit('logout');
            // console.log(vm);
            vm.$router.push('/login');
        }
    },
    modules:{
        header,
    },
})            