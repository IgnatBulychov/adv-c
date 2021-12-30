<template>
  <div>
      <v-form
        @submit.prevent="authenticate()" 
        ref="form"    
        lazy-validation
    >
        <v-card-text>
        <v-text-field
            label="Email"
            prepend-icon="mdi-account"
            type="email"
            v-model="form.email"
            :rules="emailRules"
            required
            color="teal"
            :disabled="loading"
        ></v-text-field>

        <v-text-field
            id="password"
            label="Пароль"
            prepend-icon="mdi-lock"
            type="password"
            v-model="form.password"
            :rules="passwordRules"
            required
            color="teal"
            :disabled="loading"
        ></v-text-field>
        </v-card-text>

        <v-card-actions>  

        <v-btn icon color="teal" to="/">
        <v-icon>
            mdi-arrow-left
        </v-icon>
        </v-btn>   
                        
            <div class="flex-grow-1"></div>
            <v-btn 
            color="teal"
            type="submit"
            dark
            :disabled="loading"
            >Войти</v-btn>

        </v-card-actions>

        <v-progress-linear
        v-if="loading"
        indeterminate
        color="teal"
        ></v-progress-linear>
        
    </v-form>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
export default {
  layout: 'index',
  components: {
    
  },
  data: () => ({
    area:null
  }),
  computed: {
      
  },
  async mounted() {
      
  }
}
</script>