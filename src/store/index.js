import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    async getGoodGroups () {
      await import('../assets/files/goodgroups.json')
        .then(data => {
          console.log('1', data)
        })
    }
  },
  modules: {
  }
})
