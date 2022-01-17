<template>
<div>
  <v-card 
      v-for="area in areas"
      :key="area.id"
      class="my-2 mx-2">
      <v-list-item three-line>
        <v-list-item-avatar
          tile
          size="100"
        >
          <v-img :src="area.poster"></v-img>
          
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="text-h5 mb-1">            
            {{ area.title }}
            
          <!--
            <p class="subtitle-1">
              {{ area.description }}
            </p>
-->
            <p  class="subtitle-2">
            
                <v-icon class="mr-1" color="yellow">
                  mdi-star
                </v-icon>
                <span class="subheading mr-2">256</span>
              
            </p>
          </v-list-item-title>
          <v-list-item-subtitle color="gray">
            <v-avatar
              class="mr-2"
              size="24"
            >
              <v-img :src="area.network.poster"></v-img>
            </v-avatar>
            {{ area.network.title }}           
          </v-list-item-subtitle>
        </v-list-item-content> 

        <div class="actions">
          <div>        
          </div>
          
        </div>   
      </v-list-item>


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
</style>