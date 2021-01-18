// 待付款
import request from '../../api/api.js';
import url from '../../api/request.js';
class Payment{
	constructor(payment) {
	  this.payment = payment;
	}
	// 拉取付款
	async paySucc(){
		try{
			// 1.查询订单
			await this.wxPay();
		}catch(e){
			//TODO handle the exception
			throw e
		}
		// 2.查询订单状态
		try{
			let res = await new request(url.m().queryorderurl, {id: this.payment._id, outno: this.payment.out_trade_no}).modepost();
		}catch(e){
			throw '支付失败'
		}
	}
	// 查询订单
	wxPay(){
		return new Promise((resolve,reject)=>{
			wx.requestPayment({
				timeStamp: this.payment.timeStamp,
				nonceStr: this.payment.nonceStr,
				package: this.payment.package,
				signType: this.payment.signType,
				paySign: this.payment.paySign,
				success: (res)=>{
					resolve(res)
				},
				fail:(err)=>{
					reject(err)
				}
			})
		})
	}
}

export default Payment;