<template>
	<div>
		<el-card class="box-card">
			<el-table :data="pagingList" stripe style="width: 100%">
				<el-table-column  prop="id" label="ID">
				</el-table-column>
				<el-table-column  prop="employeeName" label="用户">
				</el-table-column>
				<el-table-column prop="username" label="账号">
				</el-table-column>
				<el-table-column prop="employeePost" label="岗位">
				</el-table-column>
				<el-table-column prop="employeeCompany" label="公司">
				</el-table-column>
				<el-table-column prop="employeeAuthority" label="角色">
				</el-table-column>
				<el-table-column prop="employeeUpdateTime" label="变更时间">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<!-- <el-button type="primary" size="mini" @click="showEditDialog(scope.row.companyNo)">编辑</el-button> -->
						<!-- 删除按钮 -->

							<el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.id)" style="margin-left: 10px;">
								<el-button type="danger" size="mini" slot="reference" >删除</el-button>
							</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo"
			 :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 查询参数对象
				queryInfo: {
					permissions:'0',
					pageNo: 1,
					pageSize: 10
				},
				// 商品列表
				pagingList: [],
				// 商品总条数
				total: 0,
		}
		},
		created() {
		
			this.getPagingList()
		},
		methods:{
			// 根据分页查询列表
			async getPagingList() {
				const {
					data: res
				} = await this.$http.get('tPmAuthority/permissionslist', {
					params: this.queryInfo
				})

				if (res.code !== 200) {
					return this.$message.error('获取分页列表失败')
				}
				var obj1 = res.result.Records.records
				var obj2 = res.result.UsernameList
				
				var obj = obj1.map((item,index) => {
				    return {...item, ...obj2[index]};
				});

				this.pagingList = obj
				this.total = res.result.total
			},
			
			// pageSize 改变的事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getPagingList()
			},
			
			// 页码值改变事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNo = newPage
				this.getPagingList()
			},
			
			
			// 删除按钮
			async removeById(Id) {
				console.log(Id)
				var devletId = {
					id:Id
				}
				console.log(devletId)
				const {
					data: res
				} = await this.$http.get('tPmAuthority/deleteById' , {
					params: devletId
				})
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error(res.message)
				}
				// 删除成功，刷新数据列表，提示删除成功
				this.getPagingList()
				this.$message.success('删除成功')
			},
		}
	}
</script>

<style scoped>

</style>