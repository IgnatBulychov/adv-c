<template>
  <div class="b-messenger">
    <div class="b-messages"  ref="messages">
      <div 
        v-for="(message, key) in messages" :key="key"
        class="b-message"
        :class="{
          'm-left' : !message.isFromMe,
          'm-right' : message.isFromMe
        }"
        v-observe-visibility="(isVisible, entry) => visibilityChanged(isVisible, entry, key, message)"
      >
        <div class="e-text">
          {{ message.text }}
        </div>
        <div v-if="message.isFromMe" class="e-status">
          <v-icon>{{ message.isViewed ? 'mdi-check-all' : 'mdi-check' }}</v-icon>
        </div>
      </div>
    </div>    
    <div class="b-input-message">
      <v-text-field
        v-model="message"
        placeholder="Введите сообщение"
        outlined
        append-outer-icon="mdi-send"
        @keydown="sendMessage"
        @click:append-outer="sendMessage"
      ></v-text-field>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OfferMessenger',
  props: {
    messages: {
      type: Array,
      default:[]
    }
  },
  data: ()=>({
    message: ''
  }),
  watch: {
    messages() {
      this.$nextTick(()=>{
        if (this.$refs.messages) {
          this.$refs.messages.scrollTop= this.$refs.messages.scrollHeight
        }
      })
    }
  },
  methods:{
    sendMessage(event) {
      if (!this.message || (event.type == 'keydown' && event.keyCode != 13)) {
        return  
      }
      this.$emit('sendMessage', this.message)
      this.message = ''
    },
    visibilityChanged(isVisible, entry, key, message) {
      if (isVisible && !message.isViewed && !message.isFromMe) {
        this.$emit('setViewed', key, message)
      }
    }
  },
  mounted() {
    if (process.client) {
      this.$nextTick(()=>{
        if (this.$refs.messages) {
          this.$refs.messages.scrollTop= this.$refs.messages.scrollHeight
        }
      })
    }
  }
}
</script>

<style scoped>

.b-messenger {
  width: 100%;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 2px solid #b5babf;
  padding: 10px 10px 0px 5px;
  border-radius: 4px;
  flex-direction: column;
}

.b-messages {
  height: 100%;
 
  
  overflow-y: scroll;
}

.b-input-message {

}
.b-message {
  width: 75%;  
  margin: 5px 5px 5px 0;
  padding: 2px 10px;
  display: flex;
}
.m-left {
  margin-right: auto;
  background: rgb(146 218 231);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
.m-right {
  margin-left: auto;
  background: rgb(204, 204, 204);
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
}
.e-text {
  flex: 1;
}
</style>