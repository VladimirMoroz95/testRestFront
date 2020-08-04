import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodGroups: null,
    goodsByGroup: null
  },
  mutations: {
    setGoodGroups (state, goodGroups) {
      state.goodGroups = goodGroups
    },
    setGoodByGroup (state, goodsByGroup) {
      state.goodsByGroup = goodsByGroup
    }
  },
  actions: {
    async getGoodGroups ({ commit }) {
      return await import('../assets/files/goodgroups.json')
        .then(({ data }) => {
          const goodGroups = {}
          const childs = {}

          data.forEach(item => {
            if (item.parentKey === -1) goodGroups.root = item
            childs[item.parentKey] = { ...childs[item.parentKey], [item.id]: item }
          })

          const getChilds = (key) => {
            const cell = _.get(goodGroups, key)
            if (!cell) console.log('key', key, goodGroups)
            const cellId = _.get(goodGroups, key, {}).id
            cell.childs = childs[cellId] || {}

            Object.keys(cell.childs).forEach(childKey => getChilds(`${key}.childs.${childKey}`))
          }

          getChilds('root')

          console.log('1', goodGroups)
          commit('setGoodGroups', goodGroups)
          return true
        })
    },
    async getGoods ({ commit }) {
      return await import('../assets/files/goods.json')
        .then(({ data }) => {
          const goodsByGroup = {}
          data.forEach(item => {
            goodsByGroup[item.groupKey] = item
          })
          commit('setGoodByGroup', goodsByGroup)
          return true
        })
    }
  },
  modules: {
  }
})
