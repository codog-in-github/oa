import Vue from 'vue'
import App from './App.vue'
import {store} from '@/vuex/main'
import {router} from '@/router/main'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import {Api} from './api/main'
import './assets/style/public.css'
import Loading from './components/Loading.vue'

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Api);

Vue.directive('loading',{
  inserted(el,binding){
    const LoadControl = Vue.extend(Loading);
    const LoadngComp = new LoadControl().$mount();
    // console.log(el);
    el._loadingDom = LoadngComp;
    el.style.position = el.style.position || 'relative';
    if(binding.value !== binding.valueOld){
      binding.value? 
        el.appendChild(el._loadingDom.$el) :
        el.removeChild(el._loadingDom.$el);
        // console.log(el);
    }
  },
  update(el, binding){
    if(binding.value !== binding.valueOld){
      binding.value? 
        el.appendChild(el._loadingDom.$el) :
        el.removeChild(el._loadingDom.$el);
    }
  },
});

export default new Vue({
  el:'#app',
  render: h => h(App),
  store,
  router,
});