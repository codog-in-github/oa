import axios from 'axios'
import qs from 'qs' 
import * as statecode from './statecode';

const BASE_PATH  = 'http://127.0.0.1:81/Oa';

const LOGIN_PATH = BASE_PATH + '/Index/login';
const TABLE_PATH = BASE_PATH + '/Table/getConfig';

axios.defaults.withCredentials = true;

//接收所有返回状态码  分类处理
const checkStateCodeServer = function (promise, successCall, {dispatch}, router){
    promise.then((respone)=>{
        switch(respone.error){
            case statecode.NO_LOGIN:
                dispatch('logoutEnforce', router);
                break;
            default :
                successCall();
        }
    });
}

export const doLogin = (username, password, {commit}, router) => {
    axios.post(
        LOGIN_PATH,
        qs.stringify({
            username,
            password,
        })
    ).then(({data})=>{
        switch (data.error){
            case statecode.PASSWORD_ERROR:
                console.log('password error');
                break;
            case statecode.SUCCESS:
                commit('doLogin',data.data);
                router.push('/');
                break;
        }
    })
};
  
 
export const getTableConfig = function (tableName, store, router){
    return checkStateCodeServer(
        axios.get(
            TABLE_PATH + '/tableName/' + tableName,
        ),
        ({data})=>{
            console.log(data);
        },
        store,
        router
    );
}