<template>
	<el-container class="home_container">
		<!-- 头部区域 -->
	  <el-header >
		  <div>
			  <img src="../assets/天康系统3.png" alt="">
			  <!-- <span>天康系统</span> -->
		  </div>
		  <el-button type="info" @click="logout">退出</el-button>
	  </el-header>
	  <!-- 页面主体 -->
	  <el-container>
			
			<!-- 侧边栏菜单区域 -->
				<el-menu background-color="#536080" text-color="#fff" active-text-color="#FFFFFF" 
			 :unique-opened="true" 
			 :router="true" :default-active="activePath">
					<!-- <el-submenu > -->
						<el-menu-item v-for="item in menulist" :index="'/'+item.path" :key="item.id" @click="saveNavState('/'+item.path)">
							<span>{{item.authName}}</span>
						</el-menu-item>
					<!-- </el-submenu> -->
				</el-menu>
			
		<!-- 右侧内容主体 -->
	    <el-main>
			<!-- 路由占位符 -->
			<router-view></router-view>
		</el-main>
	  </el-container>
	</el-container>
</template>

<script>
	export default {
		data(){
			return{
				// 左侧菜单数据
				menulist: [
					{id:1,
					authName:'基础信息管理',
					path:'basis'
					},
					{id:2,
					authName:'履约信息管理',
					path:'performance'
					},
					{id:3,
					authName:'装配分布信息',
					path:'assembly'
					},
					{id:4,
					authName:'权限管理',
					path:'rights'
					},
					{id:5,
					authName:'数据工厂',
					path:'dataFactory'
					},
					// {id:6,
					// authName:'text',
					// path:'text'
					// }
				],
				iconsObj:{
					'1':'el-icon-user-solid',
					'2':'el-icon-s-goods',
					'3':'el-icon-menu',
					'4':'el-icon-s-order',
					'5':'el-icon-s-marketing'
				},

				// 被激活的链接地址
				activePath:''
			}
		},
		created() {
			// this.getMenuList()
			this.activePath = window.sessionStorage.getItem('activePath')
		},
		methods:{
			logout(){
				window.sessionStorage.clear()
				this.$router.push('/login')
			},
			//获取所有菜单
			// async getMenuList(){
			// 	const {data: res} = await this.$http.get('menus')
			// 	if(res.meta.status !== 200) return this.$message.error('res.meta.msg')
			// 	this.menulist = res.data
			// 	console.log(res);
			// },

			// 保持链接的激活状态
			saveNavState(activePath){
				window.sessionStorage.setItem('activePath',activePath)
				this.activePath = activePath
			}
		}
	}
</script>

<style lang="less" scoped>
.home_container{
	height: 100%;
}
.el-header{
	background-color: #536080 ;
	display: flex;
	justify-content: space-between;
	padding-left: 0;
	align-items: center;
	color: #FFFFFF;
	font-size: 20px;
	height: 75px !important;
	div{
		display: flex;
		align-items: center;
		img{
			width: 197px;
			height: 32px;
			margin-left: 14px;
			// border-radius: 50%;
		}
		span{
			margin-left: 15px;
		}
	}
}
.el-menu{
	width: 187px;
}
.el-aside{
	background-color: #536080;
	// border-right: none;
}
.el-main{
	background-color: #eaedf1;
	font-size: 25px !important;
}
.el-menu-item.is-active {
   background-color: #409eff !important;
}

.el-menu-item{
	padding-left: 30px !important;
	font-size: 18px;
}

</style>