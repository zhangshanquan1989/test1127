import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//导入全局样式
import './assets/css/global.css'
// 导入复制文本
import Clipboard from 'clipboard'; 



// 导入axios
import axios from 'axios'
// 配置请求的根路径
axios.defaults.baseURL = 'http://81.70.151.121:8080/jeecg-boot/'

// 挂在复制文本
Vue.prototype.Clipboard=Clipboard;

// 把axios包挂在到vue原型对象上
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
