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
/* eslint-disable no-new */
let loading;
axios.interceptors.request.use(function (config) {
  console.log('loading')
  loading = Loading.service({ fullscreen: true, text: '疯狂加载中' });
  return config;
}, function (error) {
  // 对请求错误做些什么
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
