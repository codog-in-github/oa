import axios from 'axios'
import { stringify } from 'qs'
import { STATE_CODE_NO_LOGIN, STATE_CODE_SUCCESS } from '@/constant/API'
import { urlParamsStringify } from '.'
import { Message } from 'element-ui'
import { router } from '@/router/main'

const REQUEST_DEFALUT_CONFIG = {
    withCredentials: true
}

/**
 * @description http 请求类
 */
export class Http {
    static interceptor = {
        request () {},
        response (res) {
            const { data, status } = res
            if (status !== 200) {
                Message.error('ERROR')
                return Promise.reject('ERROR')
            }

            if (data.error === STATE_CODE_NO_LOGIN) {
                Message.error('please login')
                router.push('/login')
                return Promise.reject(data.message)
            }

            if (data.error === STATE_CODE_SUCCESS) {
                return Promise.resolve(data.data)
            } else {
                Message.error(data.message)
                return Promise.reject(data.message)
            }
        }
    }

    static get (config = {}) {
        const {
            url = '',
            params = {}
        } = config

        return axios.get(
            url + urlParamsStringify(params),
            { ...REQUEST_DEFALUT_CONFIG }
        )
    }

    static post (config = {}) {
        const {
            url = '',
            params = {}
        } = config

        return axios.post(
            url, stringify(params),
            { ...REQUEST_DEFALUT_CONFIG }
        )
    }
}

axios.interceptors.response.use(Http.interceptor.response)
