// request请求
const request = class{
	constructor(url,arg) {
	  this.url = url;
		this.arg = arg;
	}
	// post请求
	modepost(){
		return new Promise((resolve,reject)=>{
			uni.request({
				url:this.url,
				method:'POST',
				data: this.arg
			})
			.then((res)=>{
				resolve(res[1].data.data)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}
	modeget(){
		return new Promise((resolve,reject)=>{
			uni.request({
				url:this.url,
				method:'GET',
			})
			.then((res)=>{
				resolve(res[1].data.data)
			})
			.catch((err)=>{
				reject(err)
			})
		})
	}
}

export default request;