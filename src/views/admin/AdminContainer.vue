<template>
    <div>
        <el-tabs @tab-click="handleClick" type="card" v-model="activeName">
            <el-tab-pane index="/userProgress" label="玩家进度统计" name="userProgress">所有玩家进度盲排</el-tab-pane>
            <el-tab-pane index="/gameNum" label="游戏次数统计" name="gameNum">游戏次数统计</el-tab-pane>
            <el-tab-pane index="/userInfos" label="玩家信息分析" name="userInfos">玩家信息分析</el-tab-pane>
        </el-tabs>

        <UserProgress v-if="isUserProgress">
        </UserProgress>

        <GameNum v-if="isGameNum">
        </GameNum>

        <UserInfos v-if="isUserInfos">
        </UserInfos>

    </div>
</template>

<script>
    import UserProgress from "./UserProgress";
    import GameNum from "./GameNum";
    import UserInfos from "./UserInfos";

    export default {
        name: "AdminContainer",
        components: {
            UserProgress,
            GameNum,
            UserInfos,
        },
        data() {
            return {
                activeName: 'userProgress',
                isUserProgress: false,
                isGameNum: false,
                isUserInfos: false,
            };
        },
        methods: {
            handleClick(tab) {
                console.log(tab.index);
                switch (tab.index) {
                    case "0": {
                        this.isUserProgress = true;
                        this.isGameNum = false;
                        this.isUserInfos = false;
                    }
                        break;
                    case "1": {
                        this.isUserProgress = false;
                        this.isGameNum = true;
                        this.isUserInfos = false;
                    }
                        break;
                    case "2": {
                        this.isUserProgress = false;
                        this.isGameNum = false;
                        this.isUserInfos = true;
                    }
                        break;
                }
                console.log(this.isUserProgress);
                console.log(this.isGameNum);
                console.log(this.isUserInfos);

                // TODO 增加到三个页面的路由


            }
        }
    }
</script>

<style scoped>

</style>