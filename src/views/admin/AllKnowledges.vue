<template>
    <div>
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
            <el-table-column
                    fixed="right"
                    label="操作"
                    width="100">
                <template slot-scope="scope">
                    <el-button @click="startModify(scope.row['id'])" type="text" size="small">修改</el-button>
                    <el-button @click="deleteKnowledge(scope.row['id'])" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog title="修改知识点" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="知识点id" :label-width="formLabelWidth">
                    <el-input v-model="form.id" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="知识点详情" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="form.content" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="modifyKnowledge(form.id)">修 改</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from '../../api'
    export default {
        name: "AllKnowledges",
        data() {
            return {
                knowledgeList: [],
                tableData: [
                    // {
                    //     id: '12987122',
                    //     type: '选择题', // 选择题/细胞信息/知识点
                    //     desc: '1+1=2', //知识点内容
                    // },
                ],
                form: {
                    id: '',
                    content: '',
                },
                dialogFormVisible: false,
            }
        },
        mounted() {
            this.getAllKnowledges()
        },
        methods: {
            getAllKnowledges() {
                api.getAllKnowledges().then(response => {
                    let data = response.data.content;
                    let total = data.length;
                    for (let i = 0;i < total; i ++) {
                        this.tableData.push({
                            id: data[i]['id'],
                            type: '高中生物',
                            desc: data[i]['content']
                        })
                    }
                }).catch(err => {
                    console.log(err.response);
                });
            },
            startModify(row_id) {
                console.log(row_id)
                this.dialogFormVisible = true
                this.form.id = row_id
            },
            modifyKnowledge(row_id) {
                console.log(row_id)
                api.modifyKnowledge({id: this.form.id, content: this.form.content}).then(response => {
                    if (response.status === 200) {
                        if (response.data.code === 200) {
                            this.$message.success("修改成功！")
                        }
                    }else {
                        console.log('error')
                    }

                })
                this.dialogFormVisible = false
            },
            deleteKnowledge(row_id) {
                api.deleteKnowledge({id: row_id}).then(response => {
                    if (response.status === 200) {
                        if (response.data.code === 200) {
                            this.$message.success("删除成功！")
                        }
                    }else {
                        console.log('error')
                    }
                })
            }
        }
    }

</script>

<style scoped>

</style>