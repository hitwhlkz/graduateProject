<template>
  <view class="container">
    

    <!-- 虚拟人模型列表 -->
    <view class="model-list">
      <view v-for="(model, index) in modelList" :key="index" class="model-item" @click="showModelDetail(model)" @longpress="showContextMenu(model)">
        <!-- 点击图片展示虚拟人详情 -->
        <img class="model-img" :src="model.src" />
        <text class="model-name">{{ model.name }}</text>
      </view>
    </view>
    <!-- 查询表单 -->
    <view class="search-form">
      <input v-model="keyword" placeholder="请输入关键词" class="input" />
      <button @click="search" class="button">查询</button>
    </view>
    <!-- 添加按钮 -->
    <button @click="addModel" class="add-button">添加</button>
	
	<!-- 上下文菜单 -->
	    <view v-if="showMenu" class="context-menu" @click.stop="">
	      <text @click="renameModel">重命名</text>
	    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      keyword: '', // 查询关键词
      modelList: [ // 虚拟人模型列表
        { id: 1, name: '模型1', src:'../../static/', detail: '虚拟人模型1的详细信息...' },
        { id: 2, name: '模型2', src:'../../static/', detail: '虚拟人模型2的详细信息...' },
        // 其他模型数据
      ],
	  showMenu: false, // 是否显示上下文菜单
	selectedModel: null // 当前选中的模型
    };
  },
  methods: {
    // 查询虚拟人模型
    search() {
      // 根据关键词查询模型
      // 更新模型列表
    },
    // 添加虚拟人模型
    addModel() {
      // 跳转到添加模型页面
	  
    },
    // 点击图片显示虚拟人详情
    showModelDetail(model) {
      // 弹出对话框或跳转到详情页面，显示虚拟人模型的详细信息
      console.log('显示虚拟人详情', model.detail);
      // 这里可以根据实际需求进行操作，例如弹出对话框或跳转到详情页面
    },
	// 长按模型显示上下文菜单
	    showContextMenu(model) {
	      this.showMenu = true;
	      this.selectedModel = model;
	    },
	    // 重命名模型
	    renameModel() {
	      // 弹出对话框，让用户输入新的模型名称
	      // 更新模型名称
	      console.log('重命名模型', this.selectedModel);
	      this.showMenu = false;
	      this.selectedModel = null;
	    }
  }
};
</script>

<style scoped>
/* 页面容器 */
.container {
  padding: 20px;
}

/* 查询表单 */
.search-form {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 10px;
  margin-top: auto;
}

.button {
  padding: 10px 20px;
  border: none;
  margin-top: auto;
  border-radius: 5px;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
}

/* 虚拟人模型列表 */
.model-list {
  display: flex;
  flex-wrap: wrap;
}

.model-item {
  width: calc(50% - 20px); /* 每个模型项占据一行的一半宽度 */
  margin: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  overflow: hidden;
}

.model-img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.model-name {
  display: block;
  padding: 10px;
  background-color: #f5f5f5;
  text-align: center;
}

/* 添加按钮 */
.add-button {
  padding: 10px 20px;
  margin-top: auto;
  border: none;
  border-radius: 5px;
  background-color: #28a745;
  color: #fff;
  cursor: pointer;
}
</style>
