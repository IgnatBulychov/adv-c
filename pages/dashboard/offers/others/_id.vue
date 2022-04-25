<template>
  <div v-if="offer && !offer.isMine" class="px-1">
    <v-row>
      <v-col cols="12" md="8">

      <v-stepper
        v-model="step"
        vertical
      >
        <v-stepper-step
          :complete="step > 1"
          step="1"
        >
          Вам поступил заказ
          <small v-if="step == 1">Если вы готовы разместить следующее объявление заказчика и обещаете предоставить заказанное
            количество переходов на ссылки, нажмите Подтвердить. Если не согласны, нажмите Отклонить и договоритесь с 
            заказчиком через мессенджер о других условиях сделки.
          </small>
        </v-stepper-step>

        <v-stepper-content step="1" v-if="offer">
          <v-card
            color="grey lighten-4"
            class="mb-12"
            height="100px"
          >
            Площадка: {{ offer.area.title }} <br>
            Заказчик: <nuxt-link :to="`/user/${offer.buyer.id}`"> {{ offer.buyer.firstName }} {{ offer.buyer.lastName }} </nuxt-link> <br>
            Количество кликов: {{ offer.quantity }}
            Стоимость заказа: {{ offer.quantity * offer.area.cpc }} ₽
          </v-card>
          <v-card
            color="grey lighten-4"
            class="mb-12"
            height="100px"
          >
            Объявление закзчика:
            {{ offer.title }}
            {{ offer.text }}
            <v-img width="100" :src=" offer.text"/>
          </v-card>
          <v-btn
            color="primary"
            @click="setStatus('accepted')"
          >
            Подтвердить
          </v-btn>
          <v-btn text>
            Отклонить
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 2"
          step="2"
        >
          Заказ принят
          <small v-if="step == 2">Ожидайте пока закзачик произведет оплату. 
          </small>
        </v-stepper-step>

        <v-stepper-content step="2">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          >
           <v-card-text>
              
           </v-card-text>
          </v-card>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 3"
          step="3"
        >
           Заказ оплачен заказчиком
          <small v-if="step == 3">Ожидайте получения оплаты, затем нажмите 
            Подтвердить и переходите к размещению объявления на вашем ресурсе.
          </small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
           <v-btn
            color="primary"
            @click="setStatus('paymentСonfirmed')"
          >
            Подтвердить получение оплаты
          </v-btn>
          <v-btn text>
            Оплата не получена
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 4"
          step="4"
        >
          Разместите объявление
          <small v-if="step == 4">Разместите объявление клиента на вашем ресурсе и нажмите подтвердить. 
          </small>
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
          <v-btn
            color="primary"
            @click="setStatus('placed')"
          >
            Подтвердить размещение
          </v-btn>
          <v-btn
            text
            @click="step = 4"
          >
            Отменить заказ
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 5"
          step="5"
        >
          Вы разместили объявление
          <small v-if="step == 5">Ожидайте пока это покупатель проверит это</small>
        </v-stepper-step>

        <v-stepper-content step="5">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 6"
          step="6"
        >
          Покупатель подтвердил размещение
          <small  v-if="step == 6">Здесь вы увидите количество
            переходов по объявлению. Как только количество будет равным заказанному, заказ будет считаться выполненным.</small>
        </v-stepper-step>

        <v-stepper-content step="6">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
        </v-stepper-content>


        <v-stepper-step step="7">
          Заказ выполнен
        </v-stepper-step>
        <v-stepper-content step="7">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
        </v-stepper-content>

      </v-stepper>
      </v-col>
      <v-col cols="12" md="4" class="right-col">      
        <offer-messenger 
          :messages="messages"
          @sendMessage="sendMessage"
          @setViewed="setViewed"
        />
      </v-col>
    </v-row>

  </div>
</template>

<script>
import ioClientVue from 'socket.io-client';
import { mapGetters } from 'vuex'
import OfferMessenger from '~/components/offers/OfferMessenger';

export default {
  layout: 'index',
  components: {
    OfferMessenger
  },
  middleware: ['auth'],
  data: ()=>({
    socket : null,
    statuses:['', 'created', 'accepted', 'paid', 'paymentСonfirmed', 'placed', 'placedСonfirmed', 'completed'],
    offer: null,
    step: 1,
    messages:[],
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    async setStatus(status) {
      try {
        await this.$axios.put(`/offer/${this.$route.params.id}`, {
          status
        })
        this.step++
        this.socket.emit('SET_OFFER_STATUS', {
          status: status,
          toOfferId: this.offer.id
        })
      } catch (e) {

      }     
    },
    onMessage(message) {
      this.messages.push({
        id: message.id,
        isFromMe: false,
        isViewed: null,
        text: message.text
      })
    },
    async sendMessage(message) {
      const { data: messageId }  = await this.$axios.post(`/offer/messages/${this.offer.id}`, {
        text: message
      })
      this.messages.push({
        id: messageId,
        isFromMe: true,
        isViewed: null,
        text: message
      })
      this.socket.emit('SEND_OFFER_MESSAGE', {
        id: messageId,
        text: message,
        toOfferId: this.offer.id
      })
    },
    async setViewed(key, message) {
      this.messages[key].isViewed = true
      this.socket.emit('SET_OFFER_MESSAGE_AS_VIEWED', {
        messageId: message.id,
        toOfferId: this.offer.id
      })
      await this.$axios.put(`/offer/messages/${this.offer.id}/${message.id}`)
    }
  },
  mounted() {
    this.socket = ioClientVue('http://localhost:3070', { autoConnect: false })

    this.socket.auth = { 
      userId: this.user.id,
      offerId: this.$route.params.id
    };
    this.socket.connect();

    this.socket.on('SET_OFFER_STATUS', ({status}) => {
      this.step = this.statuses.findIndex(s=>s==status)
    });

    this.socket.on('SEND_OFFER_MESSAGE', (message) => {
      this.onMessage(message)
    });

    this.socket.on('SET_OFFER_MESSAGE_AS_VIEWED', (messageId) => {
      this.messages.find(message => message.id == messageId).isViewed = true  
    });
  },
  async fetch() {
    let res = await this.$axios.get(`/offer/${this.$route.params.id}`)
    this.offer = res.data
    if (this.offer.status == 'created') {
      this.step = 1
    } else if (this.offer.status == 'accepted') {
      this.step = 2
    } else if (this.offer.status == 'paid') {
      this.step = 3
    } else if (this.offer.status == 'paymentСonfirmed') {
      this.step = 4
    } else if (this.offer.status == 'placed') {
      this.step = 5
    } else if (this.offer.status == 'placedСonfirmed') {
      this.step = 6
    } else if (this.offer.status == 'completed') {
      this.step = 7
    }

    let resMessages = await this.$axios.get(`/offer/messages/${this.$route.params.id}`)
    this.messages = resMessages.data
  },
  destroyed() {
    this.socket.off("connect");
    this.socket.off("disconnect");
    this.socket.off("SET_OFFER_STATUS");
    this.socket.off("SEND_OFFER_MESSAGE");
    this.socket.off("SET_OFFER_MESSAGE_AS_VIEWED");
    
  },
}
</script>

<style scoped>
.right-col {
  position: relative;
}
</style>