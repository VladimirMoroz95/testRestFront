<template>
  <div class="home-wrapper">
    <GoodsTree v-loading="loadTree" @selectGroup="selectGroup" />
    <GoodsTable :selectedGroupId="selectedGroupId" />
  </div>
</template>

<script>

import GoodsTree from '../components/GoodsTree'
import GoodsTable from '../components/GoodsTable'

export default {
  data () {
    return {
      loadTree: true,
      selectedGroupId: null
    }
  },

  async mounted () {
    this.loadTree = !await this.$store.dispatch('getGoodGroups')
    await this.$store.dispatch('getGoods')
  },

  methods: {
    selectGroup (selectedGroupId) {
      this.selectedGroupId = selectedGroupId
    }
  },

  components: {
    GoodsTree,
    GoodsTable
  }
}
</script>

<style lang="scss" scoped>
  .home-wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>
