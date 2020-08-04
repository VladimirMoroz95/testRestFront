<template>
  <div>
    <Tree v-loading="loadTree" />
  </div>
</template>

<script>

import Tree from '../components/Tree'

export default {
  data () {
    return {
      loadTree: true
    }
  },

  async mounted () {
    this.loadTree = !await this.$store.dispatch('getGoodGroups')
    await this.$store.dispatch('getGoods')
  },

  components: {
    Tree
  }
}
</script>

<style lang="scss" scoped>

</style>
