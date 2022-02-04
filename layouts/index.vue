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
        
     

        <v-avatar
        
        v-if="isLoggedIn"
        class="mr-10"
        color="grey darken-1"
        size="32"
        @click="$router.push('/dashboard/areas')"
      ></v-avatar>

    </v-app-bar>

    <v-main class="grey lighten-3">
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
  export default {
    data: () => ({
    }),
    computed: {
      ...mapGetters({
        isLoggedIn: 'auth/isLoggedIn'
      })
    }
  }
</script>

<style scoped> 

</style>