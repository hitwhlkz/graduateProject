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
      <input type="text" v-model="topic" placeholder="主题">
      <input type="text" v-model="mainCharacter" placeholder="主人公">
      <button @click="generateVideo">发送</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
      userMessage: '',
      topic: '',
      mainCharacter: '',
      accessToken: '',
      apiKey: 'JfYcYomzR7kVm2NfFldcqL3I',
      secretKey: '2R8LSwiP8P3ocenMySqz5CDFAOxxBCUp'
    };
  },
  computed: {
    encodedCredentials() {
      return btoa(`${this.apiKey}:${this.secretKey}`);
    }
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
        content: `请给我一段故事, 主题：${this.topic}，主人公：${this.mainCharacter}`,
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
              { "role": "user", "content": `请给我一段故事, 主题：${this.topic}，主人公：${this.mainCharacter}` }
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
    async generateVideo() {
      try {
        console.log('Creating talk...');
        const talkId = await this.createTalk();
        console.log('Talk created with ID:', talkId);

        console.log('Checking talk status...');
        let retries = 0;
        const maxRetries = 10;
        while (retries < maxRetries) {
          retries++;
          try {
            const videoUrl = await this.getTalkStatus(talkId);
            console.log('Video URL:', videoUrl);
            // 播放视频的逻辑可以放在这里，根据你的需求处理 videoUrl
            // 这里只是简单的示例
            this.messages.push({
              id: Date.now(),
              role: 'assistant',
              content: `生成的视频链接：${videoUrl}`,
              timestamp: new Date().toLocaleTimeString()
            });
            this.scrollToBottom(); // 滚动到底部
            return; // 退出函数
          } catch (error) {
            console.log(`Retry ${retries}/${maxRetries}: Video is not ready yet.`);
            await new Promise(resolve => setTimeout(resolve, 5000)); // 等待5秒后重试
          }
        }

        console.error('Max retries reached. Video URL not available.');
      } catch (error) {
        console.error('Error generating video:', error.message);
      }
    },
    createTalk() {
      return new Promise((resolve, reject) => {
        const req = uni.request({
          url: 'http://api.d-id.com/talks',
          method: 'POST',
          header: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Basic ${this.encodedCredentials}`
          },
          data: {
            source_url: 'https://iili.io/JSCdnZF.jpg', // 这里替换为你的图片链接
            script: {
              type: 'text',
              input: "Hello, I'm Li Kunze, this is a test video.", // 这里替换为你想说的内容
              provider: {
                type: 'microsoft',
                voice_id: 'en-US-JennyNeural'
              }
            },
            config: {
              fluent: false,
              pad_audio: 0.0
            }
          },
          success: (res) => {
            const body = res.data;
            if (body.id) {
              resolve(body.id);
            } else {
              reject(new Error('Talk ID not found'));
            }
          },
          fail: (error) => {
            reject(error);
          }
        });

        req.end();
      });
    },
    getTalkStatus(talkId) {
      return new Promise((resolve, reject) => {
        const req = uni.request({
          url: `http://api.d-id.com/talks/${talkId}`,
          method: 'GET',
          header: {
            accept: 'application/json',
            authorization: `Basic ${this.encodedCredentials}`
          },
          success: (res) => {
            const body = res.data;
            if (body.status === 'done' && body.result_url) {
              resolve(body.result_url);
            } else {
              reject(new Error(`Video URL not ready yet. Status: ${body.status}`));
            }
          },
          fail: (error) => {
            reject(error);
          }
        });

        req.end();
      });
    },
    speakMessage(text) {
      // 省略语音播放的逻辑，根据需要实现
    },
    scrollToBottom() {
      // 实现滚动到底部的逻辑
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh; /* 占据整个屏幕的高度 */
  padding: 20px;
  overflow-y: auto;
}

.messages {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.message {
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
}

.user-message {
  align-self: flex-end;
}

.assistant-message {
  align-self: flex-start;
}

.message-content {
  padding: 10px;
  border-radius: 10px;
  background-color: #f0f0f0;
  max-width: 70%;
}

.message-timestamp {
  align-self: flex-end;
  margin-top: 5px;
  font-size: 12px;
  color: #999;
}

button {
  margin-top: 5px;
  cursor: pointer;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 5px 10px;
}

button:hover {
  background-color: #2980b9;
}

.input-container {
  display: flex;
}

.input-container input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  margin-right: 10px;
}

</style>
