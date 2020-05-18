<template>
    <div class="login" clearfix>
        <div class="login-wrap">
            <el-row type="flex" justify="center">
                <el-form ref="loginForm" :model="form" :rules="rules" status-icon label-width="80px">
                    <h3>登录</h3>
                    <hr>
                    <el-form-item prop="username" label="用户名">
                        <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon></el-input>
                    </el-form-item>
                    <el-form-item id="password" prop="password" label="密码">
                        <el-input v-model="form.password" show-password placeholder="请输入密码"></el-input>
                    </el-form-item>
<!--                    <router-link to="/">找回密码</router-link>-->
                    <router-link :to="'/register/Register'">没有账号？注册</router-link>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </div>

</template>

<script>
    // import axios from "axios";
    import api from '../../api'
    export default {
        name: "login",
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
                                console.log('success');
                                let token = response.data.message;
                                document.cookie = 'token=' + token;
                                console.log('token is ' + token);
                                // router.push({ path: '/hall' })
                            }
                        }).catch(error => {
                            console.log('this is error: ' + error.response)
                            if (error.response.data.message === 'user does not exist' || error.response.data.code === 404) {
                                this.$message.error('用户名不存在!')
                            } else if (error.response.data.message === 'password is incorrect' || error.response.data.code === 403) {
                                this.$message.error('密码不正确!')
                            } else {
                                console.log('problems...');
                            }
                        });
                    } else {
                        console.log('error submit');
                        // return false;
                    }

                    // submit
                    //         axios
                    //             .post("/login/", {
                    //                 name: this.form.username,
                    //                 password: this.form.password
                    //             })
                    //             .then(res => {
                    //                 console.log("输出response.data.status", res.data.status);
                    //                 if (res.data.status === 200) {
                    //                     this.$router.push({ path: "/personal" });
                    //                 } else {
                    //                     alert("您输入的用户名或密码错误！");
                    //                 }
                    //             });
                    //     } else {
                    //         console.log('error submit');
                    //         return false;
                    //     }
                    // });


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
