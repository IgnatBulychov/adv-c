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

             CPC: {{area.cpc}} ₽
            
                
                <!--<v-icon class="mr-1" color="yellow">
                  mdi-star
                </v-icon>
                <span class="subheading mr-2">256</span>-->
              
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
            <v-btn icon text @click="$emit('selectArea',area)">
              <v-icon color="warning">
                mdi-pen
              </v-icon>
            </v-btn>
             <v-btn icon text @click="remove(area.id)">
              <v-icon color="red">
                mdi-delete
              </v-icon>
            </v-btn>
          </div>
          
        </div>   
      </v-list-item>

<!--
<services-picker-with-api
 @servicesChanges="servicesChanges" 
 :enterData="area" 
 updateForm/>
-->
    </v-card>
</div>
</template>

<script>

//import ServicesPickerWithApi from './ServicesPickerWithApi.vue'
export default {
  props: ['areas'],
  name: 'AreasList',
  components: {
   // ServicesPickerWithApi
  },
  data: () => ({

  }),
  methods: {   
    servicesChanges() {

    },
    async remove(id) {
      let res = await this.$axios.delete(`/areas/${id}`)
      this.$emit('refresh')
    }
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