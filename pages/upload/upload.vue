<template>
  <view class="container">
	  
	  <!-- 上传图片区域 -->
	  <view class="upload-container">
	    <!-- 上传图片的图标或按钮 -->
	    <image src="/static/upload.png" class="upload-icon" mode="aspectFit"></image>
	    <!-- 上传图片提示信息 -->
	    <view class="upload-tip" @click="openCamera">点击上方上传图片</view>
	  </view> 
	  
	  <!-- 已上传的图片滚动区域 -->
    <view  class="scroll-view">
      <!-- 提示信息 -->
      <view class="history-tip">历史图片</view>
      <scroll-view scroll-x class="image-scroll" :style="{ width: scrollWidth + 'px' }">
        <!-- 循环渲染已上传的图片 -->
        <view v-for="(image, index) in uploadedImages" :key="index" class="uploaded-image">
          <image :src="image.url" class="uploaded-image-item" mode="aspectFill" @click="openCamera"></image>
        </view>
      </scroll-view>
    </view>
	</view>
</template>

<script>
export default {
  data() {
    return {
      uploadedImages: [
        { url: '/static/model1.jpg', name: 'Image 1', description: 'This is the first image' },
        { url: '/static/art_5.png', name: 'Image 2', description: 'This is the second image' },
        { url: '/static/art_13.png', name: 'Image 3', description: 'This is the third image' },
      ],
    };
  },
  computed: {
    // 计算滚动区域的宽度
    scrollWidth() {
      return this.uploadedImages.length * 160; // 每张图片宽度为 160px，包括间距
    },
  },
  methods: {
    // 点击打开摄像头
    openCamera() {
      // 在这里调用原生 API 或者使用第三方插件打开摄像头
      // 并实现拍照功能
    },
  },
};
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 75vh; /* 占据屏幕3/4的高度 */
}

.scroll-view {
	margin-top: 200px;
  width: 100%;
  overflow-x: auto;
  margin-bottom: 20px; /* 与下方上传图片区域的间距 */
}

.history-tip {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
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

.image-scroll {
  white-space: nowrap; /* 水平滚动 */
}

.uploaded-image {
  display: inline-block;
  margin-right: 10px; /* 图片之间的间距 */
  width: 150px; /* 图片的宽度 */
  height: 150px; /* 图片的高度 */
}

.uploaded-image-item {
  width: 100%;
  height: 100%;
  cursor: pointer; /* 添加鼠标指针样式 */
}
</style>
