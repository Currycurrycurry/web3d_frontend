<template>
	<div class="login clearfix">
		<div class="login-wrap">
			<el-row type="flex" justify="center">
				<el-form ref="registerForm" :model="user" :rules="rules" status-icon label-width="80px">
					<h3>注册</h3>
						<router-link to="/login">已有账号？登陆</router-link>
					<hr>
					<el-form-item prop="username" label="用户名">
						<el-input v-model="user.username" placeholder="请输入用户名"></el-input>
					</el-form-item>
					<el-form-item prop="email" label="邮箱">
						<el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
					</el-form-item>
					<el-form-item prop="password" label="设置密码">
						<el-input v-model="user.password" show-password placeholder="请输入密码"></el-input>
					</el-form-item>
					<el-form-item label="角色" prop="model">
						<el-select placeholder="角色" v-model="user.modelId">
							<el-option label="红细胞" value="0"></el-option>
							<el-option label="普通细胞" value="1"></el-option>
							<el-option label="神经元细胞" value="2"></el-option>
							<el-option label="karamendos细胞" value="3"></el-option>
						</el-select>
					</el-form-item>

					<el-form-item>
						<el-button type="primary" icon @click="doRegister()">注册账号</el-button>
					</el-form-item>
				</el-form>
			</el-row>
		</div>
	</div>
</template>

<script>
	import api from '../../api';
	import store from "../../store/store";
	import router from "../../router";

	export default {
		name: "Register",
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
				}, 500);
			};
			var checkPassword = (rule, value, callback) => {
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
				user: {
					username: "",
					email: "",
					password: "",
					modelId: "",
				},
				rules: {
					username:[
						{validator: checkUsername, trigger: 'blur'}
					],
					password:[
						{validator: checkPassword, trigger: 'blur'}
					],
					email:[
						{validator: checkEmail, trigger: 'blur'}
					]
				}
			};
		},
		created() {
			// console.log($);
			// console.log("1111");
		},
		methods: {
			doRegister() {
				console.log('user is ' + this.user)
				this.$refs.registerForm.validate((valid) => {
					console.log('user is ' + this.user)
					console.log('user is ' + JSON.stringify(this.user));
					if (valid) {
						api.register(this.user).then(response => {
							console.log("register");
							console.log(response)
							if (response.status === 200) {
								let code = response.data.code;
								let msg = response.data.message;
								if (code === 200) {
									console.log('success');
									this.$message.success("注册成功");
									let token = response.data.message;
									document.cookie = 'token=' + token;
									console.log('token is ' + token);
									store.dispatch('setUserInfo')
									router.push({path: '/hall'})
								} else if (code === 400) {
									if (msg === "user has exist") {
										this.$message.error("用户名已存在");
									} else if (msg === "username should be filled") {
										this.$message.error("用户名为必填项");
									} else if (msg === "password should be filled") {
										this.$message.error("密码为必填项");
									} else if (msg === "invalid email") {
										this.$message.error("邮箱参数非法");
									} else {
										this.$message.error("参数异常");
									}
								}
							}
						}).catch(error => {
							console.log('this is error: ' + error.response);
							if (error.message === 'user has exist') {
								this.$message.error("用户名已存在");
							} else if (error.message === "username should be filled") {
								this.$message.error("用户名为必填项");
							} else if (error.message === "password should be filled") {
								this.$message.error("密码为必填项");
							}
							console.log(error.message)
							this.$message.error("注册失败");
						})
					} else {
						console.log('error register');
						this.$message.error("非法参数");
						return false
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
		height: 850px;
		/*background: url("../assets/images/bg1.png") no-repeat;*/
		background-size: cover;
		overflow: hidden;
	}
	.login-wrap {
		/*background: url("../assets/images/login_bg.png") no-repeat;*/
		background-size: cover;
		width: 400px;
		height: 450px;
		margin: 215px auto;
		overflow: hidden;
		padding-top: 10px;
		line-height: 20px;
	}
	.little_hint {
		float: right;
	}

	h3 {
		color: #0babeab8;
		font-size: 24px;
	}
	hr {
		background-color: #444;
		margin: 20px auto;
	}

	/*.el-button {*/
	/*	width: 80%;*/
	/*	margin-left: -50px;*/
	/*}*/
</style>