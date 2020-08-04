<template>
  <div>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
      node-key="id"
    ></el-tree>
  </div>
</template>

<script>
export default {
  data () {
    return {
      defaultProps: {
        children: 'childs',
        label: 'name'
      }
    }
  },

  methods: {
    handleNodeClick (group) {
      this.$emit('selectGroup', group.id)
    }
  },

  computed: {
    treeData () {
      return [this.$store.getters.goodsTree]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
