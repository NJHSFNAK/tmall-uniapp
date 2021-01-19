<template>
	<!-- 购物车 -->
	<view>
		<view class="shopp-view" v-if="emcart">
			<view class="manage-tli" @click="adMinis">{{editdata}}</view>
			<view style="margin-bottom: 150rpx;">
				<block v-for="(item,index) in cartdata" :key="index">
				<view class="shopp-goods">
					<!-- 商品 -->
					<view class="shopp-goods-view">
						<view class="shopp-chick">
							<image v-if="item.choice" @click="seLect(item._id,'unchecked')" src="/static/details/xuanzhong.svg" mode="widthFix"></image>
							<image v-else @click="seLect(item._id,'select')" src="/static/details/weixuan.svg" mode="widthFix"></image>
						</view>
						<view class="shopp-chick-img">
							<image :src="item.image" mode="scaleToFill"></image>
						</view>
						<view class="shopp-chick-gight">
							<view class="shopp-chick-right">
								<view>{{item.title}}</view>
								<view class="shopp-chick-sku" @click="normsFun(item.id,item._id,item.size,item.color,item.many)">
									<text>{{item.size}};</text>
									<text>{{item.color}}</text>
									<image src="/static/details/jiantou.svg" mode="widthFix"></image>
								</view>
							</view>
							<!-- 价格 -->
							<view class="shopp-price">
								<view>¥{{item.price}}</view>
								<view class="shopp-price-nums">
									<view @click="item.many === 1 ? false : true && reDuce(item._id,item.many,item.price)">-</view>
									<view>{{item.many}}</view>
									<view @click="pLus(item._id,item.many,item.price)">+</view>
								</view>
							</view>
						</view>
					</view>
				</view>
				</block>
			</view>
			<!-- 底部结算 -->
			<view class="settlement-view">
				<view class="settlement-img">
					<image v-if="!selectall" src="/static/details/weixuan.svg" mode="widthFix" @click="selectAll('seall')"></image>
					<image v-if="selectall" src="/static/details/xuanzhong.svg" mode="widthFix" @click="selectAll('deall')"></image>
				</view>
				<view class="settlement-tips" v-show="settips">
					<view class="total-view">
						<text>总价合计:</text>
						<text>¥ {{total.price}}</text>
					</view>
				</view>
				<view class="settlement-money" v-show="settips" @click="total.disable && semEnt()">结算({{mapselect.length}})</view>
				<view class="settlement-money" v-show="!settips" @click="total.disable && deLece()">删除</view>
			</view>
		</view>
		<!-- sku组件-->
		<addtocart ref="addto" :skudata="skudata"></addtocart>
		<!-- 登录界面 -->
		<loginpage ref="loginmen"></loginpage>
		<!-- 购物车没有数据的提示-->
		<view class="empty-cart" v-if="!emcart">
			<image src="/static/loading/kongcart.svg" mode="widthFix"></image>
			<text>购物车竟然是空的</text>
		</view>
	</view>
</template>

<script>
	import addtocart from '../common/addToCart.vue';
	export default{
		components: {
			addtocart
		},
		data() {
			return {
				emcart: true,
				// 购物车数据
				cartdata:[],
				editdata:'完成' ,
				settips: true,
				// 已勾选的商品总价
				mapselect:[],
				// 已勾选的商品id
				cartdele:[],
				skudata:[],
				settlement:[],
			}
		},
		methods: {
			// 获取购物车数据
			async mycart() {
				try{
					let res = await new this.$Request(this.$Urls.m().shopcarurl).modeGet();
					if(res.msg.errcode === '401'){
						// 需要登录
						this.$refs.loginmen.shows();
					}else if(res.msg === 'SUCCESS'){
						if(res.data.length === 0){
							this.emcart = false;
						}else{
							this.emcart = true;
							this.cartdata = res.data;
							this.coseLect();
						}
					}
				}catch(e){
					//TODO handle the exception
					throw e
				}
			},
			// 管理和完成切换
			adMinis(){
				this.editdata= this.editdata === '完成'?  '管理': '完成';
				if(this.editdata === '完成'){
					this.settips = true;
				}else if(this.editdata === '管理'){
					this.settips = false;
				}
			},
			// 单个商品的选中
			async seLect(id,nums){
				new this.$Toast('请求中').showloading();
				try{
					await new this.$Request(this.$Urls.m().selectingurl, {id,nums}).modepost();
					this.mycart();
					uni.hideLoading();
				}catch(e){
					//TODO handle the exception
					throw e
				}
			},
			// 计算总价
			coseLect(){
				let filselect = this.cartdata.filter((res)=>{
					return res.choice === true
				});
				this.mapselect = filselect.map((item) =>{
					return item.total_price
				});
				// 存放已经勾选的商品的id
				this.cartdele = filselect.map((item)=>{
					return item._id
				});
				// 存储已经结算的商品
				this.settlement = filselect;
			},
			// 结算按钮
			semEnt(){
				let cartdata = JSON.stringify(this.settlement);
				uni.navigateTo({
					url:'../../payment/payment?cartdata=' + cartdata
				})
			},
			// 删除按钮
			async deLece(){
				new this.$Toast('正在删除').showloading();
				try{
					await new this.$Request(this.$Urls.m().cartdeleteurl,{arrid: this.cartdele}).modepost();
					this.mycart();
					uni.hideLoading();
				}catch(e){
					//TODO handle the exception
					throw e
				}
			},
			// 减按钮
			reDuce(id,many,price){
				many--;
				this.pullFun(id,many,price);
			},
			// 加按钮
			pLus(id,many,price){
				many++;
				this.pullFun(id,many,price);
			},
			// 加减数量请求
			async pullFun(id,many,price){
				new this.$Toast('正在计算中').showloading();
				let obj= {id,many,price};
				try{
					await new this.$Request(this.$Urls.m().prideurl, obj).modepost();
					this.mycart();
					uni.hideLoading();
				}catch(e){
					//TODO handle the exception
				}
			},
			// 全选
			async selectAll(idft){
			 new this.$Toast('正在请求').showloading();
			 try{
				await new this.$Request(this.$Urls.m().selectallurl+'?idft='+idft).modeGet();
				this.mycart();
				uni.hideLoading();
			  }catch(e){
				//TODO handle the exception
				throw e
			  }
			},
			// 重选sku
			async normsFun(id,_id,size,color,many){
				try{
					let res = await new this.$Request(this.$Urls.m().cartskuurl+'?id='+id).modeGet();
					this.skudata = res.data;
					let obj = {sku:this.skudata,_id,size,color,many}
					this.$refs.addto.showcar('001',obj);
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		onShow() {
			this.mycart();
		},
		mounted() {
			this.$bus.$on('mycart',(res)=>{
				if(res.cart === 'SUCCESS'){
					this.mycart();
				}
			})
		},
		computed: {
			// 计算总价
			total() {
				if(this.mapselect.length === 0){
					return {price : 0, disable: false}
				}else {
					let num = 0;
					this.mapselect.forEach((item)=>{
						num += item;
					})
					return {price: parseFloat((num).toFixed(10)),disable: true}
				}
			},
			// 全选
			selectall(){
				if(this.mapselect.length === this.cartdata.length){
					return true
				}else{
					return false
				}
			}
		},
	}
</script>

<style>
page {
	background: #f2f2f2;
}
.shopp-view {
	margin: 0 10upx;
}
.manage-tli {
	font-size: 28upx;
	color: #6b6b6b;
	height: 80upx;
	line-height: 80upx;
	text-align: right;
}
/* 商品 */
.shopp-goods {
	font-size: 28upx;
	/* height: 340upx; */
	background: #ffffff;
	border-radius: 10upx;
	padding: 20upx 10upx;
	margin-bottom: 15rpx;
}
.shopp-goods-Coupon {
	height: 70upx;
	/* background: #4CD964; */
	display: flex;
	align-items: center;
	justify-content: flex-end;
}
.shopp-chick {
	width: 45upx;
	height: 200upx;
	display: flex;
	flex-direction: column;
	justify-content: center;
}
.shopp-chick image {
	width: 45upx;
	height: 45upx;
}
.shopp-chick-img {
	width: 200upx;
	height: 200upx;
	padding: 0 15upx;
}
.shopp-chick-img image {
	width: 100%;
	height: 100%;
	border-radius: 8upx;
}
.shopp-chick-gight view:nth-child(1) {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.shopp-chick-right image {
	width: 20upx;
	height: 20upx;
	padding-left: 8upx;
}
.shopp-chick-sku {
	font-size: 25upx;
	color: #999999;
	height: 50upx;
	background: #f9f9f9;
	display: inline-flex;
	align-items: center;
	margin: 17upx 0;
	padding: 0 20rpx;
	border-radius: 5rpx;
}
.shopp-price {
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 50upx;
	/* background: #9ACD32; */
}
.shopp-price view:nth-child(1) {
	color: #f75807;
	font-weight: bold;
}
.shopp-price-nums {
	display: flex;
	align-items: center;
	border: 1px solid #f9f9f9;
	width: 200upx;
	border-radius: 10upx;
}
.shopp-price-nums view {
	font-weight: bold;
	width: 90upx;
	height: 50upx;
	line-height: 50upx;
	text-align: center;
}
.shopp-price-nums view:nth-child(2) {
	border-left: 1px solid #f9f9f9;
	border-right: 1px solid #f9f9f9;
	padding: 0 10upx;
}
.shopp-goods-view {
	display: flex;
}
.shopp-chick-gight {
	flex: 1;
}
.Special-rate {
	color: #ff5000;
	display: flex;
	align-items: center;
	height: 50upx;
	font-weight: bold;
}
/* 结算 */
.settlement-view {
	font-size: 28upx;
	background: #ffffff;
	height: 90upx;
	border-top: 1px solid #f2f2f2;
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
}
.settlement-img {
	width: 45upx;
	height: 45upx;
}
.settlement-img image {
	width: 45upx;
	height: 45upx;
	padding-left: 20upx;
}
.total-view {
	display: flex;
	align-items: center;
	justify-content: center;
}
.total-view text:nth-child(1) {
	font-size: 30upx;
}
.total-view text:nth-child(2) {
	font-weight: bold;
	color: #ff4401;
	padding-left: 10upx;
}
.settlement-money {
	background: #fe0036;
	height: 90upx;
	line-height: 90upx;
	width: 220upx;
	text-align: center;
	font-size: 30upx;
	color: #ffffff;
}
.settlement-tips {
	text-align: center;
}
</style>

