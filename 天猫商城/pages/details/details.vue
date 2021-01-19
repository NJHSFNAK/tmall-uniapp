<template>
	<view>
		<!-- 返回按钮 -->
			<view class="header-fixed backno" v-show="showAbs">
				<view class="status_bar" :style=" 'height:' + tophight.top + 'px;' "></view>
				<view class="navs-image" :style=" 'height:' + tophight.height + 'px;'"@click="pageRe()">
					<image src="/static/details/fanhuibai.jpg" mode="widthFix"></image>
				</view>
			</view>
			<!-- 顶部导航栏 -->
			<view class="header-fixed backyes" v-show="!showAbs" :style="{opacity:styleObject}">
					<view class="status_bar" :style=" 'height:' + tophight.top + 'px;' "></view>
					<top :tophight='tophight' ref='top'></top>
				</view>
			<!-- 图片视频轮播 -->
			<view>
				<swiper :indicator-dots="dots"  :interval="3000" :duration="1000" :circular="true"
					indicator-color="rgba(216, 216, 216)" indicator-active-color="#7a7a7a" @change='bannerFun'>
					<block v-for="(item,index) in imagetext[0].media" :key='index'>
						<swiper-item class="swiper-video" v-if="item.video !== ''">
							<view class="video-btn">
								<view>
									<!-- 去掉播放按钮、下方进度按钮、视频大小与播放容器保持一致 -->
									<video :show-center-play-btn="false" :controls="showControls" objectFit="cover"
										id="myVideo" @play="playFun" @pause="pauseFun" @ended="endFun" 
											:src="item.video" :enable-progress-gesture="false"></video>
								</view>
								<view class="video-img" @click="videoPlayFun" v-show="startVideo">
									<image src="/static/details/bofang.svg" mode="widthFix"></image>
								</view>
							</view>
						</swiper-item>
						<block v-for="(items,indexs) in item.imgArray" :key='indexs'>
						<swiper-item>
							<view>
								<image mode="aspectFill" class="imageurl" :src="items" @click="previmg(indexs,item.imgArray)"></image>
							</view>
						</swiper-item>
					</block>
					</block>	
			</swiper>
			</view>
			<!-- 价格、标题 -->
			<price :describe='describe'></price>
			<!-- 产品参数 -->
			<parame></parame>
			<!-- 商品评价 -->
			<evaluate :commit='commit' class="evaluate"></evaluate>
			<!-- 商品详情 -->
			<product :describe='describe' class="produce"></product>
			<!-- 商品底部 -->
			<bottom :goodid='goodid' :collectdata='collectdata' :shopcar='shopcar'></bottom>
			<!-- 公共的sku -->
			<addtocart ref='addtocart' :skudata='skudata'></addtocart>
			<!-- loading -->
			<fullloading ref='loading'></fullloading>
	</view>
</template>

<script>
	import top from './children/Top.vue';
	// 预览图片
	import Logic from '../commonJs/logic.js'
	// 价格展示
	import price from './children/Price.vue';
	// 产品参数
	import parame from './children/Parame.vue';
	// 商品评价
	import evaluate from './children/Evaluate.vue';
	// 产品图片
	import product from './children/Product.vue';
	// 底部
	import bottom from './children/Bottom.vue';
	// 公用的sku
	import addtocart from '../common/addToCart.vue';
	
	export default{
		components: {top,price,parame,evaluate,product,bottom,addtocart},
		data() {
			return {
				// 获取胶囊按钮的数据
				tophight:{},
				// 返回按钮
				showAbs: false,
				// 透明度
				styleObject: 0,
				// 找到视频上下文
				videoPlay:{},
				// 播放按钮的显示与隐藏
				startVideo: true,
				// 控制底部进度条显示与隐藏
				showControls: false,
				// 保留数据
				imagetext:[],
				// 动态决定视频知识点存在与消失
				dots: false,
				// 获取视频的播放地址
				truevideo:'',
				// 获取到商品描述信息
				describe:{},
				// 商品评价信息
				commit:{},
				// 评价页高度
				evalheight: 0,
				// 详情页高度
				proheight: 0,
				// 商品id
				goodid:'',
				// 商品是否收藏
				collectdata:{},
				// 购物车数据
				shopcar:{},
				// sku数据
				skudata:[],
				// shows: Boolean
			}
		},
		methods: {
			// 导航栏显示
			handleScroll(top) {
				if(top> 90){
					let opacity = top / 300;
					opacity = opacity>1 ? 1 :opacity;
					this.showAbs = false;
					this.styleObject = opacity;
				}else{
					this.showAbs = true;
				}
			},
			// 手动触发视频播放
			videoPlayFun(){
				setTimeout(()=>{
					this.videoPlay.play();
				},200)
			},
			// 视频播放时触发
			playFun(){
				this.startVideo = false;
				this.showControls = true;
			},
			// 视频暂停时触发
			pauseFun(){
				this.startVideo = true;
				this.showControls = false;
			},
			// 视频结束时触发
			endFun(){
				this.startVideo = true;
				this.showControls = false;
			},
			// 滑动轮播图触发
			bannerFun(e){
				this.videoPlay.pause();
				// 轮播器切换到图片时显示指示点
				let index = e.detail.current;
				if(this.truevideo !== ''){
					this.dots= index === 0? false: true;	
				}else{
					this.dots = true;
				}
			},
			// 请求数据
			async getRquest(id){
				// 轮播信息、价格参数信息
				let detail= new this.$Request(this.$Urls.m().detailsurl+'?id='+id).modeget()
				.then((res)=>{	
					this.imagetext = res;
					this.goodid = res[0].id;
					// 获取视频的播放地址
					this.truevideo = this.imagetext[0].media[0].video
					this.dots = this.truevideo === ''? true: false;
					// 获取到商品描述等信息
					 let price = this.imagetext[0].describe;
					 price['id'] = this.imagetext[0].id;
					 this.describe = price;
				}).catch((err)=>{
					console.log(err)
				})
				// 商品评论信息
				new this.$Request(this.$Urls.m().commiturl+'?id='+id).modeget()
				.then((res)=>{
					this.commit = res[0];
				}).catch((err)=>{
					console.log(err);
				})
				// 判断商品是否已经收藏
				let goodcollect = await new this.$Request(this.$Urls.m().pancolurl+'?id='+id).modeGet();
				this.collectdata = goodcollect.msg;
				// 获取购物车数据
				let shopcar = await new this.$Request(this.$Urls.m().shopcarurl+'?id='+id).modeGet();
				this.shopcar = shopcar;
				// 获取sku数据
				let skudata = await new this.$Request(this.$Urls.m().skuurl+'?id='+id).modeGet();
				let defaultdata = {
					image: this.imagetext[0].media[0].imgArray[0],
					price: this.imagetext[0].describe.Trueprice,
					totalstock: this.imagetext[0].describe.Total_stock,
					id: this.imagetext[0].id,
					title: this.imagetext[0].describe.title
				}
				this.skudata = skudata.data;
				this.skudata.push(defaultdata);
			},
			// 预览图片
			previmg(index,imgArray){
				new Logic(index,imgArray).previewImg();
			},
			// 子组件调用父组件
			fathEr(index){
				// evaluate是评价，produce是详情
				let clsdata = index === 1? '.evaluate': '.produce';
				const query = this.createSelectorQuery();
				query.select(clsdata).boundingClientRect();
				query.selectViewport().scrollOffset();
				query.exec((res)=>{
					let top = res[0].top+ res[1].scrollTop -(this.tophight.top+ this.tophight.height);
					uni.pageScrollTo({
						scrollTop: top,
						duration: 300
					})
				})
			},
			// 获取各自的高度
			top(cla){
				const query = this.createSelectorQuery();
				query.select(cla).boundingClientRect();
				query.selectViewport().scrollOffset();
				query.exec((res)=>{
					if(cla === '.evaluate'){
						this.evalheight =res[0].top+ res[1].scrollTop -(this.tophight.top+ this.tophight.height);
					}else{
						this.proheight = res[0].top+ res[1].scrollTop -(this.tophight.top+ this.tophight.height);
					}
				})
			},
			// 调用addtocart方法
			addtocart(mean){
				this.$refs.addtocart.showcar(mean);
			},
			// 返回按钮
			pageRe(){
				uni.navigateBack({
					delta:1
				})
			}
		},
		created() {
			// 获取胶囊按钮的数据
			this.tophight = uni.getMenuButtonBoundingClientRect();
		},
		mounted() {
			this.$refs.loading.init();
			this.videoPlay = uni.createVideoContext('myVideo');
			this.top('.evaluate');
			this.top('.produce');
			new this.$Request().baseFun();
		},
		// 滚动监听的生命周期
		onPageScroll(e) {
			this.handleScroll(e.scrollTop);
			// evaluate是评价，produce是详情
			if(e.scrollTop < this.evalheight){
				this.$refs.top.change(0);
			}else if(e.scrollTop < this.proheight){
				this.$refs.top.change(1);
			}else{
				this.$refs.top.change(2);
			}
		},
		onLoad(e) {
			console.log(e.id)
			this.getRquest(e.id);
		},
		computed: {
			name() {
				return this.data 
			}
		},
	}
</script>

<style scoped>
	page{
		background: #f2f2f2;
	}
	.header-fixed{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}
	.backyes{
		background: #f8f8f8;
	}
	.backno{
		background: none;
	}
	.status_bar {
		width: 100%;
	}
	.navs-image image{
		width: 28px; 
		height: 28px;
		border-radius: 50%;
	}
	.navs-image{
		display: flex; 
		align-items: center;
		padding-left: 20upx;
	}
	/* banner部分 */
	.imageurl {
		width: 100%;
		height: 700upx !important;
	}
	
	swiper {
		height: 700upx !important;
	}
	.swiper-video{
		height: 700upx; 
		background: #4CD964;
	}
	.swiper-video video{
		width: 100%; 
		height: 700upx;
	}
	/* 自定义按钮 */
	.video-img image{
		width: 90upx; 
		height: 90upx; 
		z-index: 999;
		border: 2px solid #FFFFFF;
		border-radius: 50%;
	}
	.video-img{
		width: 90upx; 
		height: 90upx;
		position: absolute; bottom: 0;
		left: 50%;
		top: 50%;
		transform: translateX(-50%) translateY(-50%);
	}
	.video-btn{
		height: 700upx; 
		position: relative;
	}
</style>
