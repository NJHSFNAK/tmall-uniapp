<template>
	 <!--商品分类 -->
	 <view>
	 	<!-- 排序 -->
	 	<view class="condition-view">
	 		<block v-for="(item,index) in sorting" :key="index">
	 		<view :class="{active:index === num}" @click="sortIng(index)">
	 			<text>{{item.text}}</text>
	 			<image :src="item.image" :class="{admining : rotate}"></image>
	 		</view>
	 		</block>
	 	</view>
	 	<view style="height: 70rpx;"></view>
	 	<!-- 卡片流商品 -->
	 	<commodity :commodcarddata="commodcarddata"></commodity>
	 </view>
</template>

<script>
	import commodity from '../common/Commondy.vue';
	// qs模块
	const qs = require('querystring');
	// import qs from 'qs';
	export default{
		data() {
			return {
				num: 0,
				sorting:[
					{text: '全部',image:''},{text: '销量',image:''},
						{text: '价格',image:'/static/details/jiantou.svg'},
				],
				querydata:{},
				commodcarddata:[],
				// 按销量
				savo: 1,
				// 按价格
				pai: 1,
				rotate: true
			}
		},
		methods: {
			sortIng(index) {
				this.num = index;
				if(index === 0){
					this.goodsData();
				}else if(index === 1){
					this.savo = this.savo === 1? -1: 1;
					this.qsFun('001', this.savo);
				}else if(index === 2){
					this.pai = this.pai === 1? -1: 1;
					this.rotate = this.rotate === true? false: true;
					this.qsFun('002', this.pai);
				}
			},
			async goodsData(){
				let {cid,name}= this.querydata;
				let query = "?cid="+cid+'&name='+ name;
				try{
					let res = await new this.$Request(this.$Urls.m().queryurl+query).modeGet();
					this.commodcarddata = res.data;
				}catch(e){
					throw e
				}
			},
			// 按销量、价格查询
			async qsFun(spvalue,number){
				const param = qs.stringify({
					cid: this.querydata.cid,
					name: this.querydata.name,
					spvalue, number
					});
				this.queryCode(param);
			},
			async queryCode(param){
				this.commodcarddata = []
				try{
					let res = await new this.$Request(this.$Urls.m().querycodurl+'?'+param).modeGet();
					this.commodcarddata = res.data;
				}catch(e){
					//TODO handle the exception
					throw e
				}
			}
		},
		components: {
			commodity
		},
		onLoad(e) {
			this.querydata = JSON.parse(e.data);
			this.goodsData();
		}
	}
</script>

<style>
	page{
		background: #f4f4f4;
	}
	.condition-view{
		background: #ffffff; 
		height: 70upx; 
		font-size: 28upx;
		display: flex; 
		align-items: center;
		justify-content: space-around;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	.condition-view image{
		width: 25upx; 
		height: 25upx;
	}
	.condition-view text{
		padding-right: 8upx;
	}
	.condition-view view{
		display: flex; 
		align-items: center; 
		color: #999;
	}
	.active{
		color: #DD2727 !important;
	}
	.admining{
		transform:rotate(180deg);
	}
</style>

