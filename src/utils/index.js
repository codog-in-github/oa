/**
 * 创建随机id
 * @returns {String} 随机id
 */
export const getRandomID = () => {
    return (new Date()).getTime() + Math.floor(Math.random() * 9000 + 1000).toString()
}
/**
 * 在数组中搜索
 * @param {String} returnKey 查找元素属性
 * @param {Sting} search 查找值
 * @param {Array} array 目标数组
 * @param {Sting} searchKey 查找键 默认id
 * @returns {mix} 查找结果 未找到 就空对象
 */
export const findInArray = (returnKey, search, array, searchKey = 'id') => {
    for (const item of array) {
        if (item[searchKey] === search) {
            return item[returnKey]
        }
    }
    return {}
}
/**
 * 时间大小比较
 * @param {String} time1 时间字符串 固定格式 eg:2021-01-01 12:00:00
 * @param {Boolean} small 判断大小 小于true 大于 false
 * @param {String} time2 时间字符串
 * @returns Boolean
 */
export const timeCompare = (time1, small = true, time2 = 'today') => {
    const toArray = (timeStr) => [
        parseInt(timeStr.substr(0, 4)),
        parseInt(timeStr.substr(5, 2)),
        parseInt(timeStr.substr(8, 2)),
        parseInt(timeStr.substr(11, 2)),
        parseInt(timeStr.substr(14, 2)),
        parseInt(timeStr.substr(17, 2))
    ]
    let t1a = toArray(time1)
    let t2a
    if (time2 === 'today') {
        let t = new Date()
        t2a = [
            t.getFullYear(),
            t.getMonth() + 1,
            t.getDay() + 1,
            0,
            0,
            0
        ]
    } else {
        t2a = toArray(time1)
    }
    for (let i in t1a) {
        if (t1a[i] !== t2a[i]) {
            return t1a[i] < t2a[i] === small
        }
    }
    return false
}

export const postNewWindow = (url, params = {}) => {
    let form = document.createElement('form')
    form.name = '__new__'
    form.action = url
    form.style.display = 'none'
    form.target = '_blank'
    form.method = 'post'
    document.body.appendChild(form)
    for (let name in params) {
        if (params[name] instanceof Array) {
            for (let v of params[name]) {
                let ip = document.createElement('textarea')
                ip.name = `${name}[]`
                ip.innerHTML = v
                form.appendChild(ip)
            }
        } else {
            let ip = document.createElement('textarea')
            ip.name = name
            ip.innerHTML = params[name]
            form.appendChild(ip)
        }
    }
    form.submit()
    document.body.removeChild(form)
}

export const urlParamsStringify = params => {
    let paramsStr = ''
    let delimiter = '?'
    for (const key in params) {
        if (params[key] instanceof Array) {
            for (const value of params[key]) {
                paramsStr += `${delimiter}${key}[]=${value}`
                delimiter = '&'
            }
        } else {
            paramsStr += `${delimiter}${key}=${params[key]}`
            delimiter = '&'
        }
    }
    return paramsStr
}

/**
 * 包装防抖函数
 * @param { Function } fn 需要被包装的函数
 * @param { Object } thisArg this
 * @param { Number } delay 延时
 * @returns { Function } 防抖函数
 */
export const debounce = (fn, thisArg, delay = 300) => {
    let timmer
    return (...args) => {
        clearTimeout(timmer)
        timmer = setTimeout(fn.bind(thisArg), delay, ...args)
    }

}

/**
 * 包装节流函数
 * @param { Function } fn 需要被包装的函数
 * @param { Object } thisArg this
 * @param { Boolean } isAsync 是否未异步函数
 * @returns Function
 */
export const throttling = (fn, thisArg, isAsync = false) => {
    let locked = false
    if (isAsync) {
        return async args => {
            if (!locked) {
                locked = true
                await fn.apply(thisArg, args)
                locked = false
            }
        }
    } else {
        return args => {
            if (!locked) {
                locked = true
                fn.apply(thisArg, args)
                locked = false
            }
        }
    }
}

/**
 * 对象转数组
 * @param {Object} obj 对象
 * @param {Boolean} deep 是否递归转换
 * @returns {Any}
 */
export const objectToArray = (obj, deep = false) => {
    if (!(obj instanceof Object)) return obj
    const arr = []
    for (const key in obj) {
        if (deep &&
        obj[key] instanceof Object &&
        !(obj[key] instanceof Array)) {
            arr.push(objectToArray(obj[key], deep))
        } else {
            arr.push(obj[key])
        }
    }
    return arr
}

const PASSWORD_OFFSET_INITIAL = 5
const LEADER_RAND_RAGE = 7

/**
 * 密码加密
 * @param {String} password 明文
 * @returns {String} 密文
 */
export const passwordEncoding = password => {
    let ciphertext = ''
    let currentOffset = PASSWORD_OFFSET_INITIAL
    for (let i = 0; i < password.length; i++) {
        if (i % LEADER_RAND_RAGE === 0) {
            currentOffset += Math.floor(Math.random() * LEADER_RAND_RAGE)
            ciphertext += String.fromCharCode(currentOffset)
        }
        ciphertext += String.fromCharCode(password.charCodeAt(i) + currentOffset)
    }
    return ciphertext
}

/**
 * 密码解密
 * @param {String} ciphertext 密文
 * @returns {String} 明文
*/
export const passwordDecoding = ciphertext => {
    let password = ''
    let currentOffset = 0
    for (let i = 0; i < ciphertext.length; i++) {
        if (i % (LEADER_RAND_RAGE + 1) === 0) {
            currentOffset = ciphertext.charCodeAt(i)
            continue
        }
        password += String.fromCharCode(ciphertext.charCodeAt(i) - currentOffset)
    }
    return password
}

export function convertRes2Blob(response) {
    // 提取文件名
    const fileName = response.headers['content-disposition'].match(
        /filename=['"](.*)['"]/
    )[1]
    // 将二进制流转为blob
    const blob = new Blob([response.data], { type: 'application/octet-stream' })
    if (typeof window.navigator.msSaveBlob !== 'undefined') {
        // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
        window.navigator.msSaveBlob(blob, decodeURI(fileName))
    } else {
        // 创建新的URL并指向File对象或者Blob对象的地址
        const blobURL = window.URL.createObjectURL(blob)
        // 创建a标签，用于跳转至下载链接
        const tempLink = document.createElement('a')
        tempLink.style.display = 'none'
        tempLink.href = blobURL
        tempLink.setAttribute('download', decodeURI(fileName))
        // 兼容：某些浏览器不支持HTML5的download属性
        if (typeof tempLink.download === 'undefined') {
        tempLink.setAttribute('target', '_blank')
        }
        // 挂载a标签
        document.body.appendChild(tempLink)
        tempLink.click()
        document.body.removeChild(tempLink)
        // 释放blob URL地址
        window.URL.revokeObjectURL(blobURL)
    }
}

/**
 * 遍历对象返回数组
 * @param {object<string, T>} target 
 * @param {(string, T) => U} cb 
 * @returns {U[]}
 */
export const objectMap = (target, cb) => {
    return Object.keys(target).map(key => cb(key, target[key]))
}