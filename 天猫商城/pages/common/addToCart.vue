<!-- 公用的sku -->
<template>
	<view v-if="couponif">
		<view class="Coupon-yin anim" @click="hidecar"></view>
		<view class="Coupon-view coup-anim padd">
			<!-- 商品图片 -->
			<view class="commodity-view">
				<view class="commodity-left-img">
					<image :src="attr.image" mode="aspectFill"></image>
				</view>
				<view class="commodity-zh">
					<view>¥{{attr.price}}</view>
					<view>库存{{attr.totalstock}}件</view>
					<view class="choice">
						<text>{{choice}}:</text>
						<text>{{skumen.color}}</text>
						<text>{{skumen.size}}</text>
					</view>
				</view>
				<view class="commodity-right-img" @click="hidecar">
					<image src="/static/details/guanbi.svg" mode="widthFix"></image>
				</view>
			</view>
			<!-- 主要颜色 -->
			<view class="sku-view">
				<text class="sku-title">主要颜色</text>
				<view class="sku-mian">
					<block v-for="(item,index) in skudata[1]" :key='index'>
					<view @click="colorFun(item.color,index)" :class="{active: index === colorindex}">
						<image :src="item.image" mode="aspectFill"></image>
						<text>{{item.color}}</text>
					</view>
					</block>
				</view>
			</view>
			<!-- 尺寸 -->
			<view class="sku-view">
				<text class="sku-title">尺码</text>
				<view class="sku-mian sku-two">
					<block v-for="(item,index) in skudata[0]" :key='index'>
						<view @click="sizeFun(item,index)" 
							:class="{active: index === sizeindex}">{{item}}</view>
					</block>
				</view>
			</view>
			<!-- 购买数量 -->
			<view class="sku-view sku-height" v-if="mean !== '001'">
				<view class="sku-title numes">购买数量</view>
				<view class="sku-mums-gight">
					<view @click="sub">-</view>
					<view>{{many}}</view>
					<view @click="add('add')">+</view>
				</view>
			</view>
		</view>
		<!-- 确定 -->
		<button class="determine coup-anim" v-if="mean === '001'" :disabled="!skumen.ban" @click="modifysku">确定</button>
		<button class="determine coup-anim" v-if="mean === '002'" :disabled="!skumen.ban" @click="detErmine">确定</button>
		<button class="determine coup-anim" v-if="mean === '003'" :disabled="!skumen.ban" @click="purchase">确定</button>
		<!-- <view class="determine coup-anim" >确定</view> -->
		<!-- 登录弹窗 -->
		<model ref='modelRef'></model>
	</view>
	
</template>

<script>
	import model from './model.vue';
	export default{
		components: {model},
		props: {
			skudata:Array,
		},
		data() {
			return {
				// 控制整个组件的显示与隐藏	
				couponif: false,
				// 002是加入购物车，003是直接购买,001是购物车重新选
				mean: '002',
				// 商品图片库存等数据
				attr:{},
				id:'',
				title:'',
				// 选择颜色
				colorindex: -1,
				// 选择尺码
				sizeindex: -1,
				colorValue:'',
				sizeValue:'',
				// 购买商品的个数
				many: 1,
				// 购物车_id
				_id:'',
				// 购物车商品数量
				momany: 1,
				
			}
		},
		methods:{
			// 组件显示
			showcar(mean,obj={}){
				this.couponif = true;
				this.mean = mean;
				if(mean === '001'){
					let {sku,_id,size,color,many}= obj;
					this._id= _id;
					this.momany = many;	
					this.sizeindex = sku[0].findIndex((item)=>item === size);
					this.colorindex = sku[1].findIndex((item)=> item.color === color);
					this.colorValue = color;
					this.sizeValue = size;
				}
			},
			// 组件隐藏
			hidecar(){
				this.couponif = false;
			},
			// 选择颜色
			colorFun(item,index){
				this.colorindex = index;
				this.colorValue = item;
			},
			// 选择尺码
			sizeFun(item,index){
				this.sizeindex = index;
				this.sizeValue = item;
			},
			// 加入购物车的确定按钮
			async detErmine(){
				let data = {
					id: this.id,
					size: this.sizeValue,
					color: this.colorValue,
					image: this.attr.image,
					price: this.attr.price,
					title: this.title,
					many: this.many
				};
				// 校验登录状态
				let user = await new this.$Request(this.$Urls.m().tokenurl).modeGet();
				let res = await new this.$Request(this.$Urls.m().addcarurl,data).modepost();
				if(res.msg.errcode === '401'){
					// 需要登录
					this.$refs.modelRef.show('coll');
				}else if(res.msg === 'SUCCESS'){
					this.hidecar();
					new this.$Toast('加入购物车成功').showtoast();
					let shopcar = await new this.$Request(this.$Urls.m().shopcarurl+'?id='+this.id).modeGet();
					this.$store.commit('change',shopcar.data.length);
				}
			},
			async skuRequest(data){
				let res = await new this.$Request(this.$Urls.m().goodskuurl,data).modepost();
				this.attr = res.data[0];
				this.add('many')
			},
			// 商品加
			add(many){
				if(many ===  'many' && this.many >=this.attr.totalstock){
					this.many = this.attr.totalstock;
				}else if(many ===  'add'&& this.many >=this.attr.totalstock){
					this.many = this.attr.totalstock;
				}else if(many ===  'add'){
					this.many = this.many + 1;
				}
			},
			// 商品减
			sub(){
				if(this.many <=1){
					this.many = 1;
				}else{
					this.many = this.many - 1;
				}
			},
			// 直接下单
			async purchase(){
				let data = [{
					id: this.id,
					size: this.sizeValue,
					color: this.colorValue,
					image: this.attr.image,
					price: this.attr.price,
					title: this.title,
					many: this.many,
					total_price: parseFloat((this.attr.price * this.many).toFixed(2)) 
				}]
				// 校验登录状态
				let user = await new this.$Request(this.$Urls.m().tokenurl).modeGet();
				if(user.msg.errcode){
					this.$refs.modelRef.show('coll');
				}else if(user.msg === 'SUCCESS'){
					let cartdata = JSON.stringify(data);
					uni.navigateTo({
						url:'../../payment/payment?cartdata=' + cartdata
					})
				}
			},
			// 购物车修改sku
			async modifysku(){
				let data={
					id: this._id,
					skuid: this.id,
					size: this.sizeValue,
					color: this.colorValue,
					image: this.attr.image,
					price: this.attr.price,
					many: this.momany,
				}
				try{
					let res = await new this.$Request(this.$Urls.m().skubaseurl,data).modepost();
					console.log(res);
					if(res.msg === 'SUCCESS'){
						this.hidecar();
						this.$bus.$emit('mycart',{cart: res.msg})
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		watch: {
			skudata(newValue, oldValue) {
				this.id = newValue[2].id;
				this.title = newValue[2].title;
				this.attr = newValue[2];
			},
			// 判断是否选择颜色和尺码
			skumen(newValue, oldValue){
				let {color,size} = newValue;
				if(color !== '' && size !== ''){
					// 传递的参数
					let data = {id: this.id,size,color}
					this.skuRequest(data);
				}
			},
			// 监听加入购物车成功后，存储数据到vuex，然后监听vuex数据的变化
			'$store.state.cartnum'(newValue, oldValue){
				console.log(newValue.nums);
				// this.
			}
		},
		computed: {
			choice() {
				if(this.sizeValue !== '' || this.colorValue !== ''){
					return '请选择'
				}else{
					return '已选择'
				}
			},
			skumen(){
				if(this.sizeValue !== '' && this.colorValue !== ''){
					return {color: this.colorValue, size: this.sizeValue, ban: true}
				}else if(this.sizeValue === '' && this.colorValue === ''){
					return {color: '主要颜色', size: '尺码', ban: false}
				}else if(this.sizeValue === '' && this.colorValue !== ''){
					return {color: '', size: '尺码', ban: false}
				}else if(this.sizeValue !== '' && this.colorValue === ''){
					return {color: '主要颜色', size: '', ban: false}
				}
			}
		},
	}
</script>

<style scoped>
	.padd{
		padding: 15upx; 
		margin-bottom: 90rpx;
	}
	.Coupon-view text{
		display: block;
	}
	.commodity-view{
		/* background: #4CD964; */
		height: 200upx;
		display: flex;
	} 
	.commodity-left-img{
		width: 200upx; 
		height: 200upx;
	}
	.commodity-left-img image{
		width: 200upx; 
		height: 200upx; 
		border-radius: 10upx;
	}
	.commodity-zh{
		font-size: 27upx; 
		color: #3d4245; 
		flex: 1;
	}
	.commodity-zh view:nth-child(1){
		font-size: 35upx; 
		color: #fe0036;
	}
	.commodity-zh view{
		padding-top: 10upx; 
		padding-left: 15upx;
	}
	.choice{
		display: flex; 
		align-items: center;
	}
	.choice text{
		padding-right: 8upx;
	}
	.commodity-right-img{
		width: 50upx; 
		height: 50upx;
	}
	.commodity-right-img image{
		width: 50upx; 
		height: 50upx;
	}
	/* sku */
	.sku-view{
		margin-top: 40upx; 
		border-bottom: 1px solid #e5e5e5;
	}
	.sku-title{
		font-size: 30upx; 
		color: #051b28;
		font-weight: bold;
		margin-bottom: 20upx;
	}
	.sku-mian image{
		width: 45upx; 
		height: 45upx;
		padding-right: 17upx;
	}
	.sku-mian view{
		display: flex; align-items: center;
		height: 65upx;
		background: #f5f5f5;
		border: 1rpx solid #f5f5f5;
		border-radius: 20upx;
		padding: 0 14upx;
		margin-right: 30upx;
		margin-bottom: 30upx;
	}
	.sku-mian{
		font-size: 27upx; 
		color: #051b28;
		display: flex; align-items: center;
		flex-wrap: wrap;
	}
	.sku-two view{
		padding: 0 35upx;
	}
	/* 购买数量 */
	.sku-height{
		height: 120upx; 
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.numes{
		margin: 0 !important;
	}
	.sku-mums-gight{
		display: flex; 
		align-items: center;
	}
	.sku-mums-gight view{
		font-size: 30upx; color: #051b28;
		font-weight: bold;
		background: #f5f5f5;
		border-radius: 10upx;
		width: 90upx;
		height: 70upx;
		line-height: 70upx;
		text-align: center;
	}
	.sku-mums-gight view:nth-child(2){
		background: none !important;
	}
	.determine{
		z-index: 999;
		font-size: 30upx; color: #FFFFFF;
		background: #fe0036;
		height: 90upx;
		line-height: 90upx;
		text-align: center;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	/* 选了颜色加上边框 */
	.active{
		border: 1rpx solid red !important;
	}
</style>

