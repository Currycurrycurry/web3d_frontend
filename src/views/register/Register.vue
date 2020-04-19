<template>
	<div class="login clearfix">
		<div class="login-wrap">
			<el-row type="flex" justify="center">
				<el-form ref="registerForm" :model="user" :rules="rules" status-icon label-width="80px">
					<h3>注册</h3>
<!--					<el-row class="little_hint">-->
						<router-link to="/login">已有账号？登陆</router-link>
<!--					</el-row>-->
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
					<el-form-item prop="authority" label="角色">
						<el-select v-model="user.authority" placeholder="角色">
							<el-option label="老师" value="teacher"></el-option>
							<el-option label="学生" value="student"></el-option>
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
					authority: "student",
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
				this.$refs.registerForm.validate((valid) => {
					if (valid) {
						api.register(this.user).then(response => {
							console.log("register");
							if (response.status === 200) {
								console.log('success');
							}
						}).catch(error => {
							console.log('this is error: ' + error.response);
						})
					} else {
						console.log('error register');
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