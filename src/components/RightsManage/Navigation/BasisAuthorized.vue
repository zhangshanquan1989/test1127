<template>
	<!-- 基础信息 -->
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
				<el-table-column prop="allPermissions" label="权限">
				</el-table-column>
				<el-table-column prop="employeeUpdateTime" label="变更时间">
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
	
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.id)">修改权限</el-button>
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
			
			<!-- 修改权限的对话框 -->
			<el-dialog title="修改权限" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
				<!-- 修改权限的表单 -->
				<el-form :model="editForm"  ref="editFormRef" label-width="100px">
					<el-form-item label="权限:">
						 <el-select v-model="value" placeholder="请选择" @change="handleValueChange">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						  </el-select>
					</el-form-item>
				</el-form>
			
				<span slot="footer" class="dialog-footer">
					<el-button @click="editDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="editInfo">确 定</el-button>
				</span>
			
			</el-dialog>
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
				// 编辑对话框
				 editDialogVisible:false,
				 editForm:{},
				 // 修改权限
				  options: [{
				           value: 'A',
				           label: '创建、编辑、查看'
				         }, {
				           value: 'B',
				           label: '编辑、查看'
				         }, {
				           value: 'C',
				           label: '查看'
				         }],
				         value: ''
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
				} = await this.$http.get('tPmAuthority/basislist', {
					params: this.queryInfo
				})
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('获取分页列表失败')
				}
				var obj1 = res.result.Records.records
				var obj2 = res.result.Username
				var obj3 = res.result.permissions
				
				var obj = obj1.map((item,index) => {
				    return {...item, ...obj2[index]};
				});
				
				var objList = obj.map((item,index) => {
				    return {...item, ...obj3[index]};
				});
				this.pagingList = objList
				
				// 整合权限数据
				for(let i = 0;i<this.pagingList.length;i++){

					if(this.pagingList[i].basisadd){
						this.pagingList[i].allPermissions = "创建、编辑、查看"
					}else if(this.pagingList[i].basiseditor){
						this.pagingList[i].allPermissions = "编辑、查看"
					}else{
						this.pagingList[i].allPermissions = "查看"
					}
				}
				this.total = res.result.Records.total
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
			
			// 展示编辑公司的对话框
			async showEditDialog(id) {
				this.editForm.id = id
				// const {
				// 	data: res
				// } = await this.$http.get('base/tBaClient/findClient?clientNo=' + id)
				// if (res.code !== 200) {
				// 	return this.$message.error('查询用户信息失败')
				// }
				// this.editForm = res.result
				// 显示对话框
				this.editDialogVisible = true
			},
			handleValueChange(e){
				console.log(e)
				console.log(this.value)
				if(this.value == 'A'){
					this.editForm.basisadd = "创建"
					this.editForm.basiseditor = "编辑"
					this.editForm.basisquery = "查看"
				}else if(this.value == 'B'){
					this.editForm.basisadd = ""
					this.editForm.basiseditor = "编辑"
					this.editForm.basisquery = "查看"
				}else if(this.value == 'C'){
					this.editForm.basisadd = ""
					this.editForm.basiseditor = ""
					this.editForm.basisquery = "查看"
					console.log(this.editForm)
				}else{
					console.log("错误")
				}
			},
			
			// 监听修改用户对话框关闭事件
			editDialogClosed() {
				this.$refs.editFormRef.resetFields()
			},
			
			
			// 修改信息并提交
			editInfo() {
				// 验证
				this.$refs.editFormRef.validate(async valid => {
					if (!valid) return
					// 发起修改信息的数据请求
					const {
						data: res
					} = await this.$http.post('tPmAuthority/basiseditor', this.editForm)
			console.log(res)
					if (res.code !== 200) {
						return this.$message.error('更新信息失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.editDialogVisible = false
					this.getPagingList()
					this.$message.success('更新信息成功')
				})
			},
			
			
			// 删除按钮
			async removeById(Id) {
				var devletId = {
					id:Id
				}
				const {
					data: res
				} = await this.$http.get('tPmAuthority/basisdelete' , {
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