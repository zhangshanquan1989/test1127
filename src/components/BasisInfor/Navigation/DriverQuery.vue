<template>
	<div>
		<!-- 司机信息页面 -->
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
			<el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
			<el-breadcrumb-item>司机信息</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 创建司机 -->
		<el-button type="info" @click="addDialogVisible = true">创建</el-button>
		<!-- 卡片视图区 -->
		<el-card class="box-card">
			<el-table :data="driverList" stripe style="width: 100%">
				<el-table-column prop="id" label="id">
				</el-table-column>
				<el-table-column prop="name" label="司机姓名">
				</el-table-column>
				<el-table-column prop="phoneno" label="手机号码">
				</el-table-column>
				<el-table-column prop="company" label="所属分公司">
				</el-table-column>
				<el-table-column prop="joinDate" label="加入日期">
				</el-table-column>
				<el-table-column prop="region" label="地区">
				</el-table-column>
				<el-table-column prop="licensePlate" label="对应车辆">
				</el-table-column>
				<el-table-column prop="userid" label="身份证">
					<template slot-scope="scope">
						<el-image style="width: 80px; height: 40px" :src="scope.row.userid"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="drivingLicense" label="驾驶证">
					<template slot-scope="scope">
						<el-image style="width: 80px; height: 40px" :src="scope.row.drivingLicense"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="drivingLicenseTime" label="驾驶证有效期">
				</el-table-column>
				<el-table-column prop="workLicense" label="上岗证" width="100px">
					<template slot-scope="scope">
						<el-image style="width: 80px; height: 40px" :src="scope.row.workLicense"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="worklicensedate" label="上岗证有效期">
					</el-table-column>
				<el-table-column prop="createuser" label="创建人">
				</el-table-column>
				<el-table-column prop="ctTime" label="创建时间">
				</el-table-column>
				<el-table-column prop="utTime" label="最近更新时间">
				</el-table-column>
				<el-table-column label="操作" width="200px">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
						<!-- 删除按钮 -->
						<el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.id)" style="margin-left: 10px;">
							<el-button type="danger" size="mini" slot="reference">删除</el-button>
						</el-popconfirm>

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
			<el-form :model="addForm" ref="addFormRef" label-width="100px">
				<el-form-item label="司机姓名:" prop="name">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号码:" prop="phoneno">
					<el-input v-model="addForm.phoneno"></el-input>
				</el-form-item>
				<el-form-item label="所属分公司" prop="company">
					<el-input v-model="addForm.company"></el-input>
				</el-form-item>
				<el-form-item label="加入日期" prop="joinDate">
					<el-date-picker v-model="addForm.joinDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="地区" prop="region">
					<el-input v-model="addForm.region"></el-input>
				</el-form-item>
				<el-form-item label="对应车辆" prop="licensePlate">
					<el-input v-model="addForm.licensePlate"></el-input>
				</el-form-item>
				<el-form-item label="身份证" prop="userid">
					<el-image v-if="addForm.userid" style="width: 100px; height: 50px;" :src="addForm.userid"></el-image>
					<el-upload name="imgFile" :action="updateUserIdUrl" :auto-upload="true" :on-success="handleUserIdUrlSuccess"
					 :show-file-list="false">
						<el-button size="small" type="primary" plain>上传身份证照片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="驾驶证" prop="drivingLicense">
					<el-image v-if="addForm.drivingLicense" style="width: 100px; height: 50px;" :src="addForm.drivingLicense"></el-image>
					<el-upload name="imgFile" :action="updateDrivingLicenseUrl" :auto-upload="true" :on-success="handleDrivingLicenseUrlSuccess"
					 :show-file-list="false">
						<el-button size="small" type="primary" plain>上传驾驶证照片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="驾驶证有效期" prop="drivingLicenseTime">
					<el-date-picker v-model="addForm.drivingLicenseTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
					 value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="上岗证" prop="workLicense">
					<el-image v-if="addForm.workLicense" style="width: 100px; height: 50px;" :src="addForm.workLicense"></el-image>
					<el-upload name="imgFile" :action="updateWorkLicenseUrl" :auto-upload="true" :on-success="handleWorkLicenseUrlSuccess"
					 :show-file-list="false">
						<el-button size="small" type="primary" plain>上传驾驶证照片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="上岗证有效期" prop="drivingLicenseTime">
					<el-date-picker v-model="addForm.worklicensedate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日"
					 value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="创建人" prop="createuser">
					<el-input v-model="addForm.createuser"></el-input>
				</el-form-item>
			</el-form>
			<!-- 操作区域 -->
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addInfo">确 定</el-button>
			</span>
		</el-dialog>
		
		<!-- 编辑地区的对话框 -->
		<el-dialog title="编辑车辆信息" :visible.sync="editDialogVisible" width="55%" @close="editDialogClosed">
			<!-- 编辑的表单 -->
			<el-form :model="editForm" ref="editFormRef" label-width="100px">
				<el-form-item label="司机姓名:" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="手机号码:" prop="phoneno">
					<el-input v-model="editForm.phoneno"></el-input>
				</el-form-item>
				<el-form-item label="所属分公司" prop="company">
					<el-input v-model="editForm.company"></el-input>
				</el-form-item>
				<el-form-item label="加入日期" prop="joinDate">
					<el-date-picker v-model="editForm.joinDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="地区" prop="region">
					<el-input v-model="editForm.region"></el-input>
				</el-form-item>
				<el-form-item label="对应车辆" prop="licensePlate">
					<el-input v-model="editForm.licensePlate"></el-input>
				</el-form-item>
				<el-form-item label="身份证" prop="userid">
					<el-image v-if="editForm.userid" style="width: 100px; height: 50px;" :src="editForm.userid"></el-image>
					<el-upload name="imgFile" :action="updateUserIdUrl" :auto-upload="true" :on-success="handleUserIdUrlSuccess"
					 :show-file-list="false">
						<el-button size="small" type="primary" plain>上传身份证照片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="驾驶证" prop="drivingLicense">
					<el-image v-if="editForm.drivingLicense" style="width: 100px; height: 50px;" :src="editForm.drivingLicense"></el-image>
					<el-upload name="imgFile" :action="updateDrivingLicenseUrl" :auto-upload="true" :on-success="handleDrivingLicenseUrlSuccess"
					 :show-file-list="false">
						<el-button size="small" type="primary" plain>上传驾驶证照片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="驾驶证有效期" prop="drivingLicenseTime">
					<el-date-picker v-model="editForm.drivingLicenseTime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="上岗证" prop="workLicense">
					<el-image v-if="editForm.workLicense" style="width: 100px; height: 50px;" :src="editForm.workLicense"></el-image>
					<el-upload name="imgFile" :action="updateWorkLicenseUrl" :auto-upload="true" :on-success="handleWorkLicenseUrlSuccess"
					 :show-file-list="false">
						<el-button size="small" type="primary" plain>上传驾驶证照片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="上岗证有效期" prop="drivingLicenseTime">
					<el-date-picker v-model="editForm.worklicensedate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="创建人" prop="createuser">
					<el-input v-model="editForm.createuser"></el-input>
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
				// 创建对话框显示
				addDialogVisible: false,
				// 创建
				addForm: {
					name: "",
					phoneno: "",
					company: "",
					joinDate: "",
					region: "",
					licensePlate: "",
					userid: "",
					drivingLicense: "",
					drivingLicenseTime: "",
					workLicense: "",
					createuser: "",
				},
				// 分页查询数据
				queryInfo: {
					pageNo: 1,
					pageSize: 10
				},
				// 分页列表
				driverList: [],
				total: 0,			
				// 上传身份证URL
				updateUserIdUrl: "http://81.70.151.121:8080/jeecg-boot/kDriver/uploadImageUserid",
				updateDrivingLicenseUrl: "http://81.70.151.121:8080/jeecg-boot/kDriver/uploadImageDriver",
				updateWorkLicenseUrl: "http://81.70.151.121:8080/jeecg-boot/kDriver/uploadImagePostCard",
				// 编辑数据
				editDialogVisible:false,
				editForm:{},
			}
		},
		created() {
			this.getDriverList()
		},
		methods: {
			// 根据分页查询列表
			async getDriverList() {
				const {
					data: res
				} = await this.$http.get('kDriver/list', {
					params: this.queryInfo
				})
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				// this.$message.success('获取信息成功')
				this.driverList = res.result.records
				this.total = res.result.total
				console.log(this.driverList)
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

			// 创建图片上传成功的回调
			handleUserIdUrlSuccess(response, file, fileList) {
				console.log(response)
				this.addForm.userid = response.result.UseridFileName
			},
			handleDrivingLicenseUrlSuccess(response, file, fileList) {
				console.log(response)
				this.addForm.drivingLicense = response.result.DriverFileName
			},
			handleWorkLicenseUrlSuccess(response, file, fileList) {
				console.log(response)
				this.addForm.workLicense = response.result.PostCardFileName
			},

			// 创建对话框
			addInfo() {
				// console.log(this.addForm)
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					// 发起添加信息的数据请求
					const {
						data: res
					} = await this.$http.post('kDriver/add', this.addForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('添加信息失败')
					}
					// 添加成功，关闭对话框，刷新数据列表，提示添加成功
					this.addDialogVisible = false
					this.getDriverList()
					this.$message.success('添加信息成功')
				})
			},

			// 监听创建对话框关闭
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
			},

			// 展示编辑的对话框
			async showEditDialog(id) {
				// console.log(driverNo)
				const {
					data: res
				} = await this.$http.get('kDriver/list?id=' + id)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.editForm = res.result.records[0]
				// this.editContractData.push(res.result.driverStartContractPeriod)
				// this.editContractData.push(res.result.driverEndContractPeriod)
				// this.editContractData.join(',')
				// console.log(this.editContractData)
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
					} = await this.$http.post('kDriver/edit', this.editForm)

					if (res.code !== 200) {
						return this.$message.error('更新信息失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.editDialogVisible = false
					this.getDriverList()
					this.$message.success('更新信息成功')
				})
			},

			// 删除操作
			async removeById(id) {
				const {
					data: res
				} = await this.$http.get('kDriver/deleteById?id=' + id)

				if (res.code !== 200) {
					return this.$message.error('删除失败')
				}
				// 删除成功，刷新数据列表，提示删除成功
				this.getDriverList()
				this.$message.success('删除成功')
			},
		}
	}
</script>

<style scoped>

</style>
