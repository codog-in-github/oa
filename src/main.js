import Vue from 'vue';
import App from './App.vue';
import { store } from '@/vuex/main';
import { router } from '@/router/main';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import './assets/style/public.css';
import locale from 'element-ui/lib/locale/lang/ja';

Vue.config.productionTip = false;
Vue.use(ElementUI, { locale, size: 'mini' });

Vue.prototype.$eventBus = new Vue();

export default new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});
