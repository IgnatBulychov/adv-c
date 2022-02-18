<template>
  <div>
    <div class="d-flex justify-end">
      <v-btn
        color="teal"
        class="ma-2 white--text"
        outlined
        @click="dialogCreate = true"
      >
        Добавить
        <v-icon
          right
          dark
        >
          mdi-plus
        </v-icon>
      </v-btn>
    </div>
    
    <areas-list :areas="areas" @refresh="getAreas" @selectArea="editArea" />

    <v-dialog
      v-model="dialogCreate"
      max-width="800px"
      persistent
      scrollable
    >  
      <create-area @close="()=>{dialogCreate = false; getAreas()}"/>
    </v-dialog>

    <v-dialog
      v-model="dialogUpdate"
      max-width="800px"
      persistent
      scrollable
    >  
      <update-area v-if="currentAreaEdit" :enterData="currentAreaEdit" @close="()=>{dialogUpdate = false;  getAreas()}"/>
    </v-dialog>
  </div>
</template>

<script>
import AreasList from '~/components/areas/AreasList'
import CreateArea from '~/components/areas/create'
import UpdateArea from '~/components/areas/update'
import { mapGetters } from 'vuex'
export default {
  layout: 'index',  
  middleware: ['auth'],
  components: {
    CreateArea, UpdateArea, AreasList
  },
  data: () => ({
    dialogCreate:false,
    dialogUpdate: false,
    currentAreaEdit: null,
    areas:[],
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    async getAreas() {
      let res = await this.$axios.get(`/areas`)
      this.areas = res.data
    },
    editArea(area) {
      this.currentAreaEdit = area 
      this.dialogUpdate = true
    }
  },
  mounted() {
    this.getAreas()
  }
}
</script>

<style scoped>
.actions {
  display: flex;
  height: 110px;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: column;
}
</style>