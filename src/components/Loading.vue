<template>
    <div class="loading">
        <div class="pos">
            <div
                v-for="point in points"
                :key="point.key"
                :style="point.style"
            ></div>
        </div>
    </div>
</template>
<script>
const { sin, cos, PI, floor } = Math;
export default {
    data(){
        const points = [];
        const len = 8;
        const R = 20;
        for (let i= 0;i <len;i++){
            points.push({
                key:i,
                style:{
                    top:floor(sin((i+len/4)*PI*2/len)*R) + 'px',
                    left:floor(cos((len/4-i)*PI*2/len)*R) + 'px',
                    animationDelay:i*.1 +'s',
                }
            })
        }
        return {
            points,
        }
    }
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
    justify-content: center;
    align-items: center;
    height: 100%;
    z-index: 9999;
}
.pos{
    width: 1px;
    height: 1px;
    position: relative;
}
.pos > div{
    position: absolute;
    width: 5px;
    height: 5px;
    border-radius: 2.5px;
    background: #409EFF;
    animation-name: loading;
    animation-iteration-count:infinite;
    animation-direction:alternate;
    animation-duration:.5s;
}
</style>
<style>
@keyframes loading {
    100%{
        transform: scale(2);
    }
}
</style>