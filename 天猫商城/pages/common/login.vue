<template>
	<view class="login-page" v-if="show">
		<button type="primary" open-type="getUserInfo" @getuserinfo="getUserInfo">登录</button>
	</view>
</template>

<script>
	import wxLogin from '../../login/Login.js';
	export default{
		data() {
			return {
				show: false
			}
		},
		methods: {
			async getUserInfo(e) {
				new this.$Toast('登陆中').showloading();
				let {userInfo,errMsg} = e.detail;
				try{
					let data = await new wxLogin(userInfo, errMsg).login();
					this.show = false;
					this.$bus.$emit('mycart',{data:data});
					new this.$Toast('登陆成功').showtoast();
					// 登录成功，更新数据
				}catch(err){
					console.log(err)
				}
			},
			shows(boll = true){
				this.show = boll;
			}
		},
	}
</script>

<style scoped>
	.login-page{
		position: fixed;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #FFFFFF;
		z-index: 999;
	}
	.login-page button{
		width: 350rpx;
	}
</style>
