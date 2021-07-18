export const getRandomID = () => {
    return (new Date()).getTime() + Math.floor(Math.random()*9000 + 1000).toString();
}

export const findInArray = (returnKey, search, array, searchKey = 'id') => {
    for(const item of array){
        if(item[searchKey] === search){
            return item[returnKey];
        }
    }
}