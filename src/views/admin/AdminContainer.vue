<template>
    <el-tabs @tab-click="handleClick" type="card" v-model="activeName">
        <el-tab-pane label="玩家进度统计" name="userProgress">玩家进度统计</el-tab-pane>
        <el-tab-pane label="游戏次数统计" name="gameNum">游戏次数统计</el-tab-pane>
        <el-tab-pane label="玩家信息分析" name="userInfos">玩家信息分析</el-tab-pane>
    </el-tabs>
</template>

<script>
    export default {
        name: "AdminContainer",
        data() {
            return {
                activeName: 'userProgress',
            };
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
                // TODO 增加到三个页面的路由
            }
        }
    }
</script>

<style scoped>

</style>