<template>
<div>
  <v-card 
      v-for="area in areas"
      :key="area.id"
      class="my-2 mx-2">

      <div class="b-area-wrapper">
        <div class="b-avatar">
          <v-img :src="area.poster" width="120px" height="120px" class="e-avatar"></v-img>
        </div>
        <div class="b-content">

          <div class="b-info">
            <h3>{{ area.title }} </h3>
            <h6> {{ area.description }} </h6>
                 
          </div>

<div class="b-footer">
          <div class="b-network">

              
            <v-img :src="area.network.poster" width="18px" height="18px"></v-img>
            <div class="ml-1">
            {{ area.network.title }} 
            </div>  
          </div>
          <div class="b-owner">

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
          </div>
</div>
        </div>

<div class="b-right">
  <div class="b-stat">
    <v-icon class="mr-1" color="yellow">
      mdi-star
    </v-icon>
  </div>
  <div class="b-actions">
    <v-btn color="teal" dark>Заказать</v-btn> 
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
.b-actions {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
}
.b-area-wrapper {
  display: flex;
  height: 120px;
}

.e-avatar {
  border-bottom-left-radius: 4px;
  border-top-left-radius: 4px;
}

.b-content {
  flex:1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
}
.b-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.b-footer .b-network {
  display: flex;
  align-items: center;
  width: fit-content;
}
.b-footer .b-owner {
  display: flex;
  align-items: center;
  justify-content: center;
}

.b-footer .b-owner .b-user-info {
  font-size: 12px;
}

.b-right {
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.b-info h6 {
  color: rgb(104 104 104);
    font-weight: 400;
}
</style>