<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >

      <v-toolbar-items style="width: 100%;">
        <v-btn
          text
          color="teal"
          to="/"
        >
          qulink
        </v-btn>
         
        <v-btn
          text
          color="teal"
          to="/search"
        >
          Каталог
        </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          v-if="!isLoggedIn"
          text
          color="teal"
          to="/login"
        >
          Вход
        </v-btn>

        <v-btn
          v-if="!isLoggedIn"
          text
          color="teal"
          to="/register"
        >
          Регистрация
        </v-btn>
      </v-toolbar-items>

    <!--  <div>
        <v-menu offset-y  left v-if="isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <div v-bind="attrs" v-on="on">
              <div class="b-profile">
                <div class="e-name">
                  {{ user.firstName }} {{ user.lastName }} 
                </div>
                <v-avatar
                  class="mr-10"
                  color="grey darken-1"
                  size="32"
                >
                  <v-img
                    :src="user.avatar"
                  />
                </v-avatar>
              </div>
            </div>
          </template>
          <v-list>
            <v-list-item  @click="$router.push('/dashboard/settings')">
              <v-list-item-title >Настройки</v-list-item-title>
            </v-list-item>
            <v-list-item  @click="$router.push('/dashboard/areas')">
              <v-list-item-title >Мои площадки</v-list-item-title>
            </v-list-item>
            <v-list-item  @click="$router.push('/dashboard/offers')">
              <v-list-item-title >Мои заказы</v-list-item-title>
            </v-list-item>
            <v-list-item  @click="logout">
              <v-list-item-title >Выйти</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div> -->
    </v-app-bar>


    <v-navigation-drawer
        permanent
        expand-on-hover
        app
         v-if="isLoggedIn"
      >
        <v-list >
          <v-list-item class="px-2">
            <v-list-item-avatar>
              <v-img :src="user.avatar"></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                {{ user.firstName }} {{ user.lastName }} 
              </v-list-item-title>
              <v-list-item-subtitle>{{  }} </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list>
          <v-list-item  to="/dashboard/areas">
            <v-list-item-icon>
              <v-icon>mdi-file-table-box-multiple-outline</v-icon>
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
                <v-icon>mdi-message-arrow-right-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Созданные мной</v-list-item-title>
            </v-list-item>
              <v-list-item  to="/dashboard/offers/others">
              <v-list-item-icon>
                <v-icon>mdi-message-arrow-left-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-title>Адресованные мне</v-list-item-title>
            </v-list-item>
          </v-list-group>
          <v-list-item  to="/dashboard/settings">
            <v-list-item-icon>
              <v-icon>mdi-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Настройки</v-list-item-title>
          </v-list-item>
          <v-list-item  @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title >Выйти из системы</v-list-item-title>            
          </v-list-item>
        </v-list>
      </v-navigation-drawer>

    <v-main class="grey lighten-3">
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
  export default {
    data: () => ({
    }),
    computed: {
      ...mapGetters({
        isLoggedIn: 'auth/isLoggedIn',
        user: 'auth/user'
      })
    },
    methods: {
      ...mapActions({
        'logout':'auth/logout'
      })
    }
  }
</script>

<style scoped> 
/*
.b-profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.e-name {
  white-space: nowrap;
  margin-right: 10px;
}*/
</style>