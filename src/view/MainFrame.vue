<template>
  <div class="frame-container">
    <aside>
      <div class="logo">
        <img
          src="~@/assets/img/logo.png"
          width="44px"
        >
        <span>春海組システム</span>
      </div>
      <column-nav :urls="menu" />
    </aside>
    <main class="shadow-card">
      <header>
        <span>Hello! {{ user.name }}</span>
        <el-button
          @click.native="clearCache"
        >
          キャッシュの消去
        </el-button>
        <el-button
          type="danger"
          icon="el-icon-switch-button"
          circle
          @click.native="logout"
        />
      </header>
      <div class="view-box">
        <router-view
          :key="$router.currentRoute.fullPath"
          class="view shadow-card"
        />
      </div>
    </main>
  </div>
</template>
<script>
import { clearCache, getMenu, logout } from '@/api/main';
import ColumnNav from '@/components/ColumnNav.vue';
import { mapState } from 'vuex';
import { AUTO_LOGIN_KEY, PASSWORD_KEY } from '@/constant';

export default {
  components: {
    ColumnNav
  },
  data () {
    return {
      menu: []
    };
  },
  computed: {
    ...mapState({
      user: state => state.loginState.info
    })
  },
  mounted () {
    this.getMenu();
  },
  methods: {
    async logout () {
      try {
        localStorage.removeItem(AUTO_LOGIN_KEY);
        localStorage.removeItem(PASSWORD_KEY);
        await logout();
        this.$store.dispatch('logout');
      } catch (error) {
        console.log('logout error :', error);
      }
    },
    async getMenu () {
      try {
        const menuGroups = await getMenu();
        const menu = [];
        for (const id in menuGroups) {
          const tmpGroup = {
            to: '-1',
            label: menuGroups[id][0].extra.split('|')[0],
            toggle: true,
            class: menuGroups[id][0].extra.split('|')[1],
            child: []
          };
          for (const sigleMenu of menuGroups[id]) {
            tmpGroup.child.push({ to: sigleMenu.c_target, label: sigleMenu.c_extra });
          }
          menu.push(tmpGroup);
        }
        this.menu = menu;
      } catch (error) {
      }
    },

    async clearCache () {
      try {
        await clearCache();
        this.$message.success('正常にクリアされました');
        setTimeout(() => {
          history.go(0);
        }, 1000);
      } catch (error) {
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (sessionStorage.getItem('logined')) {
        next();
      } else {
        vm.$store.dispatch('logout');
      }
    });
  }
};
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
    box-sizing: border-box;
}
aside{
    display: flex;
    flex-flow: column;
    width: 220px;
    height: 100%;
    background: #434343;
    overflow: auto;
}
.logo{
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 100%;
    line-height: 80px;
    font-size: 20px;
    font-family: MS Gothic;
    font-weight: 400;
    color: #FFFFFF;
}
main{
    flex: 1 1 auto;
    box-sizing: border-box;
    height: 100%;
    width: 1px;
    display: flex;
    flex-flow: column;
    overflow: auto;
    background: #F0F0F0;
}
header{
    height: 60px;
    display: flex;
    flex-flow: row;
    align-items: center;
    flex:0 0 auto;
    display: flex;
    justify-content: flex-end;
    box-sizing: border-box;
    background: #fff;
    padding-right: 50px;
}
header>*+*{
    margin-left: 20px;
}
.view-box{
    box-sizing: border-box;
    padding: 10px;
    flex:1 1 auto;
}
.view{
    height: 100%;
    background-color: #fff;
    overflow: auto;
}
@media print {
    header,
    aside{
        display: none;
    }
    main{
        padding: 0;
        flex: 0 0 auto;
        width: 142%;
        height: 142%;
        position: relative;
        left: -22%;
        top: -22%;
        transform:  scale(.7) ;
    }
    .shadow-card{
        border: none !important;
        box-shadow: none !important;
    }
}
</style>
