<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item >首页</el-breadcrumb-item>
			<el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
			<el-breadcrumb-item>车辆管理</el-breadcrumb-item>
			<el-breadcrumb-item>车辆信息</el-breadcrumb-item>
		</el-breadcrumb>
		<!-- 车辆信息页面 -->
		<!-- 创建搜索区 -->
		<!-- <el-row> -->



		<!-- 卡片视图区 -->
		<el-card class="box-card">
			<!-- 创建按钮 -->
			<el-button type="primary" plain @click="addDialogVisible = true">创建</el-button>
			<el-input v-model="queryInfo.carName" placeholder="车牌号" clearable style="width: 200px;margin-left: 100px;"></el-input>
			<el-button type="primary" plain @click="handleQueryBtn" style="margin-left: 30px;">查询</el-button>
			<el-button type="primary" plain @click="handleQueryBackBtn" style="margin-left: 30px;">返回</el-button>
			
			<el-table :data="carList" border stripe style="width: 100%;margin-top: 8px;" :row-style="{height:'60px'}" :cell-style="{padding:'0px'}" :header-cell-style="{background:'#f8f8f9', color:'#000000'}">
				<el-table-column prop="id" label="ID" v-if="false">
				</el-table-column>
				<el-table-column prop="licensePlate" label="车牌号" width="100px">
				</el-table-column>
				<el-table-column prop="carstate" label="车辆状态" width="100px">
				</el-table-column>
				<el-table-column prop="name" label="车主姓名" width="100px">
				</el-table-column>
				<el-table-column prop="phoneno" label="车主手机号" width="150px">
				</el-table-column>
				<el-table-column prop="companyl" label="所属分公司" width="150px">
				</el-table-column>
				<el-table-column prop="driver" label="对应司机" width="100px">
				</el-table-column>
				<el-table-column prop="driverphone" label="司机电话" width="150px">
				</el-table-column>
				<el-table-column prop="vehicleLicense" label="行驶证" width="150px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="点击查看大图" placement="top">
							<el-image style="width: 80px; height: 40px" :src="scope.row.vehicleLicense" :preview-src-list="srcList" @click="handleClickImage(scope.row.vehicleLicense)"></el-image>
						</el-tooltip>						
					</template>
				</el-table-column>
				<el-table-column prop="vehiclelicensedate" label="行驶证有效期" width="150px">
				</el-table-column>
				<el-table-column prop="checkDate" label="年检有效期" width="150px">
				</el-table-column>
				<el-table-column  prop="insurance" label="保险单据" width="150px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="点击查看大图" placement="top" width="150px">
							<el-image style="width: 80px; height: 40px" :src="scope.row.insurance" :preview-src-list="srcList" @click="handleClickImage(scope.row.insurance)"></el-image>
						</el-tooltip>					
					</template>
				</el-table-column>
				<el-table-column prop="insuranceDate" label="保险起止日期" width="150px">
				</el-table-column>
				<el-table-column  prop="caroperating" label="车辆营运证" width="150px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="点击查看大图" placement="top">
							<el-image style="width: 80px; height: 40px" :src="scope.row.caroperating" :preview-src-list="srcList" @click="handleClickImage(scope.row.caroperating)"></el-image>
						</el-tooltip>
						
					</template>
				</el-table-column>
				<el-table-column prop="operatingdate" label="营运证到期时间" width="150px">
				</el-table-column>
				<!-- <el-table-column prop="carmargin" label="车辆保证金" width="100px">
					<template slot-scope="scope">
						<span :style="{'color':scope.row.carmargin < 500?'red':'black'}">{{scope.row.carmargin}}</span>
					</template>
				</el-table-column> -->
				<el-table-column prop="createuser" label="创建人" width="150px">
				</el-table-column>
				<el-table-column prop="ctTime" label="创建时间" width="150px">
				</el-table-column>
				<el-table-column prop="utTime" label="最近更新时间" width="150px">
				</el-table-column>
				<el-table-column label="操作" width="300px">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.id)">编辑</el-button>
						<!-- 删除按钮 -->
						<el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.id)" style="margin-left: 10px;">
							<el-button type="danger" size="mini" slot="reference">删除</el-button>
						</el-popconfirm>
						<!-- 查违章按钮 -->
						<el-button type="warning" size="mini" style="margin-left: 10px;" @click="showQueryViolationDialog(scope.row.licensePlate)">查违章</el-button>
						

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

		<!-- 创建的对话框 -->
		<el-dialog title="创建车辆信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
			<!-- 创建的表单 -->
			<el-form :model="addForm"  ref="addFormRef" label-width="120px">				
					<el-form-item label="车牌号:" prop="licensePlate">
						<el-input v-model="addForm.licensePlate"></el-input>
					</el-form-item>
					<el-form-item label="车辆状态:" prop="carstate">
						<el-select v-model="addForm.carstate" placeholder="全部" clearable>
							<el-option v-for="item in carstateList" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="车架号:" prop="frame">
						<el-input v-model="addForm.frame"></el-input>
					</el-form-item>
					<el-form-item label="发动机号:" prop="engine">
						<el-input v-model="addForm.engine"></el-input>
					</el-form-item>
					<el-form-item label="车主姓名:" prop="name">
						<el-input v-model="addForm.name"></el-input>
					</el-form-item>
					<el-form-item label="车主手机号:" prop="phoneno">
						<el-input v-model="addForm.phoneno"></el-input>
					</el-form-item>
					<el-form-item label="所属分公司:" prop="companyl">
						<el-select v-model="addForm.companyl" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteCompanyMethod"
						 :loading="companyLoading" style="width: 200px;">
							<el-option v-for="item in companyOptions" :key="item.index" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="行驶证:" prop="vehicleLicense">
						<el-image v-if="addForm.vehicleLicense" style="width: 150px;" :src="addForm.vehicleLicense"></el-image>
						<el-upload name="imgFile" :action="updateVehicleLicenseUrl" :auto-upload="true" :on-success="handleVehicleLicenseUrlSuccess" :show-file-list="false">
							<el-button size="small" type="primary" plain>上传保险单照片</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="行驶证有效期:" prop="vehiclelicensedate">
						<el-date-picker v-model="addForm.vehiclelicensedate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="年检有效期:" prop="checkDate">
						<el-date-picker v-model="addForm.checkDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="保险单据:" prop="insurance">
						<el-image v-if="addForm.insurance" style="width: 150px;" :src="addForm.insurance"></el-image>
						<el-upload name="imgFile" :action="updateInsuranceUrl" :auto-upload="true" :on-success="handleInsuranceUrlSuccess" :show-file-list="false">
							<el-button size="small" type="primary" plain>上传保险单照片</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="保险到期时间:" prop="insuranceDate">
						<el-date-picker v-model="addForm.insuranceDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
					<el-form-item label="车辆营运证:" prop="caroperating">
						<el-image v-if="addForm.caroperating" style="width: 150px;" :src="addForm.caroperating"></el-image>
						<el-upload name="imgFile" :action="updateCaroperatingUrl" :auto-upload="true" :on-success="handleCaroperatingUrlSuccess" :show-file-list="false">
							<el-button size="small" type="primary" plain>上传营运证照片</el-button>
						</el-upload>
					</el-form-item>
					<el-form-item label="营运证到期时间:" prop="operatingdate">
						<el-date-picker v-model="addForm.operatingdate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addInfo">确 定</el-button>
			</span>

		</el-dialog>


		<!-- 编辑的对话框 -->
		<el-dialog title="编辑车辆信息" :visible.sync="editDialogVisible" width="55%" @close="editDialogClosed">
			<el-form :model="editForm" ref="editFormRef" label-width="120px">
				<el-form-item label="车牌号:" prop="licensePlate">
					<el-input v-model="editForm.licensePlate"></el-input>
				</el-form-item>
				<el-form-item label="车辆状态:" prop="carstate">
					<el-select v-model="editForm.carstate" placeholder="全部" clearable>
						<el-option v-for="item in carstateList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="车架号:" prop="frame">
					<el-input v-model="editForm.frame"></el-input>
				</el-form-item>
				<el-form-item label="发动机号:" prop="engine">
					<el-input v-model="editForm.engine"></el-input>
				</el-form-item>
				<el-form-item label="车主姓名:" prop="name">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="车主手机号:" prop="phoneno">
					<el-input v-model="editForm.phoneno"></el-input>
				</el-form-item>
				<el-form-item label="所属分公司:" prop="companyl">
					<el-input v-model="editForm.companyl"></el-input>
				</el-form-item>
				<el-form-item label="行驶证:" prop="vehicleLicense">
					<el-image v-if="editForm.vehicleLicense" style="width: 150px;" :src="editForm.vehicleLicense"></el-image>
					<el-upload name="imgFile" :action="updateVehicleLicenseUrl" :auto-upload="true" :on-success="handleEditVehicleLicenseUrlSuccess" :show-file-list="false">
						<el-button size="small" type="primary" plain>上传保险单照片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="行驶证有效期:" prop="vehiclelicensedate">
					<el-date-picker v-model="editForm.vehiclelicensedate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="年检有效期:" prop="checkDate">
					<el-date-picker v-model="editForm.checkDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="保险单据:" prop="insurance">
					<el-image v-if="editForm.insurance" style="width: 150px;" :src="editForm.insurance"></el-image>
					<el-upload name="imgFile" :action="updateInsuranceUrl" :auto-upload="true" :on-success="handleEditInsuranceUrlSuccess" :show-file-list="false">
						<el-button size="small" type="primary" plain>上传保险单照片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="保险到期时间:" prop="insuranceDate">
					<el-date-picker v-model="editForm.insuranceDate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="车辆营运证:" prop="caroperating">
					<el-image v-if="editForm.caroperating" style="width: 150px;" :src="editForm.caroperating"></el-image>
					<el-upload name="imgFile" :action="updateCaroperatingUrl" :auto-upload="true" :on-success="handleEditCaroperatingUrlSuccess" :show-file-list="false">
						<el-button size="small" type="primary" plain>上传营运证照片</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="营运证到期时间:" prop="operatingdate">
					<el-date-picker v-model="editForm.operatingdate" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					</el-date-picker>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editInfo">确 定</el-button>
			</span>

		</el-dialog>
		
		<!-- 查询违章 -->
		<el-dialog title="违章记录" :visible.sync="queryViolationDialog" width="80%" >
			<el-table :data="queryViolationList" border stripe style="width: 100%;margin-top: 8px;" :row-style="{height:'60px'}" :cell-style="{padding:'0px'}" :header-cell-style="{background:'#f8f8f9', color:'#000000'}">
				<el-table-column prop="carNumber" label="车牌号">
				</el-table-column>
				<el-table-column prop="illegalAct" label="违章行为">
				</el-table-column>
				<el-table-column prop="illegalArea" label="违章位置">
				</el-table-column>
				<el-table-column prop="illegalDate" label="违章时间">
				</el-table-column>
				<el-table-column prop="illegalFen" label="扣分">
				</el-table-column>
				<el-table-column prop="illegalMoney" label="罚款">
				</el-table-column>
			</el-table>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				showImageSrc: '',
				// 查询数据
				queryInfo: {
					pageNo: 1,
					pageSize: 10
				},
				// 总列表
				allDriverList: [],
				// 分页列表
				carList: [],
				// 总条数
				total: 0,
				srcList: [],
	
				// 创建对话框数据
				addDialogVisible: false,
				addForm: {
					licensePlate:"",
					carstate:"",
					frame:"",
					engine:"",
					name:"",
					phoneno:"",
					companyl:"",
					vehicleLicense:"",
					vehiclelicensedate:"",
					checkDate:"",
					insurance:"",
					insuranceDate:"",
					caroperating:"",
					operatingdate:"",
					carmargin:"",
					fine:"",
					finedate:"",
					finewhy:"",
					management:"",
					managementDate:"",
					payFee:"",				

				},
				// 创建表单验证规则
				addFormRules: {
					driverName: [{
						required: true,
						message: "请输入司机姓名",
						trigger: 'blur'
					}],
					driverTel: [{
						required: true,
						message: "请输入司机电话",
						trigger: 'blur'
					}],
					driverEmergencyContact: [{
						required: true,
						message: "请输入紧急联系人",
						trigger: 'blur'
					}],
					driverEmergencyTel: [{
						required: true,
						message: "请输入紧急电话",
						trigger: 'blur'
					}],
					driverRelationship: [{
						required: true,
						message: "请选择关系",
						trigger: 'blur'
					}],
					driverCarOwner: [{
						required: true,
						message: "请输入车主姓名",
						trigger: 'blur'
					}],
					driverOwnerTel: [{
						required: true,
						message: "请输入车主电话",
						trigger: 'blur'
					}],
					driverLicense: [{
						required: true,
						message: "请输入车牌",
						trigger: 'blur'
					}],
					driverModel: [{
						required: true,
						message: "请选择车型",
						trigger: 'blur'
					}],
					driverWidth: [{
						required: true,
						message: "请输入车宽",
						trigger: 'blur'
					}],
					driverHigh: [{
						required: true,
						message: "请输入车高",
						trigger: 'blur'
					}],
					driverLoad: [{
						required: true,
						message: "请输入载重",
						trigger: 'blur'
					}],
					chooseContractData: [{
						required: true,
						message: "请输入合同周期",
						trigger: 'blur'
					}],
					driverCompany: [{
						required: true,
						message: "请输入所属公司",
						trigger: 'blur'
					}],
					searchEmployee: [{
						required: true,
						message: "请输入车所属调度",
						trigger: 'blur'
					}],
					driverStatus: [{
						required: true,
						message: "请选择状态",
						trigger: 'blur'
					}],
					driverCertificateDriver: [{
						required: true,
						message: "请上传驾驶证",
						trigger: 'blur'
					}],
					driverCertificateDriving: [{
						required: true,
						message: "请上传行驶证",
						trigger: 'blur'
					}],
					driverCertificatePostCard: [{
						required: true,
						message: "请上传上岗证",
						trigger: 'blur'
					}],

				},
				// 车辆状态
				carstateList: [{
					value: '正常',
					label: '正常'
				}, {
					value: '停车',
					label: '停车'
				}],
				// 创建时间选择器
				chooseContractData: [],
				// 编辑对话框数据
				// 编辑对话框显示与隐藏
				editDialogVisible: false,
				editForm: {},
				// 编辑时间选择器
				editContractData: [],

				// 创建页面选择框数据
				options: [],
				companyList: [],
				loading: false,
				states: [],

				// 员工ID/姓名查询
				searchEmployee: '',

				// 证件照片
				dialogImageUrl: '',
				dialogVisible: false,
				disabled: false,
				// 照片数量限制
				uploadLimit: 1,

				updateVehicleLicenseUrl: "http://81.70.151.121:8080/jeecg-boot/kCarinformation/uploadImagevehicleLicense",
				updateInsuranceUrl: "http://81.70.151.121:8080/jeecg-boot/kCarinformation/uploadImageinsurance",
				updateCaroperatingUrl: "http://81.70.151.121:8080/jeecg-boot/kCarinformation/uploadImagecaroperating",
				updatePayFeeUrl: "http://81.70.151.121:8080/jeecg-boot/kCarinformation/uploadImagepayFee",

				// 图片放大
				showDriverCertificateDriver: false,
				// 查询违章数据
				queryViolationDialog:false,
				queryViolationList:[],
				
				// 公司选择框数据
				queryCompanyName: '',
				companyOptions: [],
				companyList: [],
				companyLoading: false,
				companyStates: [],
			}
		},

		created() {
			this.getCarList()
			this.getAllCompanyList()
		},

		methods: {
			// 获取所有公司名称
			async getAllCompanyList() {
				const {
					data: res
				} = await this.$http.get('base/company/getAllCompanyName')
				// console.log(res)
				if (res.code !== 200) {
					return
				}
				this.companyStates = res.result
				this.companyList = this.companyStates.map(item => {
					return {
						value: `${item}`,
						label: `${item}`
					};
				});
				this.companyOptions = this.companyList
			},
			
			// 选择公司方法
			remoteCompanyMethod(query) {
				if (query !== '') {
					this.companyLoading = true;
					setTimeout(() => {
						this.companyLoading = false;
						this.companyOptions = this.companyList.filter(item => {
							return item.value.indexOf(query) > -1;
						});
					}, 300)
				} else {
					this.companyOptions = this.companyList
				}
			},

			//分页区域 
			// 根据分页查询列表
			async getCarList() {
				const {
					data: res
				} = await this.$http.get('kCarinformation/list', {
					params: this.queryInfo
				})
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				this.$message.success('获取信息成功')
				this.carList = res.result.records
				this.total = res.result.total
			},
			
			//点击查看放大图片 
			handleClickImage(src) {
				this.srcList= []
				this.srcList.push(src)
			},

			// 点击查询按钮
			handleQueryBtn() {
				this.queryInfo.licensePlate = "*" + this.queryInfo.carName + "*"
				this.getCarList()
			},
			// 返回按钮
			handleQueryBackBtn() {
				this.queryInfo.pageNo = 1
				this.queryInfo.pageSize = 10
				this.queryInfo.licensePlate = ''
				this.queryInfo.carName = ''
				this.getCarList()
			},
			
			// pageSize 改变的事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getCarList()
			},

			// 页码值改变事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNo = newPage
				this.getCarList()
			},

			// //上传时，判断文件的类型及大小是否符合规则
			// beforeAvatarUpload(file) {
			// 	const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
			// 	const isLt2M = file.size / 1024 / 1024 < 2
			// 	if (!isJPG) {
			// 		this.$message.warning('上传图片只能是 JPG/PNG/GIF 格式!')
			// 		return isJPG
			// 	}
			// 	if (!isLt2M) {
			// 		this.$message.warning('上传图片大小不能超过 2MB!')
			// 		return isLt2M
			// 	}
			// 	this.multfileImg = file
			// 	return isJPG && isLt2M
			// },
			// 创建图片上传成功的回调
			handleVehicleLicenseUrlSuccess(response, file, fileList) {
				console.log(response)
				this.addForm.vehicleLicense = response.result.vehicleLicenseFileName
			},
			handleInsuranceUrlSuccess(response, file, fileList) {
				console.log(response)
				this.addForm.insurance = response.result.insuranceFileName
			},
			handleCaroperatingUrlSuccess(response, file, fileList) {
				console.log(response)
				this.addForm.caroperating = response.result.caroperatingFileName
			},
			handlePayFeeUrlSuccess(response, file, fileList) {

				this.addForm.payFee = response.result.payFeeFileName
			},
			handleWarning() {
				this.$message.error('请先删除后再添加')
			},

			// 创建对话框
			addInfo() {
				// console.log(this.addForm)
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					// 发起添加信息的数据请求
					const {
						data: res
					} = await this.$http.post('kCarinformation/add', this.addForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('添加信息失败')
					}
					// 添加成功，关闭对话框，刷新数据列表，提示添加成功
					this.addDialogVisible = false
					this.getCarList()
					// this.getAllDriverList()
					this.$message.success('添加信息成功')
				})
			},
			// 监听创建对话框关闭
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
				// this.addForm = {}
				// this.searchEmployee = ""
				// this.options = this.companyList
			},


			// 编辑对话框操作	

			// 创建图片上传成功的回调
			handleEditVehicleLicenseUrlSuccess(response, file, fileList) {
				console.log(response)
				this.editForm.vehicleLicense = response.result.vehicleLicenseFileName
			},
			handleEditInsuranceUrlSuccess(response, file, fileList) {
				console.log(response)
				this.editForm.insurance = response.result.insuranceFileName
			},
			handleEditCaroperatingUrlSuccess(response, file, fileList) {
				console.log(response)
				this.editForm.caroperating = response.result.caroperatingFileName
			},
			handleEditPayFeeUrlSuccess(response, file, fileList) {
				this.editForm.payFee = response.result.payFeeFileName
			},
			// 展示编辑公司的对话框
			async showEditDialog(id) {
				// console.log(driverNo)
				const {
					data: res
				} = await this.$http.get('kCarinformation/list?id=' + id)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.editForm = res.result.records[0]
				// 显示对话框
				this.editDialogVisible = true
			},

			// 监听修改用户对话框关闭事件
			editDialogClosed() {
				this.$refs.editFormRef.resetFields()
				this.editContractData = []
			},


			// 修改信息并提交
			editInfo() {
				this.$refs.editFormRef.validate(async valid => {
					if (!valid) return
					// 发起修改信息的数据请求
					const {
						data: res
					} = await this.$http.post('kCarinformation/edit', this.editForm)

					if (res.code !== 200) {
						return this.$message.error('更新信息失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.editDialogVisible = false
					this.getCarList()
					// this.getAllDriverList()
					this.$message.success('更新信息成功')
				})
			},

			// 删除操作
			async removeById(id) {
				const {
					data: res
				} = await this.$http.get('kCarinformation/deleteById?id=' + id)

				if (res.code !== 200) {
					return this.$message.error('删除失败')
				}
				// 删除成功，刷新数据列表，提示删除成功
				this.getCarList()
				// this.getAllDriverList()
				this.$message.success('删除成功')
			},
			
			// 查询违章
			async showQueryViolationDialog(carNumber) {
				const {
					data: res
				} = await this.$http.get('killegal/list?carNumber=' + carNumber)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				if(res.result.records.length == 0){
					return this.$message.warning('未查询到违章')
					
				}
				this.queryViolationList = res.result.records
				// 显示对话框
				this.queryViolationDialog = true
			},

		}
	}
</script>

<style lang="less" scoped>
	.addDriver {
		display: flex;
	}

	.emergency {
		display: flex;

		.driverEmergencyContact {
			flex: 2;
		}

		.driverRelationship {
			flex: 2;
		}

		.driverEmergencyTel {
			flex: 3
		}
	}

	.carOwner {
		display: flex;
	}

	.driverCarType {
		display: flex;
	}


	.avatar-uploader .el-upload {
		border: 1px dashed #d9d9d9;
		border-radius: 6px;
		cursor: pointer;
		position: relative;
		overflow: hidden;
	}

	.avatar-uploader .el-upload:hover {
		border-color: #409EFF;
	}

	.avatar-uploader-icon {
		font-size: 28px;
		color: #8c939d;
		width: 178px;
		height: 178px;
		line-height: 178px;
		text-align: center;
	}

	.avatar {
		width: 178px;
		height: 178px;
		display: block;
	}

	.box-card {
		margin-top: 10px;
	}
</style>
