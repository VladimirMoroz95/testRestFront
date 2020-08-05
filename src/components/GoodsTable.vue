<template>
 <div>
   <CustomDialog
     :visible="showDeleteDialog"
     @confirm="editGood"
     @close="showDeleteDialog = false"
     :loadingConfirmButton="loadingConfirmButton"
     confirmBtnText="Delete"
     title="Do you want"
   >
     <template v-slot:body>
       <el-input />
     </template>
   </CustomDialog>
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
           @click="editGood(scope.$index, scope.row)"
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
export default {
  props: {
    selectedGroupId: Number
  },

  data () {
    return {
      search: '',
      showDeleteDialog: false,
      selectedGood: null,
      newGoodName: ''
    }
  },

  methods: {
    showEditDialog (index, good) {
      this.selectedGood = good
      this.showDeleteDialog = true
    },
    editGood() {
      this.$store.commit()
    },
    deleteGood (index, good) {
      this.$store.commit('deleteGood', good)
    }
  },

  computed: {
    goods () {
      return this._.get(this.$store.state, `goodsByGroup.${this.selectedGroupId}`, [])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
