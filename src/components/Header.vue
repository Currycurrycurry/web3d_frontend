<template>
    <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/">游戏中心</a></el-breadcrumb-item>
<!--        <el-breadcrumb-item>活动列表</el-breadcrumb-item>-->
<!--        <el-breadcrumb-item>活动详情</el-breadcrumb-item>-->
    </el-breadcrumb>
</template>

<script>
    export default {
        name: "Header",

    }
</script>

<style scoped>

</style>