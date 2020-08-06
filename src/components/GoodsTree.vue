<template>
  <div>
    <BaseDialog
      :visible="showAddDialog"
      @confirm="addGood"
      @close="showAddDialog = false"
      confirmBtnText="Add"
      :title="dialogTitle"
    >
      <template v-slot:body>
        <el-input v-model="newGoodName" placeholder="Enter good name" />
      </template>
    </BaseDialog>

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
            @click.stop="() => editGoodGroup(data)"
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
import BaseDialog from './BaseDialog'

export default {
  data () {
    return {
      defaultProps: {
        children: 'childs',
        label: 'name'
      },
      dialogTitle: '',
      newGoodName: '',
      selectedGroupKey: null,
      showAddDialog: false
    }
  },

  methods: {
    handleNodeClick (group) {
      this.$emit('selectGroup', group.id)
    },

    onShowAddDialog (group) {
      this.selectedGroupKey = group.id
      this.dialogTitle = `Add good to "${group.name}" group`
      this.showAddDialog = true
    },

    addGood () {
      const { newGoodName, selectedGroupKey } = this

      this.$store.commit('addGood', { newGoodName, groupKey: selectedGroupKey })
      this.showAddDialog = false
    },

    editGoodGroup (data) {
      console.log('editGoodGroup', data)
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
    BaseDialog
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
