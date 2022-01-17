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
    this.socket = ioClientVue('http://localhost:3050', { //https://plays-server.herokuapp.com
      withCredentials: true
    });
    this.socket.on('START_GAME_CLIENT', (items) => {
      // this.
    })
  }
}
</script>