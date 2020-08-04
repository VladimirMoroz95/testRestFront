<template>
  <div>
    Home
  </div>
</template>

<script>

export default {
  mounted () {
    this.$store.dispatch('getGoodGroups')
  }
}
</script>
