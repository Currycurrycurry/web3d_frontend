import Vue from 'vue'
import Router from 'vue-router'

// Test
import Login from '@/views/login/Login'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path:'/login',
            component: {
                render (c) { return c('router-view') }
            },
            children: [
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                }
            ]  
        }
    ]

})