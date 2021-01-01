<template>
	<view class="Product-view">
		<block v-for="(item,index) in describe.Detaileddrawing" :key="index">
			<image :src="item" mode="widthFix"
				@click="previmg(index, describe.Detaileddrawing)"></image>
		</block>
	</view>
</template>

<script>
	// 预览图片
	import Logic from '../../commonJs/logic.js'
	
	export default{
		props: {
			describe: {
				type: Object,
				default: {}
			},
		},
		methods: {
			previmg(index,imgArray) {
				new Logic(index,imgArray).previewImg();
			}
		},
	}
</script>

<style scoped>
	.Product-view{
		margin-top: 20upx; 
		padding-bottom: 90upx;
	}
	.Product-view image{
		width: 100%; 
		vertical-align: bottom;
	}
</style>
