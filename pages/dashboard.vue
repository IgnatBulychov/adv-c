<template>
    <v-container>
        <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <v-list color="transparent">
                <v-list-item link to="/dashboard/areas">
                  <v-list-item-content>
                    <v-list-item-title>
                      Мои площадки
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item link to="/dashboard/settings">
                  <v-list-item-content>
                    <v-list-item-title>
                      Настройки
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>

                <v-divider class="my-2"></v-divider>

                <v-list-item
                  link
                  color="grey lighten-4"
                >
                  <v-list-item-content>
                    <v-list-item-title>
                      Refresh
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-sheet> 
          </v-col>

          <v-col>
            <v-sheet
              min-height="70vh"
              rounded="lg"
              class="pb-1"
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
}
</script>