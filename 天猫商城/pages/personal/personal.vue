<template>
	<view>
		<view class="choice-tips">
			<block v-for="(item,index) in datas" :key='index'>
				<text :class="{activetext: index === num}" @click="changeClass(index)">{{item}}</text>
			</block>
		</view>
		<view class="choice-content">
			<tobepaid v-if="num === 0"></tobepaid>
			<delivered v-else-if="num === 1"></delivered>
			<received v-else-if="num === 2"></received>
			<evaluated v-else></evaluated>
		</view>
	</view>
</template>

<script>
	import tobepaid from './children/tobepaid.vue';
	import received from './children/received.vue';
	import evaluated from './children/evaluated.vue';
	import delivered from './children/delivered.vue';
	export default{
		components: {
			tobepaid,received,evaluated,delivered
		},
		data() {
			return {
				datas:['待付款','待发货','待收货','待评价'],
				num : 0
			}
		},
		methods: {
			changeClass(num) {
				this.num = num;
			}
		},
	}
</script>

<style>
	page{
		background: #eeeeee;
	}	
	.choice-tips{
		background: #FFFFFF;
		display: flex;
		justify-content: space-around;
		color: #6d6d6d;
		font-size: 28upx;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
	}
	.choice-tips text{
		height: 70upx;
		line-height: 70upx;
	}
	.activetext{
		color: #fe0036 !important;
		border-bottom: 4upx solid #fe0036;
	}
	.choice-content{
		margin-top: 100upx;
	}
</style>
