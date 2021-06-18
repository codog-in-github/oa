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
    background: #CFE0F4;
    height: 100vh;
    width: 100vw;
    padding: 60px 0 0 0;
    overflow: hidden;
}
.header,
.body{
    width: 100%;
}
.body{
    margin: -60px 0 0 0;
    height: 100% ;
    display: flex;
    box-sizing: border-box;
    padding: 0 0 0 80px;
}
.header{
    height: 60px;
    background:#000;
    position:absolute;
    margin: -60px 0 0 0;
}
.side{
    width: 80px;
    height: 100%;
    margin:  0 0 0 -80px;
    position: absolute;
    background: red;
}
.view{
    height: 100%;
    width: 100%;
}
</style>