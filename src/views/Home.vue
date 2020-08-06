<template>
  <div class="home-wrapper">
    <GroupTree v-loading="loadTree" @selectGroup="selectGroup" />
    <GoodTable :selectedGroupId="selectedGroupId" />
  </div>
</template>

<script>

import GroupTree from '../components/GroupTree'
import GoodTable from '../components/GoodTable'

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
    GroupTree,
    GoodTable
  }
}
</script>

<style lang="scss" scoped>
  .home-wrapper {
    display: flex;
    justify-content: space-between;
  }
</style>
