<template>
    <div class="login-wrap">
        <el-form ref="form" :model="form" :rules="rules" label-width="80px" class="login-container">
            <h1 class="title">用户登录</h1>
            <el-form-item label="用户名">
                <i class='el-icon-user'></i>
                <el-input type="text" v-model="form.username" name="username" v-validate="'required|min:3|alpha'" :class="{'input': true, 'is-danger': errors.has('name') }" autocomplete="off"></el-input>
                <span v-show="errors.has('username')" class="text-style" v-cloak> {{ errors.first('username') }} </span>
            </el-form-item>
            <el-form-item label="密码">
                <i class='el-icon-lock'></i>
                <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="doSubmit()">提交</el-button>
            </el-form-item>
            <el-row>
                <el-link type="primary">忘记密码</el-link>
                <el-link type="primary" @click="doRegister()">用户注册</el-link>
            </el-row>
        </el-form>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data () {
        return {
            form: {
                username: '',
                password: '',
                withCredentials: true
            },
            // rule: {
            //     username: [
            //         { required: }
            //     ]
            // }
        }
    }
}
</script>