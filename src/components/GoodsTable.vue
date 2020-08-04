<template>
 <div>
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
   </el-table>
 </div>
</template>

<script>
export default {
  props: {
    selectedGroupId: Number
  },

  computed: {
    goods () {
      console.log('goods', this._.get(this.$store.state, `goodsByGroup.${this.selectedGroupId}`, []))
      console.log('this.selectedGroupId', this.selectedGroupId)
      return this._.get(this.$store.state, `goodsByGroup.${this.selectedGroupId}`, [])
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
