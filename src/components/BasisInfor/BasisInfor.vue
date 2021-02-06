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
					{id:'company',authName:'公司信息'},
					{id:'worker',authName:'员工信息'},
					{id:'driver',authName:'车辆&司机查询'},
					{id:'customer',authName:'客户信息'},
					{id:'region',authName:'地区信息'},
				],
				// 激活菜单的index
				activeIndex:''
			}
		},
		created(){
			this.activeIndex = window.sessionStorage.getItem('activeIndex')
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