<template>
	<!-- 我的收货地址 -->
	<view>
		<block v-for="(item,index) in arrdata" :key='index' v-if='!addshow'>
			<view class="my-address-view">
				<view class="my-address-name" @click="getAdd(item)">
					<text>{{item.address}}</text>
					<view class="my-address-adding">
						<text>{{item.name}}</text>
						<text>{{item.mobile}}</text>
					</view>
				</view>
				<view class="my-address-change" @click="toNewAdd('001',item)">
					<image src="/static/loading/genggai.svg" mode="widthFix"></image>
				</view>
			</view>
		</block>
		<!-- 新增收货地址 -->
		<view class="button-address" @click="toNewAdd('002')">
			<image src="../../static/loading/xinzeng.svg" mode="widthFix"></image>
			<text>新增收货地址</text>
		</view>
		<!-- 登录界面 -->
		<loginpage ref='login'></loginpage>
		<!-- 没有收货地址 -->
		<view class="empty-cart" v-if='addshow'>
			<image src="/static/search/sousuono.svg" mode="widthFix"></image>
			<text>你还没有收货地址</text>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				// 收货地址
				arrdata: [],
				// 收货地址提示
				addshow: false
			}
		},
		methods: {
			// 获取收货地址
			async getadd() {
				try{
					let res = await new this.$Request(this.$Urls.m().addressurl).modeGet();
					let {errcode,msg} = res.msg;
					if(errcode === '401'){
						this.$refs.login.shows();
					}else if(res.data.length === 0){
						this.addshow = true;
					}else{
						console.log(res.data)
						this.arrdata = res.data;
						this.addshow = false;
					}
				}catch(err){
					//TODO handle the exception
					console.log(err)
				}
			},
			// 新增收货地址
			toNewAdd(num='002',data = []){
				// 002新增收货地址 001修改按钮
				let obj = {num,data};
				let str = JSON.stringify(obj);
				uni.navigateTo({
					url:'./newAddress?data='+ str
				})
			},
			// 选中某个收货地址携带参数返回上一级
			getAdd(item){
				// this.$store.commit('address',item);
				this.$bus.$emit('address',item);
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onShow() {
			// 获取收货地址
			this.getadd();
		},
		mounted() {
			this.$bus.$on('mycart',(res)=>{
				this.getadd();
			})
		}
	}
</script>

<style>
	page{
		background-color: #F2F2F2;
	}
	.my-address-view{
		font-size: 30upx;
		background: #FFFFFF; margin: 10upx;
		padding: 0 10upx;
		border-radius: 10upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.my-address-name{
		flex: 1;
		height: 130rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
	.my-address-name view{
		display: flex; 
		align-items: center;
	}
	.my-address-change{
		width: 50upx; 
		height: 50upx;
	}
	.my-address-change image{
		width: 50upx; 
		height: 50upx;
	}
	.my-address-adding{
		color: #A7A7A7; 
		padding-top: 8upx;
	}
	.my-address-adding text:nth-child(1){
		padding-right: 15upx;
	}
	/* 新增收货地址 */
	.button-address{
		font-size: 30upx;
		display: flex; align-items: center;
		justify-content: center;
		height: 100upx;
		background: #FFFFFF;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.button-address image{
		width: 50upx; 
		height: 50upx;
		padding-right: 20upx;
	}
</style>
