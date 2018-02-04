// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import { Loading } from 'element-ui'
Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(router);
/* eslint-disable no-new */
axios.defaults.timeout = 5000;       
axios.defaults.baseURL = 'http://39.108.174.244:9090/';
let loading;
axios.interceptors.request.use(function (config) {
  console.log('loading')
  console.log('route', router.match(location))
  loading = Loading.service({ fullscreen: true, text: '疯狂加载中' });
  //console.log(config.headers);
  if (localStorage.getItem('token') != null && router.match(location).hash !== '#/login'){
    config.headers['Authorization']= `Bearer ${localStorage.getItem('token')}`;//添加请求头
    console.log('Authorization');
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  console.log(error);
  loading.close();
  return Promise.reject(error);
});

// 添加响应拦截器 ，请求结束后，关闭 加载组件
axios.interceptors.response.use(function (response) {
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
