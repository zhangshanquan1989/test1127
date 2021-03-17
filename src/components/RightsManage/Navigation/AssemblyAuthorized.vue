<template>
	<!-- 装配 -->
	<div>

		<!-- 创建搜索区 -->
		<el-row :gutter="20">

			<!-- 创建 -->
			<el-col :span="2">
				<el-button type="info" @click="showAddAddDialog">添加</el-button>
			</el-col>
		</el-row>


		<el-card class="box-card" style="margin-top: 10px;">
			<el-table :data="pagingList" stripe style="width: 100%">
				<el-table-column prop="id" label="ID">
				</el-table-column>
				<el-table-column prop="employeeName" label="用户">
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
							<el-button type="danger" size="mini" slot="reference">删除</el-button>
						</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo"
			 :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>

			<!-- 添加的对话框 -->
			<el-dialog title="添加" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
				<!-- 添加的表单 -->
				<el-form :model="addForm" ref="addFormRef" label-width="100px">
					<el-form-item label="员工姓名/账号:">
						<el-input v-model="findWorkerInput.name" style="width: 70%;"></el-input>
						<el-button @click="handleFindWorker">查看</el-button>
					</el-form-item>
				</el-form>
				<el-form :model="addForm" ref="addFormRef" label-width="100px">
					<el-form-item label="员工ID:">
						<el-input disabled disable v-model="workerList.Username.id" style="width: 70%;"></el-input>
					</el-form-item>
					<el-form-item label="用户:">
						<el-input disabled v-model="workerList.Records.employeeName" style="width: 70%;"></el-input>
					</el-form-item>
					<el-form-item label="账号:">
						<el-input disabled v-model="workerList.Username.username" style="width: 70%;"></el-input>
					</el-form-item>
					<el-form-item label="岗位:">
						<el-input disabled v-model="workerList.Records.employeePost" style="width: 70%;"></el-input>
					</el-form-item>
					<el-form-item label="公司:">
						<el-input disabled v-model="workerList.Records.employeeCompany" style="width: 70%;"></el-input>
					</el-form-item>
					<el-form-item label="角色:">
						<el-input disabled v-model="workerList.Records.employeeAuthority" style="width: 70%;"></el-input>
					</el-form-item>
					<el-form-item label="变更时间:">
						<el-input disabled v-model="workerList.Records.employeeUpdateTime" style="width: 70%;"></el-input>
					</el-form-item>
				</el-form>
				<el-button type="primary" style="margin:auto;" @click="addInfo(workerList.Username.id)">添加</el-button>
			</el-dialog>

			<!-- 修改权限的对话框 -->
			<el-dialog title="修改权限" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
				<!-- 修改权限的表单 -->
				<el-form :model="editForm" ref="editFormRef" label-width="100px">
					<el-form-item label="权限:">
						<el-select v-model="value" placeholder="请选择" @change="handleValueChange">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
					assembly: '0',
					pageNo: 1,
					pageSize: 10
				},
				// 分页列表
				pagingList: [

				],
				// 分页总条数
				total: 0,
				// 编辑对话框
				editDialogVisible: false,
				editForm: {
					assemblydelete:''
				},
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
				}, {
					value: 'D',
					label: '暂无权限'
				}],
				value: '',
				// 添加
				addDialogVisible: false,
				findWorkerInput: {
					name: ''
				},
				addForm: {},
				workerList: {
					Records: {
						employeeName: '',
						employeeAuthority: '',
						employeeCompany: '',
						employeeDepartment: '',
						employeeName: '',
						employeeNo: '',
						employeePost: '',
						employeeStatus: '',
						employeeTel: '',
						employeeUpdateTime: '',
					},
					Username: {
						id: '',
						username: ''
					}
				},


			}
		},
		created() {

			this.getPagingList()
		},
		methods: {
			
			showAddAddDialog(){
							this.addDialogVisible = true
						},
						async handleFindWorker(){
							// console.log(this.findWorkerInput)
							const {
								data: res
							} = await this.$http.get('tPmAuthority/assemblyquery',{
								params: this.findWorkerInput
							}
							)
							console.log(res)
							if (res.code !== 200) {
								return
							}
							this.workerList = res.result
						},
						
						// 创建对话框
						async addInfo(id) {
							console.log(id)
							let Id = {id:id}
						const {
							data: res
						} = await this.$http.get('tPmAuthority/assemblyadd',{
							params: Id
						}
						)
						// console.log(res)
						if (res.code !== 200) {
							return
						}
						this.addDialogVisible = false
						this.getPagingList()
						this.$message.success('添加成功')
						},
						
						// 监听创建对话框关闭
						addDialogClosed() {
							this.$refs.addFormRef.resetFields()
							this.workerList.Username.id=''
							this.workerList.Records.employeeName=''
							this.workerList.Username.username=''
							this.workerList.Records.employeePost=''
							this.workerList.Records.employeeCompany=''
							this.workerList.Records.employeeAuthority=''
							this.workerList.Records.employeeUpdateTime=''
			this.findWorkerInput.name = ''
						},
						
			// 根据分页查询列表
			async getPagingList() {
				const {
					data: res
				} = await this.$http.get('tPmAuthority/assemblylist', {
					params: this.queryInfo
				})
				if (res.code !== 200) {
					return this.$message.error('获取分页列表失败')
				}

				// 整合分页数据
				var obj1 = res.result.Records.records
				var obj2 = res.result.Username
				var obj3 = res.result.permissions

				var obj = obj1.map((item, index) => {
					return { ...item,
						...obj2[index]
					};
				});

				var objList = obj.map((item, index) => {
					return { ...item,
						...obj3[index]
					};
				});

				this.pagingList = objList

				// 整合权限数据
				for (let i = 0; i < this.pagingList.length; i++) {
					if (this.pagingList[i].assemblyadd) {
						this.pagingList[i].allPermissions = "创建、编辑、查看"
					} else if (this.pagingList[i].assemblyeditor) {
						this.pagingList[i].allPermissions = "编辑、查看"
					} else if(this.pagingList[i].assemblyquery){
						this.pagingList[i].allPermissions = "查看"
					}else{
						this.pagingList[i].allPermissions = "暂无权限"
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

			// 展示编辑的对话框
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
			handleValueChange(e) {
				console.log(e)
				console.log(this.value)
				if (this.value == 'A') {
					this.editForm.assemblyadd = "创建"
					this.editForm.assemblyeditor = "编辑"
					this.editForm.assemblyquery = "查看"
				} else if (this.value == 'B') {
					this.editForm.assemblyadd = ""
					this.editForm.assemblyeditor = "编辑"
					this.editForm.assemblyquery = "查看"
				} else if (this.value == 'C') {
					this.editForm.assemblyadd = ""
					this.editForm.assemblyeditor = ""
					this.editForm.assemblyquery = "查看"
					console.log(this.editForm)
				}else if (this.value == 'D') {
					this.editForm.assemblyadd = ""
					this.editForm.assemblyeditor = ""
					this.editForm.assemblyquery = ""
					console.log(this.editForm)
				} else {
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
					} = await this.$http.post('tPmAuthority/assemblyeditor', this.editForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error(res.message)
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
					id: Id
				}
				console.log(devletId)
				const {
					data: res
				} = await this.$http.get('tPmAuthority/assemblydelete', {
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
