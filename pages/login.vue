<template>
  <v-main>
    <v-container>
      <v-row
        align="center"
        justify="center"
        class="py-5 my-5"
      >
        <v-col
          class="py-5 my-5"
          cols="12"
          xs="10"
          sm="4"
          md="4"  
          lg="4"          
        >   
          <v-card class="elevation-12 my-5">
            <v-toolbar
              color="teal"
              dark
            >
              <v-toolbar-title>Вход</v-toolbar-title>   
              <v-spacer></v-spacer>     
            </v-toolbar>
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
            </v-card>
                
            <v-snackbar
              v-model="errorsFromServer"
              :timeout="3000"
              :top="true"
              color="error"
            >
              {{ errorMessage }}
          
              <template v-slot:action="{ attrs }">
                <v-btn
                  color="white"
                  text icon
                  v-bind="attrs"
                  @click="errorsFromServer = false"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-snackbar>
          </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'auth', 
  layout: 'index',
  data() {
    return {
      form: {
          email: '',
          password: ''
      },    
      errorsFromServer:false,
      errorMessage:'',
      loading: false,
      emailRules: [
        v => !!v || 'Введите E-mail',
        v => /.+@.+\..+/.test(v) || 'Некорректный E-mail',
      ],
      passwordRules: [
        v => !!v || 'Введите пароль',
      ],
    }
  },
  methods: {
    ...mapActions({
      'login' : 'auth/login'
    }),
    async authenticate() {
      if (this.validate()) {
        try {
          await this.login(this.form)
        } catch(e) { 
          this.errorsFromServer = true
          this.errorMessage = e.response.data
        }       
      }
    },
    validate () {
      if (this.$refs.form.validate()) {
        return true
      }
    }
  }
}
</script>
