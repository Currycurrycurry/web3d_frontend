import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css' 
import App from './App.vue'
// import Login from './views/login/Login'
import router from './router'
import store from './store/store'
import axios from 'axios'

Vue.config.productionTip = false
Vue.use(ElementUI)

const whiteList = ['/login/Login', '/register/Register', '/ErrorPages/Page404', '/ErrorPages/Page500']
router.beforeEach((to, from, next) => {
  console.log('enter into the router...')
  console.log('getter is ' + JSON.stringify(store.getters))
  if (store.getters.user_id !== '-1') { // 判断是否有token
    console.log('hello' + store.getters.user_id);
    if (whiteList.indexOf(to.path) !== -1) {
      next('hall')
    }
    next()
    /*
     if (to.path === '/login') {
     next({ path: '/' })
     } else {
     if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
     store.dispatch('GetInfo').then(res => { // 拉取user_info
     const roles = res.data.role;
     store.dispatch('GenerateRoutes', { roles }).then(() => { // 生成可访问的路由表
     router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
     next(to.path); // hack方法 确保addRoutes已完成
     })
     }).catch(err => {
     console.log(err);
     })
     }
     }
     */
  } else {
    console.log('hello!')
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      store.dispatch('setUserInfo').then(() => {
        if (store.getters.user_id !== '-1') { // 在免登录白名单，直接进入
          console.log('here')
          next()
        } else {
          next('/login/Login')
        }
      }).catch(() => {
        next('/login/Login')
      })
    }
  }
})

axios.interceptors.request.use(
    config => {
      if (store.getters.token) {
        config.headers.Authorization = 'token ${store.getters.token}';
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
              path: '/Login/login',
              query: {redirect: router.currentRoute.fullPath}
            });
        }
      }
      return Promise.reject(error.response.data);
    }
);

Vue.prototype.$http = axios;


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
