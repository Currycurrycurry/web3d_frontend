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

// const whiteList = ['/pages/Login', '/pages/Register', '/pages/Page404', '/pages/Page500']
router.beforeEach((to, from, next) => {
  // console.log('enter into the router...')
  // console.log('to path is ' + to.path)
  // console.log('from path is ' + from.path)
  // console.log('getter is ' + JSON.stringify(store.getters))


  if (Cookies.get('token') !== '') {
    console.log('token is not none')
    next()
  } else {
    next('/pages/Login')
  }

  // if (store.getters.user_id !== '-1') { // 判断是否有token
  //   console.log('hello' + store.getters.user_id);
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     console.log('whiteList index is ' + whiteList.indexOf(to.path))
  //     next('hall')
  //   }
  //   next()
  //
  // } else {
  //   console.log('hello!')
  //   if (whiteList.indexOf(to.path) !== -1) {
  //     console.log('whiteList index is ' + whiteList.indexOf(to.path))
  //     next()
  //   } else {
  //     if (Cookies.get('token') !== '') {
  //       console.log('token is not none')
  //       next('hall')
  //     } else {
  //       next('/pages/Login')
  //     }
  //
  //
  //
  //   }
  // }
})


// axios.interceptors.request.use(
//     config => {
//       console.log("axios interceptor works...")
//       if (store.getters.token) {
//         config.headers.jwt `jwt_token ${store.getters.token}`;
//       }
//       return config;
//     },
//     err => {
//       return Promise.reject(err);
//     });

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
              path: '/pages/login',
              query: {redirect: router.currentRoute.fullPath}
            });
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

// new Vue({
//   el:'#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
// })
