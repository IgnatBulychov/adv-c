<template>
  <div v-if="offer && offer.isMine">
    <v-row class="py-2 px-2">

      <v-col cols="12" md="8">

      

        <v-card class="mb-2">
          <v-card-text class="d-flex">
            <div>
              ID заказа: <strong> {{ offer.id }} </strong> <br>
              Статус:  <strong> {{ statuses[offer.status] }} </strong> 
            </div>
            
            <v-spacer/>
            <div >
              <v-btn 
                v-if="offer.status != 'created' && offer.status != 'accepted' && offer.status != 'completed'" 
                text
                 color="teal"
                 @click="reviewDialog = true">
                Оставить отзыв
              </v-btn>
              <v-btn
                v-if="!(offer.status == 'completed' || offer.status == 'canceled' || offer.status == 'canceledByBuyer' || offer.status == 'canceledBySeller')" 
                text
                @click="confirmDialogClose = true">
                Отменить заказ
              </v-btn>        
              
            </div>
          </v-card-text>
        </v-card>

        
        <v-expansion-panels>
          <v-expansion-panel>
            <v-expansion-panel-header>
              Детали заказа
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <offer-info :offer="offer" :isMine="false"/>
              
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

        <v-expansion-panels v-if="step>5" class="mt-2">
          <v-expansion-panel>
            <v-expansion-panel-header>
              Статистика заказа
            </v-expansion-panel-header>
            <v-expansion-panel-content>
               <offer-clicks
             :offer="offer"/>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>

       
          

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
          
            <offer-info :offer="offer" :isMine="true"></offer-info>

          </v-stepper-content>

          <v-stepper-step
            :complete="step > 2"
            step="2"
          >
            Заказ принят
            <small v-if="step == 2">Продавец принял ваш заказ, произведите оплату. После того как вы отправите средства продавцу, нажмите Оплачено</small>
          </v-stepper-step>

          <v-stepper-content step="2">
            
            <v-btn
              color="primary"
              @click="setStatus('paid')"
            >
              Оплачено
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
          
          </v-stepper-content>

          <v-stepper-step
            :complete="step > 4"
            step="4"
          >
            Оплата получена
            <small  v-if="step == 4">Ожидайте пока продавец разместит ваше объявление</small>
          </v-stepper-step>

          <v-stepper-content step="4">
            
          </v-stepper-content>

          <v-stepper-step
            :complete="step > 5"
            step="5"
          >
            Ваше объявление размещено
            <small v-if="step == 5">Проверьте, что оно находится на заказанной вами плащадке и нажмите подтвердить</small>
          </v-stepper-step>

          <v-stepper-content step="5">
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
            <offer-clicks
             :offer="offer"/>
            <v-btn
              class="mt-2"
              color="primary"
              @click="setStatus('completed')"
            >
              Подтвердить выполнение
            </v-btn>
          </v-stepper-content>


          <v-stepper-step step="7">
            Заказ выполнен
          </v-stepper-step>
          <v-stepper-content step="7">
            
            <create-review
            :offer="offer"
             @closeReviewDialog="reviewDialog = false"/>

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




    <v-dialog
      v-model="confirmDialogClose"
      width="500px"
    >
      <v-card>
        <v-card-title class="text-h5">
          Вы уверены что хотите отменить заказ?
        </v-card-title>

        <v-card-text>
          Этот заказ будет полностью заркыт.
        </v-card-text>

        <v-card-actions>
          <v-btn
            color="gray darken-1"
            text
            @click="confirmDialogClose = false"
          >
            Нет
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            @click="setStatus('canceledByBuyer'); confirmDialogClose = false"
          >
            Да, отменить и закрыть
          </v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>



    <v-dialog
      v-model="reviewDialog"
      width="500px"
    >
      
      <create-review
        :offer="offer"
         @closeReviewDialog="reviewDialog = false"
      />

    </v-dialog>


  </div>
</template>

<script>
import ioClientVue from 'socket.io-client';
import OfferMessenger from '~/components/offers/OfferMessenger';
import { mapGetters } from 'vuex'
import OfferInfo from '~/components/offers/OfferInfo';
import CreateReview from '~/components/offers/CreateReview';
import OfferClicks from '~/components/offers/OfferClicks';
import statuses from '~/constants/offerStatuses'


export default {
  layout: 'index',
  middleware: ['auth'],
  components: {
    OfferMessenger,OfferInfo,CreateReview,OfferClicks
  },
  data: ()=>({    
    socket : null,
    statuses,
    offer: null,
    step: 1,
    messages:[],
    confirmDialogClose: false,
    reviewDialog: false,
    
  }),
  computed: {
    ...mapGetters({
      user: 'auth/user'
    })
  },
  methods: {
    async setStatus(status) {
      try {
        let { data: newStatus } = await this.$axios.put(`/offer/${this.$route.params.id}`, {
          status
        })
        
        if (newStatus != 'canceledBySeller' && newStatus != 'canceledByBuyer' && newStatus != 'canceled') {
          this.step = Object.keys(this.statuses).findIndex(s=>s == newStatus)
        } else {
          this.step = 0
        }
        this.offer.status = newStatus
        this.socket.emit('SET_OFFER_STATUS', {
          status: newStatus,
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
      if (status != 'canceledBySeller' && status != 'canceledByBuyer' && status != 'canceled') {
        this.step = Object.keys(this.statuses).findIndex(s=>s == status)
      } else {
        this.step = 0
      }     
      this.offer.status = status
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
    } else if (this.offer.status == 'canceledBySeller' || this.offer.status == 'canceledByBuyer' || this.offer.status == 'canceled')  {
      this.step = 0
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