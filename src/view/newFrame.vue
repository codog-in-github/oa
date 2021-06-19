<template>
    <div class="frame-container">
        <div class="header">
            <div class="title">
            </div>
            <div class="info">
                <badge value="99+" type="warning">
                    <div class="el-icon-message info-button"></div>
                </badge>
                <badge value="99+" type="success">
                    <div class="el-icon-chat-dot-square info-button"></div>
                </badge>
                <span>HELLO!&nbsp;{{user.name}}</span>
                <el-button 
                    type="danger" 
                    class="el-icon-switch-button" 
                    circle 
                    size="mini"
                    @click.native="logout">
                </el-button>
            </div>
        </div>
        <div class="body">
            <div class="side">
                <button
                    class="btn-side-menu el-icon-s-home btn-side-menu-active"
                    >
                </button>
                <button
                    class="btn-side-menu el-icon-s-order"
                    >
                </button>
            </div>
            <router-view class="view"></router-view>
        </div>
        <div class="bubble-box"></div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import Badge from '../components/badge.vue';
export default {
    computed:{
        ...mapState({
            user: state => state.loginState.info,
        }),
    },
    methods: {
      logout(){
          this.$logout();
      }
    },
    components: { Badge },
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
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    box-sizing: border-box;
}
.info{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 300px;
    font-size: 20px;
}
.logout{
    flex-shrink: 0;
    flex-grow: 0;
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
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
}
.view{
    flex-flow: 1;
}
.info-button{
    font-size: 30px;
}
.bubble-box{
    background: #B5D7F3;
    position: absolute;
    border-radius: 50%;
    animation: bubble 20s infinite ;
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