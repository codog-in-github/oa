import { Http } from '@/utils/Http';
import * as API from '@/constant/API';
import { isArray, isFunction } from '@/utils/validator';

/**
 * 接口构造工厂
 * @param {'get' | 'post'} methods
 * @param {string} url
 * @param {string[] | Function | undefined} params
 * @returns {(params) => Promise<any>}
 */
function request (methods, url, params) {
  if (isArray(params)) {
    return function (...args) {
      const reqParams = {};
      params.forEach((key, i) => {
        reqParams[key] = args[i];
      });
      return Http[methods]({ url, params: reqParams });
    };
  } else if (isFunction(params)) {
    return function (...args) {
      return Http[methods]({ url, params: params(...args) });
    };
  } else {
    return function (params) {
      return Http[methods]({ url, params });
    };
  }
}

function post (url, params) {
  return request('post', url, params);
}

function get (url, params) {
  return request('get', url, params);
}

export const login = post(API.LOGIN_PATH, ['username', 'password']);
export const getMenu = get(API.MENU_PATH);
export const clearStrage = get(API.LAST_UPDATE);
export const checkLoginStatus = get(API.LOGIN_STATUS);
export const logout = get(API.LOGOUT_PATH);
export const getOptions = get(API.OPTIONS_LIST, ['sid', 'pid']);
export const getBkgList = post(API.GET_BKG_LIST);
export const getBkgList2 = post(API.GET_BKG_LIST2);
export const getContainerList = post(API.GET_CONTAINER_LIST);
export const saveOrder = post(API.SAVE_ORDER);
export const getOrder = get(API.GET_ORDER, ['bkg_id']);
export const getBookingNotice = get(API.GET_BOOKING_NOTICE, ['bkg_id']);
export const getOrderId = post(API.GET_ORDER_ID);
export const deleteOrder = post(API.DELETE_ORDER, ['id', 'is_delete']);
export const changeOrderState = post(API.CHANGE_ORDER_STATE, ['id', 'state']);
export const confirmDetail = post(API.CONFIRM_DETAIL, ['id']);
export const changeOrderStep = post(API.CHANGE_ORDER_STEP, ['id', 'step']);
export const changeOrderRequestStep =
    post(API.CHANGE_ORDER_REQUEST_STEP, ['id', 'step']);
export const getHandingData = get(API.GET_HANDING_DATA, ['bkg_id']);
export const getRequestbook = get(API.GET_REQUESTBOOK);
export const getRequestbookList = get(API.GET_REQUESTBOOK_LIST, ['bkg_id']);
export const hasBookByCompanyNo = get(API.HAS_BOOK_BY_COMPANY_NO);
export const hasRequestbook = get(API.HAS_REQUESTBOOK, ['bkg_id']);
export const getCalendar = get(API.GET_CALENDAR);
export const setCalendarStatus = get(API.SET_CALENDAR_STATUS);
export const getDetailCalendar = get(API.GET_DETAIL_CALENDAR);
export const getRoleList = get(API.GET_ROLE_LIST);
export const getAuthList = get(API.GET_AUTH_LIST);
export const getRoleAuthList = get(API.GET_ROLE_AUTH_LIST, ['role_id']);
export const getParentAuth = get(API.GET_PARENT_AUTH, ['type']);
export const addMenu = post(API.ADD_MENU);
export const changeRoleAuth = post(API.CHANGE_ROLE_AUTH);
export const getReqList = post(API.GET_REQ_LIST);
export const changeRequestDetail = post(API.CHANGE_REQUEST_DETAIL);
export const bookerList = post(API.BOOKER_LIST);
export const addBooker = post(API.ADD_BOOKER);
export const editBooker = post(API.EDIT_BOOKER);
export const deleteBooker = post(API.DELETE_BOOKER, ['id']);
export const clearCache = () => Http.get({ url: API.CLEAR_CACHE });
export const getCountryList = post(API.GET_COUNTRY_LIST, function (pid = 0, query = '') {
  return { pid, query };
});
export const addCountry = post(API.ADD_COUNTRY);
export const editCountry = post(API.EDIT_COUNTRY, ['id', 'data']);
export const deleteCountry = post(API.DELETE_COUNTRY, ['id']);
/**
 *
 * @param {File} file 上传excel
 * @returns {Promise<string>}
 */
export const hsUpload = (file, formData) => {
  if (formData) {
    const data = new FormData();
    data.append('config', JSON.stringify(formData));
    return Http.upload(API.HS_UPLOAD, file, data);
  } else {
    return Http.upload(API.HS_UPLOAD, file);
  }
};
export const hsAdd = post(API.HS_ADD, ['description', 'hs']);
export const getIncomeList = post(API.IMCOME_LIST, ['bkgId']);
export const getExpendList = post(API.EXPEND_LIST, ['bkgId']);
export const getBankList = post(API.GET_BANK);
export const getDepartmentList = post(API.GET_DEPARTMENT);
export const saveRealTimeIncome = post(API.SAVE_REAL_TIEM_INOME, ['id', 'time']);
export const mvRequestStep = post(API.MV_REQUEST_STEP, ['id', 'step']);
