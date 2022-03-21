<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-sheet
          min-height="70vh"
          rounded="lg"
          class="py-1"
        >
          <nuxt-child/>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'index',
  middleware: ['auth'],
  components: {
    
  },
  data:()=>({ 
    admins: [
        ['Management', 'mdi-account-multiple-outline'],
        ['Settings', 'mdi-cog-outline'],
      ],
      cruds: [
        ['Create', 'mdi-plus-outline'],
        ['Read', 'mdi-file-outline'],
        ['Update', 'mdi-update'],
        ['Delete', 'mdi-delete'],
      ],
  })
}
</script>