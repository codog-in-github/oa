<template>
    <div class="container">
        <div class="header"></div>
        <div class="body">
            <div class="side"></div>
            <router-view class="view"></router-view>
        </div>
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
.container{
    position: relative;
    background: #CFE0F4;
    height: 100vh;
    width: 100vw;
}
.header,
.body{
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    padding: 60px 0 0 0;
}
.header{
    height: 60px;
    /* background:#000; */
    position:absolute;
}
.side{
    width: 80px;
    height: 100%;
    /* background: red; */
}
.view{
    height: 100%;
}
</style>