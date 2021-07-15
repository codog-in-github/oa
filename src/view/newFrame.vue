<template>
    <div class="frame-container">
        <div class="header">
            <div class="title">
            </div>
            <div class="info">
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
            <side>
                <el-menu
                        default-active="0"
                        class="el-menu-vertical-demo"
                        background-color="#aaa"
                        text-color="#000"
                        active-text-color="red"
                        @select="linkTo"
                        >
                        <el-menu-item index="0">
                            <i class="el-icon-menu"></i>
                            <span slot="title">menu1</span>
                        </el-menu-item>
                        <el-menu-item index="1">
                            <i class="el-icon-setting"></i>
                            <span slot="title">menu2</span>
                        </el-menu-item>
                        </el-menu>
            </side>
            <router-view class="view"></router-view>
        </div>
        <div class="bubble-box"></div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    computed:{
        ...mapState({
            user: state => state.loginState.info,
        }),
    },
    data(){
        return {
            menuDirection:[
                '/frame/list',
                '/frame/form',
            ],
        };
    },
    methods: {
        logout(){
            this.$logout();
        },
        linkTo(index){
            const url = this.menuDirection[index];

            if(this.$route.path !== url){
                this.$router.push(url);
            }
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm=>{
            if(sessionStorage.getItem('logined')){
               next(); 
            } else {
                vm.$router.push('/login');
            }
        })
    },
}
</script>
<style scoped>
.frame-container{
    background: #bbb;
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
    color: #fff;
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
.info-button{
    font-size: 30px;
}

</style>