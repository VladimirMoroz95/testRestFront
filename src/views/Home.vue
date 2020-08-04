<template>
  <div>
    Home
  </div>
</template>

<script>

export default {
  async mounted () {
    await this.$store.dispatch('getGoodGroups')
    await this.$store.dispatch('getGoods')
  }
}
</script>
