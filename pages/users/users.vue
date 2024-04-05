<template>
	<div class="vbox">
		<image class="top_back_img" src="../../static/dulin-setting/set-top-bg.png" mode="aspectFit"></image>
		<view class="top">
			<view class="circle">
				<image class="head" src="../../static/dulin-setting/head1.jpg" mode="widthFix"></image>
			</view>
			<view class="top-texts">
				<text class="name">李昆泽</text>
				<image class="set-top-hr" src="../../static/dulin-setting/set-top-hr.png" mode=""></image>
				<!-- <text class="depart">企业发展部</text> -->
				<view>
					<text>绑定手机：</text>1
					<text>186****2576</text>
				</view>
			</view>
			<view class="top-changeInfo">
				<text>完善资料</text>
			</view>
		</view>
	
		<!-- 中间部分 -->
		<!-- <view class="middle">
			<view class="middle-left">
				<image class="middle-icon" src="../../static/dulin-setting/cust.png"></image>
				<text>客户数：</text>
				<text class="middle-num">2302</text>
			</view>
			<view class="middle-line"></view>
			<view class="middle-right">
				<image class="middle-icon" src="../../static/dulin-setting/loan.png"></image>
				<text>贷款：</text>
				<text class="middle-num">¥5966万</text>
			</view>
		</view> -->
	
		<!-- 下半部分 -->
		<view class="index">
			<view class="cell" @click="changeGray">
				<view class="cell-left">
					<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
					<text class="cell-text">修改密码</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../static/dulin-setting/right-arrow.png"></image>
				</view>
			</view>
	
			<view class="cell" @click="changeGray">
				<view class="cell-left">
					<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
					<text class="cell-text">当前版本</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../static/dulin-setting/right-arrow.png"></image>
				</view>
			</view>
	
			<view class="cell" @click="changeGray">
				<view class="cell-left">
					<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
					<text class="cell-text">检查更新</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../static/dulin-setting/right-arrow.png"></image>
				</view>
			</view>
	
			<view class="cell" @click="changeGray">
				<view class="cell-left">
					<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
					<text class="cell-text">清除缓存</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../static/dulin-setting/right-arrow.png"></image>
				</view>
			</view>
	
	
			<view class="cell" @click="changeGray">
				<view class="cell-left">
					<image class="cell_icon" src="../../static/dulin-setting/account.png"></image>
					<text class="cell-text">关于</text>
				</view>
				<view class="cell-right">
					<image class="right-arrow" src="../../static/dulin-setting/right-arrow.png"></image>
				</view>
			</view>
	
		</view>
	
		<!-- 退出登录 -->
		<view class="logout" style="width:80%;margin-top: 50upx;">
			<button type="warn" @click="logout">退出登录</button>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				tittle:'users'
			}
		},
		methods: {
			
		}
	}
</script>

<style>
.index {
		display: flex;
		flex-direction: column;
		width: 100%;
		background-color: white;
		border-top: 1px solid #cccccc;
	}

	.vbox {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.top_back_img {
		z-index: -1;
		position: absolute;
		top: 0upx;
		width: 100%;
		height: 420upx;

	}

	.top {
		display: flex;
		width: 100%;
		height: 420upx;
		align-items: center;
	}
	.circle {
		margin-left: 100upx;
		width: 120upx;
		height: 120upx;
		border: 10upx solid #a4f4f6;
		border-radius: 150upx;
		overflow: hidden;
	}

	.head {
		width: 120upx;
		height: 120upx;
		border-radius: 150upx;
	}

	.top-texts {
		display: flex;
		flex-direction: column;
		margin-left: 15upx;
		color: white;
	}

	.name {
		font-size: 36upx;
		font-weight: 500;
	}

	.set-top-hr {
		width: 210upx;
		height: 6upx;
	}

	.top-changeInfo {
		margin-top: 250upx;
		width: 120upx;
		height: 28upx;
		line-height: 28upx;
		background-color: #FFFFFF;
		border-radius: 15upx;
		padding: 10upx;
		color: #33dce8;
	}

	.middle {
		display: flex;
		align-items: center;
		position: relative;
		top: -50upx;
		width: 80%;
		height: 100upx;
		background-color: white;
		border-radius: 15upx;
	}

	.middle-line {
		width: 2upx;
		height: 80upx;
		background-color: #eeeeee;
	}

	.middle-left {
		flex-grow: 1;
		color: #666666;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.middle-right {
		flex-grow: 1;
		color: #666666;
		display: flex;
		align-items: center;
		text-align: center;
	}

	.middle-icon {
		width: 40upx;
		height: 40upx;
		margin-left: 20upx;
	}

	.middle-num {
		color: #fcac45;
		-webkit-font-smoothing: antialiased;
	}

	.cell {
		display: flex;
		align-items: center;
		border-bottom: 1px solid #ccc;
		height: 90upx;
		align-items: center;
		justify-content: space-between;
	}

	.cell:active {
		background-color: #333;
		color: white;
		box-shadow: 1upx 1upx 35upx #ccc;
	}

	.cell-left {
		display: flex;
		align-items: center;
		margin-left: 65upx;
	}

	.cell-text {
		margin-left: 25upx;
	}

	.cell-right {
		margin-right: 45upx;
		height: 28upx;
	}

	.cell_icon {
		width: 40upx;
		height: 40upx;
		height: 40upx;
	}

	.right-arrow {
		color: #aaa;
		width: 15upx;
		height: 28upx;
	}
</style>
