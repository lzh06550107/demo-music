import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import axios from './api/config'

import 'common/stylus/index.styl'

fastclick.attach(document.body)

Vue.prototype.$axios = axios

Vue.use(VueLazyLoad, {
  loading: require('common/image/loading.svg'), // 图片懒加载
  error: require('common/image/diaomao.jpg')
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
})
