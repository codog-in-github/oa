<template>
    <div class="loading">
        <div class="el-icon-loading"></div>
        <div>loading</div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
.loading{
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 100%;
    height: 100%;
    display: flex;
    justify-items: center;
    text-align: center;
    align-items: center;
    height: 100%;
    z-index: 9999;
}
</style>