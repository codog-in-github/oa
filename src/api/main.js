import { Http } from '@/utils/Http'
import { store } from '@/vuex/main'
import axios from 'axios'
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
    GET_HANDING_DATA,
    LAST_UPDATE
} from '@/constant/API'

axios.defaults.withCredentials = true

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

export const deleteOrder = (id, is_delete) => Http.post({
    url: DELETE_ORDER,
    params: { id, is_delete }
})

export const changeOrderState = (id, state) => Http.post({
    url: CHANGE_ORDER_STATE,
    params: { id, state }
})

export const confirmDetail = id => Http.post({
    url: CONFIRM_DETAIL,
    params: { id }
})

export const changeOrderStep = (id, step) => Http.post({
    url: CHANGE_ORDER_STEP,
    params: { id, step }
})

export const changeOrderRequestStep = (id, step) => Http.post({
    url: CHANGE_ORDER_REQUEST_STEP,
    params: { id, step }
})

export const getHandingData = bkg_id => Http.get({
    url: GET_HANDING_DATA,
    params: { bkg_id }
})

export const getRequestbook = params => Http.get({
    url: GET_REQUESTBOOK,
    params
})

export const getRequestbookList = bkg_id => Http.get({
    url: GET_REQUESTBOOK_LIST,
    params: { bkg_id }
})

export const hasBookByCompanyNo = params => Http.get({
    url: HAS_BOOK_BY_COMPANY_NO,
    params
})

export const hasRequestbook = bkg_id => Http.get({
    url: HAS_REQUESTBOOK,
    params: { bkg_id }
})
