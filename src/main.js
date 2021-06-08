import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {store} from '@/vuex/main'

Vue.config.productionTip = false
// Vue.prototype.$ElEMENT = {size:'small',zIndex:3000}

Vue.use(ElementUI);

new Vue({
  render: h => h(App),
  store,
  el:'#app'
})
