<template>
	<el-container class="home_container">
		<!-- 头部区域 -->
	  <el-header>
		  <div>
			  <img src="../assets/logo.png" alt="">
			  <span>天康系统</span>
		  </div>
		  <el-button type="info" @click="logout">退出</el-button>
	  </el-header>
	  <!-- 页面主体 -->
	  <el-container>
			
			<!-- 侧边栏菜单区域 -->
				<el-menu background-color="#333744" text-color="#fff" active-text-color="#409eff" 
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
					authName:'装配分布信息',
					path:'assembly'
					},
					{id:2,
					authName:'履约信息管理',
					path:'performance'
					},
					{id:3,
					authName:'基础信息管理',
					path:'basis'
					},
					{id:4,
					authName:'权限管理',
					path:'rights'
					}
				],
				iconsObj:{
					'125':'el-icon-user-solid',
					'103':'el-icon-s-goods',
					'101':'el-icon-menu',
					'102':'el-icon-s-order',
					'145':'el-icon-s-marketing'
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
	background-color: #373d41 ;
	display: flex;
	justify-content: space-between;
	padding-left: 0;
	align-items: center;
	color: #FFFFFF;
	font-size: 20px;
	div{
		display: flex;
		align-items: center;
		img{
			width: 48px;
			height: 48px;
			border-radius: 50%;
		}
		span{
			margin-left: 15px;
		}
	}
}

.el-aside{
	background-color: #333744;
	// border-right: none;
}
.el-main{
	background-color: #eaedf1;
}


</style>