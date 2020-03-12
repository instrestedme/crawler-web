import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import getData from '@/http/getData'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

Vue.prototype.$getData=getData
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
