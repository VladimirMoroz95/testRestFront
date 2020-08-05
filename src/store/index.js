import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodGroups: null,
    goodsByGroup: null
  },
  getters: {
    goodsTree (state) {
      return _.get(state, 'goodGroups.root', null)
    }
  },
  mutations: {
    setGoodGroups (state, goodGroups) {
      state.goodGroups = goodGroups
    },
    setGoodByGroup (state, goodsByGroup) {
      state.goodsByGroup = goodsByGroup
    },
    deleteGood (state, { groupKey, id }) {
      const goodsArray = _.get(state, `goodsByGroup.${groupKey}`, []).concat([])

      _.remove(goodsArray, (good) => {
        return good.id === id
      })
      state.goodsByGroup[groupKey] = goodsArray
    }
  },
  actions: {
    async getGoodGroups ({ commit }) {
      return await import('../assets/files/goodgroups.json')
        .then(({ data }) => {
          const goodGroups = {}
          const childs = {}

          data.forEach(item => {
            if (item.parentKey === -1) {
              goodGroups.root = item
              goodGroups.root.treeNode = true
            } else {
              if (!childs[item.parentKey]) childs[item.parentKey] = []
              childs[item.parentKey].push(item)
            }
          })

          const getChilds = (key) => {
            const cell = _.get(goodGroups, key)
            if (!cell) return
            const cellId = _.get(goodGroups, key, {}).id
            cell.childs = childs[cellId] || []
            Object.keys(cell.childs).forEach(childKey => getChilds(`${key}.childs.${childKey}`))
          }

          getChilds('root')
          commit('setGoodGroups', goodGroups)
          return true
        })
    },
    async getGoods ({ commit }) {
      return await import('../assets/files/goods.json')
        .then(({ data }) => {
          const goodsByGroup = {}
          data.forEach(item => {
            if (!goodsByGroup[item.groupKey]) goodsByGroup[item.groupKey] = []
            goodsByGroup[item.groupKey].push(item)
          })
          commit('setGoodByGroup', goodsByGroup)
          return true
        })
    }
  },
  modules: {
  }
})
