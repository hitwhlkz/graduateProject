<template>
  <div class="container">
    <div class="messages">
      <div v-for="message in messages" :key="message.id" class="message" :class="{ 'user-message': message.role === 'user', 'assistant-message': message.role === 'assistant' }">
        <div class="message-content">{{ message.content }}</div>
        <div class="message-timestamp">{{ message.timestamp }}</div>
        <button v-if="message.role === 'assistant'" @click="speakMessage(message.content)">播放</button>
      </div>
    </div>
    <div class="input-container">
      <input type="text" v-model="userMessage" @keyup.enter="sendMessage" placeholder="请输入消息...">
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      userMessage: '',
      accessToken: '',
      apiKey: '',
      secretKey: ''
    };
  },
  methods: {
    async getAccessToken() {
      try {
        const response = await uni.request({
          url: `http://localhost:3000/getAccessToken?apiKey=${this.apiKey}&secretKey=${this.secretKey}`,
          method: 'GET'
        });
        if (response.data && response.data.access_token) {
          this.accessToken = response.data.access_token;
        } else {
          console.error('Failed to obtain access_token');
        }
      } catch (error) {
        console.error('Error fetching access_token:', error);
      }
    },
    async sendMessage() {
      await this.getAccessToken(); // 先获取 access_token

      // 将用户消息添加到消息列表中
      this.messages.push({
        id: Date.now(),
        role: 'user',
        content: this.userMessage,
        timestamp: new Date().toLocaleTimeString()
      });

      // 发送对话请求
      try {
        const response = await uni.request({
          url: `http://localhost:3000/sendMessage?accessToken=${this.accessToken}`,
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            messages: [
              { "role": "user", "content": this.userMessage }
            ]
          }
        });
        
        // 处理响应
        if (response.data && response.data.result) {
          this.messages.push({
            id: Date.now(),
            role: 'assistant',
            content: response.data.result,
            timestamp: new Date().toLocaleTimeString() // 添加时间戳
          });
          this.userMessage = ''; // 清空输入框
          this.scrollToBottom(); // 滚动到底部
        } else {
          console.error('Failed to get response from API');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    speakMessage(text) {
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    },
    scrollToBottom() {
      // 实现滚动到底部的功能
      // 请根据实际情况编写滚动到底部的逻辑
    }
  }
};
</script>

<style scoped>
/* 样式省略 */
</style>
