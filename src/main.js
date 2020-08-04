import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'element-ui/lib/theme-chalk/index.css'
import { Tree, Loading, Table, TableColumn } from 'element-ui'
import _ from 'lodash'

Vue.config.productionTip = false
Vue.use(Tree)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Loading.directive)
Object.defineProperty(Vue.prototype, '_', { value: _ })

Vue.prototype.$loading = Loading.service
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
