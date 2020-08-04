<template>
  <div>
    <el-tree :data="treeData" :props="defaultProps"></el-tree>
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

  computed: {
    treeData () {
      return [this.$store.getters.goodsTree]
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
