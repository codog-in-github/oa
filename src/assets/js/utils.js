export const getRandomID = () => {
    return (new Date()).getTime() + Math.floor(Math.random()*9000 + 1000).toString();
}