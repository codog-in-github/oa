import axios from 'axios'
import qs from 'qs' 
import * as statecode from './statecode';


const BASE_PATH  = 'http://127.0.0.1:81/Oa';

const LOGIN_PATH = BASE_PATH + '/Index/login';
const LOGOUT_PATH = BASE_PATH + '/Index/logout';
const LOGIN_STATUS = BASE_PATH + '/Index/';
// const TABLE_PATH = BASE_PATH + '/Table/getTableConfig';
// const TABLE_DATA_PATH = BASE_PATH + '/Table/getTableData';
// const INSERT_TABLE_DATA = BASE_PATH + '/Table/insertData';
// const UPDATE_TANLE_DATA = BASE_PATH + '/Table/updateData';

axios.defaults.withCredentials = true;


//接口插件
export class Api{
    
    static install = function (Vue, options) {
        Vue.prototype.$api = new Api(options);
        //登出
        Vue.prototype.$logout  = function () {
            this.$api.checkStateCodeServer(
                ()=>axios.get(LOGOUT_PATH),
                ()=>{},
                this
            )
        }
        //登录
        Vue.prototype.$doLogin = function(username, password) {
            
            this.$api.queue = ()=>axios.post(
                LOGIN_PATH,
                qs.stringify({
                    username,
                    password,
                })
            )

            this.$api.queue = ({data})=>{
                switch (data.error){
                    case statecode.PASSWORD_ERROR:
                        console.log('password error');
                        break;
                    case statecode.SUCCESS:
                        this.$store.commit('doLogin',data.data);
                        this.$router.push('/frame');  
                        break;
                }
            }
            this.$api.promise.catch(console.log);
        }

        Vue.prototype.$checkLoginStatus = function(){
            this.$api.checkStateCodeServer(
                ()=>axios.get(
                    LOGIN_STATUS,
                ),
                ({data})=>{
                    this.$store.commit('doLogin',data)
                },
                this,
            );
        }
    }
    
    constructor (optios){
        this.optios = optios;
        this.promise = Promise.resolve();
    }
    //异步队列
    set queue (successCall){
        this.promise = this.promise.then(
            data=>successCall(data)
        );
    }
    //接收所有返回状态码  分类处理
    checkStateCodeServer = function (todo, successCall,vm) {
        this.queue = todo;
        this.queue = ({data})=>{
            switch(data.error){
                case statecode.WITHOUT_LOGIN:{
                    console.log(vm);
                    vm.$store.dispatch('logoutEnforce',vm);
                    break;
                }
                case statecode.SUCCESS:{
                    successCall(data);
                    break;
                }
            }
        }
    }
}
//删除数据