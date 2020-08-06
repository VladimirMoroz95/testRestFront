import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    goodGroups: [],
    goodsByGroup: null
  },
  getters: {
    goodsTree (state) {
      return state.goodGroups
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
    },
    editGood (state, { selectedGood, newGoodName }) {
      const { id, groupKey } = selectedGood
      const goodsArray = _.get(state, `goodsByGroup.${groupKey}`, [])

      state.goodsByGroup[groupKey] = _.map(goodsArray, (item) => {
        if (item.id === id) item.name = newGoodName
        return item
      })
    },
    addGood (state, { newGoodName, groupKey }) {
      if (state.goodsByGroup[groupKey]) {
        state.goodsByGroup[groupKey].push({ id: _.random(0, 1999), groupKey, name: newGoodName })
      } else {
        state.goodsByGroup[groupKey] = [{ id: _.random(0, 1999), groupKey, name: newGoodName }]
      }
    },
    editGroup (state, { newGroupName, groupKey }) {
      const editTreeItem = (cell) => {
        if (!cell) return

        if (cell.id === groupKey) {
          cell.name = newGroupName
        } else if (cell.childs.length > 0) {
          cell.childs.forEach(item => editTreeItem(item))
        }
      }

      state.goodGroups.forEach(group => editTreeItem(group))
    },
    deleteGroup (state, groupId) {
      const deleteTreeItem = (TreeItems) => {
        if (!TreeItems) return
        _.remove(TreeItems, item => {
          if (item.id === groupId) return true

          deleteTreeItem(item.childs)
        })
      }
      deleteTreeItem(state.goodGroups)
      state.goodGroups = state.goodGroups.concat()
    }
  },
  actions: {
    async getGoodGroups ({ commit }) {
      return await import('../assets/files/goodgroups.json')
        .then(({ data }) => {
          const goodGroups = []
          const childs = {}

          data.forEach(item => {
            if (item.parentKey === -1) {
              goodGroups.push(item)
              goodGroups[goodGroups.length - 1].treeNode = true
            } else {
              if (!childs[item.parentKey]) childs[item.parentKey] = []
              childs[item.parentKey].push(item)
            }
          })

          const getChilds = (cell) => {
            if (!cell) return
            cell.childs = childs[cell.id] || []
            cell.childs.forEach(group => getChilds(group))
          }

          goodGroups.forEach(group => getChilds(group))
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
