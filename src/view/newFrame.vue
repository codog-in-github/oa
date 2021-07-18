<template>
    <div class="frame-container">
        <aside>
            <header class="shadow-card"> 
                <span>Hello!<br/>{{user.name}}</span>
                <el-button 
                    type="danger" 
                    class="el-icon-switch-button" 
                    circle 
                    size="mini"
                    @click.native="logout">
                </el-button>
            </header>
            <column-nav
                :urls="menu"
            ></column-nav>
        </aside>
        <main
            class="shadow-card"
        >
            <router-view 
                class="view"
                :key="$router.currentRoute.fullPath"
            ></router-view>
        </main>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import ColumnNav from '@/components/ColumnNav'
export default {
    computed:{
        ...mapState({
            user: state => state.loginState.info,
        }),
    },
    data(){
        return {
            menu:[
                {to:'/frame/list',label:'list'},
                {to:'/frame/form',label:'form'},
            ],
        };
    },
    methods: {
        logout(){
            this.$logout();
        },
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
    components:{
        ColumnNav,
    }
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
    padding: 10px;
    box-sizing: border-box;
}
aside{
    display: flex;
    flex-flow: column;
    margin-right: 5px;
}
aside > * + *{
    margin-top: 10px;
}
header > *{
    flex: 1 1 auto;
}
main{
    flex: 1 1 auto;
    box-sizing: border-box;
    height: 100%;
    width: 1px;
    display: flex;
    flex-flow: column;
    overflow: auto;
    padding: 10px;
    background: #fff;
}
header{
    display: flex;
    flex-flow: column;
    align-items: center;
    flex:0 0 auto;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    padding: 0 30px;
    box-sizing: border-box;
    background: #fff;
}
</style>