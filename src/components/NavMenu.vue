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
<!--        <el-menu-item index="/chatRoom">聊天室</el-menu-item>-->
        <el-menu-item index="/admin" v-if="isadmin">管理后台</el-menu-item>
        <el-menu-item ><i class="el-icon-setting" @click="logout()"></i>{{username}}</el-menu-item>
    </el-menu>

</template>

<script>
    // import api from '../api'
    import store from "../store/store";
    import router from '../router'
    import Cookies from 'js-cookie'
    import {mapGetters} from 'vuex'

    export default {
        name: "NavMenu",
        data() {
            return {
                activeIndex: '/hall',
                name: store.getters.username,

            };
        },
        created() {
            this.getisadmin()
        },
        computed: {
            ...mapGetters([
                'isadmin',
                'user_id',
                'username'
            ])
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            getisadmin() {
                console.log('enter isadmin...')
                let id = store.getters.user_id;
                if (id === '-1') {
                    store.dispatch('setUserInfo').then(() => {
                        store.dispatch('setIsAdmin', this.user_id).then(() => {
                            console.log('set admin and userinfo  ok')
                        })
                    })
                } else {
                    store.dispatch('setIsAdmin', id).then( () => {
                        console.log('set admin ok')
                    })
                }

                // api.getIsAdmin({userId: id}).then(response => {
                //     this.is_admin = response.data.content;
                // }).catch(err => {
                //     console.log(err.response);
                // })
                // console.log("is admin :" + this.is_admin)
            },
            logout() {
                console.log(store.getters.user_id);
                store.dispatch('logout').then(()=>{
                    Cookies.set('token','');
                    Cookies.set('userID', '');
                    Cookies.set('roomID', '');
                    Cookies.set('')
                    console.log('cookie token is ' + Cookies.get('token'));
                    router.push('/pages/Login')
                })
            }
        }
    }
</script>

<style scoped>

</style>