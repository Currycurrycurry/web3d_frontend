<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--:http-request="upLoad"-->
<template>
    <div id="information_table" :data="information_data">
        <el-row>
            <el-col :span="24"><h3 class="grid-content hint">个人信息</h3></el-col>
            <hr>
        </el-row>

        <el-row>
            <el-col :span="4"><div class="grid-content hint">用户名</div></el-col>
            <el-col :span="8"><div class="grid-content editable">{{information_data.username}}</div></el-col>
            <el-col :span="4"><div class="grid-content hint">地区</div></el-col>
            <el-col :span="8"><div class="grid-content editable">{{information_data.region}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content hint">密码</div></el-col>
            <el-col :span="8"><div class="grid-content editable">{{information_data.password}}</div></el-col>
            <el-col :span="4"><div class="grid-content hint">性别</div></el-col>
            <el-col :span="8"><div class="grid-content editable">{{information_data.gender}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content hint">全名</div></el-col>
            <el-col :span="8"><div class="grid-content editable">{{information_data.fullName}}</div></el-col>
            <el-col :span="4"><div class="grid-content hint">邮箱</div></el-col>
            <el-col :span="8"><div class="grid-content editable">{{information_data.email}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content hint">年龄</div></el-col>
            <el-col :span="8"><div class="grid-content editable">{{information_data.age}}</div></el-col>
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
        <el-button type="primary" icon @click="doRegister()">修改信息</el-button>
        </el-row>
    </div>




</template>

<script>
    // 上传头像 增删改查个人信息
    // 性别 真实姓名
    // import axios from "axios";
    export default {
        name: "Information",
        data() {
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
                    age: '21'
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