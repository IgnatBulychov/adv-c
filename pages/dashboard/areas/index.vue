<template>
  <div>
    <h1>Мои площадки</h1>

    <v-btn
      color="teal"
      class="ma-2 white--text"
      to="/dashboard/areas/create"
    >
      Создать
      <v-icon
        right
        dark
      >
        mdi-plus
      </v-icon>
    </v-btn>

    <v-card
    v-for="(area,key) in areas"
    :key="key"
    class="mx-auto"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Top western road trips
    </v-card-title>

    <v-card-subtitle>
      1,000 miles of wonder
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Explore
      </v-btn>

    </v-card-actions>

  </v-card>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  layout: 'index',
  components: {
    
  },
  data: () => ({
    areas:[]
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  async mounted() {
    let res = await this.$axios.get(`/areas`)
    this.areas = res.data
  }
}
</script>