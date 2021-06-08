import Vue from 'vue';
import Vuex from 'vuex';

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
    }
})