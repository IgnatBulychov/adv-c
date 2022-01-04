<template>
  <div>
    <div class="d-flex justify-end">
      <v-btn
        color="teal"
        class="ma-2 white--text"
        outlined
        @click="dialogCreate = true"
      >
        Добавить
        <v-icon
          right
          dark
        >
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    
    <v-card
      v-for="area in areas"
      :key="area.id"
      class="my-2 mx-2">
      <v-list-item three-line>
        <v-list-item-avatar
          tile
          size="80"
          color="grey"
        >
          <v-img :src="area.poster"></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">
            {{ area.title }}
          </v-list-item-title>
          <v-list-item-subtitle v-html="area.description">            
          </v-list-item-subtitle>
        </v-list-item-content> 

        <div>
          {{ area.network.title }}
           <v-icon class="mr-1">
            mdi-heart
          </v-icon>
          <span class="subheading mr-2">256</span>
        </div>   
      </v-list-item>
    </v-card>

    <v-dialog
      v-model="dialogCreate"
      max-width="800px"
      persistent
      scrollable
    >  
      <create-area @close="()=>{dialogCreate = false}"/>
    </v-dialog>
  </div>
</template>

<script>
import CreateArea from '~/components/areas/create'
import { mapGetters } from 'vuex'
export default {
  layout: 'index',
  components: {
    CreateArea
  },
  data: () => ({
    dialogCreate:false,
    areas:[],
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