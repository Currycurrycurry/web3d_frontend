<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--:http-request="upLoad"-->

<template>
    <div id="information_table" :data="information_data" :rules="rules">
        <el-row>
            <el-col :span="24"><h3 class="grid-content hint">个人信息</h3></el-col>
            <hr>
        </el-row>

        <el-row>
            <el-col :span="4"><div class="grid-content hint">用户名</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" >{{information_data.username}}</div>
            </el-col>

            <el-col :span="4"><div class="grid-content hint">地区</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{information_data.region}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-select v-model="information_data.region" placeholder="请选择所处区域">
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
                    <el-input v-model="information_data.originPassword" show-password placeholder="原密码"></el-input>
                    <el-input v-model="information_data.newPassword" show-password placeholder="新密码"></el-input>
<!--                    <el-button type="primary" icon @click="savePassword()">保存</el-button>-->
                </div>
            </el-col>
            <el-col :span="4"><div class="grid-content hint">性别</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{information_data.gender}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-select v-model="information_data.gender" placeholder="请选择性别">
                        <el-option label="男" value="male"></el-option>
                        <el-option label="女" value="female"></el-option>
                    </el-select>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content hint">全名</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{information_data.fullName}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-input v-model="information_data.fullName" placeholder="请输入全名"></el-input>
<!--                    <el-button type="primary" icon @click="saveFullname()">保存</el-button>-->
                </div>
            </el-col>
            <el-col :span="4"><div class="grid-content hint">邮箱</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{information_data.email}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-input v-model="information_data.email" placeholder="请输入邮箱"></el-input>
<!--                    <el-button type="primary" icon @click="saveEmail()">保存</el-button>-->
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content hint">年龄</div></el-col>
            <el-col :span="8">
                <div class="grid-content editable" v-show="!edit">{{information_data.age}}</div>
                <div class="grid-content editable" v-show="edit">
                    <el-input type="age" v-model.number="information_data.age" autocomplete="off"></el-input>
<!--                    <el-button type="primary" icon @click="savePassword()">保存</el-button>-->
                </div>
            </el-col>
            <el-col :span="4"><div class="grid-content hint">上传头像</div></el-col>
            <el-col :span="8"><div class="grid-content editable"><el-upload
                    class="avatar-uploader"
                    :action="upload"

                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload></div></el-col>
        </el-row>
        <el-row>
        <el-button v-show="edit" type="primary" icon @click="doRegister()">保存修改</el-button>
            <el-button v-show="!edit" type="primary" icon @click="modify()">编辑信息</el-button>
        </el-row>
    </div>




</template>

<script>
    // 上传头像 增删改查个人信息(下午再写。。)
    // 用户名设置为不可修改
    // 性别 真实姓名
    // import axios from "axios";
    import api from '../../api'
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
                    username: 'huangjiani',
                    region: '上海',
                    password: '*****',
                    gender: '女',
                    fullName: '黄佳妮',
                    email: '17302010063@fudan.edu.cn',
                    age: '21',
                    originPassword: '',
                    newPassword: '',

                },
                edit: false,
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
                }
            };
        },
        methods: {
            // upLoad(file) {
            //     const formData = new FormData();
            //     formData.append('file', file.file);
            //     console.log(file);
            //     // this.$http.uploadHttp('/', formData).then((res) => {
            //     //     console.log(res);
            //     //     console.log('上传成功');
            //     //     if (res.data.code === 0) {
            //     //         this.successUrl = res.data.response; // 请求之后将返回的URL给修改的接口在进行一次修改请求
            //     //         this.headUrl = res.data.response; // 请求成功之后赋给头像的URL
            //     //         this.$message('头像上传成功');
            //     //         this.$store.dispatch('person/setAvatar', this.successUrl);
            //     //         const obj = {
            //     //             headUrl: this.successUrl
            //     //         };
            //     //         this.edit(obj);
            //     //         // this.getAccount();
            //     //     } else {
            //     //         this.$message('头像上传失败');
            //     //     }
            //     // });
            // },
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
                console.log("modify the user info...")
                api.modify({
                    originPassword: this.originPassword,
                    newPassword: this.newPassword,
                    fullName: this.fullName,
                    age: this.age,
                    region: this.region,
                    gender: this.gender,
                    email: this.email,
                }).then(response => {
                    if (response.status === 200) {
                        this.edit = false;
                        this.$message.success("modify successfully");
                    }
                }).catch(error => {
                    // TODO
                    if (error.response.data.code === '') {
                        this.$message.error("");
                    }

                });
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }

    el-row {
        margin-top: 50px;
        margin-bottom: 20px;
        /*&:last-child {*/
        /*     margin-bottom: 0;*/
        /* }*/
    }

    el-col {
        border-radius: 4px;
    }

    h3 {
        color: #0babeab8;
        font-size: 24px;
    }
    hr {
        background-color: #444;
        margin: 30px auto;
    }
    /*.bg-purple-dark {*/
    /*    background: #99a9bf;*/
    /*}*/
    .hint {
        padding: 10px;
    }
    .editable {
        padding: 10px;

    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }
    #information_table {

    }
</style>