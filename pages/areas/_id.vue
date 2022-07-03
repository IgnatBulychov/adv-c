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

         <v-col cols="6" class="d-flex justify-center align-center">




<v-card class="mx-2 my-2" width="fit-content">
 
<v-card-title class="d-flex justify-center align-center">
  {{ area.cpc }} ₽
</v-card-title>

  <v-card-subtitle class="text-center">
     цена за клик 
  </v-card-subtitle>



<v-card-text>
  
  
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

</v-card-text>

</v-card>



         </v-col>

<v-col cols="12">
<v-card class="mx-2 my-2">
  <v-card-title>
      <h3>{{ area.title }}</h3>


          
  </v-card-title>
    <div class="pb-3 px-4" v-if="area.description" v-html="area.description.replace('\n', '<br/>')" />

<v-card-subtitle v-if="area.url">
Ссылка на площадку: 
<a :href="area.url" target="_blank">{{area.url}}</a>
</v-card-subtitle>



<v-card-subtitle v-if="area.categories.length">
Категории: 
    <v-chip
      class="mx-1"
      color="primary"
      small
      v-for="category in area.categories"
      :key="category.id"
    >
      {{ category.title }}
    </v-chip>

  </v-card-subtitle>


  <v-card-subtitle v-if="area.locations.length">
  Локация подписчиков: 
    <span
      v-for="(locality, index) in area.locations"
      :key="locality.id"
    >
    <strong>
      {{ locality.locality }}<span v-if="area.locations.length < index+1">, </span>
    </strong>
    </span>

  </v-card-subtitle>

    <v-card-subtitle  class="d-flex ">  

      Автор:  
      <span class="d-flex align-center ml-2">
      
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
      </span>
</v-card-subtitle>



<v-card-subtitle class="d-flex">
Сеть:
 <div class="b-network ml-2">
   
              <v-img :src="area.network.poster" width="18px" height="18px"></v-img>
              <div class="ml-1">
              {{ area.network.title }} 
              </div>  
            </div>
</v-card-subtitle>

</v-card>



<v-card class="mx-2 my-2">
  <v-card-title>
    <h3>Отзывы</h3>

    <div class="reviews">
      <div v-for="review in area.reviews" :key="review.id" class="review">
        <div class="name d-flex justify-center items-center">
          <v-img :src="review.author.avatar" width="18px" height="18px"></v-img>
          <div>
            {{ review.author.firstName }} {{  review.author.lastName }}
          </div>
          <div class="text">
            {{ review.review }}
          </div> 
        </div>       
      </div>
    </div>


  </v-card-title>
</v-card>

 </v-col>
       </v-row>






        
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
    let [resAreas, resReviews] = await Promise.all([
      this.$axios.get(`/areas/${this.$route.params.id}`),
      this.$axios.get(`/reviews/area/${this.$route.params.id}`),
    ])
    this.area = resAreas.data
    this.area.reviews = resReviews.data
  }
}
</script>

<style scoped>
.b-network {
  display: flex;
    align-items: center;
    width: fit-content;
}
</style>