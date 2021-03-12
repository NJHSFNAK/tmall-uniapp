<template>
	<!-- 新增收货地址 -->
	<view class="new-address-view">
		<!-- 收货地址 -->
		<view class="new-address">
			<view>收货城市:</view>
			<view>
				<input type="text" v-model="city" placeholder="请选择收货城市" 
					disabled placeholder-style="color:#9c9c9c"/>
			</view>
			<view>
				<!-- 选择器，小程序自带 -->
				<picker mode="region" @change="regionChange">
					<text>选择城市</text>
				</picker>
			</view>
		</view>
		<!-- 详细地址 -->
		<view class="new-address">
			<view>详细地址:</view>
			<view>
				<input type="text" v-model="address" placeholder="请填写详细地址" 
					placeholder-style="color:#9c9c9c"/>
			</view>
		</view>
		<!-- 联系人 -->
		<view class="new-address">
			<view>联系人: </view>
			<view>
				<input type="text" v-model="name" placeholder="请填写收货人姓名" placeholder-style="color:#9c9c9c"/>
			</view>
		</view>
		<!-- 手机号码 -->
		<view class="new-address">
			<view>手机号:</view>
			<view>
				<input type="number" v-model="mobile" placeholder="请填写收货人手机号码" placeholder-style="color:#9c9c9c"/>
			</view>
		</view>
		<!-- 保存地址 -->
		<view class="conServe adcolor" @click="saveAddress" v-if="!nameadd">保存地址</view>
		<!-- 修改地址 -->
		<view class="conServe adcolor" @click="removeAddress" v-if="nameadd">修改地址</view>
		<!-- 删除地址 -->
		<view class="conServe decolor" @click="deleteAddress" v-if="nameadd">删除</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
				city:'',
				address:'',
				name:'',
				mobile:'',
				nameadd: Boolean,
				id:''
			}
		},
		methods: {
			regionChange(e) {
				let city = e.detail.value;
				var str= '';
				city.forEach((item)=>{
					str += item+' ';
				})
				this.city = str;
			},
			// 收货地址
			async saveAddress(){
				let data = {city: this.city, address: this.address, name: this.name, mobile: this.mobile};
				try{
					let res = await new this.$Request(this.$Urls.m().newaddressurl, data).modepost();
					console.log(res);
					if(res.msg === 'SUCCESS'){
						new this.$Toast('提交成功').showtoast();
						uni.navigateBack({
							delta: 1
						})
					}else{
						if(res.msg === '参数填写错误'){
							new this.$Toast('信息填写有错误或漏填','none').showtoast();
						}else{
							new this.$Toast(res.msg,'none').showtoast();
						}
					}
				}catch(e){
					//TODO handle the exception
				}
			},
			// 更改收货地址
			async removeAddress(){
				new this.$Toast('正在修改').showloading();
				try{
					let data = {id:this.id,city: this.city, address: this.address, name: this.name, mobile: this.mobile};
					let res = await new this.$Request(this.$Urls.m().remaddurl, data).modepost();
					// console.log(res);
					if(res.msg === "SUCCESS"){
						new this.$Toast('修改成功').showtoast();
						uni.navigateBack({
							delta: 1
						});
					}else{
						new this.$Toast(res.msg,'none').showtoast();
					}
				}catch(e){
					//TODO handle the exception
					console.log()
				}
			},
			// 删除收货地址
			async deleteAddress(){
				new this.$Toast('正在删除').showloading();
				try{
					let res = await new this.$Request(this.$Urls.m().deleteaddurl+'?id='+this.id).modeGet();
					console.log(res);
					if(res.msg === "SUCCESS"){
						new this.$Toast('删除成功').showtoast();
						uni.navigateBack({
							delta: 1
						});
					}else{
						new this.$Toast(res.msg,'none').showtoast();
					}
				}catch(e){
					//TODO handle the exception
					console.log(e)
				}
			}
		},
		onLoad(e) {
			// console.log(e)
			let data = JSON.parse(e.data);
			console.log(data.data);
			this.address = data.data.address;
			this.city = data.data.city;
			this.mobile= data.data.mobile;
			this.name = data.data.name;
			this.id = data.data._id;
			if(data.num === '001'){
				this.nameadd = true;
			}else{
				this.nameadd = false;
			}
		}
	}
</script>

<style scoped>
	.new-address-view{
		padding: 10upx 30upx;
	}
	.new-address{
		height: 100upx;
		display: flex; 
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		border-bottom: 1rpx solid #F0F0F0;
	}
	.new-address view:nth-child(1){
		width: 150rpx;
	}
	.new-address view:nth-child(2){
		flex: 1;
	}
	.new-address view:nth-child(3){
		color: #4CD964;
	}
	/* 保存 */
	.conServe{
		height: 80rpx;
		font-size: 30rpx;
		border-radius: 10rpx;
		font-weight: bold;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 30rpx;
	}
	.adcolor{
		background:linear-gradient(to right,#ffd300,#e6be00);
	}
	.decolor{
		background-color: red; color: #FFFFFF;
	}
</style>


