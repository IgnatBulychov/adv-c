<template>
<div>
  <v-card 
      v-for="area in areas"
      :key="area.id"
      class="my-2 mx-2">

      <div class="b-area-wrapper">
        <div class="b-avatar">
          <v-img :src="area.poster" width="200px" height="200px"></v-img>
        </div>
        <div class="b-content">

          <div class="b-info">
            <h2>{{ area.title }} </h2>
            <br>
            <h4> {{ area.description }} </h4>
         
          
            
                 
          </div>

          <div class="b-network">

              
              <v-img :src="area.network.poster" width="35px" height="35px"></v-img>
          
            {{ area.network.title }}   
          </div>
        </div>

<div class="b-right">
  <div class="b-stat">
    <v-icon class="mr-1" color="yellow">
      mdi-star
    </v-icon>
  </div>
  <div class="b-actions">
    <v-btn color="teal">Заказать</v-btn> 
  </div>
</div>
                   
                
         

      </div>
    </v-card>
</div>
</template>

<script>

export default {
  props: ['areas'],
  name: 'AreasList',
  components: {
    
  },
  data: () => ({

  }),
  methods: {   
    
  }
}
</script>

<style scoped>
.actions {
  height: 110px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-end;
}
.b-area-wrapper {
  display: flex;
  height: 200px;
}

.b-content {
  flex:1
}
.b-network {
  display: flex;
  align-items: center;
  width: fit-content;
}
</style>