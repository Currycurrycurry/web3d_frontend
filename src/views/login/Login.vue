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
                    <router-link to="/">找回密码</router-link>
                    <router-link to="/register">注册账号</router-link>
                    <el-form-item>
                        <el-button type="primary" icon="el-icon-upload" @click="doLogin()">登 录</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </div>
    </div>

<!--    <div class="login-wrap">-->
<!--        <el-form ref="form" :model="form" label-width="80px" class="login-container">-->
<!--            <h1 class="title">用户登录</h1>-->
<!--            <el-form-item>-->
<!--&lt;!&ndash;                <i class='el-icon-user'></i>&ndash;&gt;-->
<!--                <el-input type="text" v-model="form.username" placeholder="用户名" name="username" v-validate="'required|min:3|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" autocomplete="off"></el-input>-->
<!--                <span v-show="errors.has('username')" class="text-style" v-cloak> {{ errors.first('username') }} </span>-->
<!--            </el-form-item>-->
<!--            <el-form-item>-->
<!--&lt;!&ndash;                <i class='el-icon-lock'></i>&ndash;&gt;-->
<!--                <el-input type="password" placeholder="密码" v-model="form.password" autocomplete="off"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-row>-->
<!--                <el-link type="primary">忘记密码</el-link>-->
<!--                <el-link type="primary" @click="doRegister()">用户注册</el-link>-->
<!--            </el-row>-->
<!--            <el-form-item>-->
<!--                <el-button type="primary" @click="doSubmit()">提交</el-button>-->
<!--            </el-form-item>-->

<!--        </el-form>-->
<!--    </div>-->
</template>

<script>
    import axios from "axios";
    export default {
        name: "login",
        data() {
            return {
                form: {
                    username: "",
                    password: ""
                }
            };
        },
        created() {},
        methods: {
            doLogin() {
                if (!this.user.username) {
                    this.$message.error("请输入用户名！");
                    return;
                } else if (!this.user.password) {
                    this.$message.error("请输入密码！");
                    return;
                } else {
                    //校验用户名和密码是否正确;
                    // this.$router.push({ path: "/personal" });
                    axios
                        .post("/login/", {
                            name: this.user.username,
                            password: this.user.password
                        })
                        .then(res => {
                            // console.log("输出response.data.status", res.data.status);
                            if (res.data.status === 200) {
                                this.$router.push({ path: "/personal" });
                            } else {
                                alert("您输入的用户名或密码错误！");
                            }
                        });
                }
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .login {
        width: 100%;
        height: 740px;
        /*background: url("static/images/background/") no-repeat;*/
        background-size: cover;
        overflow: hidden;
    }
    .login-wrap {
        /*background: url("static/images/background/") no-repeat;*/
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
        margin-left: -50px;
    }
</style>
