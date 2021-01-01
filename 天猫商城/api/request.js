// 数据请求
// 请求地址
const url = 'https://meituan.thexxdd.cn/api/';

const urls = class{
	constructor(arg) {
	   
	}
	// 静态方法
	static m(){
		// 首页--轮播接口
		let bannerget= `${url}getbanner`;
		// 抢购接口
		let getrecommurl = `${url}recom`;
		// 榜单接口
		let billboardurl = `${url}billboard`;
		// 卡片流接口
		let commodcardurl = `${url}commodcrad`;
		// 请求搜索接口
		let searchurl = `${url}search`;
		// 详情页接口
		let detailsurl = `${url}introduce`;
		// 商品参数信息
		let parameurl = `${url}parameter`;
		// 商品的评价
		let commiturl = `${url}wxcommnt`;
		return{
			bannerget,getrecommurl,billboardurl,commodcardurl,searchurl,detailsurl,parameurl,
				commiturl
		}
	}
}

export default urls;