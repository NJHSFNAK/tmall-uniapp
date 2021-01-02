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
		// 商品的所有评价的标签
		let comtag = `${url}comtag`;
		// 商品的所有评价的所有内容
		let comtconent = `${url}comtconent`;
		// 商品收藏
		let collecturl = `${url}enshrine`;
		// 登录小程序
		let loginurl = `${url}wxlogin`;
		return{
			bannerget,getrecommurl,billboardurl,commodcardurl,searchurl,detailsurl,parameurl,
				commiturl,comtag,comtconent,collecturl,loginurl
		}
	}
}

export default urls;