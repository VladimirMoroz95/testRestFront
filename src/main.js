import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Tree, Loading } from 'element-ui'

Vue.config.productionTip = false
Vue.use(Tree)
Vue.use(Loading.directive)

Vue.prototype.$loading = Loading.service

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
