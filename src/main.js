import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import App from './App.vue'
// import VueResource from 'vue-resource'
// 引入表单验证
import './utils/validate.js'
// import Login from './views/login/Login'
// import router from './router'

Vue.config.productionTip = false
Vue.use(ElementUI)
// Vue.use(VueResource) 不更新。使用axios全面代替。
new Vue({
  render: h => h(App),
}).$mount('#app')

