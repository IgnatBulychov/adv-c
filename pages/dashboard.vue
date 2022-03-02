<template>
<v-container>
  <v-row>
    <v-col cols="12" sm="4" md="4" xl="3">
      <v-sheet rounded="lg">
        <v-list>
          <v-list-item  to="/dashboard/areas">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title> Мои площадки</v-list-item-title>
          </v-list-item>
          <v-list-group
            :value="true"
            prepend-icon="mdi-account-circle" 
          >
            <template v-slot:activator>
              <v-list-item-title>Заказы</v-list-item-title>
            </template>
            <v-list-item  to="/dashboard/offers/my">
              <v-list-item-icon>
                <v-icon> </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Созданные мной</v-list-item-title>
            </v-list-item>
              <v-list-item  to="/dashboard/offers/others">
              <v-list-item-icon>
                <v-icon> </v-icon>
              </v-list-item-icon>
              <v-list-item-title>Адресованные мне</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item  to="/dashboard/settings">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item>
        </v-list>
        </v-sheet> 
      </v-col>
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