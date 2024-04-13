<template>
  <view class="container">
    <!-- 上传图片区域 -->
    <view class="upload-container">
      <!-- 点击上传图片的图标或按钮 -->
      <image src="/static/upload.png" class="upload-icon" mode="aspectFit" @click="openCamera"></image>
      <!-- 上传图片提示信息 -->
      <view class="upload-tip">点击上方上传图片</view>
    </view>
    <!-- 拍照按钮 -->
    <view v-if="showCaptureButton" class="capture-button" @click="takePicture">拍照</view>
  </view>
</template>

<script>
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
    takePicture() {
      // 在这里实现拍照功能
      const video = this.videoElement;
      if (video) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL('image/jpeg'); // 获取图片的 Base64 编码
        console.log(imageDataURL); // 这里可以把图片数据保存到本地或上传到服务器
		// 将图片转换为 Blob 对象
		canvas.toBlob((blob) => {
		  // 创建临时的下载链接
		  const url = window.URL.createObjectURL(blob);
		  // 创建一个隐藏的 <a> 标签
		  const a = document.createElement('a');
		  // 设置下载链接和文件名
		  a.href = url;
		  a.download = 'photo.jpg'; // 下载的文件名
		  // 将 <a> 标签添加到页面中
		  document.body.appendChild(a);
		  // 模拟点击下载链接
		  a.click();
		  // 下载完成后移除 <a> 标签和临时链接
		  document.body.removeChild(a);
		  URL.revokeObjectURL(url);
		}, 'image/jpeg');
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
