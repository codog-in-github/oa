/* eslint-disable no-multi-spaces */
import { API_BASE_PATH } from './config';

/**
 * 接口返回错误码
 * 0       成功
 * 1~99    系统级别错误
 * 100~999 操作错误
 */
export const STATE_CODE_SUCCESS        = 0;
export const STATE_CODE_NO_LOGIN       = 1;
export const STATE_CODE_NO_AUTH        = 2;
export const STATE_CODE_ILLEGAL_PARAMS = 3;
export const STATE_CODE_PASSWORD_ERROR = 100;
export const STATE_CODE_OTHER          = 998;
export const STATE_CODE_UNKNOW         = 999;

/**
 * 接口地址
 */
const INDEX_PATH                       = API_BASE_PATH   + '/Index';
export const LOGIN_STATUS              = INDEX_PATH      + '/checkLoginStatus';
export const LOGIN_PATH                = INDEX_PATH      + '/login';
export const LOGOUT_PATH               = INDEX_PATH      + '/logout';
export const LOGOUT_VERIFY_PATH        = INDEX_PATH      + '/verify';
export const LAST_UPDATE               = INDEX_PATH      + '/needClear';
export const MENU_PATH                 = INDEX_PATH      + '/getMenu';
export const CLEAR_CACHE               = INDEX_PATH      + '/clearCache';

export const GET_CONTAINER_LIST        = API_BASE_PATH   + '/Container/getList';
export const CONFIRM_DETAIL            = API_BASE_PATH   + '/Container/confirm';

const BKG_PATH                         = API_BASE_PATH   + '/Bkg';
export const GET_BKG_LIST              = BKG_PATH        + '/getList';
export const GET_BKG_LIST2             = BKG_PATH        + '/getList2';
export const GET_REQ_LIST              = BKG_PATH        + '/getReqList';
export const SAVE_ORDER                = BKG_PATH        + '/saveData';
export const GET_ORDER                 = BKG_PATH        + '/getBkgOrder';
export const GET_ORDER_ID              = BKG_PATH        + '/getBkgOrderID';
export const DELETE_ORDER              = BKG_PATH        + '/deleteBkgOrder';
export const CHANGE_ORDER_STATE        = BKG_PATH        + '/changeOrderState';
export const CHANGE_ORDER_STEP         = BKG_PATH        + '/changeOrderStep';
export const SET_CALENDAR_STATUS       = BKG_PATH        + '/setCalendarStatus';
export const CHANGE_ORDER_REQUEST_STEP = BKG_PATH        + '/changeOrderRequestStep';
export const GET_CALENDAR              = BKG_PATH        + '/getCalendar';
export const GET_DETAIL_CALENDAR       = BKG_PATH        + '/getDetailCalendar';
export const IMCOME_LIST               = BKG_PATH        + '/incomeList';
export const EXPEND_LIST               = BKG_PATH        + '/expendList';
export const MV_REQUEST_STEP           = BKG_PATH        + '/mvRequestStep';

export const GET_BOOKING_NOTICE        = API_BASE_PATH   + '/BookingNotice/getBookingNotice';

const EXPORT                           = API_BASE_PATH  + '/Export';
export const GET_HANDING_DATA          = EXPORT         + '/getHandlngData';
export const HANDING                   = EXPORT         + '/handling';
export const REQUESTBOOK               = EXPORT         + '/requestbook';
export const BOOKING_NOTICE            = EXPORT         + '/bookingNotice';
export const ACCOUNTING_INCOME         = EXPORT         + '/accountingIncome';
export const ACCOUNTING_INCOME_SIMPLE  = EXPORT         + '/accountingIncomeSimple';

const REQUESTBOOK_DIR                  = API_BASE_PATH   + '/Requestbook';
export const GET_REQUESTBOOK           = REQUESTBOOK_DIR + '/getBook';
export const SAVE_REQUESTBOOK          = REQUESTBOOK_DIR + '/save';
export const GET_REQUESTBOOK_LIST      = REQUESTBOOK_DIR + '/getBookList';
export const HAS_BOOK_BY_COMPANY_NO    = REQUESTBOOK_DIR + '/hasBookByCompanyNo';
export const HAS_REQUESTBOOK           = REQUESTBOOK_DIR + '/hasBook';
export const SAVE_REAL_TIEM_INOME      = REQUESTBOOK_DIR + '/saveRealTime';

const CONFIG_PATH                      = API_BASE_PATH   + '/Config';
export const OPTIONS_LIST              = CONFIG_PATH     + '/getOptions';
export const BOOKER_LIST               = CONFIG_PATH     + '/bookerList';
export const ADD_BOOKER                = CONFIG_PATH     + '/addBooker';
export const EDIT_BOOKER               = CONFIG_PATH     + '/editBooker';
export const DELETE_BOOKER             = CONFIG_PATH     + '/deleteBooker';
export const GET_BANK                  = CONFIG_PATH     + '/bankList';
export const GET_DEPARTMENT            = CONFIG_PATH     + '/departmentList';

export const GET_COUNTRY_LIST          = CONFIG_PATH     + '/getCountryList';
export const ADD_COUNTRY               = CONFIG_PATH     + '/addCountry';
export const EDIT_COUNTRY              = CONFIG_PATH     + '/editCountry';
export const DELETE_COUNTRY            = CONFIG_PATH     + '/deleteCountry';

const SYSTEM_PATH                      = API_BASE_PATH   + '/System';
export const GET_ROLE_LIST             = SYSTEM_PATH     + '/getRoleList';
export const GET_AUTH_LIST             = SYSTEM_PATH     + '/getAuthList';
export const GET_ROLE_AUTH_LIST        = SYSTEM_PATH     + '/getRoleAuthList';
export const GET_PARENT_AUTH           = SYSTEM_PATH     + '/getParentAuth';
export const ADD_MENU                  = SYSTEM_PATH     + '/addMenu';
export const CHANGE_ROLE_AUTH          = SYSTEM_PATH     + '/changeRoleAuth';

const HS_PATH                          = API_BASE_PATH   + '/Hs';
export const HS_ADD                    = HS_PATH         + '/add';
export const HS_UPLOAD                 = HS_PATH         + '/upload';
