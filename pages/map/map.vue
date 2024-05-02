<template>
  <div class="container">
    <div v-if="unshowVideo" class="messages">
      <div v-for="message in messages" :key="message.id" class="message" :class="{ 'user-message': message.role === 'user', 'assistant-message': message.role === 'assistant' }">
        <div class="message-content">{{ message.content }}</div>
        <div class="message-timestamp">{{ message.timestamp }}</div>
        <button v-if="message.role === 'assistant' && videoUrl" @click="playVideo(videoUrl)">播放</button>
      </div>
    </div>
	
    <div v-if="unshowVideo" class="input-container">
      <input type="text" v-model="topic" placeholder="主题">
      <input type="text" v-model="mainCharacter" placeholder="主人公">
      <button @click="sendMessage">发送</button>
    </div>
    <div class="fullscreen-video-container" v-if="showVideo">
      <video id="myVideo" :src="videoUrl" controls autoplay class="fullscreen-video" @ended="handleVideoEnded"></video>
    </div>
  </div>
</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      messages: [],
      topic: '',
      mainCharacter: '',
      videoUrl: '',
	  showVideo: false, // 控制视频显示与隐藏的变量
	  unshowVideo: true,
      apiKey: 'JfYcYomzR7kVm2NfFldcqL3I',
      secretKey: '2R8LSwiP8P3ocenMySqz5CDFAOxxBCUp',
      imageUrl: '' // 新增 imageUrl 属性用于存储传递过来的图片 URL
    };
  },
  onLoad() {
    // 在页面加载时获取传递过来的图片 URL
    this.imageUrl = this.$route.query.url;
    console.log('Received image URL:', this.imageUrl);
  },
  methods: {
    async sendMessage() {
      try {
        const response = await axios.get(`http://localhost:3000/getAccessToken?apiKey=${this.apiKey}&secretKey=${this.secretKey}`);
        const accessToken = response.data.access_token;

        // 修改这里，将 imageUrl 传递给后端
        const messageText = `请给我一段故事, 主题：${this.topic}，主人公：${this.mainCharacter},50字`;
        const imageUrl = this.imageUrl; // 使用传递过来的图片 URL
        this.messages.push({
          id: Date.now(),
          role: 'user',
          content: messageText,
          timestamp: new Date().toLocaleTimeString()
        });

        const aiResponse = await axios.post(`http://localhost:3000/sendMessage?accessToken=${accessToken}`, {
          messages: [{ role: 'user', content: messageText }]
        });

        if (aiResponse.data && aiResponse.data.result) {
          this.messages.push({
            id: Date.now(),
            role: 'assistant',
            content: aiResponse.data.result,
            timestamp: new Date().toLocaleTimeString()
          });
          const imageUrl = this.imageUrl;
          console.log('this is imageUrl:', imageUrl);
          await this.generateAndPlayVideo(imageUrl, aiResponse.data.result);

        } else {
          console.error('Failed to get response from AI API');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    async generateAndPlayVideo(imageUrl, text) {
      try {
        const response = await axios.post(`http://localhost:3000/generateVideo`, {
          imageUrl,
          text
        });

        if (response.data && response.data.videoUrl) {
          this.videoUrl = response.data.videoUrl;
          console.log(this.videoUrl);
          // 获取视频 URL 后立即播放视频
          this.playVideo(this.videoUrl);
        } else {
          console.error('Failed to get video URL from API');
        }
      } catch (error) {
        console.error('Error generating or playing video:', error);
      }
    },
    playVideo(videoUrl) {
      const videoContext = uni.createVideoContext('myVideo', this);
	  console.log(this.showVideo);
      if (videoUrl) {
        // 显示视频元素
		console.log('视频url:', videoUrl);
        this.showVideo = true;
		this.unshowVideo = false;
        // 播放视频
        videoContext.play();
      } else {
        console.error('Video URL is empty');
      }
    },
	handleVideoEnded() {
	  console.log('视频播放结束');
	  // 退出全屏
	  const videoContext = uni.createVideoContext('myVideo', this);
	  this.unshowVideo = true;
	  this.showVideo = false;
	},
    speakMessage(text) {
      // 语音播放逻辑...
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

.fullscreen-video-container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.fullscreen-video {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
