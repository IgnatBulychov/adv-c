<template>
  <div v-if="offer">    
  </div>
</template>

<script>
export default {
  layout: 'index',
  middleware: ['auth'],
  data: ()=>({
    offer: null
  }),
  async fetch() {
    let res = this.$axios(`/offers/${this.$route.params.id}`)
    this.offer = res.data
  }
}
</script>