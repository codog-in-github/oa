/**
 * 创建随机id
 * @returns {String} 随机id
 */
export const getRandomID = () => {
    return (new Date()).getTime() + Math.floor(Math.random()*9000 + 1000).toString();
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
    for(const item of array){
        if(item[searchKey] === search){
            return item[returnKey];
        }
    }
    return {};
}
/**
 * 时间大小比较   
 * @param {String} time1 时间字符串 固定格式 eg:2021-01-01 12:00:00
 * @param {Boolean} small 判断大小 小于true 大于 false
 * @param {String} time2 时间字符串
 * @returns Boolean 
 */
export const timeCompare = (time1, small=true, time2 = 'today')=>{
    const toArray = (timeStr) => [
        parseInt(timeStr.substr(0,4)),
        parseInt(timeStr.substr(5,2)),
        parseInt(timeStr.substr(8,2)),
        parseInt(timeStr.substr(11,2)),
        parseInt(timeStr.substr(14,2)),
        parseInt(timeStr.substr(17,2)),
    ];
    let t1a = toArray(time1);
    let t2a;
    if(time2 === 'today'){
        let t = new Date();
        t2a = [
            t.getFullYear(),
            t.getMonth()+1,
            t.getDay()+1,
            0,
            0,
            0,
        ];
    }else{
        t2a = toArray(time1);
    }
    for(let i in t1a){
        if(t1a[i] !== t2a[i]){
            return t1a[i] < t2a[i] === small;
        }
    }
    return false;
}

export const postNewWindow = (url, params = {})=>{
    let form = document.createElement('form');
    form.name = '__new__';
    form.action = url;
    form.style.display = 'none';
    form.target = '_blank';
    form.method = 'post';
    document.body.appendChild(form);
    for(let name in params){
        if(params[name] instanceof  Array){
            for(let v of params[name]){
                let ip = document.createElement("input");
                ip.name = `${name}[]`;
                ip.value = v;
                form.appendChild(ip);
            }
        }else{
            let ip = document.createElement("input");
            ip.name = name;
            ip.value = params[name];
            form.appendChild(ip);
        }
    }
    form.submit();
    document.body.removeChild(form);
}