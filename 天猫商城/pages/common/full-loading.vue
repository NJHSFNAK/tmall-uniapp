<template>
	<view class="full-loading" v-if="Loading">
		<image src="/static/loading/loadtmall.gif" mode="widthFix"></image>
	</view>
</template>
              
<script>
export default{
	data() {
		return {
			Loading: true
		}
	},
	methods:{
		init(value = false){
			this.Loading = value
		}
	}
}
</script>

<style scoped>
	.full-loading{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #fff;
		z-index: 999;
	}
	.full-loading image{
		width: 100rpx; 
		height: 100rpx;
	}
</style>
