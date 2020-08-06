<template>
 <div>
   <BaseDialog
     :visible="showEditDialog"
     @confirm="editGood"
     @close="showEditDialog = false"
     confirmBtnText="Edit"
     title="Edit good"
   >
     <template v-slot:body>
       <el-input v-model="newGoodName" />
     </template>
   </BaseDialog>
   <el-table
     :data="goods"
     stripe
     style="width: 100%"
     empty-text="List is empty"
   >
     <el-table-column
       prop="id"
       label="ID"
       width="100"
     >
     </el-table-column>
     <el-table-column
       prop="groupKey"
       label="Group ID"
       width="100"
     >
     </el-table-column>
     <el-table-column
       prop="name"
       label="Name"
       width="520"
     >
     </el-table-column>
     <el-table-column align="right" width="200">
       <template slot="header">
         <el-input
           v-model="search"
           size="mini"
           placeholder="Type to search"
         />
       </template>
       <template slot-scope="scope">
         <el-button
           size="mini"
           @click="onShowEditDialog(scope.$index, scope.row)"
           type="primary"
         >Edit</el-button>
         <el-button
           size="mini"
           type="danger"
           @click="deleteGood(scope.$index, scope.row)"
         >Delete</el-button>
       </template>
     </el-table-column>
   </el-table>
 </div>
</template>

<script>
import BaseDialog from './BaseDialog'

export default {
  props: {
    selectedGroupId: Number
  },

  data () {
    return {
      search: '',
      showEditDialog: false,
      selectedGood: null,
      newGoodName: ''
    }
  },

  methods: {
    onShowEditDialog (index, good) {
      this.selectedGood = good
      this.newGoodName = good.name
      this.showEditDialog = true
    },
    editGood () {
      const { newGoodName, selectedGood } = this

      this.$store.commit('editGood', { selectedGood, newGoodName })
      this.showEditDialog = false
    },
    deleteGood (index, good) {
      this.$store.commit('deleteGood', good)
    }
  },

  computed: {
    goods () {
      return this._.get(this.$store.state, `goodsByGroup.${this.selectedGroupId}`, [])
    }
  },

  components: {
    BaseDialog
  }
}
</script>

<style lang="scss" scoped>

</style>
