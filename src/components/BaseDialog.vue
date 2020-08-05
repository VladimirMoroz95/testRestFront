<template>
  <el-dialog :title="title" :visible.sync="visible">
    <slot name="body"></slot>
    <div slot="footer" class="dialog-footer">
      <el-button
        @click="$emit('confirm')"
      >
        {{ confirmBtnText }}
      </el-button>
      <el-button v-show="cancelBtn" @click="$emit('close')">Cancel</el-button>
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
