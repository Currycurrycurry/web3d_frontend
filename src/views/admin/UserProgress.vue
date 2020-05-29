<template>
    <div>
<!--        <span>所有玩家进度盲排</span>-->
        <el-button @click="showDetailedUserInfos()" type="text">玩家总人数:{{total}}</el-button>
        <el-table
                :data="tableData"
                border
                height="250"
                style="width: 100%">
            <el-table-column
                    label="排名"
                    prop="rank"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="用户名"
                    prop="name"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="账号"
                    prop="userId"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="知识点解锁数"
                    prop="knowledgeNum"
                    width="180">
            </el-table-column>
            <el-table-column
                    label="游戏次数"
                    prop="gameNum"
                    width="180">
            </el-table-column>
        </el-table>
    </div>


</template>

<script>
    import api from '../../api'
    import router from '../../router'

    export default {
        name: "UserProgress",
        data() {
            return {
                records: [],
                total: 0,
                tableData: [
                    // {
                    // rank: '1',
                    // name: 'Curry',
                    // userId: '1',
                    // knowledgeNum: 100,
                    // gameNum: 5,
                    // },
                ]
            }
        },
        mounted() {
            this.getUserProgresses()
        },
        methods: {
            getUserProgresses() {
                api.getUserProgresses().then(response => {
                    this.records = response.data.content
                    this.tableData = this.records
                }).catch(error => {
                    console.log(error.response)
                })
            },
            showDetailedUserInfos() {
                router.push('') //TODO
            }
        }

    }
</script>

<style scoped>

</style>