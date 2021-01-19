<template>
	<view>
		<Search></Search>
		<Swipers :bannerdata='bannerdata'></Swipers>
		<Purchase :recomdata='recomdata'></Purchase>
		<List :billboarddata='billboarddata'></List>
		<Commondy :commodcarddata='commodcarddata'></Commondy>
		<!-- 上拉加载更多 -->
		<loader-on ref='loadon'></loader-on>
		<!-- loading -->
		<fullloading ref='loading'></fullloading>
	</view>
</template>

<script>
	// 搜索
	import Search from './children/Search.vue';
	// 轮播
	import Swipers from './children/Swiper.vue';
	// 抢购
	import Purchase from './children/Purchase.vue';
	// 榜单
	import List from './children/List.vue';
	// 公共组件卡片流
	import Commondy from '../common/Commondy.vue';
	
	export default {
		data() {
			return {
				bannerdata:[],
				recomdata:[],
				billboarddata:[],
				commodcarddata:[],
				// 卡片商品页数
				page:0
			}
		},
		components:{
			Search,Swipers,Purchase,List,Commondy
		},
		methods: {
			indexRequest(){
				// 发起网络请求
				// 轮播图数据
				let banner = new this.$Request(this.$Urls.m().bannerget).modeget();
				// 抢购商品数据
				let recumm = new this.$Request(this.$Urls.m().getrecommurl).modeget();
				// 榜单数据
				let billboard = new this.$Request(this.$Urls.m().billboardurl).modeget();
				Promise.all([banner,recumm,billboard]).then((res)=>{
					console.log(res);
					this.bannerdata = res[0];
					this.recomdata = res[1];
					this.billboarddata = res[2];
				}).catch((err)=>{
					console.log(err)
				})
			},
			// 上拉加载所得数据
			pullUp(){
				// 卡片流数据
				new this.$Request(this.$Urls.m().commodcardurl+'?page='+this.page).modeget()
					.then((res)=>{
						if(res.length ===0){
							let value= {
								whether: true, 
								tips:'没有更多了',
								picture: false
							};
							this.$refs.loadon.loAd(value)
						}else{
							this.commodcarddata=[...this.commodcarddata,...res];
							// this.commodcarddata = this.commodcarddata.concat(res);
						}
					}).catch((err)=>{
						console.log(err)
					})
			}
		},
		created() {
			this.indexRequest();
			this.pullUp();
		},
		// 页面触底事件
		onReachBottom(){
			let value={
				whether: true, 
			};
			this.$refs.loadon.loAd(value)
			this.page = this.page+ 1;
			this.pullUp();
		},
		mounted() {
			this.$refs.loading.init();
		}
	}
</script>

<style scoped>
	page{
		background-color: #f4f4f4;
	}
</style>
