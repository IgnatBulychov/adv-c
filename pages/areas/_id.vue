<template>
  <div v-if="area">

    <v-sheet
          min-height="70vh"
          rounded="lg"
          class="my-3 mx-3 py-1 px-1"
        >
       <v-row> 
         <v-col cols="6">
          <v-card class="mx-2 my-2"  width="fit-content">
              <v-img :src="area.poster" width="350px" height="auto" class="e-avatar"></v-img>
          </v-card>
         </v-col>

         <v-col cols="6">




<v-card class="mx-2 my-2" width="fit-content">
 
<v-card-title class="text-center">
  {{ area.cpc }} ₽
</v-card-title>

  <v-card-subtitle class="text-center">
     цена за клик 
  </v-card-subtitle>
</v-card>

<v-card class="mx-2 my-2" width="fit-content">
 
<v-card-title class="text-center">
  
  
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


</v-card-title>


</v-card>

         </v-col>

<v-col cols="12">
<v-card class="mx-2 my-2">
  <v-card-title>
      <h3>{{ area.title }}</h3>


          
  </v-card-title>
    <div class="pb-3 px-4" v-html="area.description.replace('\n', '<br/>')" />

<v-card-subtitle>
Категории: 
    <v-chip
      class="ma-2"
      color="primary"
      v-for="category in area.categories"
      :key="category.id"
    >
      {{ category.title }}
    </v-chip>

  </v-card-subtitle>

    <v-card-subtitle>    
      <div class="d-flex align-center">
      
        <v-avatar
                class="mr-1"
                color="grey lighten-1"
                size="24"  
              >
                <v-img :src="area.owner.avatar" class="e-avatar"></v-img>
              </v-avatar>
              <div class="b-user-info">
                {{ area.owner.firstName }} {{ area.owner.lastName }} 
              </div>
      </div>
</v-card-subtitle>

</v-card>
 </v-col>
       </v-row>




<v-card class="mx-2 my-2" width="fit-content">
  <v-card-title>

     <div class="b-network">
   
              <v-img :src="area.network.poster" width="18px" height="18px"></v-img>
              <div class="ml-1">
              {{ area.network.title }} 
              </div>  
            </div>

 

              

  </v-card-title>
</v-card>







        
        </v-sheet>
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
.b-network {
  display: flex;
    align-items: center;
}
</style>