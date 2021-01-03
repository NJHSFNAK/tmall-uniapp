// vuex
import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

const state = {
	// 购物车的件数
	cartnum:{
		num: 0
	}
}
const mutations = {
	// 改变购物车的件数
	change(state,nums){
		state.cartnum = {nums};
	}
}

export default new Vuex.Store({
	// 数据中心
	state,
	// 传值
	mutations
})
