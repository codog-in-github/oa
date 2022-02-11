/* eslint-disable no-multi-spaces */
import { API_BASE_PATH } from './CONFIG'

/**
 * 接口返回错误码
 * 0 成功
 * 1~99 系统级别错误
 * 100~999 操作错误
 */
export const STATE_CODE_SUCCESS        = 0
export const STATE_CODE_NO_LOGIN       = 1
export const STATE_CODE_NO_AUTH        = 2
export const STATE_CODE_PARAMS_ERROR   = 3
export const STATE_CODE_ILLEGAL_PARAMS = 101
export const STATE_CODE_PASSWORD_ERROR = 100
export const STATE_CODE_OTHER          = 998
export const STATE_CODE_UNKNOW         = 999

export const LOGIN_STATUS              = API_BASE_PATH   + '/Index/checkLoginStatus'
export const LOGIN_PATH                = API_BASE_PATH   + '/Index/login'
export const LOGOUT_PATH               = API_BASE_PATH   + '/Index/logout'
export const LOGOUT_VERIFY_PATH        = API_BASE_PATH   + '/Index/verify'
export const LAST_UPDATE               = API_BASE_PATH   + '/Index/needClear'
export const MENU_PATH                 = API_BASE_PATH   + '/Index/getMenu'

export const GET_CONTAINER_LIST        = API_BASE_PATH   + '/Container/getList'
export const CONFIRM_DETAIL            = API_BASE_PATH   + '/Container/confirm'

const BKG_PATH                         = API_BASE_PATH   + '/Bkg'
export const GET_BKG_LIST              = BKG_PATH        + '/getList'
export const SAVE_ORDER                = BKG_PATH        + '/saveData'
export const GET_ORDER                 = BKG_PATH        + '/getBkgOrder'
export const GET_ORDER_ID              = BKG_PATH        + '/getBkgOrderID'
export const DELETE_ORDER              = BKG_PATH        + '/deleteBkgOrder'
export const CHANGE_ORDER_STATE        = BKG_PATH        + '/changeOrderState'
export const CHANGE_ORDER_STEP         = BKG_PATH        + '/changeOrderStep'
export const SET_CALENDAR_STATUS       = BKG_PATH        + '/setCalendarStatus'
export const CHANGE_ORDER_REQUEST_STEP = BKG_PATH        + '/changeOrderRequestStep'
export const GET_CALENDAR              = BKG_PATH        + '/getCalendar'
export const GET_DETAIL_CALENDAR       = BKG_PATH        + '/getDetailCalendar'

const BOOKING_NOTICE                   = BOOK_DIR        + '/bookingNotice'
export const GET_BOOKING_NOTICE        = BOOKING_NOTICE  + '/getBookingNotice'

const BOOK_DIR                         = API_BASE_PATH   + '/Export'
export const GET_HANDING_DATA          = BOOK_DIR        + '/getHandlngData'
export const HANDING                   = BOOK_DIR        + '/handling'
export const REQUESTBOOK               = BOOK_DIR        + '/requestbook'
export const GET_REQUESTBOOK           = BOOK_DIR        + '/getBook'
export const GET_REQUESTBOOK_LIST      = BOOK_DIR        + '/getBookList'
export const HAS_BOOK_BY_COMPANY_NO    = BOOK_DIR        + '/hasBookByCompanyNo'
export const HAS_REQUESTBOOK           = BOOK_DIR        + '/hasBook'

export const OPTIONS_LIST              = API_BASE_PATH   + '/Config/getOptions'

const SYSTEM_PATH                      = API_BASE_PATH   + '/System'
export const GET_ROLE_LIST             = SYSTEM_PATH     + '/getRoleList'
export const GET_AUTH_LIST             = SYSTEM_PATH     + '/getAuthList'
export const GET_ROLE_AUTH_LIST        = SYSTEM_PATH     + '/getRoleAuthList'
export const GET_PARENT_AUTH           = SYSTEM_PATH     + '/getParentAuth'
export const ADD_MENU                  = SYSTEM_PATH     + '/addMenu'
export const CHANGE_ROLE_AUTH          = SYSTEM_PATH     + '/changeRoleAuth'
