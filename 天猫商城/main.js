import Vue from 'vue'
import App from './App'

// 请求方法
import request from './api/api.js';
import urls from './api/request.js';
import loading from './pages/common/loading.vue';

Vue.config.productionTip = false;

Vue.prototype.$Request = request;
Vue.prototype.$Urls = urls;

Vue.component('loader-on',loading);

App.mpType = 'app';
// 全局样式
import './style/style.css';

const app = new Vue({
    ...App
})
app.$mount()
