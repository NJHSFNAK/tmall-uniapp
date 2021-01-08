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
		// 判断商品是否已经收藏
		let pancolurl = `${url}collection`;
		// 购物车商品
		let shopcarurl = `${url}mycart`;
		// 获取sku数据
		let skuurl = `${url}wxsku`;
		// 获取某个商品的库存和数
		let goodskuurl = `${url}querysku`;
		// 加入购物车
		let addcarurl = `${url}atcart`;
		// 校验登录状态
		let tokenurl = `${url}tokening`;
		// 获取收货地址
		let addressurl = `${url}gainadd`;
		// 新增收货地址
		let newaddressurl = `${url}sudeadd`;
		// 修改收货地址
		let remaddurl = `${url}modifyadd`;
		// 删除收货地址
		let deleteaddurl = `${url}deleadd`;
		// 微信支付：统一下单
		let wxpayurl = `${url}placeorder`;
		return{
			bannerget,getrecommurl,billboardurl,commodcardurl,searchurl,detailsurl,parameurl,
				commiturl,comtag,comtconent,collecturl,loginurl,pancolurl,shopcarurl,skuurl,goodskuurl,
					addcarurl,tokenurl,addressurl,newaddressurl,remaddurl,deleteaddurl,wxpayurl
		}
	}
}

export default urls;