<template>
	<div class="login_container">
		<div class="background">
			<img src="../assets/login/背景.jpg" alt="">
		</div>

		<div class="login_box" >
			<!-- 头像区域 -->
			<div class="tiankangxitong">
				<img src="../assets/login/天康系统@2x.png" alt="">
			</div>
			<div class="acatar_box">
				<img src="../assets/login/未标题-1@2x.png" alt="">
			</div>
			<div class="form_box">
				<!-- 登录表单区域 -->
				<div class="form_box_text">
					<span>欢迎登录货好多天康系统</span>
				</div>
				<el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="login_form">
					<!-- 用户名 -->
					<el-form-item prop="username" class="form_box_username">
						<!-- <i class="iconfont icon-yonghu"></i> -->
						<input v-model="loginForm.username" class="inputUsername">

						<!-- <el-input class="inputName" v-model="loginForm.username" prefix-icon="el-icon-user"></el-input> -->
					</el-form-item>
					<!-- 密码 -->
					<el-form-item prop="password" class="form_box_password">
						<input type="password" v-model="loginForm.password" class="inputpassword">
<!-- 						<el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-goods"></el-input> -->
					</el-form-item>
					<!-- 				<span>账号：zhangsan </span>
								<span>密码：zhangsan </span> -->
					<!-- 按钮 -->
					<el-form-item class="btns">
						<!-- <button @click="login"></button> -->

						<el-button type="primary" round @click="login" style="width: 335px;margin-top: 51px;height: 56px;border-radius: 28px;font-size:22px ;">登录</el-button>
						<el-button plain type="info" round @click="resetLoginForm" style="display: block;margin-top: 20px;width: 335px;height: 56px;border-radius: 28px;font-size:22px ;margin-left: 0;">重置</el-button>
					</el-form-item>
				</el-form>
			</div>

		</div>
	</div>
</template>

<script>
	import '../assets/font_o6ujaofv71i/iconfont.css';
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
					}],
					//验证密码是否合法
					password: [{
						required: true,
						message: '请输入登录密码',
						trigger: 'blur'
					}]
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
				this.$refs.loginFormRef.validate(async valid => {
					if (!valid) return;
					const {
						data: res
					} = await this.$http.post('tPmAuthority/login', this.loginForm);
					if (res.code !== 200) return this.$message.error('登录失败')
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

	.background {
		width: 100%;
		height: 100%;
		z-index: -1;
		position: absolute;

		img {
			width: 100%;
			height: 100%;
		}
	}

	.login_box {
		width: 1342px;
		height: 662px;
		background-color: #fff;
		border-radius: 20px;
		position: absolute;
		margin-top: 110px;
		left: 50%;
		transform: translate(-50%, 0);
		.tiankangxitong{
			width: 324px;
			height: 55px;
			position: absolute;
			z-index: 2;
			margin-top: 42px;
			margin-left: 42px;
			img{
				width: 324px;
				height: 55px;
			}
		}
		.acatar_box {
			height: 660px;
			width: 728px;
			border: 1px solid #EEEEEE;
			border-top-left-radius: 20px;
			border-bottom-left-radius: 20px;
			// padding: 0.625rem;
			// box-shadow: 0 0 10px #ddd;
			position: absolute;
			// left: 50%;
			// transform: translate(-50%, -50%);
			background-color: #ebf2ff;
			img {
				margin-top: 144px;
				width: 728px;
				height: 504px;
				border-top-left-radius: 20px;
				border-bottom-left-radius: 20px;				
				// background-color: red;
			}
		}
		.form_box{
			// background-color: red;
			height: 660px;
			width: 614px;
			margin-left: 728px;
			position: absolute;
			// text-align: center;
			.form_box_text{
				margin-top: 88px;
				font-size: 40px;
			  margin-left: 90px;
			}
		}
		
	}

	.login_form {
		position: absolute;
		margin-top: 80px;
		margin-left: 139px;
		width: 100%;
		// padding: 0 1.25rem;
		// box-sizing: border-box;
		.form_box_username{
			
		}
		.form_box_password{
			
		}
	}

	.btns {
		
		
	}

	.inputUsername {
		background: url("../assets/login/用户2.png")no-repeat 0 center;
		width: 275px;
		height: 40px;
		// border-radius:5px;
		border: 1px solid #999999;
		// box-shadow: 1px 1px 3px #cccccc;
		padding-left: 60px;
		border-top: none;
		border-left: none;
		border-right: none;
		font-size: 22px;
		outline: none;
	}
	
	.inputpassword{
		background: url("../assets/login/密码2.png")no-repeat 0 center ;
		width: 275px;
		height: 40px;
		// border-radius:5px;
		border: 1px solid #999999;
		// box-shadow: 1px 1px 3px #cccccc;
		padding-left: 60px;
		border-top: none;
		border-left: none;
		border-right: none;
		font-size: 22px;
		outline: none;
	}
</style>
