import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import '@/styles/index.scss'

// 引入 element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入 axios
import axios from 'axios'

//  引入 qs
import qs from 'qs'

// 引入vue-wechat-title
import VueWechatTitle from 'vue-wechat-title'

Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.prototype.qs = qs
axios.defaults.baseURL = '/api'// 后端开发环境地址
Vue.use(VueWechatTitle)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
