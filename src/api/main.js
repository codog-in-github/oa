import axios from 'axios'
import qs from 'qs' 
import * as statecode from './statecode';


const BASE_PATH  = 'http://127.0.0.1:81/Oa';

const LOGIN_PATH = BASE_PATH + '/Index/login';
const LOGOUT_PATH = BASE_PATH + '/Index/logout';
const LOGIN_STATUS = BASE_PATH + '/Index/';
const TABLE_PATH = BASE_PATH + '/Table/getTableConfig';
const TABLE_DATA_PATH = BASE_PATH + '/Table/getTableData';
// const INSERT_TABLE_DATA = BASE_PATH + '/Table/insertData';
// const UPDATE_TANLE_DATA = BASE_PATH + '/Table/updateData';

axios.defaults.withCredentials = true;

//接收所有返回状态码  分类处理
const checkStateCodeServer = function (promise, successCall, {dispatch}, router){
    return promise.then(({data})=>{
        switch(data.error){
            case statecode.NO_LOGIN:
                console.log();
                dispatch('logoutEnforce', router);
                break;
            case statecode.SUCCESS:
                successCall(data);
                break;
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
export const logout = function(store, router){
    return checkStateCodeServer(
        axios.get(LOGOUT_PATH),
        ()=>{},
        store,
        router
    );
}
//确认在线状态
export const checkLoginStatus = function(store, router){
    return checkStateCodeServer(
        axios.get(
            LOGIN_STATUS,
        ),
        (data)=>{
            store.commit('doLogin',data)
        },
        store,
        router
    );
}
// 获取表配置
export const getTableConfig = function (tableId, successCall, store, router){
    return checkStateCodeServer(
        axios.get(
            TABLE_PATH + '/table_id/' + tableId,
        ),
        ({data})=>successCall(data),
        store,
        router
    );
}
// 获取表数据
export const getTableData = function(tableId, col, successCall, store, router){
    // console.log(col);
    return checkStateCodeServer(
        axios.post(
            TABLE_DATA_PATH + '/table_id/' + tableId,
            qs.stringify({col})
        ),
        ({data})=>successCall(data),
        store,
        router
    );
}

//修改 插入数据
export const saveTableData = function (dataRow, colConf) {
    if(dataRow.isNewData === true){
        return insertData(dataRow, colConf);
    }
    return updateTableData(dataRow, colConf);
}

const insertData = ()=>{}
const updateTableData = ()=>{}


//删除数据