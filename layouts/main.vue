<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app dark color="teal" >
      <v-list>
        <v-list-item
          v-for="[icon, text, link] in links"
          :key="icon"
          link
          :to="link"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="teal" dark >
      <v-app-bar-nav-icon @click="drawer = !drawer" ></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <nuxt/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  components: {
    
  },
  data: () => ({ 
    drawer: null,
    links: [
      ['mdi-magnify', 'Поиск', '/search'],
      ['mdi-sticker-text-outline', 'Правила'],
      ['mdi-comment-text-outline', 'Чат']
    ],
  }),
  computed: {
    title() {
      if (this.$route.name.indexOf('search')) {
        return 'Поиск рекламодателя'
      } else {
        return ''
      }
    }
  }
}
</script>