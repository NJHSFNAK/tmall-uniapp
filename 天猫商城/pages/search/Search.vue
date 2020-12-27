<template>
	<view>
		<view class="search-cont">
			<view class="search">
				<input type="text" placeholder-class="inputclass" confirm-type="搜索" focus="true"
				 placeholder="请输入关键字" v-model="searchdata" @confirm="onKey"/>
			</view>
			<view class="search-code" @click="searchBtn">搜索</view>
		</view>
		<!-- 搜索历史 -->
		<view class="search-history" v-if="ifhistory">
			<view class="search-title">
				<view>最近搜索</view>
				<view>
					<image src="/static/search/searchend.svg" mode="widthFix" @click="removeStorage">
					</image>
				</view>
			</view>
			<!-- tab -->
			<view class="menu-block">
				<block v-for="(item,index) in setdatas" :key='index'>
					<view @click='searhistory(item)'>{{item}}</view>
				</block>
			</view>
		</view>
		<!-- 展示搜索结果 -->
		<Commodity  :commodcarddata='commodcarddata' v-if='!searchno'></Commodity>
		<!-- 上拉加载 -->
		<loader-on ref="loadon"></loader-on>
		<!-- 没有搜索结果 -->
		<view class="empty-cart" v-if='searchno'>
			<image src="/static/search/sousuono.svg" mode="widthFix"></image>
			<text>抱歉！暂无相关商品</text>
		</view>
	</view>
</template>

<script>
	import Commodity from '../common/Commondy.vue';
	export default{
		components: {Commodity},
		data() {
			return {
				searchdata: '',
				ifhistory: false,
				setdatas:[],
				// 请求页数
				page:0,
				commodcarddata:[],
				searchno: false,
				// 最后一次搜索结果
				searchkey:''
			}
		},
		methods:{
			searchBtn(){
				if(this.searchdata != ''){
					this.getStorage(this.searchdata);
					this.setStorage();
					this.page = 0;
					this.ifhistory = false;
					this.searchkey(this.searchdata);
				}
			},
			onKey(e){
				let searchkey = e.detail.value;
				if(searchkey != ''){
					this.getStorage(searchkey);
					this.setStorage();
					this.page = 0;
					this.ifhistory = false;
					this.searchData(searchkey);
				}
			},
			// 存储搜索历史
			getStorage(searchkey){
				// uni.setStorageSync()
				// 存之前先获取之前存储的值
				let seararray = uni.getStorageSync('srarch_key') || []
				seararray.unshift(searchkey)
				uni.setStorageSync('srarch_key', seararray)
			},
			// 取出搜索历史
			setStorage(){
				let setdata = uni.getStorageSync('srarch_key');
				setdata = Array.from(new Set(setdata));
				if(setdata.length !==0){
					this.ifhistory = true;
					this.setdatas = setdata;
				}else{
					this.ifhistory = false;
				}
			},
			// 清除本地搜索历史
			removeStorage(){
				uni.removeStorageSync('srarch_key');
				this.setStorage();
			},
			// 点击历史数据进行搜索
			searhistory(item){
				this.ifhistory= false;
				this.searchData(item);
			},
			// 请求接口
			searchData(value,idn='001'){
				// 保留搜索的数据
				this.searchkey = value;
				new this.$Request
				(this.$Urls.m().searchurl+'?keyword='+value+'&&page='+this.page).modeget()
					.then((res)=>{
						// 上拉 加载更多
						if(this.page !== 0){
							if(res.length === 0){
								this.$refs.loadon.loAd({whether: true, tips:'没有更多了',picture: false})
							}else{
								this.commodcarddata = [...this.commodcarddata,...res];
							}
						}else{
							this.$refs.loadon.loAd({whether: false});
							if(res.length !== 0){
								this.searchno = false;
								this.commodcarddata = res;
							}else{
								this.searchno = true;
							}
						}
					}).catch((err)=>{
						console.log(err)
					})
			}
		},
		created() {
			this.setStorage();
		},
		// 上拉加载更多
		onReachBottom() {
			let value={
				whether: true, 
			};
			this.$refs.loadon.loAd(value)
			this.page = this.page+ 1;
			this.searchData(this.searchkey,'002');
		}
	}
</script>

<style scoped>
	.search {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		display: flex;
		flex-direction: row;
		background: #FFFFFF;
		border-radius: 20upx;
		margin-left: 20upx;
	}
	.search input {
		height: 70upx;
		line-height: 70upx;
		width: 100%;
		font-size: 30upx;
		color: #666666;
		padding-left: 30upx;
	}
	.search-cont {
		display: flex;
		justify-content: space-between;
		height: 70upx;
		align-items: center;
		padding: 30upx 0;
		background: #f8f8f8;
	}
	.search-code {
		width: 150upx;
		height: 50upx;
		text-align: center;
		font-size: 30upx;
	}
	.search-history{margin: 20upx;}
	.search-title{
		font-size: 30upx;
		font-weight: bold;
		display: flex;
		justify-content:space-between;
		align-items: center;
		height: 60upx;
		line-height: 60upx;
	}
	.search-title image{
		width: 36upx; 
		height: 36upx;
	  display: block;
	}
	.menu-block view {
		background: #f7f8fa;
		border-radius: 6upx;
		font-size: 27upx;
		color: #292c33;
		text-align: center;
		padding: 10upx;
		margin: 20upx 20upx 0 0;
	}
	.menu-block {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: wrap;
	}
</style>
