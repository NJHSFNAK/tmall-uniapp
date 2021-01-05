import Vue from 'vue';
import App from './App';
// vuex
import store from './store/index.js';
Vue.prototype.$store = store;

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

// 登录弹窗
import model from './pages/common/model.vue';
Vue.component('model',model);

// 消息提示
import toast from './pages/commonJs/toast.js';
Vue.prototype.$Toast = toast;

// 登录按钮
import loginpage from './pages/common/login.vue';
Vue.component('loginpage',loginpage);	

App.mpType = 'app';
// 全局样式
import './style/style.css';

const app = new Vue({
    ...App
})
app.$mount()
