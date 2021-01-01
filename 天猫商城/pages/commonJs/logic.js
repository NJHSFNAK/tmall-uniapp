// 预览图片
class Logic{
	constructor(index,imgarr){
		this.index = index;
		this.imgarr = imgarr;
	}
	previewImg(){
		uni.previewImage({
			current: this.index,
			urls: this.imgarr,
		}).then((res)=>{
			console.log(res);
		}).catch((err)=>{
			console.log(err);
		})
	}
}
export default Logic;