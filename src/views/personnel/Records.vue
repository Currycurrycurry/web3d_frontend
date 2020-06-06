<template>
    <div>

        <el-table
                :data="recordsTable"
                stripe
                style="width: 100%">
            <el-table-column
                    prop="gameId"
                    label="游戏编号"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="状态"
                    width="180">
            </el-table-column>
            <el-table-column
                    prop="score"
                    label="分数">
            </el-table-column>
            <el-table-column
                    prop="players"
                    label="玩家列表">
            </el-table-column>
            <el-table-column
                    prop="time"
                    label="时间">
            </el-table-column>
        </el-table>

        <el-pagination
                layout="prev, pager, next"
                :hide-on-single-page=true
                :total="5">
        </el-pagination>

    </div>

</template>

<script>
    import api from '../../api'
    import store from '../../store/store'
    export default {
        name: "Records",
        data() {
            return {
                recordsTable: [
                    // {
                    //     gameId: '1',
                    //     status: '成功',
                    //     score: '12',
                    //     players: 'alice, bob, curry',
                    //     time: '2019-01-01 12:00'
                    // },
                    // {
                    //     gameId: '2',
                    //     status: '成功',
                    //     score: '12',
                    //     players: 'alice, bob, curry',
                    //     time: '2019-01-01 12:00'
                    //
                    // },
                    // {
                    //     gameId: '3',
                    //     status: '成功',
                    //     score: '12',
                    //     players: 'alice, bob, curry',
                    //     time: '2019-01-01 12:00'
                    // }

                ]

            }

        },
        mounted() {
            let id = store.getters.user_id;
            this.getRecords(id)
        },
        methods: {
            getRecords (id) {
                console.log(store.getters.user_id);
                api.getRecords({userId: id}).then(response => {
                    console.log(response.data.content);
                    let data = response.data.content;
                    for (let i = 0;i<data.length;i++) {
                        this.recordsTable.push({
                            gameId: i,
                            status: data[i]['status'],
                            score: data[i]['score'],
                            players: '', //TODO
                            time: data[i]['time']
                        })
                    }
                }).catch(err => {
                    console.log(err.response);
                })

            }

        }
    }
</script>

<style scoped>

</style>