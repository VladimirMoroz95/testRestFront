<template>
  <div>
    <GoodAddDialog
      @close="showAddDialog = false"
      :showAddDialog="showAddDialog"
      :dialogTitle="dialogTitle"
      :selectedGroup="selectedGroup"
    />
    <GroupEditDialog
      @close="showEditDialog = false"
      :showEditDialog="showEditDialog"
      :group="selectedGroup"
    />

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
            type="text"
            @click.stop="() => onShowAddDialog(data)"
          >
            Add good
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click.stop="() => onShowEditDialog(data)"
          >
            Edit
          </el-button>
          <el-button
            size="mini"
            type="text"
            @click.stop="() => deleteGoodGroup(node, data)"
          >
            Delete
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
import GoodAddDialog from './GoodAddDialog'
import GroupEditDialog from './GroupEditDialog'

export default {
  data () {
    return {
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      showAddDialog: false,
      showEditDialog: false,
      selectedGroup: {},
      dialogTitle: ''
    }
  },

  methods: {
    handleNodeClick (group) {
      this.$emit('selectGroup', group.id)
    },

    onShowAddDialog (group) {
      this.selectedGroup = group
      this.dialogTitle = `Add good to "${group.name}" group`
      this.showAddDialog = true
    },

    onShowEditDialog (group) {
      this.selectedGroup = group
      this.showEditDialog = true
    },

    deleteGoodGroup (node, data) {
      console.log('removeGoodGroup', node, data)
    }
  },

  computed: {
    treeData () {
      return [this.$store.getters.goodsTree]
    }
  },

  components: {
    GoodAddDialog,
    GroupEditDialog
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
