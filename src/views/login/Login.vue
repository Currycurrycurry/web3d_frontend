<template>
    <div>
        <Top/>
        <div class="login" clearfix>
            <div class="login-wrap">
                <el-row justify="center" type="flex">
                    <el-form :model="form" :rules="rules" label-width="80px" ref="loginForm" status-icon>
                        <h3>登录</h3>
                        <hr>
                        <el-form-item label="用户名" prop="username">
                            <el-input placeholder="请输入用户名" prefix-icon v-model="form.username"></el-input>
                        </el-form-item>
                        <el-form-item id="password" label="密码" prop="password">
                            <el-input placeholder="请输入密码" show-password v-model="form.password"></el-input>
                        </el-form-item>
                        <!--                    <router-link to="/">找回密码</router-link>-->
                        <router-link :to="'/pages/Register'">没有账号？注册</router-link>
                        <el-form-item>
                            <el-button @click="doLogin()" icon="el-icon-upload" type="primary">登 录</el-button>
                        </el-form-item>
                    </el-form>
                </el-row>
            </div>
        </div>
    </div>


</template>

<script>
    // import axios from "axios";
    import api from '../../api'
    import router from '../../router'
    import store from '../../store/store'
    import Top from "../../components/Top";

    export default {
        name: "login",
        components: {Top},
        data() {
            var checkUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空！'));
                }
                setTimeout(() => {
                    if (value.length < 5) {
                        callback(new Error('用户名长度大于5！'));
                    } else {
                        callback();
                    }
                }, 1000);
            };
            var checkPassword = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('密码不能为空！'));
                } else {
                    // if (this.form.password !== '') {
                    //     this.$refs.loginForm.validateField('password');
                    // }
                    callback();
                }
            };
            return {
                form: {
                    username: "",
                    password: ""
                },
                rules: {
                    username:[
                        {validator: checkUsername, trigger: 'blur'}
                    ],
                    password:[
                        {validator: checkPassword, trigger: 'blur'}
                    ]
                }
            };
        },
        created() {},
        methods: {
            doLogin() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        api.login(this.form).then(response => {
                            console.log("logging in...")
                            if (response.status === 200) {
                                if (response.data.code === 200) {
                                    console.log('success');
                                    let token = response.data.message;
                                    document.cookie = 'token=' + token;
                                    console.log('token is ' + token);
                                    this.$message({
                                        message: '登陆成功',
                                        type: 'success'
                                    });
                                    store.dispatch('setUserInfo')
                                    router.push({path: '/hall'})
                                } else if (response.data.code === 404) {
                                    if (response.data.message === 'user does not exist') {
                                        this.$message.error('用户名不存在!')
                                    }
                                } else if (response.data.code === 403) {
                                    if (response.data.message === 'password is incorrect') {
                                        this.$message.error('密码不正确!')
                                    }
                                }

                            }
                        }).catch(error => {
                            console.log('this is error: ' + error.response)
                            console.log('problems...');
                            this.$message.error('内部错误')

                        });
                    } else {
                        console.log('error submit');
                        this.$message.error('提交失败')
                    }
                });
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login {
        width: 100%;
        height: 740px;
        /*background: url("public/images/background/") no-repeat;*/
        background-size: cover;
        overflow: hidden;
    }
    .login-wrap {
        /*background: url("public/images/background/") no-repeat;*/
        background-size: cover;
        width: 400px;
        height: 300px;
        margin: 215px auto;
        overflow: hidden;
        padding-top: 10px;
        line-height: 40px;
    }
    #password {
        margin-bottom: 5px;
    }
    h3 {
        color: #0babeab8;
        font-size: 24px;
    }
    hr {
        background-color: #444;
        margin: 20px auto;
    }
    a {
        text-decoration: none;
        color: #aaa;
        font-size: 15px;
    }
    a:hover {
        color: coral;
    }
    .el-button {
        width: 80%;
        margin-left: 5px;
        /*margin-top: 30px;*/
    }
</style>
