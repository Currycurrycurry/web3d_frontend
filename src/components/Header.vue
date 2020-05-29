<template>
    <el-header style="float: right;padding: 20px 10px 10px 10px;">
        <el-dropdown>
            <i class="el-icon-setting" style=""></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click="logout()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
        <span>当前玩家：{{name}}</span>
        <!--        <i class="el-icon-setting" style=""></i>-->
        <!--        <span>当前游戏在线人数：3人</span>-->
    </el-header>

</template>

<script>
    // import api from '../api'
    import router from '../router'
    import store from '../store/store'

    export default {
        name: "Header",
        data() {
            return {
                name: store.getters.username
            }
        },
        methods: {
            logout() {
                console.log("log out...")
                router.push('/page/login');
                document.cookie = '';
            },
        }

    }
</script>

<style scoped>

</style>