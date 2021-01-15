<template>
	<div>
		<!-- 创建搜索区域 -->
		<el-row :gutter="10">
			
			<el-col :span="2">
				<el-button type="info" @click="addDialogVisible = true">创建</el-button>
			</el-col>
	
			<el-col :span="2">
				<el-input placeholder="员工ID" v-model="queryInfo.plistEmployeeId" clearable></el-input>
			</el-col>
			
			<el-col :span="2">
				<el-input placeholder="员工姓名" v-model="queryInfo.plistEmployeeName" clearable></el-input>
			</el-col>
			<el-col :span="2">
				<el-input placeholder="车牌" v-model="queryInfo.plistDriverLicense" clearable></el-input>
			</el-col>
			<el-col :span="2">
				<el-input placeholder="车主ID" v-model="queryInfo.plistDriverId" clearable></el-input>
			</el-col>
			<el-col :span="2">
				<el-input placeholder="车主名" v-model="queryInfo.plistDriverOwner" clearable></el-input>
			</el-col>
			<el-col :span="2">
				<el-input placeholder="分公司ID" v-model="queryInfo.plistCompanyId" clearable></el-input>
			</el-col>
			<el-col :span="2">
				<el-input placeholder="分公司名" v-model="queryInfo.plistCompanyName" clearable></el-input>
			</el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.plistState" clearable placeholder="请选择状态">
					<el-option v-for="item in plistStateData" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>
			
			<el-col :span="1">
				<el-button type="info" @click="handleQueryBtn">查询</el-button>
			</el-col>
			
		</el-row>

		<!-- 卡片视图区域 -->
		<el-card class="box-card">
			<el-table :data="performanceList" stripe style="width: 100%">
				<el-table-column prop="plistNo" label="订单ID" >
				</el-table-column>
				<el-table-column prop="plistFristApointId" label="装货点ID">
				</el-table-column>
				<el-table-column prop="plistFristApointAddr" label="地址">
				</el-table-column>
				<el-table-column prop="plistCtime" label="装配时间">
				</el-table-column>
				<el-table-column prop="plistFristUpointId" label="卸货点ID">
				</el-table-column>
				<el-table-column prop="plistFristUpointAddr" label="地址">
				</el-table-column>
				<el-table-column prop="plistPtime" label="卸货完成时间">
				</el-table-column>
				<el-table-column prop="plistState" label="状态">
				</el-table-column>
				<el-table-column label="操作" width="200px">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.plistNo)">编辑</el-button>
						<!-- 删除按钮 -->
						<el-button type="danger" size="mini" @click="removeById(scope.row.plistNo)">刪除</el-button>
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
			<el-dialog title="新增信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
				<!-- 创建的表单 -->
				<el-form :model="addForm" ref="addFormRef" label-width="100px">
					<el-form-item  label="订单ID:">
						<el-input disabled placeholder="自动生成"></el-input>
					</el-form-item>
					<el-form-item  label="创建时间:">
						<el-input disabled placeholder="自动生成"></el-input>
					</el-form-item>
					<el-form-item label="状态:">
						<el-select v-model="addForm.plistState" clearable placeholder="状态">
							<el-option v-for="item in plistStateData" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="承运对接人:"></el-form-item>
						<el-form-item label="员工ID/姓名查询:">			
						  <el-input placeholder="请输入员工ID/姓名" v-model="searchEmployee">
						    <el-button slot="append" icon="el-icon-search" @click="handleSearchEmployee"></el-button>
						  </el-input>
						</el-form-item>

						<el-form-item label="员工姓名:">
						<el-input v-model="addForm.plistEmployeeName"  placeholder="员工姓名"></el-input>
						</el-form-item>
							<el-form-item label="员工手机号:">
						<el-input v-model="addForm.plistEmployeeTele" placeholder="员工手机号"></el-input>
						</el-form-item>

					<el-form-item label="下单企业">
						<el-input v-model="addForm.plistEmployeeName" placeholder="状态"></el-input>
						<el-input v-model="addForm.plistEmployeeTele"></el-input>
					</el-form-item>
					<el-form-item label="车辆信息">
						<el-input v-model="addForm.plistDriverLicense" placeholder="车牌号"></el-input>
						<el-input v-model="addForm.plistEmployeeTele" placeholder="司机"></el-input>
						<el-input v-model="addForm.plistEmployeeTele" placeholder="类型"></el-input>
					</el-form-item>
					<el-form-item label="定金">
						<el-input v-model="addForm.plistDriverLicense" placeholder="单位:元"></el-input>
					</el-form-item>
					<el-form-item label="尾款">
						<el-input v-model="addForm.plistDriverLicense" placeholder="单位:元"></el-input>
					</el-form-item>
					<el-form-item label="支付时间">
						<el-input v-model="addForm.plistDriverLicense" placeholder="单位:元"></el-input>
					</el-form-item>
				</el-form>
			
				<span slot="footer" class="dialog-footer">
					<el-button @click="addDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addInfo">确 定</el-button>
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
					plistEmployeeId:'',
					plistEmployeeName:'',
					plistDriverLicense:'',
					plistDriverId:'',
					plistDriverOwner:'',
					plistCompanyId:'',
					plistCompanyName:'',
					plistState:'',
					pageNo: 1,
					pageSize: 10
				},
				// 总列表
				allPerformanceList: [],
				// 分页列表
				performanceList: [],
				// 总条数
				total: 0,
				// 状态数据
				plistStateData: [{
					value: '待派单',
					label: '待派单'
				}, {
					value: '承运中',
					label: '承运中'
				}, {
					value: '几款中',
					label: '几款中'
				}, {
					value: '回单押款',
					label: '回单押款'
				}, {
					value: '压车中',
					label: '压车中'
				}, {
					value: '结算',
					label: '结算'
				}],
				// 创建公司对话框数据
				addDialogVisible: false,
				addForm: {
					plistEmployeeId:'',
					plistEmployeeName:'',
					plistEmployeeTele:''
				},
	// 查询
				// 员工ID/姓名查询
				searchEmployee:'',
				
			}
		},
		created() {this.getPerformanceList()},
		methods: {
			
			// 搜索区域
			handleQueryBtn(){
				this.getPerformanceList()
				this.queryInfo.queryInfo=''
			},
			
			//分页区域
						// 根据分页查询列表
						async getPerformanceList() {
							const {
								data: res
							} = await this.$http.get('tPfPlist/list', {
								params: this.queryInfo
							})
						
							if (res.code !== 200) {
								return this.$message.error('获取信息失败')
							}
							console.log(res)
							this.$message.success('获取信息成功')
							this.performanceList = res.result.records
							this.total = res.result.total
						},
						
						// 点击查询按钮
						async handleQueryBtn(){
						this.getPerformanceList()
						// this.getAllDriverList()

						},
						
			// pageSize 改变的事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getPerformanceList()
			},
			
			// 页码值改变事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNo = newPage
				this.getPerformanceList()
			},
			
			// 创建公司对话框
			addInfo() {
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					// 发起添加信息的数据请求
					const {
						data: res
					} = await this.$http.post('tPfPlist/add', this.addForm)
			
					if (res.code !== 200) {
						return this.$message.error('添加信息失败')
					}
					// 添加成功，关闭对话框，刷新数据列表，提示添加成功
					this.addDialogVisible = false
					this.getPerformanceList()
					this.$message.success('添加信息成功')
				})
			},
			// 监听创建对话框关闭
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
			},
			
			// 根据员工编号/姓名查询
			async handleSearchEmployee(){
				const firstLetter = this.searchEmployee[0]
				console.log(firstLetter)
				if (firstLetter == 0){
					const {data:res} = await this.$http.get('tPfPlist/findEmployeeNameAndTeleByEmployeeNo?employeeNo=' + this.searchEmployee)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('获取信息失败')
					}
					
					this.$message.success('获取地区信息成功')
					this.addForm.plistEmployeeName = res.result.EMPLOYEE_NAME
					this.addForm.plistEmployeeTele = res.result.EMPLOYEE_TEL
				}else{
					console.log('else')
					const {data:res} = await this.$http.get('tPfPlist/findEmployeeNameAndTeleByEmployeeName?employeeName=' + this.searchEmployee)
					console.log(res)
					// if (res.code !== 200) {
					// 	return this.$message.error('获取信息失败')
					// }
					
					// this.$message.success('获取地区信息成功')
					// this.addForm.plistEmployeeName = res.result.EMPLOYEE_NAME
					// this.addForm.plistEmployeeTele = res.result.EMPLOYEE_TEL
				}

			}
		}
	}
</script>

<style scoped>

</style>
