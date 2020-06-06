<template>
    <el-table
            :data="tableData"
            style="width: 100%">
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                    <el-form-item label="知识点类别">
                        <span>{{ props.row.type }}</span>
                    </el-form-item>
                    <el-form-item label="知识点 ID">
                        <span>{{ props.row.id }}</span>
                    </el-form-item>
                    <el-form-item label="详情">
                        <span>{{ props.row.desc }}</span>
                    </el-form-item>
                </el-form>
            </template>
        </el-table-column>
        <el-table-column
                label="知识点 ID"
                prop="id">
        </el-table-column>
        <el-table-column
                label="知识点类别"
                prop="type">
        </el-table-column>
        <el-table-column
                label="详情"
                prop="desc">
        </el-table-column>
    </el-table>
</template>

<script>
    import api from '../../api'
    import store from '../../store/store'

    export default {
        name: "KnowledgeList",
        data() {
            return {
                knowledgeList: [],
                tableData: [
                    // {
                    //     id: '12987122',
                    //     type: '选择题', // 选择题/细胞信息/知识点
                    //     desc: '1+1=2', //知识点内容
                    // },
                ]
            }
        },
        mounted() {
            let id =  store.getters.user_id;
            this.getKnowledgeList(id)
        },
        methods: {
            getKnowledgeList(id) {
                api.getKnowlegeList({userId: id}).then(response => {
                    let data = response.data.content
                    let len = response.data.content.length;

                    for (var i = 0;i < len; i++) {
                        console.log(data[i])
                        console.log(data[i])
                        this.tableData.push({
                            id: i,
                            type: '高中生物',
                            desc: data[i]['content']
                        })
                    }
                }).catch(err => {
                    console.log(err.response);
                });
            }
        }

    }
</script>

<style scoped>
    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>