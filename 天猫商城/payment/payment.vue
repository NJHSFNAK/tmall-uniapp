<template>
	<view>
		<view class="payment-view">
			<!-- 收货地址 -->
			<view class="payment-name" @click="address">
				<view class="payment-left-img">
					<image src="/static/loading/address-shouhuo.svg" mode="widthFix"></image>
				</view>
				<!-- 收货地址 -->
				<view class="payment-add" v-if="nameadd">
					<text>{{addressdata.name}}</text>
					<text>{{addressdata.mobile}}</text>
					<text>{{addressdata.address}}</text>
				</view>
				<view class="payment-add" v-if="!nameadd">请选择收货地址</view>
				<view class="payment-right-img">
					<image src="/static/loading/shouhuo-jiantou.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- 商品详情 -->
			<view class="payment-commodity">
				<block v-for="(item,index) in comminfo" :key='index'>
				<view class="payment-order">
					<view class="payment-order-img">
						<image :src="item.image" mode="aspectFill"></image>
					</view>
					<view class="payment-title">
						<text>{{item.title}}</text>
						<text class="text-you">颜色:{{item.color}};尺码:{{item.size}}</text>
					</view>
					<view class="payment-flex">
						<view class="payment-price">
							<text>￥ {{item.price}}</text>
							<text class="text-you">x{{item.many}}</text>
						</view>
						<view>
							共{{item.many}}件 小计: ￥ {{item.total_price}}
						</view>
					</view>
				</view>
				</block>
			</view>
		</view>
		<!-- 底部提交订单 -->
		<view class="place-order">
			<text>合计: ￥ {{Totalprice}}</text>
			<text @click="placeOrder()">提交订单</text>
		</view>
	</view>
</template>

<script>
	// 价格自动补齐
	const Price = require('e-commerce_price');
	
	export default{
		data() {
			return {
				// 商品页面的立即购买
				comminfo: [],
				// 商品总价
				Totalprice: 0,
				nameadd: Boolean,
				addressdata:{},
				// 存储购物车数组
				idcard:[],
				// 订单号信息
				outno:'',
				// 订单号
				ide:''
			}
		},
		onLoad(e) {
			let data = JSON.parse(e.cartdata);
			this.comminfo = data;
			let numdata =0;
			for (let item of data) {
				numdata += item.total_price;
			}
			this.Totalprice =Price(numdata);
			let _id = JSON.parse(e.cartdata).filter(item=>item._id)
			this.idcard = _id.map(item=>item._id)
		},
		methods: {
			address() {
				wx.navigateTo({
					url:'../pages/address/Address'
				})
			},
			// 立即支付
			async placeOrder(){
				new this.$Toast('正在下单').showloading();
				let {city,address,name,mobile} = this.addressdata;
				// 商品数据
				let codata = this.comminfo.map((item)=>{
					let data = {
						id: item.id,
						image: item.image,
						title: item.title,
						size: item.size,
						color: item.color,
						price: item.price,
						many: item.many
					}
					return data;
				});
				let dataobj = {
					consignee: this.addressdata,
					commodity: codata,
					total_price: this.Totalprice,
					idcard: this.idcard
				};
				// 请求统一下单接口
				// 虚拟支付接口
				try{
					var res = await new this.$Request(this.$Urls.m().fictpayurl,dataobj).modepost();
					if(res.msg !== 'SUCCESS'){
						throw res.msg
					}else{
						// 存储订单号和信息
						this.outno = res.data.out_trade_no;
						this.ide = res.data.id;
					}
				}catch(e){
					new this.$Toast(e,'none').showtoast();
					throw e
				}; 
				// 调用支付
				try{
					// 虚拟支付
					if(res.msg === 'SUCCESS'){
						new this.$Toast('支付成功','none').showtoast();
						wx.navigateTo({
							url:'../personal/personal?index='+ 1
						})
					}else{
						throw '支付失败'
					}
					// 实体户支付
					// let {nonceStr, paySign, signType, timeStamp} = res.data;
					// await this.wxPay({nonceStr, paySign, signType, timeStamp, package :res.data.package});
				}catch(e){
					// new this.$Toast('支付失败','none').showtoast();
					throw e;
				};
				// 查询订单是否支付成功
				// try{
				// 	let querydata = await new this.$Request(this.$Urls.m().queryorderurl, 
				// 	{
				// 		outno: this.outno, id: this.ide
				// 	}).modepost();
				// 	if(querydata.msg === 'SUCCESS'){
				// 		new this.$Toast('支付成功').showtoast();
				// 	}else{
				// 		throw '支付失败'
				// 	}
				// }catch(e){
				// 	new this.$Toast(e,'none').showtoast();
				// }
			},
			wxPay(payment){
				return new Promise((resolve,reject)=>{
					wx.requestPayment({
						...payment,
						success: (res) => {
							resolve(res);
						},
						fail:(err)=>{
							reject(err)
						}
					})
				})
			}
		},
		watch: {
			// 监听收货地址
			'$store.state.useradd'(newValue, oldValue) {
				this.addressdata = newValue.add;
			},
		},
		onShow() {
			this.$bus.$on('address',(res)=>{
				this.addressdata = res;
			});
			if(JSON.stringify(this.addressdata) === '{}'){
				this.nameadd = false;
			}else{
				this.nameadd = true;
			}
		}
	}
</script>

<style scoped>
	page{
		background-color: #f2f2f2;
	}
	.payment-view{
		margin: 15upx;
	}
	.payment-name{
		height: 150upx;
		background-color: #FFFFFF; 
		border-radius: 15upx;
		font-size: 28upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 10upx;
	}
	.payment-left-img{
		width: 60upx; 
		height: 60upx;
	}
	.payment-left-img image{
		width: 60upx; 
		height: 60upx;
	}
	.payment-add text{
		display: block;
	}
	.payment-add text:nth-child(2){
		padding: 4rpx 0;
	}
	.payment-add{
		flex: 1;
		padding-left: 20rpx;
	}
	.payment-right-img{
		width: 40upx; 
		height: 40upx;
	}
	.payment-right-img image{
		width: 40upx; 
		height: 40upx;
	}
	/* 下单商品 */
	.payment-commodity{
		background-color: #FFFFFF; 
		border-radius: 15upx;
		font-size: 28upx;
		padding: 10rpx;
		margin: 15upx 0;
	}
	.payment-order{
		display: flex;
		justify-content: space-between;
		height: 200upx;
		/* background: #4CD964; */
		margin-bottom: 20rpx;
	}
	.payment-order text{
		display: block;
	}
	.payment-order-img{
		width: 200upx; 
		height: 200upx;
		border-radius: 8upx;
		padding-right: 10upx;
	}
	.payment-order-img image{
		width: 200upx; 
		height: 200upx;
		border-radius: 8upx;
	}
	.payment-title{
		flex: 1;
	}
	.payment-title text:nth-child(1){
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.payment-title text:nth-child(2){
		background-color: rgb(250, 250, 250);
		padding: 5upx;
		border-radius: 7upx;
	}
	.payment-price{
		text-align: right;
	}
	.payment-flex{
		display: flex;
		flex-direction: column;
		justify-content: space-between;}
		.text-you{color: rgb(156, 156, 156);
		margin-top: 8upx;
	}
	/* 提交 */
	.place-order{height: 90upx;
		background-color: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}
	.place-order text:nth-child(2){
		background-color: rgb(255, 0, 54);
		height: 90upx;
		width: 270upx;
		color: #FFFFFF;
		text-align: center;
		line-height: 90upx;
		margin-left: 30upx;
	}
</style>
