<template>
	<div>
		<el-container>
			
		  <el-header>
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true"
				>
				  <el-menu-item  v-for="item in navigationList" :index="'/'+item.id" :key="item.id" @click="saveNavState('/'+item.id)">
						<span>{{item.authName}}</span>
					</el-menu-item>
				</el-menu>
			</el-header>
			
			
		  <el-main>
				<router-view></router-view>
			</el-main>
		</el-container>
		
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				// 导航菜单
				navigationList:[
					{id:'manageLimit',authName:'管理权限'},
					{id:'assemblyAuthorized',authName:'装配分布信息授权'},
					{id:'performanceAuthorized',authName:'履约信息管理授权'},
					{id:'basisAuthorized',authName:'基础信息管理授权'},
				],
				// 激活菜单的index
				activeIndex:''
			}
		},
		created(){
			// this.activeIndex = window.sessionStorage.getItem('activeIndex')
		},
		methods:{
			handleSelect(index,indexPath){

				this.activeIndex = index
				
			},
			// 保持链接的激活状态
			saveNavState(activeIndex){
				window.sessionStorage.setItem('activeIndex',activeIndex)
				this.activeIndex = activeIndex
		}
	},
	}
</script>

<style scoped>

</style>