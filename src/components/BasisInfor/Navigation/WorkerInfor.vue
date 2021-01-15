<template>
	<!-- 员工信息页面 -->
	
	<div>
		
		<!-- 创建搜索区 -->
		<el-row >
			
			<!-- 创建按钮 -->
			<el-col :span="2">
				<el-button type="info" size="mini" @click="addDialogVisible = true">创建</el-button>
			</el-col>
		
			
			<el-col :span="2">
				<el-input v-model="queryInfo.employeeName" placeholder="员工姓名"></el-input>
			</el-col>
			
		<el-col :span="2"></el-col>
			
			<!-- 公司下拉框 -->
			<el-col :span="1" style="margin-left: 20px;"><span>公司：</span></el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.employeeCompany" placeholder="全部" clearable>
				   <el-option
				     v-for="item in allEmployeeList"
				     :key="item.index"
				     :label="item.employeeCompany"
				     :value="item.employeeCompany">
				   </el-option>
				 </el-select>
			</el-col>	

		
		<!-- 状态下拉框 -->
			<el-col :span="1" style="margin-left: 15px;"><span>状态：</span></el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.employeeStatus" placeholder="全部" clearable>
				   <el-option
				     v-for="item in status"
				     :key="item.value"
				     :label="item.label"
				     :value="item.value">
				   </el-option>
				 </el-select>
			</el-col>	
						
			<!-- 查询按钮 -->
			<el-col :span="2" style="margin-left: 15px;">
				<el-button type="info" size="mini" @click="handleQueryBtn">查询</el-button>
			</el-col>
			
		</el-row>
					
			<!-- 卡片视图区 -->
			<el-card class="box-card">
		<el-table :data="employeeList" stripe style="width: 100%">
			<el-table-column v-if="false" prop="employeeId" label="ID" >
				</el-table-column>
			<el-table-column prop="employeeNo" label="员工ID" >
				</el-table-column>
			<el-table-column prop="employeeName" label="员工姓名" >
			</el-table-column>
			<el-table-column prop="employeeDepartment" label="部门" >
			</el-table-column>
			<el-table-column prop="employeePost" label="岗位" >
			</el-table-column>
			<el-table-column prop="employeeCompany" label="所属公司" >
			</el-table-column>
			<el-table-column prop="employeeTel" label="联系方式" >
			</el-table-column>
			<el-table-column prop="employeeStatus" label="状态" >
			</el-table-column>
	
			<el-table-column label="操作" width="200px">
				<template slot-scope="scope">
					<!-- 修改按钮 -->
					<el-button type="primary" size="mini" @click="showEditDialog(scope.row.employeeId)">编辑</el-button>
					<!-- 删除按钮 -->
					<el-button type="danger" size="mini" @click="removeById(scope.row.employeeId)">刪除</el-button>
				</template>
			</el-table-column>
		</el-table>
			</el-card>
			
		<!-- 分页区域 -->
		<el-col>
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo"
			 :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</el-col>			
		
<!-- 创建的对话框 -->
			<el-dialog title="新增员工信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
				<!-- 创建表单 -->
				<el-form :model="addForm"  ref="addFormRef" label-width="100px">
					<el-form-item label="ID:"></el-form-item>
					<el-form-item label="员工姓名:"><el-input v-model="addForm.employeeName"></el-input></el-form-item>
					<el-form-item label="部门:"><el-input v-model="addForm.employeeDepartment"></el-input></el-form-item>
					<el-form-item label="岗位"><el-input v-model="addForm.employeePost"></el-input></el-form-item>
					<el-form-item label="所属公司"><el-input v-model="addForm.employeeCompany"></el-input></el-form-item>
					<el-form-item label="联系方式"><el-input v-model="addForm.employeeTel"></el-input></el-form-item>
					<el-form-item label="状态">
						<el-select v-model="addForm.employeeStatus" placeholder="全部">
					   <el-option
					     v-for="item in status"
					     :key="item.value"
					     :label="item.label"
					     :value="item.value">
					   </el-option>
					 </el-select>
					 </el-form-item>
							</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="addDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addInfo">确 定</el-button>
				</span>
				
			</el-dialog>
			
			
			<!-- 编辑对话框 -->
			<el-dialog title="编辑地区信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
				<!-- 编辑表单 -->
				<el-form :model="editForm"  ref="editFormRef" label-width="100px">
					<el-form-item  label="ID:">{{editForm.employeeId}}</el-form-item>
					<el-form-item label="员工姓名:" >
						<el-input v-model="editForm.employeeName"></el-input>
					</el-form-item>
					<el-form-item label="部门:" >
						<el-input v-model="editForm.employeeDepartment"></el-input>
					</el-form-item>
					<el-form-item label="岗位:" >
						<el-input v-model="editForm.employeePost"></el-input>
					</el-form-item>
					<el-form-item label="所属公司:" >
						<el-input v-model="editForm.employeeCompany"></el-input>
					</el-form-item>
					<el-form-item label="联系方式:" >
						<el-input v-model="editForm.employeeTel"></el-input>
					</el-form-item>
					<el-form-item label="状态"><el-select v-model="editForm.employeeStatus" :placeholder="editForm.employeeStatus">
					   <el-option
					     v-for="item in status"
					     :key="item.value"
					     :label="item.label"
					     :value="item.value">
					   </el-option>
					 </el-select></el-form-item>
				</el-form>
				<span slot="footer" class="dialog-footer">
					<el-button @click="editDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="editInfo">确 定</el-button>
				</span>
				
			</el-dialog>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 查询数据
				queryInfo:{	
					employeeName:'',
					employeeCompany:'',
					employeeStatus:'',
					pageNo: 1,
					pageSize: 10
				},
				// 员工列表
				allEmployeeList: [],
				// 员工列表
				employeeList: [],
				// 员工总条数
				total: 0,
				// 添加公司表单的状态选项
				status:[{
				  value: '在职',
				  label: '在职'
				}, {
				  value: '离职',
				  label: '离职'
				}, {
				  value: '休假',
				  label: '休假'
				}],
// 创建员工对话框数据
       addDialogVisible:false,
       addForm:{}, 
// 编辑员工对话框数据
				// 编辑员工对话框显示与隐藏
				editDialogVisible:false,
				editForm:{},
			}
		},
		
		created() {
			this.getEmployeeList()
			this.getAllEmployeeList()
			},
		
		methods: {

			// 查询总数据
			async getAllEmployeeList() {
				const {
					data: res
				} = await this.$http.get('base/tBaEmployee/list')
			console.log(res)
				if (res.code !== 200) {
					return 
				}
				this.allEmployeeList = res.result.records

			},
			
//分页区域 
			// 根据分页查询列表
			async getEmployeeList() {
				const {
					data: res
				} = await this.$http.get('base/tBaEmployee/list', {
					params: this.queryInfo
				})
			
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				// console.log(res)
				this.$message.success('获取信息成功')
				this.employeeList = res.result.records
				this.total = res.result.total
			},
			
			// 点击查询按钮
			async handleQueryBtn(){
			this.getEmployeeList()
			this.queryInfo.areaGrade = ''
			this.queryInfo.employeeCompany = ''
			this.queryInfo.employeeName = ''
			},
	// pageSize 改变的事件
	handleSizeChange(newSize) {
		this.queryInfo.pageSize = newSize
		this.getEmployeeList()
	},
	
	// 页码值改变事件
	handleCurrentChange(newPage) {
		this.queryInfo.pageNo = newPage
		this.getEmployeeList()
	},
	
	// 创建员工对话框
	addInfo(){
		this.$refs.addFormRef.validate(async valid => {
			if (!valid) return
			// 发起添加信息的数据请求
			const {
				data: res
			} = await this.$http.post('base/tBaEmployee/add',this.addForm)
			console.log(res)
			if (res.code !== 200) {
				return this.$message.error('添加信息失败')
			}
			// 添加成功，关闭对话框，刷新数据列表，提示添加成功
			this.addDialogVisible = false
			this.getEmployeeList()
			this.getAllEmployeeList()
			this.$message.success('添加信息成功')
		})
	},
	// 监听创建对话框关闭
	addDialogClosed(){
		this.$refs.addFormRef.resetFields()
		this.addForm = {}
	},
	
// 编辑对话框操作	
		// 展示编辑员工的对话框
		async showEditDialog(Id) {
			console.log(Id)
			const {
				data: res
			} = await this.$http.get('base/tBaEmployee/selectOne?employeeId='+ Id)
			console.log(res)
			if (res.code !== 200) {
				return this.$message.error('查询用户信息失败')
			}
			this.editForm = res.result
			// 显示对话框
			this.editDialogVisible = true
		},
		
		// 监听修改用户对话框关闭事件
		editDialogClosed() {
			this.$refs.editFormRef.resetFields()
		},
		
		
		// 修改信息并提交
		editInfo() {
			this.$refs.editFormRef.validate(async valid => {
				if (!valid) return
				// 发起修改信息的数据请求
				const {
					data: res
				} = await this.$http.post('base/tBaEmployee/edit',this.editForm)
		
				if (res.code !== 200) {
					return this.$message.error('更新信息失败')
				}
				// 更新成功，关闭对话框，刷新数据列表，提示修改成功
				this.editDialogVisible = false
				this.getEmployeeList()
				this.getAllEmployeeList()
				this.$message.success('更新信息成功')
			})
		},
		
// 删除操作
		async removeById(Id){
			const {
					data: res
				} = await this.$http.get('base/tBaEmployee/deleteById?employeeId=' + Id)
					
				if (res.code !== 200) {
					return this.$message.error('删除失败')
				}
				// 删除成功，刷新数据列表，提示删除成功
				this.getEmployeeList()
				this.$message.success('删除成功')
			}
		}
	}
</script>

<style scoped>

</style>
