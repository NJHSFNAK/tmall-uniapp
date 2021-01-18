<template>
	<!-- 待收货 -->
	<view class="payment-view">
		<!-- 商品详情 -->
		<block v-for="(item,index) in tobepaid" :key='index'>
		<view class="payment-commodity">
			<text class="order-tips">卖家已发货</text>
			<block v-for="(iteming, indexs) in item.order" :key='indexs'>
			<view class="payment-order" @click="payDeatil(item._id)">
				<view class="payment-order-img">
					<image :src="iteming.image" mode="aspectFill"></image>
				</view>
				<view class="payment-title">
					<text>{{iteming.title}}</text>
					<text class="text-you">颜色:{{iteming.color}};尺码:{{iteming.size}}</text>
				</view>
				<view class="payment-flex">
					<view class="payment-price">
						<text>￥ {{iteming.price}}</text>
						<text class="text-you">x{{iteming.many}}</text>
					</view>
				</view>
			</view>
			</block>
			<!-- 价格 -->
			<view class="presonal-Price">实付款￥{{item.total_price}}</view>
			<!-- 付款 -->
			<view class="presonal-payment">
				<text @click="conRece(item._id)">确认收货</text>
			</view>
		</view>
		</block>
		<!-- 登录界面 -->
		<loginpage ref="loginmen"></loginpage>
		<!-- 没有相关订单 -->
		<ordering ref="orderload"></ordering>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				tobepaid:[]
			}
		},
		methods:{
			async deliver(){
				try{
					let res = await new this.$Request(this.$Urls.m().gtbreceivedurl).modeGet();
					console.log(res);
					if(res.data.errcode === '401'){
						this.$refs.loginmen.shows();
					}else if(res.data.length === 0){
						this.$refs.orderload.init();
						this.tobepaid = []
					}else{
						this.tobepaid = res.data;
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			// 跳转订单详情页
			payDetail(id){
				let tip = {tips: '卖家已发货',sum:'实付款',show:true,text:'确定收货',id,evt:'002'}
				let value = JSON.stringify(tip);
				wx.navigateTo({
					url:'../order-details/order?value='+ value
				})
			},
			// 确认收货
			async conRece(id){
				let res = await new this.$Request(this.$Urls.m().conreceipturl+'id='+id).modeGet();
				if(res.msg === 'SUCCESS'){
					new this.$Toast('确认收货成功').showtoast();
					this.payDetail();
				}
			}
		},
		created() {
			this.deliver();
		},
		mounted() {
			this.$bus.$on('mycart',(res)=>{
				if(res.cart === "SUCCESS"){
					this.getdata();
				}
			})
		}
	}
</script>

<style>
	@import url("../../../style/order.css");
</style>
