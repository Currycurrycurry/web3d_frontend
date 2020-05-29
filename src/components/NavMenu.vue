<template>
    <el-menu :default-active="activeIndex" @select="handleSelect" class="el-menu-demo" mode="horizontal" router>
        <el-menu-item index="/hall" route="/hall">游戏中心</el-menu-item>
        <!--        <el-submenu index="2">-->
        <!--            <template slot="title">聊天室（待定）</template>-->
        <!--            <el-menu-item index="2-1">选项1</el-menu-item>-->
        <!--            <el-menu-item index="2-2">选项2</el-menu-item>-->
        <!--            <el-menu-item index="2-3">选项3</el-menu-item>-->
        <!--            <el-submenu index="2-4">-->
        <!--                <template slot="title">个人中心</template>-->
        <!--                <el-menu-item index="2-4-1">选项1</el-menu-item>-->
        <!--                <el-menu-item index="2-4-2">选项2</el-menu-item>-->
        <!--                <el-menu-item index="2-4-3">选项3</el-menu-item>-->
        <!--            </el-submenu>-->
        <!--        </el-submenu>-->
        <!--        <el-menu-item index="/chatRoom">聊天室(待定)</el-menu-item>-->
        <el-menu-item>
            <el-submenu>
                <template slot="title">个人中心</template>
                <el-menu-item index="/information">基本信息</el-menu-item>
                <el-menu-item index="/records">历史战绩</el-menu-item>
                <el-menu-item index="/knowledgeList">知识清单</el-menu-item>
            </el-submenu>
        </el-menu-item>
        <el-menu-item index="/models">角色图鉴</el-menu-item>
    </el-menu>
    <!--    <div class="line"></div>-->
</template>

<script>
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
            }
        }
    }
</script>

<style scoped>

</style>