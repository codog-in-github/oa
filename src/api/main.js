import { Http } from '@/utils/Http'
import { store } from '@/vuex/main'
import axios from 'axios'
import qs from 'qs'
import * as statecode from './statecode'
import {
    LOGIN_PATH,
    LOGOUT_PATH,
    LOGOUT_VERIFY_PATH,
    LOGIN_STATUS,
    OPTIONS_LIST,
    GET_BKG_LIST,
    GET_CONTAINER_LIST,
    CONFIRM_DETAIL,
    SAVE_ORDER,
    GET_ORDER,
    GET_ORDER_ID,
    DELETE_ORDER,
    CHANGE_ORDER_STATE,
    CHANGE_ORDER_STEP,
    CHANGE_ORDER_REQUEST_STEP,
    GET_REQUESTBOOK,
    GET_REQUESTBOOK_LIST,
    HAS_BOOK_BY_COMPANY_NO,
    HAS_REQUESTBOOK,
    GET_BOOKING_NOTICE,
    BOOKING_NOTICE,
    GET_HANDING_DATA,
    HANDING,
    REQUESTBOOK,
    LAST_UPDATE
} from '@/constant/API'

axios.defaults.withCredentials = true

export const URL = {
    BOOKING_NOTICE,
    HANDING,
    LOGOUT_VERIFY_PATH,
    REQUESTBOOK
}
// 需要添加建提起的方法

const needInterceptorsMethods = [
    {
        // 需要被拦截器的方法
        methods: {
            $getOrderID (bkg_no, cb) {
                this.$api.queue = () => axios.get(
                    GET_ORDER_ID + `/bkg_no/${bkg_no}`,
                )
                this.$api.queue = cb
            },

            $deleteOrder (id, is_delete, cb) {
                this.$api.queue = () => axios.post(
                    DELETE_ORDER,
                    qs.stringify({
                        id,
                        is_delete
                    })
                )
                this.$api.queue = cb
            },

            $changeOrderState (id, state, cb) {
                this.$api.queue = () => axios.post(
                    CHANGE_ORDER_STATE,
                    qs.stringify({
                        id,
                        state
                    })
                )
                this.$api.queue = cb
            },

            $confirmDetail (id, cb) {
                this.$api.queue = () => axios.post(
                    CONFIRM_DETAIL,
                    qs.stringify({ id })
                )
                this.$api.queue = cb
            },

            $changeOrderStep (id, step, cb) {
                this.$api.queue = () => axios.post(
                    CHANGE_ORDER_STEP,
                    qs.stringify({ id, step })
                )
                this.$api.queue = cb
            },

            $changeOrderRequestStep (id, step, cb) {
                this.$api.queue = () => axios.post(
                    CHANGE_ORDER_REQUEST_STEP,
                    qs.stringify({ id, step })
                )
                this.$api.queue = cb
            },

            $getHandingData (bkg_id, cb) {
                this.$api.queue = () => axios.get(
                    `${GET_HANDING_DATA}/bkg_id/${bkg_id || ''}`,
                )
                this.$api.queue = cb
            },

            $getBook ({ bkg_id, copy_id, id }, cb) {
                this.$api.queue = () => axios.get(
                    `${GET_REQUESTBOOK}/bkg_id/${bkg_id || '0'}/id/${id || '0'}/copy_id/${copy_id || '0'}`,
                )
                this.$api.queue = cb
            },

            $getBookList (bkg_id, cb) {
                this.$api.queue = () => axios.get(
                    `${GET_REQUESTBOOK_LIST}/bkg_id/${bkg_id}`,
                )
                this.$api.queue = cb
            },

            $hasBookByCompanyNo ({ company_no, copy_field }, cb) {
                this.$api.queue = () => axios.get(
                    `${HAS_BOOK_BY_COMPANY_NO}/company_no/${company_no || '0'}/copy_field/${copy_field}`,
                )
                this.$api.queue = cb
            },

            $hasBook (bkg_id, cb) {
                this.$api.queue = () => axios.get(
                    `${HAS_REQUESTBOOK}/bkg_id/${bkg_id || '0'}`,
                )
                this.$api.queue = cb
            }
        },
        // 拦截器
        interceptor: (vm, { data }) => {

            switch (data.error) {
                case statecode.WITHOUT_LOGIN: {
                    store.dispatch('logout', vm)
                    return Promise.reject('WITHOUT_LOGIN')
                }
                case statecode.SUCCESS: {
                    return data
                }
            }
        },
        catch: (reasion) => {
            console.log(reasion)
        }
    }
]

// 接口插件
export class Api {

    static install = function (Vue, options) {
        Vue.prototype.$api = new Api(options)
        // 注册代理监听器
        for (const item of needInterceptorsMethods) {
            for (const methodName in item.methods) {
                // 注册同名代理对象并监听 调用前添加拦截器 结束后注销
                Vue.prototype[methodName] = new Proxy(item.methods[methodName], {
                    apply (target, thisArg, argumentsList) {

                        const interceptor = axios.interceptors.response.use((data) => item.interceptor(thisArg, data))
                        const re = target.apply(thisArg, argumentsList)
                        thisArg.$api.promise.catch(item.catch)
                        thisArg.$api.promise = Promise.resolve()
                        axios.interceptors.response.eject(interceptor)
                        return re

                    }
                }
                )
            }
        }
    }

    constructor (optios) {
        this.optios = optios
        this.promise = Promise.resolve()
    }
    // 异步队列
    set queue (successCall) {
        this.promise = this.promise.then(
            data => successCall(data)
        )
    }
}

export const login = (username, password) => Http.post({
    url: LOGIN_PATH,
    params: { username, password }
})

export const clearStrage = () => Http.get({ url: LAST_UPDATE })

export const checkLoginStatus = () => Http.get({ url: LOGIN_STATUS })

export const logout = () => Http.get({ url: LOGOUT_PATH })

export const getOptions = (sid, pid) => Http.get({
    url: OPTIONS_LIST,
    params: {
        sid,
        pid
    }
})

export const getBkgList = params => Http.post({
    url: GET_BKG_LIST,
    params
})

export const getContainerList = params => Http.post({
    url: GET_CONTAINER_LIST,
    params
})

export const saveOrder = params => Http.post({
    url: SAVE_ORDER,
    params
})

export const getOrder = bkg_id => Http.get({
    url: GET_ORDER,
    params: {
        bkg_id
    }
})

export const getBookingNotice = bkg_id => Http.get({
    url: GET_BOOKING_NOTICE,
    params: {
        bkg_id
    }
})

export const getOrderId = bkg_no => Http.get({
    url: GET_ORDER_ID,
    params: { bkg_no }
})
