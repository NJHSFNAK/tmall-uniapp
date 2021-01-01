import Vue from 'vue'
import App from './App'

// 请求方法
import request from './api/api.js';
import urls from './api/request.js';
import loading from './pages/common/loading.vue';

Vue.config.productionTip = false;

Vue.prototype.$Request = request;
Vue.prototype.$Urls = urls;

// 动画样式
import './pattern/animat.css';
// 产品参数
import './pattern/styles.css';

Vue.component('loader-on',loading);

// bus传值
import bus from './pages/commonJs/bus.js';
// 全局使用
Vue.prototype.$bus = bus;

App.mpType = 'app';
// 全局样式
import './style/style.css';

const app = new Vue({
    ...App
})
app.$mount()
