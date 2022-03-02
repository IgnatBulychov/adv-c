<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="offers"
      :items-per-page="10"
      class="elevation-1"
      @click:row="openOffer"
      locale="ru-RU"
    >
      <template v-slot:item.summ="{ item }">        
        {{ item.cpc * item.quantity }}          
      </template>
     
      <template v-slot:item.status="{ item }">        
        {{ statuses[item.status] }}          
      </template>
       <template v-slot:item.createdAt="{ item }">        
        {{ new Date(item.createdAt).toLocaleString() }}          
      </template>
    </v-data-table>
  </div>
</template>

<script>


export default {
  layout: 'index',
  
  middleware: ['auth'],
  components: {
    
  },
   data () {
    return {
      offers:[],
      headers: [
        { text: 'Площадка', value: 'areaTitle', sortable:false },
        { text: 'Количество кликов', value: 'quantity', sortable:false },
        { text: 'Стоимость заказа', value: 'summ', sortable:false },
        { text: 'Статус', value: 'status', sortable:false },
        { text: 'Дата', value: 'createdAt' , sortable:false},
      ],
      statuses:{
        created: 'создан'
      }
    }
  },
  methods: {
    openOffer(offer, meta) {
      console.log(offer)
      this.$router.push(`/dashboard/offers/${offer.id}`)
    }, 
  },
  async created() {
    let response = await this.$axios.get('/offers/my')
    this.offers = response.data
  }
}
</script>

<style scoped>
.b-author {
  display: flex;
  align-items: center;
}
.b-author-name {
  margin-right: 10px;
  white-space: nowrap;
}
</style>