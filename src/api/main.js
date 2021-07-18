import axios from 'axios'
import qs from 'qs' 
import * as statecode from './statecode';


const BASE_PATH  = process.env.NODE_ENV === 'production' ? '/Oa':'http://127.0.0.1:81/Oa';

const LOGIN_PATH = BASE_PATH + '/Index/login';
const LOGOUT_PATH = BASE_PATH + '/Index/logout';
const LOGIN_STATUS = BASE_PATH + '/Index/';
const OPTIONS_LIST = BASE_PATH + '/Config/getOptions';

const GET_BKG_LIST = BASE_PATH + '/Bkg/getList';

axios.defaults.withCredentials = true;


//需要添加建提起的方法 

const needInterceptorsMethods = [
    {
        //需要被拦截器的方法
        methods:{
            $checkLoginStatus(){
                this.$api.queue = ()=>axios.get(LOGIN_STATUS);
                this.$api.queue = ({data})=>{
                    this.$store.commit('doLogin',data.data);
                };
            },
            $logout(){
                axios.get(LOGOUT_PATH);
            },
            $getOptions(selectId, options, fatherOptionsId){
                options.loading = true;
                this.$api.queue = ()=>axios.get(`${OPTIONS_LIST}/sid/${selectId}/pid/${fatherOptionsId||''}`);
                this.$api.queue = ({data})=>{
                    options.item.splice(0, options.item.length);
                    options.item.push(...data.data);
                    options.loading = false;
                };
            },
            $getList(cb){
                this.$api.queue = ()=>axios.get(GET_BKG_LIST);
                this.$api.queue = cb;
            },
        },
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


        
        //注册代理监听器
        for(const item of needInterceptorsMethods){
            for(const methodName in item.methods){
                //注册同名代理对象并监听 调用前添加拦截器 结束后注销
                Vue.prototype[methodName] = new Proxy(item.methods[methodName],{
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