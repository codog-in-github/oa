import axios from 'axios'
import qs from 'qs' 
import * as statecode from './statecode';


const BASE_PATH  = process.env.NODE_ENV === 'production' ? '/Oa':'http://127.0.0.1:81/Oa';

const LOGIN_PATH = BASE_PATH + '/Index/login';
const LOGOUT_PATH = BASE_PATH + '/Index/logout';
const LOGIN_STATUS = BASE_PATH + '/Index/';
const INTI_CONF = BASE_PATH + '/Config/initConfig';
const TRADER_CONF = BASE_PATH + '/Config/traderConfig';
const SHIPPER_CONF = BASE_PATH + '/Config/shipperConfig';
const CONTAINER_CONF = BASE_PATH + '/Config/containerConfig';
const PORT_CONF = BASE_PATH + '/Config/getPortAsync';

axios.defaults.withCredentials = true;


//需要添加建提起的方法 

const needInterceptorsMethods = [
    {
        //需要被拦截器的方法
        methods:[
            '$checkLoginStatus',
            '$logout',
            '$initConfig',
            '$traderConfig',
            '$shipperConfig',
            '$getPort',
            '$containerConfig'
        ],
        //拦截器
        interceptor:(vm,{data})=>{

            switch(data.error){
                case statecode.WITHOUT_LOGIN:{
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
        Vue.prototype.$doLogin = function(username, password,callback) {
            
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
                        callback();
                        console.log('password error');
                        break;
                    case statecode.SUCCESS:
                        callback();
                        this.$store.commit('doLogin',data.data);
                        this.$router.push('/frame');  
                        break;
                }
            }
            this.$api.promise.catch(console.log);
        }

        Vue.prototype._$checkLoginStatus = function(){
            this.$api.queue = ()=>axios.get(LOGIN_STATUS);
            this.$api.queue = ({data})=>{
                this.$store.commit('doLogin',data.data);
            };
        }

        Vue.prototype._$initConfig = function(cb){
            this.$api.queue = ()=>axios.get(INTI_CONF);
            this.$api.queue = cb;
        }
        
        Vue.prototype._$traderConfig = function(cb){
            this.$api.queue = ()=>axios.get(TRADER_CONF);
            this.$api.queue = cb;
        }

        Vue.prototype._$shipperConfig = function(cb){
            this.$api.queue = ()=>axios.get(SHIPPER_CONF);
            this.$api.queue = cb;
        }
        
        Vue.prototype._$containerConfig = function(cb){
            this.$api.queue = ()=>axios.get(CONTAINER_CONF);
            this.$api.queue = cb;
        }

        Vue.prototype._$getPort = function(pid, cb){
            this.$api.queue = ()=>axios.get(`${PORT_CONF}/pid/${pid}`);
            this.$api.queue = cb;
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
                            const re = target.apply(thisArg, argumentsList);
                            axios.interceptors.response.eject(interceptor);
                            return re;

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