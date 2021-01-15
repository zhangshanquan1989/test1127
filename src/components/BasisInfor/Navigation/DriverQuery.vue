<template>
	<div>
		<!-- 司机车辆查询页面 -->
		<!-- 创建搜索区 -->
		<el-row >
			
			<!-- 创建按钮 -->
			<el-col :span="2">
				<el-button type="info" size="mini" @click="addDialogVisible = true">创建</el-button>
			</el-col>
			
			<el-col :span="2">
				<el-input v-model="queryInfo.driverName" placeholder="司机名"></el-input>
			</el-col>
			
			<el-col :span="2" style="margin-left: 10px;">
				<el-input v-model="queryInfo.driverCarOwner" placeholder="车主名"></el-input>
			</el-col>
			
			<el-col :span="2" style="margin-left: 10px;">
				<el-input v-model="queryInfo.driverLicense" placeholder="车牌号"></el-input>
			</el-col>
			

			<!-- 公司下拉框 -->
			<el-col :span="1" style="margin-left: 20px;"><span>公司</span></el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.driverCompany" placeholder="全部">
				   <el-option
				     v-for="item in allDriverList"
				     :key="item.driverId"
				     :label="item.driverCompany"
				     :value="item.driverCompany">
				   </el-option>
				 </el-select>
			</el-col>	

		
		<!-- 状态下拉框 -->
			<el-col :span="1" style="margin-left: 20px;"><span>状态</span></el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.driverStatus" placeholder="全部">
				   <el-option
				     v-for="item in driverStatusSelect"
				     :key="item.value"
				     :label="item.label"
				     :value="item.value">
				   </el-option>
				 </el-select>
			</el-col>	

		
		<!-- 载重下拉框 -->
			<el-col :span="1" style="margin-left: 20px;"><span>载重</span></el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.driverLoad" placeholder="全部">
				   <el-option
				     v-for="item in driverLoadSelect"
				     :key="item.value"
				     :label="item.label"
				     :value="item.value">
				   </el-option>
				 </el-select>
			</el-col>	
			
			
			<!-- 查询按钮 -->
			<el-col :span="2" style="margin-left: 20px;">
				<el-button type="info" size="mini" @click="handleQueryBtn">查询</el-button>
			</el-col>
			
		</el-row>

								
			<!-- 卡片视图区 -->
			<el-card class="box-card">
		<el-table :data="driverList" stripe style="width: 100%">
			<el-table-column v-if="false" prop="driverId" label="ID" >
				</el-table-column>
				<el-table-column prop="driverNo" label="车主ID" >
					</el-table-column>
			<el-table-column prop="driverName" label="司机姓名" >
			</el-table-column>
			<el-table-column prop="driverTel" label="司机联系方式" >
			</el-table-column>
			<el-table-column prop="driverLicense" label="车牌" >
			</el-table-column>
			<el-table-column prop="driverModel" label="车型" >
			</el-table-column>
			<el-table-column prop="driverLoad" label="载重" >
			</el-table-column>
			<el-table-column prop="driverCompany" label="所属公司" >
			</el-table-column>
			<el-table-column prop="driverScheduling" label="所属调度" >
			</el-table-column>
			<el-table-column prop="driverStatus" label="状态" >
			</el-table-column>
			<el-table-column prop="driverCertificateDriving" label="证件" >
			</el-table-column>
	
			<el-table-column label="操作" width="200px">
				<template slot-scope="scope">
					<!-- 修改按钮 -->
					<el-button type="primary" size="mini" @click="showEditDialog(scope.row.driverNo)">编辑</el-button>
					<!-- 删除按钮 -->
					<el-button type="danger" size="mini" @click="removeById(scope.row.driverId)">刪除</el-button>
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
			<el-dialog title="创建车辆信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
				<!-- 创建的表单 -->
				<el-form :model="addForm"  ref="addFormRef" label-width="100px">
					<el-form-item  label="车主ID:"><el-input disabled ></el-input></el-form-item>
					<el-form-item label="司机姓名:"><el-input v-model="addForm.driverName"></el-input></el-form-item>
					<el-form-item label="司机联系方式:"><el-input v-model="addForm.driverTel"></el-input></el-form-item>
					<el-form-item label="紧急联系人"><el-input v-model="addForm.driverEmergencyContact"></el-input></el-form-item>
					<el-form-item label="关系:"><el-input v-model="addForm.driverRelationship"></el-input></el-form-item>
					<el-form-item label="车主姓名:"><el-input v-model="addForm.driverCarOwner"></el-input></el-form-item>
					<el-form-item label="车主联系方式:"><el-input v-model="addForm.driverOwnerTel"></el-input></el-form-item>
					<el-form-item label="车牌:"><el-input v-model="addForm.driverLicense"></el-input></el-form-item>
					<el-form-item label="车型:"><el-input v-model="addForm.driverModel"></el-input></el-form-item>					
					<el-form-item label="宽"><el-input v-model="addForm.driverWidth"></el-input></el-form-item>
					<el-form-item label="高"><el-input v-model="addForm.driverHigh"></el-input></el-form-item>
					<el-form-item label="载重"><el-input v-model="addForm.driverLoad"></el-input></el-form-item>
					<el-form-item label="合同周期" placeholder="yyyy-MM-dd"><el-input v-model="addForm.driverStartContractPeriod"></el-input></el-form-item>
					<el-form-item label="所属公司"><el-input v-model="addForm.driverCompany"></el-input></el-form-item>
					<el-form-item label="所属调度"><el-input v-model="addForm.driverScheduling"></el-input></el-form-item>
					<el-form-item label="状态"><el-select v-model="addForm.driverStatus" placeholder="请选择">
					   <el-option
					     v-for="item in driverStatusSelect"
					     :key="item.value"
					     :label="item.label"
					     :value="item.value">
					   </el-option>
					 </el-select></el-form-item>
					
					<el-form-item label="证件:" >
						<el-input v-model="addForm.driverCertificateDriving"></el-input>
					</el-form-item>
				</el-form>
				
				<span slot="footer" class="dialog-footer">
					<el-button @click="addDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addInfo">确 定</el-button>
				</span>
				
			</el-dialog>
			
			
			<!-- 编辑地区的对话框 -->
		<el-dialog title="编辑车辆信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
			<!-- 创建的表单 -->
			<el-form :model="editForm"  ref="editFormRef" label-width="100px">
				<el-form-item  label="车主ID:"><el-input disabled  v-model="editForm.driverNo" ></el-input></el-form-item>
				<el-form-item label="司机姓名:"><el-input v-model="editForm.driverName"></el-input></el-form-item>
				<el-form-item label="司机联系方式:"><el-input v-model="editForm.driverTel"></el-input></el-form-item>
				<el-form-item label="紧急联系人"><el-input v-model="editForm.driverEmergencyContact"></el-input></el-form-item>
				<el-form-item label="关系:"><el-input v-model="editForm.driverRelationship"></el-input></el-form-item>
				<el-form-item label="车主姓名:"><el-input v-model="editForm.driverCarOwner"></el-input></el-form-item>
				<el-form-item label="车主联系方式:"><el-input v-model="editForm.driverOwnerTel"></el-input></el-form-item>
				<el-form-item label="车牌:"><el-input v-model="editForm.driverLicense"></el-input></el-form-item>
				<el-form-item label="车型:"><el-input v-model="editForm.driverModel"></el-input></el-form-item>					
				<el-form-item label="宽"><el-input v-model="editForm.driverWidth"></el-input></el-form-item>
				<el-form-item label="高"><el-input v-model="editForm.driverHigh"></el-input></el-form-item>
				<el-form-item label="载重"><el-input v-model="editForm.driverLoad"></el-input></el-form-item>
				<el-form-item label="合同周期" placeholder="yyyy-MM-dd"><el-input v-model="editForm.driverStartContractPeriod"></el-input></el-form-item>
				<el-form-item label="所属公司"><el-input v-model="editForm.driverCompany"></el-input></el-form-item>
				<el-form-item label="所属调度"><el-input v-model="editForm.driverScheduling"></el-input></el-form-item>
				<el-form-item label="状态"><el-select v-model="editForm.driverStatus" placeholder="请选择">
				   <el-option
				     v-for="item in driverStatusSelect"
				     :key="item.value"
				     :label="item.label"
				     :value="item.value">
				   </el-option>
				 </el-select></el-form-item>
				
				<el-form-item label="证件:" >
					<el-input v-model="editForm.driverCertificateDriving"></el-input>
				</el-form-item>
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
					driverName:'',
					driverCarOwner:'',
					driverLicense:'',
					pageNo: 1,
					pageSize: 10
				},
				// 总列表
				allDriverList: [],
				// 分页列表
				driverList: [],
				// 总条数
				total: 0,
				// 状态选项
				driverStatusSelect:[{
				  value: '在职',
				  label: '在职'
				}, {
				  value: '离职',
				  label: '离职'
				}, {
				  value: '休假',
				  label: '休假'
				}],
				// 载重选项
				driverLoadSelect:[{
				  value: 'A',
				  label: '5-10吨'
				}, {
				  value: 'B',
				  label: '11-20吨'
				}, {
				  value: 'C',
				  label: '21-30吨'
				},{
				  value: 'D',
				  label: '31-40吨'
				}, {
				  value: 'E',
				  label: '41-50吨'
				}, {
				  value: 'F',
				  label: '51吨以上'
				}],
// 创建公司对话框数据
       addDialogVisible:false,
       addForm:{}, 
// 编辑公司对话框数据
				// 编辑公司对话框显示与隐藏
				editDialogVisible:false,
				editForm:{},
			}
		},
		
		created() {
			this.getDriverList()
		  this.getAllDriverList()
		},
		
		methods: {

			// 查询总数据
			async getAllDriverList() {
				const {
					data: res
				} = await this.$http.get('base/tBaDriver/list')
			console.log(res)
				if (res.code !== 200) {
					return 
				}
				this.allDriverList = res.result.records
			},
			
//分页区域 
			// 根据分页查询列表
			async getDriverList() {
				const {
					data: res
				} = await this.$http.get('base/tBaDriver/list', {
					params: this.queryInfo
				})
			
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				console.log(res)
				this.$message.success('获取信息成功')
				this.driverList = res.result.records
				this.total = res.result.total
			},
			
			// 点击查询按钮
			async handleQueryBtn(){
			this.getDriverList()
			this.getAllDriverList()
			this.queryInfo.driverName = ''
			this.queryInfo.driverCarOwner = ''
			this.queryInfo.driverLicense = ''
			this.queryInfo.driverCompany = ''
			this.queryInfo.driverStatus = ''
			this.queryInfo.driverLoad = ''
			},
	// pageSize 改变的事件
	handleSizeChange(newSize) {
		this.queryInfo.pageSize = newSize
		this.getDriverList()
	},
	
	// 页码值改变事件
	handleCurrentChange(newPage) {
		this.queryInfo.pageNo = newPage
		this.getDriverList()
	},
	
	// 创建公司对话框
	addInfo(){
		this.$refs.addFormRef.validate(async valid => {
			if (!valid) return
			// 发起添加信息的数据请求
			const {
				data: res
			} = await this.$http.post('base/tBaDriver/add',this.addForm)
			console.log(res)	
			if (res.code !== 200) {
				return this.$message.error('添加信息失败')
			}
			// 添加成功，关闭对话框，刷新数据列表，提示添加成功
			this.addDialogVisible = false
			this.getDriverList()
			this.getAllDriverList()
			this.$message.success('添加信息成功')
		})
	},
	// 监听创建对话框关闭
	addDialogClosed(){
		this.$refs.addFormRef.resetFields()
		this.addForm={}
	},
	
// 编辑对话框操作	
		// 展示编辑公司的对话框
		async showEditDialog(driverNo) {
			// console.log(driverNo)
			const {
				data: res
			} = await this.$http.get('base/tBaDriver/findDriver?driverNo='+ driverNo)
			// console.log(res)
			if (res.code !== 200) {
				return this.$message.error('查询信息失败')
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
				} = await this.$http.post('base/tBaDriver/edit',this.editForm)
		
				if (res.code !== 200) {
					return this.$message.error('更新信息失败')
				}
				// 更新成功，关闭对话框，刷新数据列表，提示修改成功
				this.editDialogVisible = false
				this.getDriverList()
				this.getAllDriverList()
				this.$message.success('更新信息成功')
			})
		},
		
// 删除操作
		async removeById(driverId){
			const {
					data: res
				} = await this.$http.get('base/tBaDriver/deleteById?driverId=' + driverId)
					
				if (res.code !== 200) {
					return this.$message.error('删除失败')
				}
				// 删除成功，刷新数据列表，提示删除成功
				this.getDriverList()
				this.getAllDriverList()
				this.$message.success('删除成功')
			}
		}
	}
</script>

<style scoped>

</style>
