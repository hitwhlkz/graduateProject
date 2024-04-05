<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image :src="logoImage"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<wInput
					v-model="phoneData"
					type="text"
					maxlength="11"
					placeholder="用户名/电话"
					:focus="isFocus"
				></wInput>
				<wInput
					v-model="passData"
					type="password"
					maxlength="11"
					placeholder="密码"
				></wInput>
			</view>
			<wButton 
				class="wbutton"
				text="登 录"
				:rotate="isRotate"
				@click="startLogin"
			></wButton>
			
			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>
			
			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	import wInput from '../../components/watch-login/watch-input.vue' //input
	import wButton from '../../components/watch-login/watch-button.vue' //button
	export default {
		data() {
			return {
			phoneData:'', //用户/电话
			passData:'', //密码
			isRotate: false, //是否加载旋转
			isFocus: true // 是否聚焦	
			}
		},
		components:{
			wInput,
			wButton,
		},
		methods: {
			startLogin(e){
			 //    console.log(e)
				// //登录
				// if(e.isRotate){
				// 	//判断是否加载中，避免重复点击请求
				// 	return false;
				// }
				// if (this.phoneData == '') {
				//      uni.showToast({
				//         icon: 'none',
				// 		position: 'bottom',
				//         title: '用户名不能为空'
				//     });
				//     return;
				// }
			 //    if (this.passData.length < 5) {
			 //        uni.showToast({
			 //            icon: 'none',
				// 		position: 'bottom',
			 //            title: '密码不正确'
			 //        });
			 //        return;
			 //    }
				
				console.log("登录成功")
				
				// _this.isRotate=true
				// setTimeout(function(){
				// 	_this.isRotate=false
				// },3000)
				
				uni.reLaunch({
					url:'/pages/upload/upload'
				})
			},
			login_weixin() {
				//微信登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_weibo() {
				//微博登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			},
			login_github() {
				//github登录
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '...'
				});
			}
		}
	}
</script>

<style>
@import url('css/icon.css');
@import url('css/main.css');
</style>
