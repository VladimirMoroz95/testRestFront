<template>
  <el-dialog :title="title" :visible.sync="visible" width="600px">
    <slot name="body"></slot>
    <div slot="footer" class="dialog-footer">
      <el-button type="success" @click="$emit('confirm')">
        {{ confirmBtnText }}
      </el-button>
      <el-button type="danger" @click="$emit('close')">Cancel</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    visible: {
      type: Boolean,
      default: false
    },
    confirmBtnText: {
      type: String
    }
  }

}
</script>

<style lang="scss">

</style>
