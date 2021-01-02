<!-- 公共评论 -->
<template>
	<view class="comments-view">
		<!-- 分类 -->
		<view class="evaluate-class" v-if="labeldata.length > 0">
			<block v-for="(item,index) in labeldata" :key="index">
				<text v-if="item.num === ''" :class="{actives: index ===current}" @click="currenClick(index, item.commid, item.label)">{{item.label}}</text>
				<text v-else :class="{actives: index ===current}" @click="currenClick(index, item.commid,item.label)">{{item.label}}({{item.num}})</text>
			</block>
		</view>
		<!-- 评价 -->
		<block v-for="(item,index) in commdata" :key="index">
			<view class="comments-user">
				<view class="comments-top comments-flex">
					<image :src="item.avatarUrl" mode="widthFix"></image>
					<text>{{item.nickName}}</text>
				</view>
				<view class="comments-zh comments-flex">
					<text>{{item.time}}</text>
					<text>颜色分类:{{item.color}}</text>
					<text>尺码:{{item.size}}</text>
				</view>
				<view class="comments-mes">{{item.text}}</view>
				<view class="comments-img" v-if="item.isimg">
					<block v-for="(items,indexs) in item.image" :key="indexs">
					<view class="user-images">
						<image :src="items" mode="aspectFill" @click="preImage(indexs,item.image)"></image>
					</view>
					</block>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import Logic from '../commonJs/logic.js';
	
	export default{
		data() {
			return {
				labeldata: [],
				commdata: [],
				current: 0,
			}
		},
		methods: {
			network(id){
				let comtag =new this.$Request(this.$Urls.m().comtag+'?id='+id).modeget();
				let comtconent =new this.$Request(this.$Urls.m().comtconent+'?id='+id+'&label='+'全部	').modeget();
				Promise.all([comtag,comtconent])
				.then((res)=>{
					// console.log(res);
					// 评价标签
					this.labeldata = res[0];
					// 评价内容
					this.commdata = res[1];
				}).catch((err)=>{
					console.log(err)
				})
			},
			// 图片预览
			preImage(index,imgArray){
				new Logic(index,imgArray).previewImg();
			},
			// 加背景颜色
			currenClick(index, commid, label){
				this.current = index;
				// console.log(commid)
				new this.$Request(this.$Urls.m().comtconent+'?id='+commid+'&label='+label).modeget()
				.then((res)=>{
					this.commdata = [];
					this.commdata = res;
				}).catch((err)=>{
					console.log(err);
				})
			}
		},
		// onload可以获取上个页面传过来的值
		onLoad(e) {
			this.network(e.id);
		}
	}
</script>

<style scoped>
	.comments-view{
		margin: 20upx;
	}
	/* 分类 */
	.evaluate-class{
		font-size: 25upx; 
		display: flex;
		flex-wrap: wrap;
		padding-bottom: 50upx;
		border-bottom: 1px solid #eeeeee;
	}
	.evaluate-class text{
		background: #feecea;
		border-radius: 50upx;
		padding: 15upx;
		margin: 0upx 14upx 14upx 0;
	}
	/* 选中*/
	.actives{
		background: #FF0036 !important;
		color: #FFF !important;
	}
	/* user评价 */
	.comments-user{
		font-size: 30upx;
		padding-bottom: 15upx;
		border-bottom: 1px solid #eeeeee;
		margin: 25upx 0;
	}
	.comments-flex{
		display: flex; 
		align-items: center;
	}
	.comments-top image{
		width: 60upx; 
		height: 60upx !important; 
		border-radius: 50%;
	}
	.comments-top text{
		padding-left: 10upx;
	}
	.comments-zh{
		height: 80upx; 
		font-size: 25upx; 
		color: #a7a7a7;
	}
	.comments-zh text{
		padding-right: 8upx;
	}
	.comments-mes{
		line-height: 1.5;
	}
	.comments-top{
		height: 60upx;
	}
	.comments-img{
		display: flex; 
		flex-wrap: wrap;
	}
	.user-images{
		width: calc(33.33% - 10rpx*2);
		height: 200rpx;
		padding: 10rpx;
	}
	.user-images image{
		width: 100%; 
		height: 200rpx;
		border-radius: 2rpx;
	}
</style>
