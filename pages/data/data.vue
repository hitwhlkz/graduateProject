<template>
  <div>
    <!-- 输入框 -->
    <input v-model="textInput" type="text" placeholder="输入文本内容" />
    <!-- 生成视频按钮 -->
    <button @click="generateVideo">生成视频</button>
    
    <!-- 播放视频 -->
    <div v-if="videoUrl">
      <video controls width="400">
        <source :src="videoUrl" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- 显示调试信息 -->
    <div>{{ debugInfo }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      textInput: '',
      videoUrl: '',
      debugInfo: '' // 用于显示调试信息
    };
  },
  methods: {
    async generateVideo() {
      const url = 'http://localhost:3001/pipeline'; // 后端地址改为3001端口
      const requestBody = {
        words: this.textInput
      };

      try {
        const response = await axios.post(url, requestBody);
        this.videoUrl = response.data.video_url;
        this.debugInfo = '视频生成成功，视频URL：' + this.videoUrl;
      } catch (error) {
        console.error('Error generating video:', error.message);
        this.videoUrl = 'Error generating video';
        this.debugInfo = '视频生成失败：' + error.message;
      }
    }
  }
};
</script>

<style>
/* 样式可根据需要进行自定义 */
</style>
