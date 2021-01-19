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
		// let wxpayurl = `${url}placeorder`;
		// 查询订单是否支付成功
		let queryorderurl = `${url}queryorder`;
		// 虚拟支付接口
		let fictpayurl = `${url}fictpay`;
		// 待付款
		let tobepaidurl = `${url}tobepaid`;
		// 待发货、待收货、确定收货的订单详情
		let tobedetailurl = `${url}tobedetail`;
		// 删除订单
		let deleorderurl = `${url}deleorder`;
		// 待发货
		let tbdeliveredurl = `${url}tbdelivered`;
		// 待收货
		let gtbreceivedurl = `${url}gtbreceived`;
		// 确认收货
		let conreceipturl = `${url}conreceipt`;
		// 待评价
		let tbevaluatedurl = `${url}tbevaluated`;
		// 待评价的订单详情
		let dtpenpageurl = `${url}dtpenpage`;
		// 商品评价
		let subcommurl = `${url}subcomm`;
		// 一级分类
		let comclassurl = `${url}comclass`;
		// 二级分类
		let secondclassurl = `${url}secondclass`;
		// 二级分类的商品
		let queryurl = `${url}queryclass`;
		// 查询商品(全部、销量、价格)
		let querycodurl = `${url}querycod`;
		// 购物车的选中与取消
		let selectingurl = `${url}selecting`;
		// 商品的加减
		let prideurl = `${url}pride`;
		// 购物车全选和取消全选
		let selectallurl = `${url}selectall`;
		// 购物车删除商品
		let cartdeleteurl = `${url}cartdelete`;
		// 购物车重选sku
		let cartskuurl = `${url}cartsku`;
		// 购物车重选sku并修改
		let skubaseurl = `${url}skubase`;
		return{
			bannerget,getrecommurl,billboardurl,commodcardurl,searchurl,detailsurl,parameurl,
				commiturl,comtag,comtconent,collecturl,loginurl,pancolurl,shopcarurl,skuurl,goodskuurl,
					addcarurl,tokenurl,addressurl,newaddressurl,remaddurl,deleteaddurl,fictpayurl,tobepaidurl,
						tobedetailurl,deleorderurl,tbdeliveredurl,gtbreceivedurl,conreceipturl,tbevaluatedurl,dtpenpageurl,
							subcommurl,comclassurl,secondclassurl,queryurl,querycodurl,selectingurl,prideurl,selectallurl,cartdeleteurl,
								cartskuurl,skubaseurl
		}
	}
}

export default urls;