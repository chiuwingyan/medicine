// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { Loading } from 'element-ui'
import echarts from 'echarts'
Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(router);
window.evenBus=new Vue();
/* eslint-disable no-new */
axios.defaults.timeout = 5000;       
axios.defaults.baseURL = 'http://39.108.174.244:9090/';
let loading;

const downloadUrl = url => {
  let iframe = document.createElement('iframe')
  iframe.style.display = 'none'
  iframe.src = url
  iframe.onload = function () {
    document.body.removeChild(iframe)
  }
  document.body.appendChild(iframe)
}
axios.interceptors.request.use(function (config) {
  loading = Loading.service({ fullscreen: true, text: '疯狂加载中' });
  if (localStorage.getItem('token') != null && router.match(location).hash !== '#/login'){
    config.headers['Authorization']= `Bearer ${localStorage.getItem('token')}`;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
 // console.log(error);
  loading.close();
  return Promise.reject(error);
});

// 添加响应拦截器 ，请求结束后，关闭 加载组件
axios.interceptors.response.use(function (response) {
  if (response.headers && (response.headers['content-type'] === 'application/x-msdownload' || response.headers['content-type'] === 'application/octet-stream;charset=utf-8')) {
    downloadUrl(response.request.responseURL)
    
  }
  loading.close();
  return response;
}, function (error) {
  // 对响应错误做点什么

  return Promise.reject(error);
});

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
