<template>
	<div>
		<el-container>
			
		  <el-header>
				<el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" :router="true"
				>
				  <el-menu-item  v-for="item in navigationList" :index="'/'+item.path" :key="item.id" @click="saveNavState('/'+item.path)">
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
					{id:'1',authName:'公司信息',	path:'basis/company'},
					{id:'2',authName:'员工信息',	path:'basis/worker'},
					{id:'3',authName:'车辆&司机查询',	path:'basis/driver'},
					{id:'4',authName:'客户信息',	path:'basis/customer'},
					{id:'5',authName:'地区信息',	path:'basis/region'},
				],
				// 激活菜单的index
				activeIndex:''
			}
		},
		beforeCreate() {
			this.activeIndex = 'basis/company'
		},
		// created(){
		// 	this.activeIndex = window.sessionStorage.getItem('activeIndex')
		// },
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