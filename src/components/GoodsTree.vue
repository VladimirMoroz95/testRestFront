<template>
  <div>
    <el-tree
      :data="treeData"
      :props="defaultProps"
      @node-click="handleNodeClick"
      node-key="treeNode"
    >
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="buttons-wrapper">
          <el-button
            size="mini"
            type="success"
            @click="() => editGoodGroup(data)"
          >
            Add good
          </el-button>
          <el-button
            size="mini"
            type="primary"
            @click="() => editGoodGroup(data)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="() => deleteGoodGroup(node, data)"
          >
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
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
    },

    editGoodGroup (data) {
      console.log('editGoodGroup', data)
    },

    removeGoodGroup (node, data) {
      console.log('removeGoodGroup', node, data)
    }
  },

  computed: {
    treeData () {
      return [this.$store.getters.goodsTree]
    }
  }
}
</script>

<style lang="scss">
  .buttons-wrapper {
    margin-left: 10px;
    text-transform: uppercase;
  }

  .el-tree-node__content {
    height: 40px;
  }

  .custom-tree-node {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }
</style>
