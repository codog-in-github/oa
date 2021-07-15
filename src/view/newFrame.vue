<template>
    <div class="frame-container">
        <aside>
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
        </aside>
        <main>
            <header> 
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
            </header>
            <section>
                <router-view class="view"></router-view>
            </section>
        </main>
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
    background: #ddd;
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-flow: nowrap row;
    overflow: hidden;
    align-items: flex-start;
}
aside{
    border-radius: 4px;
    overflow: hidden;
    flex :0 0 auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: rgba(0, 0, 0, .5) 1px 1px 2px;
    margin: 5px;
}
main{
    flex: 1 1 auto;
    margin: 0 10px 0 0;
    height: 100%;
    width: 1px;
    display: flex;
    flex-flow: column;
}
header{
    height: 60px;
    flex:0 0 auto;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    box-sizing: border-box;
}
section{
    flex: 1 1 auto;
    width: 100%;
    margin: 10px;
    border-radius: 10px;
    overflow: auto;
    padding: 10px;
    background: #fff;
    box-shadow: rgba(0, 0, 0, .5) 1px 1px 2px;
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