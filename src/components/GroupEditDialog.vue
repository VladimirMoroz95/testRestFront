<template>
  <BaseDialog
    :visible="showEditDialog"
    @confirm="editGroup"
    @close="$emit('close')"
    confirmBtnText="Edit"
    title="Edit group name"
  >
    <template v-slot:body>
      <el-input v-model="newGroupName"></el-input>
    </template>
  </BaseDialog>
</template>

<script>
import BaseDialog from './BaseDialog'

export default {
  props: {
    showEditDialog: Boolean,
    group: Object
  },

  data () {
    return {
      newGroupName: ''
    }
  },

  watch: {
    group (newGroup) {
      this.newGroupName = newGroup.name
    }
  },

  methods: {
    editGroup () {
      const { newGoodName, group } = this

      this.$store.commit('editGroup', { newGoodName, groupKey: group.id })
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
