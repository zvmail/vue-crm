<template>
  <div class="app-container calendar-list-container">
    <h1>WebScoket Example</h1>
    <el-button type="primary" icon="document" @click="send"> Send </el-button>
    <div>
      <p v-if="isConnected">We're connected to the server!</p>
      <p>Message from server: "{{socketMessage}}"</p>
  </div>
  </div>
</template>

<script>
// import io from 'socket.io-client';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

export default {
  data: () => ({
      stompClient: undefined,
      isConnected: false,
      socketMessage: ''

  }),
  methods: {
    send() {
      // this.socket.emit('/app/hello', { name: 'aaa' });
      console.log('send');
      this.stompClient.send('/app/hello', {}, JSON.stringify({ name: 'aaa' }));
    },
    showGreeting(data) {
         // (JSON.parse(greeting.body).content);
         this.socketMessage = this.socketMessage + '\r\n' + data.body;
    }
  },
  created() {
      const sock = new SockJS('http://localhost:8081/gs-guide-websocket');

      this.stompClient = Stomp.over(sock);
      this.stompClient.connect({}, frame => {
          this.isConnected = true;
          console.log('Connected: ' + frame);
          this.stompClient.subscribe('/topic/greetings', this.showGreeting);
      });
  }
}
</script>
