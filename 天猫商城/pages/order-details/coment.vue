<template>
	<!-- 评价 -->
	<view>
		<!-- 描述 -->
		<view class="pu-coments-input">
			<textarea  placeholder="宝贝满足你的期待吗？说说它的优点和美中不足的地方吧" v-model="tipsdata" maxlength="200"/>
		</view>
		<!-- 上传图片 -->
		<view class="Upload-pictures">
			<view class="Upload-button" @click="uploadImg" v-if="hideimg">
				<image src="/static/loading/uptu.svg" mode="widthFix"></image>
			</view>
			<view class="conteng">
				<block v-for="(item,index) in upimg" :key='index'>
					<view class="conteng-img" v-if="item.length !== 0">
						<image :src="item" mode="aspectFill" class="uploadimg" @click="prevImg(index,upimg)"></image>
						<image src="/static/loading/guanbi.svg" mode="widthFix" class="deleteimg" @click="deleteImg(index)"></image>
					</view>
				</block>
			</view>
		</view>
		<!-- 提交 -->
		<view class="Su-comments" @click="submit">提交评论</view>
	</view>
</template>

<script>
	import logic from '../commonJs/logic.js'
	export default{
		data() {
			return {
				tipsdata: '',
				upimg: [],
				comming:{},
			}
		},
		methods: {
			// 上传图片
			uploadImg() {
				wx.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType:['album','camera'],
					success:(res)=>{
						new this.$Toast('等待上传').showloading();
						this.cloudImg(res.tempFilePaths[0]);
					},
					fail: (err) => {
						console.log(err)
					}
				})
			},
			// 上传图片到服务器
			cloudImg(path){
				wx.uploadFile({
					name: 'file',
					url: 'https://meituan.thexxdd.cn/api/potimg',
					filePath: path,
					success:(res)=>{
						this.upimg.push(JSON.parse(res.data).data);
						new this.$Toast('上传成功').showtoast();
					},
					fail:(err)=>{
						console.log(err)
					}
				})
			},
			// 预览图片
			prevImg(index,upimg){
				new logic(index,upimg).previewImg();
			},
			// 删除图片
			deleteImg(index){
				this.upimg.splice(index,1);
			},
			// 提交评论
			async submit(){
				new this.$Toast('正在提交').showloading();
				let {_id,id,size,color} = this.comming;
				let data = {orderid:_id,commid:id,size,color,comment: this.tipsdata,commimage: this.upimg}
				try{
					let res = await new this.$Request(this.$Urls.m().subcommurl, data).modepost();
					if(res.msg === 'SUCCESS'){
						new this.$Toast('评论成功').showToast();
						uni.redirect({
							url:'../personal/personal'
						})
					}else{
						new this.$Toast(res.msg,'none').showToast();
					}
				}catch(e){
					//TODO handle the exception
				}
			}
		},
		computed: {
			hideimg() {
				if(this.upimg.length >= 6){
					return false
				}else{
					return true
				}
			}
		},
		onLoad(e) {
			this.comming= JSON.parse(e.data)
		}
	}
</script>

<style>
	page{
		background: #eeeeee;
	}
	.pu-coments-input{
		background-color: #FFFFFF; 
		height: 350rpx;
	}
	.pu-coments-input textarea{
		width: 100%; color: rgb(0, 0, 0) !important;
		padding: 10rpx;
		font-size: 30rpx;
		height: 350rpx;
		overflow-y: auto;
	}
	.Upload-button{
		width: 130rpx; 
		height: 130rpx; 
		padding-left: 10rpx; 
		padding-bottom: 5rpx;
	}
	.Upload-button image{
		width: 130rpx; 
		height: 130rpx;
	}
	.Upload-pictures{
		margin: 15rpx;
	}
	/* 上传图片 */
	.conteng{
		display: flex;
		flex-wrap: wrap;
	}
	.conteng-img{
		width: calc(25% - 10rpx*2);
		height: 150rpx;
		padding: 10rpx;
		position: relative;
	}
	.conteng-img image{
		width: 100%; 
		height: 150rpx;
		border-radius: 6rpx;
	}
	.deleteimg{
		width: 33upx !important; 
		height: 33upx !important;
		position: absolute;
		top: 0upx;
		right: 0upx;
	}
	/* 提交评论 */
	.Su-comments{
		background-color: rgb(255, 83, 2);
		color: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		position: fixed;
		bottom: 0;
		right: 0;
		left: 0;
		text-align: center;
	}
</style>
