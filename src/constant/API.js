import { API_BASE_PATH } from './CONFIG'

/**
 * 接口返回错误码
 * 0 成功
 * 1~99 系统级别错误
 * 100~999 操作错误
 */
export const STATE_CODE_SUCCESS = 0
export const STATE_CODE_NO_LOGIN = 1
export const STATE_CODE_NO_AUTH = 2
export const STATE_CODE_PARAMS_ERROR = 3
export const STATE_CODE_PASSWORD_ERROR = 100
export const STATE_CODE_OTHER = 998
export const STATE_CODE_UNKNOW = 999

// 接口地址
export const LOGIN_PATH = API_BASE_PATH + '/Index/login'
export const LOGOUT_PATH = API_BASE_PATH + '/Index/logout'
export const LOGOUT_VERIFY_PATH = API_BASE_PATH + '/Index/verify'
export const LOGIN_STATUS = API_BASE_PATH + '/Index/'
export const OPTIONS_LIST = API_BASE_PATH + '/Config/getOptions'
export const GET_BKG_LIST = API_BASE_PATH + '/Bkg/getList'
export const GET_CONTAINER_LIST = API_BASE_PATH + '/Container/getList'
export const CONFIRM_DETAIL = API_BASE_PATH + '/Container/confirm'
export const SAVE_ORDER = API_BASE_PATH + '/Bkg/saveData'
export const GET_ORDER = API_BASE_PATH + '/Bkg/getBkgOrder'
export const GET_ORDER_ID = API_BASE_PATH + '/Bkg/getBkgOrderID'
export const DELETE_ORDER = API_BASE_PATH + '/Bkg/deleteBkgOrder'
export const CHANGE_ORDER_STATE = API_BASE_PATH + '/Bkg/changeOrderState'
export const CHANGE_ORDER_STEP = API_BASE_PATH + '/Bkg/changeOrderStep'
export const CHANGE_ORDER_REQUEST_STEP = API_BASE_PATH + '/Bkg/changeOrderRequestStep'
export const GET_REQUESTBOOK = API_BASE_PATH + '/Requestbook/getBook'
export const GET_REQUESTBOOK_LIST = API_BASE_PATH + '/Requestbook/getBookList'
export const HAS_BOOK_BY_COMPANY_NO = API_BASE_PATH + '/Requestbook/hasBookByCompanyNo'
export const HAS_REQUESTBOOK = API_BASE_PATH + '/Requestbook/hasBook'
export const GET_BOOKING_NOTICE = API_BASE_PATH + '/BookingNotice/getBookingNotice'
export const BOOK_DIR = API_BASE_PATH + '/Export'
export const BOOKING_NOTICE = BOOK_DIR + '/bookingNotice'
export const GET_HANDING_DATA = BOOK_DIR + '/getHandlngData'
export const HANDING = BOOK_DIR + '/handling'
export const REQUESTBOOK = BOOK_DIR + '/requestbook'
export const LAST_UPDATE = API_BASE_PATH + '/Index/needClear'
