<template>
   <v-container fluid>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              
              
<v-list
      flat
    >
      <v-subheader>Размещение</v-subheader>

      <v-list-item-group
        v-model="selectedNetworks"
        multiple
        active-class=""
        @change="findAreas"
      >
        <v-list-item v-for="network in networks" :key="network.id" :value="network.id">
          <template v-slot:default="{ active }">
            <v-list-item-action>
              <v-checkbox :input-value="active"></v-checkbox>
            </v-list-item-action>

            <v-list-item-avatar size="20">
              <v-img :src="network.poster"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>{{ network.title }}</v-list-item-title>
            </v-list-item-content>

            
          </template>
        </v-list-item>

        
      </v-list-item-group>
    </v-list>





            
            
            </v-sheet> 
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="pb-1"
            >
              
              

    <areas-list-guest :areas="areas"/>



            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>

import AreasListGuest from '~/components/areas/AreasListGuest'
export default {
  layout: 'index',
  components: {
    AreasListGuest
  },
  data: () => ({
    selectedNetworks:[],
    networks: [],
    areas:[],
  }),
  methods: {
    async findAreas() {
      let params = {}
      if (this.selectedNetworks.length) params.networksIds = this.selectedNetworks.join(',')
      try {
        let res = await this.$axios.get(`/areas/search`, {
          params: params
        })
        this.areas = res.data
      } catch {

      }
    },
    async findNetwork() {
      let res = await this.$axios.get(`/networks`)
      this.networks = res.data
    },
  },
  async mounted() {
    await this.findNetwork()
    this.findAreas()
  }
}
</script>