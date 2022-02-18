<template>
  <v-card>
    <v-card-title>
    </v-card-title>
    <v-card-text>
      <v-form
        ref="form"    
        lazy-validation
        class="create-form py-2"
      >
     
      </v-form>
    </v-card-text>
    <v-card-actions>       
      <v-btn
        color="gray darken-1"
        text
        @click="$emit('close')"
      >
        Отмена
      </v-btn>
        <v-spacer></v-spacer>
      <v-btn
        color="teal"
        text
        @click="create()"
      >
        Создать
      </v-btn>
    </v-card-actions>


  </v-card>
</template>

<script>
export default {
  data: ()=>({
    form: {
      quantity: 50,
      comment: '',
      status: 'created'
    },
  }),  
  methods: {
    async create() {

      await this.$axios.post(`/offer`, {
        ...this.form,
        areaId: areaId,
        buyerId: buyerId,
        sellerId: sellerId
      })
      
      
    }
  }
}
</script>