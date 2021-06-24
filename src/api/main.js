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


//需要添加建提起的方法 

const needInterceptorsMethods = [
    {
        //需要被拦截器的方法
        methods:[
            '$checkLoginStatus',
            '$logout'
        ],
        //拦截器
        interceptor:(vm,{data})=>{

            switch(data.error){
                case statecode.WITHOUT_LOGIN:{
                    console.log(vm);
                    vm.$store.dispatch('logoutEnforce',vm);
                    return Promise.reject('WITHOUT_LOGIN');
                }
                case statecode.SUCCESS:{
                    return data;
                }
            }
        }
    }
]

//接口插件
export class Api{
    
    static install = function (Vue, options) {
        Vue.prototype.$api = new Api(options);
        //登出
        Vue.prototype._$logout  = function () {
            axios.get(LOGOUT_PATH);
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

        Vue.prototype._$checkLoginStatus = function(){
            this.$api.queue = ()=>axios.get(LOGIN_STATUS);
            this.$api.queue = (data)=>{
                console.log(this.$store.state);
                this.$store.commit('doLogin',data);
            };
        }
        //注册代理监听器
        for(const item of needInterceptorsMethods){
            for(const method of item.methods){
                //注册同名代理对象并监听 调用前添加拦截器 结束后注销
                Vue.prototype[method] = new Proxy(Vue.prototype['_'+method],{
                        apply(target, thisArg, argumentsList){

                            const  interceptor = axios.interceptors.response.use((data)=>{
                                return item.interceptor(thisArg, data);
                            });
                            target.apply(thisArg, ...argumentsList);
                            axios.interceptors.response.eject(interceptor);

                        },
                    }
                );
            }
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
        )
    }
}