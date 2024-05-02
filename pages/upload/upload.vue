<template>
  <div class="container">
    <!-- 上传图片区域 -->
    <div class="upload-container">
      <!-- 点击上传图片的图标或按钮 -->
      <img src="~@/static/upload.png" class="upload-icon" @click="openCamera" alt="Upload Icon">
      <!-- 上传图片提示信息 -->
      <div class="upload-tip">点击上方上传图片</div>
    </div>
    <!-- 拍照按钮 -->
    <div v-if="showCaptureButton" class="capture-button" @click="takePicture">拍照</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      showCaptureButton: false, // 控制拍照按钮的显示
      videoElement: null // 视频元素
    };
  },
  methods: {
    // 点击打开摄像头拍摄照片
    openCamera() {
      // 检查浏览器是否支持 getUserMedia 方法
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        // 请求访问用户的摄像头
        navigator.mediaDevices.getUserMedia({ video: true })
          .then((stream) => {
            // 获取到摄像头的视频流
            const video = document.createElement('video');
            this.videoElement = video; // 存储视频元素的引用
            // 将视频流绑定到 video 元素上
            video.srcObject = stream;
            // 播放视频
            video.play();
            // 设置视频元素占满整个屏幕
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.position = 'fixed';
            video.style.top = '0';
            video.style.left = '0';
            video.style.zIndex = '9999';
            // 在页面上显示视频
            document.body.appendChild(video);
            // 显示拍照按钮
            this.showCaptureButton = true;
          })
          .catch((error) => {
            console.error('getUserMedia error:', error);
          });
      } else {
        console.error('getUserMedia is not supported in this browser');
      }
    },
    async takePicture() {
      const video = this.videoElement;
      if (video) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
        // 将图片转换为 base64 格式
        const base64Image = canvas.toDataURL('image/jpeg');
      
        // 发送 base64 图片数据到后端
        try {
          const response = await axios.post('http://localhost:3001/uploadImage', { image: base64Image });
      
          console.log('Upload Response:', response.data);
          if (response.data && response.data.url) {
            // 请求成功
            uni.navigateTo({
              url: '/pages/map/map?url=' + response.data.url // 跳转到map.vue，并传递图片 URL
            });
          } else {
            console.error('Upload failed, data structure mismatch');
            uni.showToast({
              title: '上传失败，请重试',
              icon: 'none'
            });
          }
        } catch (error) {
          console.error('Upload Error:', error.message);
          uni.showToast({
            title: '上传失败，请重试',
            icon: 'none'
          });
        }
    
        // 隐藏拍照按钮
        this.showCaptureButton = false;
        // 停止视频播放
        video.pause();
        // 移除视频元素
        video.remove();
      }
    },

  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh; /* 占据整个屏幕的高度 */
}

.upload-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.upload-icon {
  width: 300px; /* 图标的宽度 */
  height: 300px; /* 图标的高度 */
}

.upload-tip {
  margin-top: 10px; /* 图标与提示信息的间距 */
  cursor: pointer; /* 添加鼠标指针样式 */
}

.capture-button {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #3498db;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  z-index: 10000;
}
</style>
