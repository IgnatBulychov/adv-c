<template>
  
</template>

<script>
import ioClientVue from 'socket.io-client';
export default {
  methods: {
    send() {
      socket.emit('TOOGLE_CARD', 'some messenge')
    }
  },
  mounted() {
    this.socket = ioClientVue('http://localhost:3050', {
      withCredentials: true
    });
    this.socket.on('START_GAME_CLIENT', (items) => {
       //
    })
  }
}
</script>