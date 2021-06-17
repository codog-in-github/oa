import Vue from 'vue'
import App from './App.vue'
import {store} from '@/vuex/main'
import {router} from '@/router/main'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import {Api} from './api/main'
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Api);

export default new Vue({
  el:'#app',
  render: h => h(App),
  store,
  router,
});