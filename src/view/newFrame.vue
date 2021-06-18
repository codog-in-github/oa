<template>
    <div class="frame-container">
        <div class="header"></div>
        <div class="body">
            <div class="side"></div>
            <router-view class="view"></router-view>
        </div>
        <div class="bubble-box"></div>
    </div>
</template>
<script>
export default {
    
    methods: {
      handleSelect(key) {
        this.$router.push(key)
      }
    }
}
</script>
<style scoped>
.frame-container{
    background: #CFE0F4;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: column nowrap;
    z-index: -999;
    overflow: hidden;
}
.header,
.body{
    width: 100%;
    
}
.header{
    height: 60px;
    flex-grow: 0;
    flex-shrink: 0;
    z-index: 2;
}
.body{
    display: flex;
    flex-grow: 1;
    z-index: 2;
}
.side{
    width: 80px;
    height: 100%;
    flex-grow: 0;
    flex-shrink: 0;
}
.view{
    flex-flow: 1;
}
.bubble-box{
    background: #B5D7F3;
    position: absolute;
    border-radius: 50%;
    animation: bubble 5s infinite ;
    width: 10vmin;
    height: 10vmin;
    z-index: 1;
}
@keyframes bubble {
    0% {
        left: 50vw;
        bottom: 0;
        width: 10vmin;
        height: 10vmin;
        opacity: 0;
    }
    0% {
        opacity: .1;
    }
    50%{
        top: 30vh;
        left: 70vw;
        opacity: .5;
    }
    70%{
        opacity: .9;
    }
    100% {
        top: 0;
        left: 500px;
        width: 50vmin;
        height: 50vmin;
        opacity: 0;
    }
}
</style>