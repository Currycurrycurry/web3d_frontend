import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import App from './App.vue'
// 引入表单验证
import './utils/validate.js'
// import Login from './views/login/Login'
// import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
}).$mount('#app')

