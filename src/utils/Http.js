import axios from 'axios';
import { stringify } from 'qs';
import { STATE_CODE_NO_AUTH, STATE_CODE_NO_LOGIN, STATE_CODE_SUCCESS } from '@/constant/API';
import { convertRes2Blob, urlParamsStringify } from '.';
import { Message } from 'element-ui';
import { router } from '@/router/main';

const _axios = axios.create();

const REQUEST_DEFALUT_CONFIG = {
  withCredentials: true
};

/**
 * @description http 请求类
 */
export class Http {
    static interceptor = {
      request () {},
      response (res) {
        const { data, status, headers } = res;
        if (status !== 200) {
          Message.error('ERROR');
          return Promise.reject('ERROR');
        }
        if (headers['content-disposition'] && /filename/.test(headers['content-disposition'])) {
          convertRes2Blob(res);
        } else {
          if (data.error === STATE_CODE_NO_LOGIN ||
                    data.error === STATE_CODE_NO_AUTH) {
            router.push('/login');
            return Promise.reject(data.message);
          }

          if (data.error === STATE_CODE_SUCCESS) {
            return Promise.resolve(data.data);
          } else {
            Message.error(data.message);
            return Promise.reject(data.message);
          }
        }

      }
    }

    static get (config = {}) {
      const {
        url = '',
        params = {}
      } = config;

      return _axios.get(
        url + urlParamsStringify(params),
        { ...REQUEST_DEFALUT_CONFIG }
      );
    }

    static post (config = {}) {
      const {
        url = '',
        params = {}
      } = config;

      return _axios.post(
        url, stringify(params),
        {
          ...REQUEST_DEFALUT_CONFIG
        }
      );
    }
    /**
     *
     * @param {string} url 地址
     * @param {File} file 上传文件
     * @returns {Promise<any>}
     */
    static upload (url, file, formData = new FormData()) {
      formData.append('file', file);
      return _axios.post(url, formData, {
        'Content-Type': 'multipart/form-data'
      });
    }
}

_axios.interceptors.response.use(Http.interceptor.response);
