<template>
    <el-menu :default-active="activeIndex" @select="handleSelect" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/hall" route="/hall">游戏中心</el-menu-item>
        <el-menu-item>
            <el-submenu>
                <template slot="title">个人中心</template>
                <el-menu-item index="/information">基本信息</el-menu-item>
                <el-menu-item index="/records">历史战绩</el-menu-item>
                <el-menu-item index="/knowledgeList">知识清单</el-menu-item>
            </el-submenu>
        </el-menu-item>
        <el-menu-item index="/models">角色图鉴</el-menu-item>
        <el-menu-item index="/chatRoom">聊天室</el-menu-item>
        <el-menu-item index="/admin" v-if="is_admin">管理后台</el-menu-item>
        <el-menu-item ><i class="el-icon-setting" @click="logout()"></i>{{name}}</el-menu-item>
    </el-menu>

</template>

<script>
    import api from '../api'
    import store from "../store/store";
    import router from '../router'
    import Cookies from 'js-cookie'

    export default {
        name: "NavMenu",
        data() {
            return {
                activeIndex: '/hall',
                name: store.getters.username,
                is_admin: false
            };
        },
        mounted() {
            this.isadmin()
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            isadmin() {
                console.log('enter isadmin...')
                let id = store.getters.user_id;
                api.getIsAdmin({userId: id}).then(response => {
                    this.is_admin = response.data.content;
                }).catch(err => {
                    console.log(err.response);
                })
                console.log("is admin :" + this.is_admin)
            },
            logout() {
                console.log(store.getters.user_id);
                router.push('/pages/Login')
                Cookies.set('token','');
                console.log('cookie token is ' + Cookies.get('token'));
                this.$store.commit('LOGOUT_USER');

            }
        }
    }
</script>

<style scoped>

</style>