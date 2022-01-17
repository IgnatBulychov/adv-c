<template>
  <div>
    <areas-list :areas="areas"/>
  </div>
</template>

<script>

import AreasList from '~/components/areas/AreasList'
export default {
  layout: 'index',
  components: {
    AreasList
  },
  data: () => ({
    areas:[],
  }),
  methods: {
    async findAreas() {
      let res = await this.$axios.get(`/areas/search`, {
        a:1
      })
      this.areas = res.data
    },
  },
  mounted() {
    this.findAreas()
  }
}
</script>