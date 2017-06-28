<template>
  <div class="app-container calendar-list-container">
    <h1>WebScoket Example</h1>
    <el-button type="primary" icon="document" @click="send"> Send </el-button>
    <el-button type="primary" icon="document" @click="sendOne"> Send One</el-button>
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
      socketMessage: '',
      username: 'userA'

  }),
  methods: {
    send() {
      // this.socket.emit('/app/hello', { name: 'aaa' });
      console.log('send');
      this.stompClient.send('/app/hello', {}, JSON.stringify({ name: 'aaa' }));
    },
    sendOne() {
      // this.socket.emit('/app/hello', { name: 'aaa' });
      console.log('send one');
      this.stompClient.send('/app/message', {}, JSON.stringify({ name: 'bbb' }));
    }
  },
  created() {
      // 利用option function()指定session-ID
      const sock = new SockJS('http://localhost:8081/gs-guide-websocket'
          , null, { sessionId: () => this.username });
      // console.log(sock);

      this.stompClient = Stomp.over(sock);

      this.stompClient.connect({}, () => {
          this.isConnected = true;
          //console.log('Connected: ' + frame);
          this.stompClient.subscribe('/topic/greetings', data => {
            // (JSON.parse(greeting.body).content);
            this.socketMessage = this.socketMessage + '\r\n' + data.body;
          });
          this.stompClient.subscribe('/user/' + this.username + '/message', data => {
            // (JSON.parse(greeting.body).content);
            this.socketMessage = this.socketMessage + '\r\n' + data.body;
          });
      }, error => {
        this.isConnected = false;
        console.log(error);
      });
  }
}
</script>
