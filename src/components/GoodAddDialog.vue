<template>
  <BaseDialog
    :visible="showAddDialog"
    @confirm="addGood"
    @close="$emit('close')"
    confirmBtnText="Add"
    :title="dialogTitle"
  >
    <template v-slot:body>
      <el-input v-model="newGoodName" placeholder="Enter good name" />
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog'

export default {
  props: {
    showAddDialog: Boolean,
    dialogTitle: String,
    selectedGroup: Object
  },

  data () {
    return {
      newGoodName: ''
    }
  },

  methods: {
    addGood () {
      const { newGoodName, selectedGroup } = this

      this.$store.commit('addGood', { newGoodName, groupKey: selectedGroup.id })
      this.$emit('close')
    }
  },

  components: {
    BaseDialog
  }
}
</script>

<style lang="scss" scoped>

</style>
