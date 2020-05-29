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
        <el-menu-item index="/admin" v-show="isadmin">管理后台</el-menu-item>
    </el-menu>

</template>

<script>
    import api from '../api'

    export default {
        name: "NavMenu",
        data() {
            return {
                activeIndex: '/hall',
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
            isadmin() {
                let is_admin = false;
                api.getIsAdmin().then(response => {
                    is_admin = response.data.content;
                }).catch(err => {
                    console.log(err.response);
                })
                return is_admin;
            }
        }
    }
</script>

<style scoped>

</style>