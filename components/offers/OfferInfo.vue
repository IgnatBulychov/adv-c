<template>
  <div v-if="offer">
    <v-card
      color="grey lighten-4"
      class="mb-3"
    >
      <v-card-text>
      Площадка: <strong> {{ offer.area.title }} </strong> <br> 
      {{ isMine ? 'Продавец' : 'Покупатель' }}: <strong> <nuxt-link :to="`/user/${offer[isMine ? 'seller' : 'buyer'].id}`"> {{ offer[isMine ? 'seller' : 'buyer'].firstName }} {{ offer[isMine ? 'seller' : 'buyer'].lastName }} </nuxt-link></strong> <br>
      Количество кликов: <strong> {{ offer.quantity }} </strong> <br>
      Стоимость заказа: <strong> {{ offer.quantity * offer.area.cpc }} ₽</strong>
      </v-card-text>
    </v-card>
    <v-card
      color="grey lighten-4"
      class="mb-12">
      <v-card-text>
        <v-row>
          <v-col v-if="offer.image" cols="4">
            <div class="py-2">
              Иллюстрация:
            </div>
            <v-img :src="offer.image"/>
            <v-btn
              v-if="showCopy"
              color="success"
              class="ma-2 white--text"
              @click="loadImage"
            >
              Загрузить
              <v-icon
                right
                dark
              >
                mdi-cloud-download
              </v-icon>
            </v-btn>
          </v-col>
          <v-col>
            <div class="py-2">
              Объявление:
            </div>
            <v-text-field
              outlined
              label="Ссылка"
              color="teal"
              :value="isMine ? offer.link : offer.linkWithTracker"
              readonly
              :append-icon="showCopy ? 'mdi-content-copy' : null"
              @click:append="copy(isMine ? offer.link : offer.linkWithTracker)"
            ></v-text-field>                  
            <v-text-field
              outlined
              label="Заголовок объявления"
              color="teal"
              :value="offer.title"
              readonly
              :append-icon="showCopy ? 'mdi-content-copy' : null"
              @click:append="copy(offer.title)"
            ></v-text-field>
            <v-textarea
              outlined
              label="Текст объявления"
              color="teal"
              :value="offer.text"
              readonly
              :append-icon="showCopy ? 'mdi-content-copy' : null"
              @click:append="copy(offer.text)"
            ></v-textarea>
          </v-col>
        </v-row>   
      </v-card-text>
    </v-card>

    <v-snackbar
      v-model="copySuccess"
      :timeout="3000"
      :top="true"
      color="success">
      Скопировано

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          text icon
          v-bind="attrs"
          @click="copySuccess = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

export default {
  name: 'OfferInfo',
  props: {
    offer: {
      type: Object
    },
    isMine: {
      type: Boolean, 
    },
    showCopy: {
      type: Boolean, 
    }
  },
  components: {
    
  },
  data: ()=>({    
    copySuccess: false,
  }),
  methods: {    
    async copy(text) {
      if (this.showCopy) {
        try {
          await this.$copyText(text);
        } catch (e) {
          console.error(e);
        } finally {
          this.copySuccess = true
        }
      }
     
    },
    loadImage() {

    }
  }
}

</script>