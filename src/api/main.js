import axios from 'axios'
import qs from 'qs' 
import * as statecode from './statecode';


const BASE_PATH  = process.env.NODE_ENV === 'production' ? '/Oa':'http://127.0.0.1:81/Oa';

const LOGIN_PATH = BASE_PATH + '/Index/login';
const LOGOUT_PATH = BASE_PATH + '/Index/logout';
const LOGIN_STATUS = BASE_PATH + '/Index/';
const OPTIONS_LIST = BASE_PATH + '/Config/getOptions';

const GET_BKG_LIST = BASE_PATH + '/Bkg/getList';
const GET_CONTAINER_LIST = BASE_PATH + '/Container/getList';
const CONFIRM_DETAIL = BASE_PATH + '/Container/confirm';
const SAVE_ORDER = BASE_PATH + '/Bkg/saveData';
const GET_ORDER = BASE_PATH + '/Bkg/getBkgOrder';
const DELETE_ORDER = BASE_PATH + '/Bkg/deleteBkgOrder';
const CHANGE_ORDER_STATE = BASE_PATH + '/Bkg/changeOrderState';
const CHANGE_ORDER_STEP = BASE_PATH + '/Bkg/changeOrderStep';

const LAST_UPDATE = BASE_PATH + '/Index/needClear';

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
                const localOpt = localStorage.getItem(`options_${selectId}_${fatherOptionsId || ''}`);
                if(localOpt){
                    //检测是否本地缓存
                    options.item.splice(0, options.item.length);
                    options.item.push(...JSON.parse(localOpt));
                }else{
                    options.loading = true;
                    this.$api.queue = ()=>axios.get(`${OPTIONS_LIST}/sid/${selectId}/pid/${fatherOptionsId||''}`);
                    this.$api.queue = ({data})=>{
                        options.item.splice(0, options.item.length);
                        options.item.push(...data.data);
                        localStorage.setItem(`options_${selectId}_${fatherOptionsId || ''}`, JSON.stringify(data.data));
                        localStorage.setItem('options', localStorage.getItem('options') + `|options_${selectId}_${fatherOptionsId || ''}`);
                        options.loading = false;
                    };
                }
            },
            $getList(query, cb){
                this.$api.queue = ()=>axios.post(
                    GET_BKG_LIST,
                    qs.stringify(query)
                );
                this.$api.queue = cb;
            },
            $getContainerList(query, cb){
                this.$api.queue = ()=>axios.post(
                    GET_CONTAINER_LIST,
                    qs.stringify(query)
                );
                this.$api.queue = cb;
            },
            $saveOrder(data,cb){
                this.$api.queue = ()=>axios.post(
                    SAVE_ORDER,
                    qs.stringify(data)
                );
                this.$api.queue = cb;
            },
            
            $getOrder(bkg_id,cb){
                this.$api.queue = ()=>axios.get(
                    GET_ORDER + `/bkg_id/${bkg_id}`,
                );
                this.$api.queue = cb;
            },

            $deleteOrder(id, is_delete, cb){
                this.$api.queue = ()=>axios.post(
                    DELETE_ORDER,
                    qs.stringify({
                        id,
                        is_delete
                    })
                );
                this.$api.queue = cb;
            },
            
            $changeOrderState(id, state, cb){
                this.$api.queue = ()=>axios.post(
                    CHANGE_ORDER_STATE,
                    qs.stringify({
                        id,
                        state,
                    })
                );
                this.$api.queue = cb;
            },

            $confirmDetail(id, cb){
                this.$api.queue = ()=>axios.post(
                    CONFIRM_DETAIL,
                    qs.stringify({
                        id,
                    })
                );
                this.$api.queue = cb;
            },

            $changeOrderStep(id, step, cb){
                this.$api.queue = ()=>axios.post(
                    CHANGE_ORDER_STEP,
                    qs.stringify({
                        id,
                        step,
                    })
                );
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
        },
        catch:(reasion)=>{
            console.log(reasion)
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

        Vue.prototype.$clearStrage = function(){
            this.$api.queue = ()=>axios.get(LAST_UPDATE);
            this.$api.queue = ({data})=>{
                let last = data.data;
                if(last !== localStorage.getItem('last')){
                    localStorage.clear();
                    localStorage.setItem('last',last);
                }
            };
        }
        
        //注册代理监听器
        for(const item of needInterceptorsMethods){
            for(const methodName in item.methods){
                //注册同名代理对象并监听 调用前添加拦截器 结束后注销
                Vue.prototype[methodName] = new Proxy(item.methods[methodName],{
                        apply(target, thisArg, argumentsList){

                            const  interceptor = axios.interceptors.response.use((data)=>item.interceptor(thisArg, data));
                            const re = target.apply(thisArg, argumentsList);
                            thisArg.$api.promise.catch(item.catch);
                            thisArg.$api.promise = Promise.resolve();
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