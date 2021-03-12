<template>
	<view v-if="show" class="parame">
		<view class="Coupon-yin anim" :catchtouchmove="true" @click="hideCou"></view>
		<view class="Coupon-view coup-anim">
			<view class="<Coupon-titl></Coupon-titl>e">产品参数</view>
			<block v-for="(item,index) in params" :key='index'>
			<div class="parame-view">
				<div class="parame-left">{{item.title}}</div>
				<div class="parame-right">{{item.label}}</div>
			</div>
			</block>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				show: false,
				params: []
			}
		},
		methods:{
			hideCou(){
				this.show =false;
			}
		},
		created() {
			// 接收
			this.$bus.$on('parames',(res)=>{
				let {show, data} = res;
				this.params = data;
				this.show = show;
			})
		}
	}
</script>

<style scoped>
	.parame{
		z-index: 9;
	}
	.parame-view{
		font-size: 28rpx; 
		display: flex; 
		border-bottom: 1px solid #F0F0F0;
		justify-content: flex-start;
		padding: 25rpx 15rpx;
	}
	.parame-left{
		width: 140upx;
		padding-right: 25upx;
	}
	.parame-right{
		flex: 1;
	}
</style>
