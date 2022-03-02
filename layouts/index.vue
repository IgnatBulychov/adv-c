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

      <div>
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
      </div>
    </v-app-bar>
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
.b-profile {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.e-name {
  white-space: nowrap;
  margin-right: 10px;
}
</style>