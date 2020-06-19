import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router'
import store from './store/store'
import axios from 'axios'
import Cookies from 'js-cookie'
// 引入echarts
import echarts from 'echarts'
import 'echarts/theme/azul'

Vue.config.productionTip = false
Vue.use(ElementUI)
const whiteList = ['/pages/Login', '/pages/Register', '/pages/Page404', '/pages/Page500']
router.beforeEach((to, from, next) => {

  console.log(whiteList)
  console.log('token is ' + Cookies.get('token'))
  console.log('user id is ' + store.getters.user_id);

  if (store.getters.user_id !== -1) {
    // 已登陆
    if (whiteList.indexOf(to.path) !== -1) {
      next('hall')
    }
    next()
  } else {
    // 未登陆
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      store.dispatch('setUserInfo').then(() => {
        console.log('enter...')
        console.log(store.getters.user_id)
        if (store.getters.user_id !== -1) {
          console.log('in')
          next()
        } else {
          next('/pages/Login')
        }
      }).catch(() => {
        next('/pages/Login')
      })

    }
  }

})

axios.interceptors.request.use(
    config => {
      console.log("axios interceptor works...")
      if (Cookies.get('token')) {
        config.headers.jwt_token = Cookies.get('token');
        console.log('config header is ' + config.headers);
      }
      return config;
    },
    err => {
      return Promise.reject(err);
    });

axios.interceptors.response.use(
    response => {
      return response;
    },
    error => {
      if (error.response) {
        console.log('axios:' + error.response.status);
        switch (error.response.status) {
          case 403:
            router.replace({
              path: '/pages/Login',
              query: {redirect: router.currentRoute.fullPath}
            });
            break;
          case 400:
            router.replace( {
              path: '/pages/Login',
              query: {redirect:  router.currentRoute.fullPath}
            });break;
        }
      }
      return Promise.reject(error.response.data);
    }
);

Vue.prototype.$http = axios;
Vue.prototype.$echarts = echarts;

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')

