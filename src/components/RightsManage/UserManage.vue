<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>权限管理</el-breadcrumb-item>
			<el-breadcrumb-item>用户管理</el-breadcrumb-item>
		</el-breadcrumb>
		
		<!-- 卡片视图区 -->
		<el-card class="box-card">		
			<el-table :data="dataList" border stripe style="width: 100%;margin-top: 8px;" :row-style="{height:'60px'}"
			 :cell-style="{padding:'0px'}" :header-cell-style="{background:'#f8f8f9', color:'#000000'}">
				<el-table-column prop="id" label="ID" v-if="false">
				</el-table-column>
				<el-table-column label="操作" width="120px" fixed="right">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.no)" style="margin-left: 15px;">详情</el-button>
						<!-- 删除按钮 -->
						<!-- <el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.id)" style="margin-left: 10px;">
							<el-button type="danger" size="mini" slot="reference">删除</el-button>
						</el-popconfirm> -->
					</template>
				</el-table-column>
			</el-table>
		</el-card>
		
		<!-- 分页区域 -->
		<el-col>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo"
			 :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total" style="margin-top: 5px;">
			</el-pagination>
		</el-col>
		
		
	</div>
</template>

<script>
	export default {
		data(){
			return{
				// 查询数据
				queryInfo: {
					pageNo: 1,
					pageSize: 10,
					// 倒叙必填
					order: "desc",
					column: "id",
					no: '',
				},
				// 分页列表
				dataList: [],
				// 总条数
				total: 0,
			}
		},
		created() {
			this.getDataList()
		},
		methods:{
			// 获取所有客户公司名称
			async getDataList() {
				const {
					data: res
				} = await this.$http.get('kuser/user')
				// console.log(res)
				if (res.code !== 200) {
					return
				}
				this.states = res.result
				this.companyList = this.states.map(item => {
					return {
						value: `${item}`,
						label: `${item}`
					};
				});
				this.companyOptions = this.companyList
			},
		}
	}
</script>

<style scoped>

</style>