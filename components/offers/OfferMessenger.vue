<template>
  <div class="b-messenger">
    <div class="text-center"> Мессенджер </div>
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
        <div class="e-text" v-html="message.text.replace('\n', '<br/>')">
        </div>
        <div v-if="message.isFromMe" class="e-status">
          <v-icon>{{ message.isViewed ? 'mdi-check-all' : 'mdi-check' }}</v-icon>
        </div>
      </div>
    </div>    
    <div class="b-input-message">
      <v-textarea
        v-model="message"
        placeholder="Введите сообщение"
        outlined
        auto-grow
        rows="1"
        append-outer-icon="mdi-send"
        @keydown.enter="sendMessage"
        @click:append-outer="sendMessageByClick"
      ></v-textarea>
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
      if (event.ctrlKey) {
        this.$emit('sendMessage', this.message)
        this.message = ''
      } else {
        
      }
/*console.log(event.ctrlKey)
      if (!event.ctrlKey && this.message.trim()) {
        event.preventDefault()
        this.$emit('sendMessage', this.message)
        this.message = ''
      } else if (this.message.trim()) {

      }/*

/*
      if (!this.message.trim() || (event.type == 'keydown' && event.keyCode != 13)) {
        
        return  
      }
      
      event.preventDefault()
      */
    },
    sendMessageByClick() {
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





  /* полоса прокрутки (скроллбар) */
.b-messages::-webkit-scrollbar {
    width: 14px;
    height: 7px;
    background-color: #ffffff;
}
/* ползунок скроллбара */
.b-messages::-webkit-scrollbar-thumb {
    background-color: #a0a0a0;
}

.b-messages::-webkit-scrollbar-thumb:hover {
    background-color: #a0a0a0;
}

/* Стрелки */

.b-messages::-webkit-scrollbar-button:vertical:start:decrement {
    background: #a0a0a0;
    background-color: #a0a0a0;;
}

.b-messages::-webkit-scrollbar-button:vertical:end:increment {
   background: #a0a0a0;
    background-color: #a0a0a0;;
}

.b-messages::-webkit-scrollbar-button:horizontal:start:decrement {
    background: #a0a0a0;
    background-color: #a0a0a0;;
}

.b-messages::-webkit-scrollbar-button:horizontal:end:increment {
   background: #a0a0a0;
    background-color: #a0a0a0;;
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

.e-status {
  display: flex;
    align-items: flex-end;
}
</style>