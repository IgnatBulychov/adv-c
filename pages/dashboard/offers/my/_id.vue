<template>
  <div v-if="offer && offer.isMine">
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
          Вы создали заказ
          <small v-if="step == 1">Ожидайте, пока другая строная примет или отклонит предложение</small>
        </v-stepper-step>

        <v-stepper-content step="1">
          <v-card
            color="grey lighten-4"
            class="mb-12"
            height="100px"
          >
            Площадка: {{ offer.area.title }} <br>
            Владелец: <nuxt-link :to="`/user/${offer.seller.id}`"> {{ offer.seller.firstName }} {{ offer.seller.lastName }} </nuxt-link> <br>
            Стоимость заказа: {{ offer.quantity * offer.area.cpc }} ₽
          </v-card>
          <v-card
            color="grey lighten-4"
            class="mb-12"
            height="100px"
          >
            Ваше объявление:
            {{ offer.title }}
            {{ offer.text }}
            <v-img width="100" :src=" offer.text"/>
          </v-card>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 2"
          step="2"
        >
          Заказ принят
          <small v-if="step == 2">Продавец принял ваш заказ, произведите оплату. После того как вы отпраивите средства продавцу, нажмите Оплачено</small>
        </v-stepper-step>

        <v-stepper-content step="2">
           <!--<v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          >
           <v-card-text>
             Средства будут заморожены, и поступят продавцу когда система
              зафиксирует полное количество переходов по вашему объявлению или если вы сами подтвердите получение услуги
           </v-card-text>
          </v-card>-->
          <v-btn
            color="primary"
            @click="setStatus('paid')"
          >
            Оплачено
          </v-btn>
          <v-btn text>
            Отменить заказ
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 3"
          step="3"
        >
          Заказ оплачен
          <small  v-if="step == 3">Ожидайте пока продавец подтвердит получение оплаты</small>
        </v-stepper-step>

        <v-stepper-content step="3">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 4"
          step="4"
        >
          Оплата получена
          <small  v-if="step == 4">Ожидайте пока продавец разместит ваше объявление</small>
        </v-stepper-step>

        <v-stepper-content step="4">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 5"
          step="5"
        >
          Ваше объявление размещено
          <small v-if="step == 5">Проверьте, что оно находится на заказанной вами плащадке и нажмите подтвердить</small>
        </v-stepper-step>

        <v-stepper-content step="5">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
          <v-btn
            color="primary"
            @click="setStatus('placedСonfirmed')"
          >
            Подтвердить
          </v-btn>
        </v-stepper-content>

        <v-stepper-step
          :complete="step > 6"
          step="6"
        >
          Ваше объявление размещено
          <small v-if="step == 6">Следите за тем как переходят по вашему обьявлению</small>
        </v-stepper-step>

        <v-stepper-content step="6">
          <v-card
            color="grey lighten-1"
            class="mb-12"
            height="200px"
          ></v-card>
          <v-btn
            color="primary"
            @click="setStatus('completed')"
          >
            Подтвердить выполнение досрочно
          </v-btn>
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
import OfferMessenger from '~/components/offers/OfferMessenger';
import { mapGetters } from 'vuex'
export default {
  layout: 'index',
  middleware: ['auth'],
  components: {
    OfferMessenger
  },
  data: ()=>({    
    socket : null,
    statuses:['','created', 'accepted', 'paid', 'paymentСonfirmed', 'placed', 'placedСonfirmed' ,'completed'],
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
      const { data: messageId } = await this.$axios.post(`/offer/messages/${this.offer.id}`, {
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