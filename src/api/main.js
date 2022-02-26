import { Http } from '@/utils/Http'
import {
    LOGIN_PATH,
    LOGOUT_PATH,
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
    LAST_UPDATE,
    GET_CALENDAR,
    SET_CALENDAR_STATUS,
    GET_DETAIL_CALENDAR,
    GET_ROLE_LIST,
    GET_AUTH_LIST,
    GET_ROLE_AUTH_LIST,
    GET_PARENT_AUTH,
    ADD_MENU,
    CHANGE_ROLE_AUTH,
    MENU_PATH,
    GET_REQ_LIST,
    CHANGE_REQUEST_DETAIL,
    BOOKER_LIST,
    DELETE_BOOKER,
    EDIT_BOOKER,
    ADD_BOOKER,
    CLEAR_CACHE
} from '@/constant/API'

export const login = (username, password) => Http.post({
    url: LOGIN_PATH,
    params: { username, password }
})

export const getMenu = () => Http.get({ url: MENU_PATH })

export const clearStrage = () => Http.get({ url: LAST_UPDATE })

export const checkLoginStatus = () => Http.get({ url: LOGIN_STATUS })

export const logout = () => Http.get({ url: LOGOUT_PATH })

export const getOptions = (sid, pid) => Http.get({
    url: OPTIONS_LIST,
    params: { sid, pid }
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
    params: { bkg_id }
})

export const getBookingNotice = bkg_id => Http.get({
    url: GET_BOOKING_NOTICE,
    params: { bkg_id }
})

export const getOrderId = params => Http.post({
    url: GET_ORDER_ID,
    params
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

export const getCalendar = params => Http.get({
    url: GET_CALENDAR,
    params
})

export const setCalendarStatus = params => Http.get({
    url: SET_CALENDAR_STATUS,
    params
})

export const getDetailCalendar = params => Http.get({
    url: GET_DETAIL_CALENDAR,
    params
})

export const getRoleList = params => Http.get({
    url: GET_ROLE_LIST,
    params
})

export const getAuthList = () => Http.get({
    url: GET_AUTH_LIST
})

export const getRoleAuthList = role_id => Http.get({
    url: GET_ROLE_AUTH_LIST,
    params: { role_id }
})

export const getParentAuth = type => Http.get({
    url: GET_PARENT_AUTH,
    params: { type }
})

export const addMenu = params => Http.post({
    url: ADD_MENU,
    params
})

export const changeRoleAuth = params => Http.post({
    url: CHANGE_ROLE_AUTH,
    params
})

export const getReqList = params => Http.post({
    url: GET_REQ_LIST,
    params
})

export const changeRequestDetail = params => Http.post({
    url: CHANGE_REQUEST_DETAIL,
    params
})

export const bookerList = params => Http.post({
    url: BOOKER_LIST,
    params
})

export const addBooker = params => Http.post({
    url: ADD_BOOKER,
    params
})

export const editBooker = params => Http.post({
    url: EDIT_BOOKER,
    params
})

export const deleteBooker = id => Http.post({
    url: DELETE_BOOKER,
    params: { id }
})

export const clearCache = () => Http.get({ url: CLEAR_CACHE })
