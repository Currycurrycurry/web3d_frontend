<template>
    <div>
<!--        <span>所有玩家进度盲排</span>-->
        <el-button @click="showDetailedUserInfos()" type="text">玩家总人数:{{total}}</el-button>
        <el-table
                v-loading="loading"
                :data="tableData"
                border
                height="500"
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
                    label="用户ID"
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
                // records: [],
                total: 0,
                tableData: [
                    // {
                    // rank: '1',
                    // name: 'Curry',
                    // userId: '1',
                    // knowledgeNum: 100,
                    // gameNum: 5,
                    // },
                ],
                loading : false
            }
        },
        mounted() {
            this.getUserProgresses()
            this.loading = false
        },
        methods: {
            getUserProgresses() {
                this.loading = true
                api.getUserProgresses().then(response => {
                    let data = response.data.content;
                    this.total = data.length;
                    for(let i = 0;i < this.total; i++) {
                        this.tableData.push({
                            rank:i+1,
                            name: data[i]['username'],
                            userId: data[i]['id'],
                            knowledgeNum: data[i]['knowledgeNum'],
                            gameNum: data[i]['gameNum']
                        })
                    }

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