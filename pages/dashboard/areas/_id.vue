<template>
  <div>

     <v-img :src="area.poster" width="120px" height="120px" class="e-avatar"></v-img>

      <h3>{{ area.title }}</h3>
            <h6>{{ area.description }}</h6>


 <div class="b-network">
              <v-img :src="area.network.poster" width="18px" height="18px"></v-img>
              <div class="ml-1">
              {{ area.network.title }} 
              </div>  
            </div>


 <v-avatar
                class="mr-1"
                color="grey lighten-1"
                size="24"  
              >
                <v-img :src=" area.owner.avatar" class="e-avatar"></v-img>
              </v-avatar>
              <div class="b-user-info">
                {{ area.owner.firstName }} {{ area.owner.lastName }} 
              </div>


              {{ area.cpc }} ₽
цена за клик 


 <v-btn @click.prevent="dialogCreateOffer = true" color="teal" dark>Заказать</v-btn> 



  <v-dialog
            v-model="dialogCreateOffer"
            max-width="800px"
            persistent
            scrollable
            md
          >  
            <create-offer :selectedArea="area" @close="()=>{dialogCreateOffer = false;}"/>
          </v-dialog>


  </div>
</template>

<script>
import CreateOffer from '~/components/offers/create'
import { mapGetters } from 'vuex'
export default {
  layout: 'index',  
  components: {
    CreateOffer
  },
  data: () => ({
    area:null,
    dialogCreateOffer: false,
  }),
  computed: {
    ...mapGetters({ 
    })
  },
  methods: {
  },
  async mounted() {
    let res = await this.$axios.get(`/areas/${this.$route.params.id}`)
    this.area = res.data
  }
}
</script>

<style scoped>

</style>