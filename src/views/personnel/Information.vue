<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--:http-request="upLoad"-->
<template>
    <div id="information_table" :data="information_data" :rules="rules">
        <el-row>
            <el-col :span="24"><p class="grid-content hint" style="margin-bottom: 5px; padding-bottom: 0px;">个人信息</p><hr></el-col>
        </el-row>

        <el-row>
            <el-col :span="4" ><div class="grid-content hint" >用户名</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" >{{username}}</div>
            </el-col>

            <el-col :span="4"><div class="grid-content hint">地区</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{region}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-select class='input_len' placeholder="请选择所处区域" v-model="information_data.Region">
                        <el-option label="上海" value="shanghai"></el-option>
                        <el-option label="北京" value="beijing"></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content hint">密码</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{information_data.password}}</div>
                <div class="grid-content editable" v-show="edit">
                    <div>
                    <el-input class='input_len' v-model="information_data.originalPassword" show-password placeholder="原密码"></el-input>
                    <el-input class='input_len' v-model="information_data.newPassword" show-password placeholder="新密码"></el-input>
                    </div>
                </div>
            </el-col>
            <el-col :span="4"><div class="grid-content hint">性别</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{gender}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-select class='input_len' placeholder="请选择性别" v-model="information_data.Gender">
                        <el-option label="男" value="male"></el-option>
                        <el-option label="女" value="female"></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content hint">全名</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{fullName}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-input class='input_len' placeholder="请输入全名" v-model="information_data.FullName"></el-input>
                </div>
            </el-col>
            <el-col :span="4"><div class="grid-content hint">邮箱</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{email}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-input class="input_len" placeholder="请输入邮箱" v-model="information_data.Email"></el-input>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4">
                <div class="grid-content hint">年龄</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{age}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-input autocomplete="off" class='input_len' type="age"
                              v-model.number="information_data.Age"></el-input>
                </div>
            </el-col>

            <el-col :span="4">
                <div class="grid-content hint">形象选择</div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{model_name[parseInt(model)]}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-select class='input_len' placeholder="请选择细胞" v-model="information_data.Model">
                        <el-option label="B细胞" value="0"></el-option>
                        <el-option label="血小板" value="1"></el-option>
                        <el-option label="T细胞" value="2"></el-option>
                        <el-option label="神经细胞" value="3"></el-option>
                        <el-option label="红血球" value="4"></el-option>
                        <el-option label="抗体" value="5"></el-option>
                    </el-select>
                </div>
            </el-col>
            <!--            <el-col :span="4"><div class="grid-content hint">上传头像</div></el-col>-->
            <!--            <el-col :span="8"><div class="grid-content editable"><el-upload-->
            <!--                    class="avatar-uploader"-->
            <!--                    :action="upload"-->

            <!--                    :show-file-list="false"-->
            <!--                    :on-success="handleAvatarSuccess"-->
            <!--                    :before-upload="beforeAvatarUpload">-->
            <!--                <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
            <!--                <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
            <!--            </el-upload></div></el-col>-->
        </el-row>
        <el-row>
        <el-button v-show="edit" type="primary" icon @click="modify()">保存修改</el-button>
            <el-button v-show="!edit" type="primary" icon @click="startEdit()">编辑信息</el-button>
        </el-row>
    </div>
</template>

<script>
    // import axios from "axios";
    import api from '../../api'
    import {mapGetters} from 'vuex'
    import store from '../../store/store'

    export default {
        name: "Information",
        data() {

            var checkFullName = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空！'));
                }
                setTimeout(() => {
                    if (value.length < 5) {
                        callback(new Error('用户名长度大于5！'));
                    } else {
                        callback();
                    }
                }, 500);
            };
            var checkNewPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空！'));
                } else {
                    if (value.length <= 5) {
                        callback(new Error('密码长度大于5！'));
                    } else {
                        callback();
                    }
                }
            };

            var checkEmail = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('邮箱不能为空！'));
                } else {
                    var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    if (!reg.test(this.user.email)) {
                        return callback(new Error('请输入有效的邮箱！'));
                    } else {
                        callback();
                    }
                }
            };
            return {

                upload:'/',
                imageUrl: '',
                information_data: {
                    Region: '上海',
                    password: '*****',
                    Gender: '女',
                    FullName: '',
                    Email: '',
                    Age: '',
                    originalPassword: '',
                    newPassword: '',
                    Model: '',
                },

                model_name : [
                    'B细胞',
                    '血小板',
                    'T细胞',
                    '神经细胞',
                    '红血球',
                    '抗体',
                ],
                edit: true,
                rules: {
                    age:[
                        {required: true, message: '年龄不能为空'},
                        {type: 'number', message: '年龄必须为数字值'}
                    ],
                    newPassword:[
                        {validator: checkNewPassword, trigger: 'blur'}
                    ],
                    email:[
                        {validator: checkEmail, trigger: 'blur'}
                    ],
                    fullName:[
                        {validator: checkFullName, trigger: 'blur'}
                    ]
                },

            };
        },
        computed: {
            ...mapGetters([
                'username',
                'email',
                'region',
                'gender',
                'fullName',
                'age',
                'model'
            ])

        },
        methods: {
            upLoad(file) {
                const formData = new FormData();
                formData.append('file', file.file);
                console.log(file);
                // this.$http.uploadHttp('/', formData).then((res) => {
                //     console.log(res);
                //     console.log('上传成功');
                //     if (res.data.code === 0) {
                //         this.successUrl = res.data.response; // 请求之后将返回的URL给修改的接口在进行一次修改请求
                //         this.headUrl = res.data.response; // 请求成功之后赋给头像的URL
                //         this.$message('头像上传成功');
                //         this.$store.dispatch('person/setAvatar', this.successUrl);
                //         const obj = {
                //             headUrl: this.successUrl
                //         };
                //         this.edit(obj);
                //         // this.getAccount();
                //     } else {
                //         this.$message('头像上传失败');
                //     }
                // });
            },
            handleAvatarSuccess(res, file) {
                console.log('enter');
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log((this.imageUrl));
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg';
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!');
                }
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }
                return isJPG && isLt2M;
            },
            modify() {
                console.log("modify the user info...");
                let model_id = this.information_data.Model?this.information_data.Model:-1;
                api.modify({
                    username: this.username,
                    originalPassword: this.information_data.originalPassword,
                    newPassword: this.information_data.newPassword,
                    fullName: this.information_data.FullName,
                    age: this.information_data.Age,
                    region: this.information_data.Region,
                    gender: this.information_data.Gender,
                    email: this.information_data.Email,
                    modelId: model_id
                }).then(response => {
                    console.log('modifying...')
                    if (response.status === 200) {
                        if (response.data.code === 200) {
                            let user = response.data.content;
                            console.log('modify info ok');
                            this.$message.success("modify successfully");
                            store.dispatch('modifyModel', user['modelId']);
                            store.dispatch('modifyAge', user['age']);
                            store.dispatch('modifyEmail', user['email']);
                            store.dispatch('modifyFullname', user['fullname']);
                            store.dispatch('modifyGender', user['gender'])
                            store.dispatch('modifyRegion', user['region'])
                            console.log(user['modelId']);
                            console.log('after modifying...' + store.getters);
                            console.log(store.getters.model);
                            console.log(store.getters);
                        } else if (response.data.code === 403) {
                            if (response.data.message === 'password is incorrect') {
                                this.$message.error('密码输入错误!')
                            }
                        } else if (response.data.code === 404) {
                            this.$message.error('用户不存在！')
                        } else {
                            this.$message.error('修改失败！')
                        }

                    }
                }).catch(error => {
                    this.$message.error("error");
                    if (error.response.data.code === '') {
                        this.$message.error("");
                    }
                });
                this.edit = false;
            },
            startEdit() {
                console.log("edit..");
                this.edit = true;
                console.log(this.model_name);
                console.log(this.model_name[parseInt(store.getters.model)])
                console.log(store.getters)
            }


        }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 78px;
        height: 78px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 78px;
        height: 78px;
        display: block;
    }

    .input_len {
        width:200px;
        padding:5px;
    }

    el-row {
        margin-top: 20px;
        margin-bottom: 20px;
        /*&:last-child {*/
        /*     margin-bottom: 0;*/
        /* }*/
    }

    el-col {
        border-radius: 4px;
    }

    p {
        color: #0babeab8;
        font-size: 24px;
    }
    hr {
        background-color: #444;
        margin-top: 10px;
        margin-bottom: 30px;
    }
    /*.bg-purple-dark {*/
    /*    background: #99a9bf;*/
    /*}*/
    .hint {
        padding: 10px;
        margin: 20px auto;
    }
    .editable {
        padding: 10px;
        margin: 20px auto;

    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        /*text-align: center;*/
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    #information_table {

    }
</style>