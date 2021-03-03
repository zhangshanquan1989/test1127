<template>
	<div class="login_container">
		<div class="background">
			<img src="../assets/登陆界面4.jpg" alt="">
		</div>
		<div class="welcome">
			<span>欢迎登陆天康系统</span>
		</div>
		<div class="login_box">
			<!-- 头像区域 -->
			<div class="acatar_box">
				<img src="../assets/天康系统1.png" alt="">
			</div>
			<!-- 登录表单区域 -->
			<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
				<!-- 用户名 -->
				<el-form-item prop="username">
					<el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
				</el-form-item>
				<!-- 密码 -->
				<el-form-item prop="password">
					<el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-goods"></el-input>
				</el-form-item>
<!-- 				<span>账号：zhangsan </span>
				<span>密码：zhangsan </span> -->
				<!-- 按钮 -->
				<el-form-item class="btns">

					<el-button plain type="info" @click="resetLoginForm">重置</el-button>
					<el-button type="primary" @click="login">登录</el-button>
				</el-form-item>
			</el-form>
		</div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 登录表单的数据绑定对象
				loginForm: {
					username: 'zhangsan',
					password: 'zhangsan'
				},
				//表单验证规则
				loginFormRules: {
					//验证用户名是否合法
					username: [{
							required: true,
							message: '请输入登录名称',
							trigger: 'blur'
						}
					],
					//验证密码是否合法
					password: [{
							required: true,
							message: '请输入登录密码',
							trigger: 'blur'
						}
					]
				}

			}
		},
		methods: {
			//点击重置按钮，重置登录表单
			resetLoginForm() {
				this.$refs.loginFormRef.resetFields();
			},
			// 点击登录按钮
			login() {
				this.$refs.loginFormRef.validate(async valid=>{
					if(!valid) return;
					const {data:res} = await this.$http.post('tPmAuthority/login',this.loginForm);
					if(res.code !==200) return this.$message.error('登录失败')
					console.log(res.result.satoken)
					this.$message.success("登录成功")
					// 1.登录成功后，将返回的token值，保存到客户端的 sessionStorage 中
					window.sessionStorage.setItem("satoken", res.result.satoken)
					// 2.登录成功后，跳转到主页
					this.$router.push("home")
				})	

			}
		}
	}
</script>

<style lang="less" scoped>
	.login_container {
		// background-color: #2b4b6b;
		height: 100%;
	}
	
	.background{
		width: 100%;
		height: 100%;
		z-index: -1;
		 position: absolute;
		img{
			width: 100%;
			height: 100%;
		}
	}

.welcome{
	width: 450px;
	height: 150px;
	top: 25%;
	left: 50%;
	transform: translate(-50%, -50%);
	position: absolute;
	text-align: center;
	span{
		font-size: 50px;
		color: #ffffff;
	}
}
	.login_box {
		width: 450px;
		height: 300px;
		background-color: #fff;
		border-radius: 3px;
		position: absolute;
		top: 60%;
		left: 50%;
		transform: translate(-50%, -50%);

		.acatar_box {
			height: 130px;
			width: 130px;
			border: 1px solid #EEEEEE;
			border-radius: 10%;
			padding: 0.625rem;
			box-shadow: 0 0 10px #ddd;
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			background-color: #fff;

			img {
				width: 100%;
				height: 100%;
				// border-radius: 50%;
				background-color: #EEEEEE;
			}
		}
	}

	.login_form {
		position: absolute;
		bottom: 0;
		width: 100%;
		padding: 0 1.25rem;
		box-sizing: border-box;
	}

	.btns {
		display: flex;
		justify-content: flex-end;
	}
</style>
