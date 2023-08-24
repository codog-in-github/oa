import { Http } from '@/utils/Http'
import  * as API from '@/constant/API'

export const login = (username, password) => Http.post({
    url: API.LOGIN_PATH,
    params: { username, password }
})

export const getMenu = () => Http.get({ url: API.MENU_PATH })

export const clearStrage = () => Http.get({ url: API.LAST_UPDATE })

export const checkLoginStatus = () => Http.get({ url: API.LOGIN_STATUS })

export const logout = () => Http.get({ url: API.LOGOUT_PATH })

export const getOptions = (sid, pid) => Http.get({
    url: API.OPTIONS_LIST,
    params: { sid, pid }
})

export const getBkgList = params => Http.post({
    url: API.GET_BKG_LIST,
    params
})

export const getContainerList = params => Http.post({
    url: API.GET_CONTAINER_LIST,
    params
})

export const saveOrder = params => Http.post({
    url: API.SAVE_ORDER,
    params
})

export const getOrder = bkg_id => Http.get({
    url: API.GET_ORDER,
    params: { bkg_id }
})

export const getBookingNotice = bkg_id => Http.get({
    url: API.GET_BOOKING_NOTICE,
    params: { bkg_id }
})

export const getOrderId = params => Http.post({
    url: API.GET_ORDER_ID,
    params
})

export const deleteOrder = (id, is_delete) => Http.post({
    url: API.DELETE_ORDER,
    params: { id, is_delete }
})

export const changeOrderState = (id, state) => Http.post({
    url: API.CHANGE_ORDER_STATE,
    params: { id, state }
})

export const confirmDetail = id => Http.post({
    url: API.CONFIRM_DETAIL,
    params: { id }
})

export const changeOrderStep = (id, step) => Http.post({
    url: API.CHANGE_ORDER_STEP,
    params: { id, step }
})

export const changeOrderRequestStep = (id, step) => Http.post({
    url: API.CHANGE_ORDER_REQUEST_STEP,
    params: { id, step }
})

export const getHandingData = bkg_id => Http.get({
    url: API.GET_HANDING_DATA,
    params: { bkg_id }
})

export const getRequestbook = params => Http.get({
    url: API.GET_REQUESTBOOK,
    params
})

export const getRequestbookList = bkg_id => Http.get({
    url: API.GET_REQUESTBOOK_LIST,
    params: { bkg_id }
})

export const hasBookByCompanyNo = params => Http.get({
    url: API.HAS_BOOK_BY_COMPANY_NO,
    params
})

export const hasRequestbook = bkg_id => Http.get({
    url: API.HAS_REQUESTBOOK,
    params: { bkg_id }
})

export const getCalendar = params => Http.get({
    url: API.GET_CALENDAR,
    params
})

export const setCalendarStatus = params => Http.get({
    url: API.SET_CALENDAR_STATUS,
    params
})

export const getDetailCalendar = params => Http.get({
    url: API.GET_DETAIL_CALENDAR,
    params
})

export const getRoleList = params => Http.get({
    url: API.GET_ROLE_LIST,
    params
})

export const getAuthList = () => Http.get({
    url: API.GET_AUTH_LIST
})

export const getRoleAuthList = role_id => Http.get({
    url: API.GET_ROLE_AUTH_LIST,
    params: { role_id }
})

export const getParentAuth = type => Http.get({
    url: API.GET_PARENT_AUTH,
    params: { type }
})

export const addMenu = params => Http.post({
    url: API.ADD_MENU,
    params
})

export const changeRoleAuth = params => Http.post({
    url: API.CHANGE_ROLE_AUTH,
    params
})

export const getReqList = params => Http.post({
    url: API.GET_REQ_LIST,
    params
})

export const changeRequestDetail = params => Http.post({
    url: API.CHANGE_REQUEST_DETAIL,
    params
})

export const bookerList = params => Http.post({
    url: API.BOOKER_LIST,
    params
})

export const addBooker = params => Http.post({
    url: API.ADD_BOOKER,
    params
})

export const editBooker = params => Http.post({
    url: API.EDIT_BOOKER,
    params
})

export const deleteBooker = id => Http.post({
    url: API.DELETE_BOOKER,
    params: { id }
})

export const clearCache = () => Http.get({ url: API.CLEAR_CACHE })

export const getCountryList = (pid, query = '') => Http.post({
    url: API.GET_COUNTRY_LIST,
    params: {
        pid: pid ?? 0,
        query
    }
})

export const addCountry = params => Http.post({
    url: API.ADD_COUNTRY,
    params
})

export const editCountry = (id, data) => Http.post({
    url: API.EDIT_COUNTRY,
    params: { id, data }
})

export const deleteCountry = id => Http.post({
    url: API.DELETE_COUNTRY,
    params: { id }
})

/**
 * 
 * @param {File} file 上传excel
 * @returns {Promise<string>}
 */
export const hsUpload = (file, formData) => {
    if(formData){
        const data = new FormData()
        data.append('config', JSON.stringify(formData))
        return Http.upload(HS_UPLOAD, file, data)
    } else {
        return Http.upload(HS_UPLOAD, file)
    }
}

export const hsAdd = (description,hs) => Http.post({
    url: API.HS_ADD,
    params: { description,hs }
})
