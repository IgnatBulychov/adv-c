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
            <p  class="subtitle-2">
              CPC: {{area.cpc}} ₽              
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
    </v-card>
  </div>
</template>

<script>

export default {
  props: ['areas'],
  name: 'AreasList',
  methods: {
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