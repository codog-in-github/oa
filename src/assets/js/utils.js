export const getRandomID = () => {
    return (new Date()).getTime() + Math.floor(Math.random()*9000 + 1000).toString();
}

export const findInArray = (returnKey, search, array, searchKey = 'id') => {
    for(const item of array){
        if(item[searchKey] === search){
            return item[returnKey];
        }
    }
    return {};
}

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