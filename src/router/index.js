import Vue from 'vue'
import Router from 'vue-router'

import Container from "../components/Container";
import Page404 from "../views/ErrorPages/404";
import Page500 from '../views/ErrorPages/500';
import Records from "../views/personnel/Records";
import Login from '../views/login/Login.vue'
import Register from "../views/register/Register";
import Information from "../views/personnel/Information";
import Models from "../views/Models";
import KnowledgeList from "../views/personnel/KnowledgeList";
import Hall from "../views/Hall"
import Chatting from "../views/Chatting";
import AdminContainer from "../views/admin/AdminContainer";
import UserProgress from "../views/admin/UserProgress";
import UserInfos from "../views/admin/UserInfos";
import GameNum from "../views/admin/GameNum";
import Room from "../views/Room"

Vue.use(Router)

export default new Router({
    mode: 'hash',
    linkActiveClass: 'open active',
    scrollBehavior: () => ({y: 0}),
    routes: [
        {
            path: '/',
            redirect: '/hall',
            name: 'Hall',
            component: Container,
            children: [
                {
                    path: 'models',
                    name: 'models',
                    component: Models
                },
                {
                    path: 'information',
                    name: 'Information',
                    component: Information,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'records',
                    name: 'Records',
                    component: Records
                },
                {
                    path: 'knowledgeList',
                    name: 'knowledgeList',
                    component: KnowledgeList
                },
                {
                    path: 'hall',
                    name: 'Hall',
                    component: Hall

                },
                {
                    path: 'chatRoom',
                    name: 'Chatting',
                    component: Chatting
                },
                {
                    path: 'admin',
                    name: 'Admin',
                    component: AdminContainer
                },
                {
                    path: 'userProgress',
                    name: 'UserProgress',
                    component: UserProgress
                },
                {
                    path: 'userInfos',
                    name: 'UserInfos',
                    component: UserInfos
                },
                {
                    path: 'gameNum',
                    name: 'GameNum',
                    component: GameNum
                },
                {
                    path: 'room',
                    name: 'Room',
                    component: Room
                }
            ]
        },
        {
            path: '/pages',
            redirect: '/pages/404',
            name: 'Pages',
            component: {
                render (c) { return c('router-view') }
            },
            children: [
                {
                    path: '404',
                    name: 'Page404',
                    component: Page404
                },
                {
                    path: '500',
                    name: 'Page500',
                    component: Page500
                },
                {
                    path: 'login',
                    name: 'Login',
                    component: Login
                },
                {
                    path: 'register',
                    name: 'Register',
                    component: Register
                }

            ]
        }
    ]
})