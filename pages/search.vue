<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
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
          
          <v-list
            flat dense
          >
            <v-subheader>Категории</v-subheader>

            <v-list-item-group
              v-model="selectedCategories"
              multiple
              active-class=""
              @change="findAreas"
            >
              <v-list-item v-for="category in categories" :key="category.id" :value="category.id">
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ category.title }}</v-list-item-title>
                  </v-list-item-content>                  
                </template>
              </v-list-item>
            </v-list-item-group>
          </v-list>      

          <v-list
            flat dense
          >
            <v-subheader>Расположение</v-subheader>

            <v-list-item-group
              v-model="selectedLocations"
              multiple
              active-class=""
              @change="findAreas"
            >
              <v-list-item v-for="locality in locations" :key="locality.id" :value="locality.id">
                <template v-slot:default="{ active }">
                  <v-list-item-action>
                    <v-checkbox :input-value="active"></v-checkbox>
                  </v-list-item-action>
                  <v-list-item-content>
                    <v-list-item-title>{{ locality.locality }}</v-list-item-title>
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
          class="py-1"
        >
          <areas-list-guest v-if="areas.length" :areas="areas" @openOfferDialog="openOfferDialog"/>

          <div v-else class="text-center py-4">
            Не найдено результатов
          </div>
          <v-dialog
            v-model="dialogCreateOffer"
            max-width="800px"
            persistent
            scrollable
            md
          >  
            <create-offer :selectedArea="selectedArea" @close="()=>{dialogCreateOffer = false;}"/>
          </v-dialog>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AreasListGuest from '~/components/areas/AreasListGuest'
import CreateOffer from '~/components/offers/create'
export default {
  layout: 'index',
  name: 'Search',
  components: {
    AreasListGuest, CreateOffer
  },
  data: () => ({
    selectedNetworks:[],
    selectedCategories: [],
    selectedLocations: [],
    networks: [],
    categories: [],
    locations: [],
    
    areas:[],
    dialogCreateOffer: false,
    selectedArea: {}
  }),
  methods: {
    async findAreas() {
      let params = {}
      if (this.selectedNetworks.length) params.networksIds = this.selectedNetworks.join(',')
      if (this.selectedCategories.length) params.categoriesIds = this.selectedCategories.join(',')
       if (this.selectedLocations.length) params.locationsIds = this.selectedLocations.join(',')
      try {
        let res = await this.$axios.get(`/areas/search`, {
          params: params
        })
        this.areas = res.data
      } catch {

      }
    },
    openOfferDialog(area) {
      this.selectedArea = area
      this.dialogCreateOffer = true
    }
  },
  async mounted() {
    let [networks,categories,locations] = await Promise.all([
      this.$axios.get(`/networks`),
      this.$axios.get(`/categories`),
      this.$axios.get(`/locations`)
    ])
    this.networks = networks.data
    this.categories = categories.data
    this.locations = locations.data
    this.findAreas()
  }
}
</script>