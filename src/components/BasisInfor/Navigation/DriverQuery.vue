<template>
	<div>
		<!-- 司机车辆查询页面 -->
		<!-- 创建搜索区 -->
		<el-row>

			<!-- 创建按钮 -->
			<el-col :span="2">
				<el-button type="info"  @click="addDialogVisible = true">创建</el-button>
			</el-col>

			<el-col :span="2">
				<el-input v-model="queryInfo.driverName" placeholder="司机名" clearable></el-input>
			</el-col>

			<el-col :span="2" style="margin-left: 10px;">
				<el-input v-model="queryInfo.driverCarOwner" placeholder="车主名" clearable></el-input>
			</el-col>

			<el-col :span="2" style="margin-left: 10px;">
				<el-input v-model="queryInfo.driverLicense" placeholder="车牌号" clearable></el-input>
			</el-col>


			<!-- 公司下拉框 -->
			<el-col :span="1" style="margin-left: 20px;font-size: 17px;margin-top: 8px;"><span>公司:</span></el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.driverCompany" placeholder="全部" clearable filterable remote>
					<el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>


			<!-- 状态下拉框 -->
			<el-col :span="1"style="margin-left: 20px;font-size: 17px;margin-top: 8px;"><span>状态:</span></el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.driverStatus" placeholder="全部" clearable>
					<el-option v-for="item in driverStatusSelect" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>


			<!-- 载重下拉框 -->
			<el-col :span="1" style="margin-left: 20px;font-size: 17px;margin-top: 8px;"><span>载重:</span></el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.driverLoadClass" placeholder="全部" clearable>
					<el-option v-for="item in driverLoadSelect" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>


			<!-- 查询按钮 -->
			<el-col :span="2" style="margin-left: 20px;">
				<el-button type="info"  @click="handleQueryBtn">查询</el-button>
			</el-col>
			
			<!-- 返回按钮 -->
			<el-col :span="2" style="margin-left: 15px;">
				<el-button type="info"  @click="handleQueryBackBtn">返回</el-button>
			</el-col>

		</el-row>


		<!-- 卡片视图区 -->
		<el-card class="box-card">
			<el-table :data="driverList" stripe style="width: 100%">
				<el-table-column v-if="false" prop="driverId" label="ID">
				</el-table-column>
				<el-table-column prop="driverNo" label="司机ID">
				</el-table-column>
				<el-table-column prop="driverName" label="司机名">
				</el-table-column>
				<el-table-column prop="driverModel" label="车型">
				</el-table-column>
				<el-table-column prop="driverCarOwner" label="车主名">
				</el-table-column>
				<el-table-column prop="driverLoad" label="载重">
				</el-table-column>
				<el-table-column prop="driverTel" label="司机电话">
				</el-table-column>
				<el-table-column v-if="false" prop="driverLicense" label="车牌">
				</el-table-column>
				<el-table-column prop="driverCompany" label="所属公司">
				</el-table-column>
				<el-table-column v-if="false" prop="driverScheduling" label="所属调度">
				</el-table-column>
				<el-table-column prop="driverStatus" label="状态">
				</el-table-column>
				<el-table-column prop="driverCertificateDriver" label="驾驶证">
					<template slot-scope="scope">
						<el-image style="width: 80px; height: 40px" :src="scope.row.driverCertificateDriver"   @click="handleClickImage(scope.row.driverCertificateDriver)" ></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="driverCertificateDriving" label="行驶证">
					<template slot-scope="scope">
						<el-image style="width: 80px; height: 40px" :src="scope.row.driverCertificateDriving" @click="handleClickImage(scope.row.driverCertificateDriving)"></el-image>
					</template>
				</el-table-column>
				<el-table-column prop="driverCertificatePostCard" label="上岗证">
					<template slot-scope="scope">
						<el-image style="width: 80px; height: 40px" :src="scope.row.driverCertificatePostCard" @click="handleClickImage(scope.row.driverCertificatePostCard)"></el-image>
					</template>
				</el-table-column>

				<el-table-column label="操作" width="200px">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.driverNo)">编辑</el-button>
						<!-- 删除按钮 -->

						<el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.driverId)" style="margin-left: 10px;">
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
			<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
				<el-form-item label="车主ID:" >
					<el-input disabled style="width: 30%;"></el-input>
				</el-form-item>

				<div class="addDriver">
					<el-form-item label="司机姓名:" prop="driverName">
						<el-input v-model="addForm.driverName"></el-input>
					</el-form-item>
					<el-form-item label="司机TEL:" prop="driverTel">
						<el-input v-model="addForm.driverTel"></el-input>
					</el-form-item>
				</div>
				<div class="emergency">
					<el-form-item label="紧急联系人" class="driverEmergencyContact" prop="driverEmergencyContact">
						<el-input v-model="addForm.driverEmergencyContact"></el-input>
					</el-form-item>
					<el-form-item label="紧急TEL:" class="driverEmergencyTel" prop="driverEmergencyTel">
						<el-input v-model="addForm.driverEmergencyTel"></el-input>
					</el-form-item>
					<el-form-item label="关系:" class="driverRelationship" prop="driverRelationship">
						<el-select v-model="addForm.driverRelationship" placeholder="全部" clearable>
							<el-option v-for="item in relationSelect" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>

				</div>

				<div class="carOwner">
					<el-form-item label="车主姓名:" prop="driverCarOwner">
						<el-input v-model="addForm.driverCarOwner" clearable></el-input>
					</el-form-item>
					<el-form-item label="车主TEL:" prop="driverOwnerTel">
						<el-input v-model="addForm.driverOwnerTel" clearable></el-input>
					</el-form-item>
				</div>

				<el-form-item label="车牌:" prop="driverLicense">
					<el-input v-model="addForm.driverLicense" style="width: 30%;" clearable></el-input>
					<!-- 车牌颜色 -->
					<el-select v-model="addForm.driverLicenseColour" placeholder="全部" clearable style="width: 15%;margin-left: 10px;">
						<el-option v-for="item in licenseColourSelect" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<div class="driverCarType">
					<el-form-item label="车型:" prop="driverModel">
						<el-select v-model="addForm.driverModel" placeholder="选择" clearable>
							<el-option v-for="item in driverModelSelect" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="宽:" prop="driverWidth">
						<el-input v-model="addForm.driverWidth" placeholder="单位:米"></el-input>
					</el-form-item>
					<el-form-item label="高:" prop="driverHigh">
						<el-input v-model="addForm.driverHigh" placeholder="单位:米"></el-input>
					</el-form-item>
					<el-form-item label="载重:" prop="driverLoad">
						<el-input v-model="addForm.driverLoad" placeholder="单位:吨"></el-input>
					</el-form-item>
				</div>

				<el-form-item label="合同周期" placeholder="yyyy-MM-dd" prop="chooseContractData">
					<el-date-picker v-model="addForm.chooseContractData" type="daterange" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" @change="handleDataChange">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="所属公司" prop="driverCompany">
					<el-select v-model="addForm.driverCompany" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteMethod"
					 :loading="loading" style="width: 50%;">
						<el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属调度" prop="searchEmployee">
					
					
					<el-input clearable placeholder="请输入员工姓名" v-model="addForm.searchEmployee" style="width: 50%;">
						<el-button slot="append" icon="el-icon-search" @click="handleSearchEmployee"></el-button>
					</el-input>
				</el-form-item>
				<el-form-item label="状态" prop="driverStatus">
					<el-select v-model="addForm.driverStatus" placeholder="请选择">
						<el-option v-for="item in driverStatusSelect" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				
				<el-form-item label="驾驶证:" prop="driverCertificateDriver">
					<el-image v-if="addForm.driverCertificateDriver"  style="width: 100px; height: 50px;" :src="addForm.driverCertificateDriver"></el-image>
					<el-upload name="imgFile" :before-upload="beforeAvatarUpload" :action="updateDriverUrl" :auto-upload="true" :on-success="handleDriverUrlSuccess" :show-file-list="false" >
						<el-button size="small" type="primary" plain>点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="行驶证:" prop="driverCertificateDriving">
					<el-image v-if="addForm.driverCertificateDriving"  style="width: 100px; height: 50px;" :src="addForm.driverCertificateDriving"></el-image>
					<el-upload name="imgFile" :action="updateDrivingUrl" :auto-upload="true" :on-success="handleDrivingUrlSuccess"
					  :show-file-list="false" >
						<el-button size="small" type="primary" plain>点击上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="上岗证:" prop="driverCertificatePostCard">
					<el-image v-if="addForm.driverCertificatePostCard" style="width: 100px; height: 50px;" :src="addForm.driverCertificatePostCard"></el-image>
					<el-upload name="imgFile" :action="updatePostCardUrl" :auto-upload="true" :on-success="handlePostCardUrlSuccess"
					  :show-file-list="false" >
						<el-button size="small" type="primary" plain>点击上传</el-button>
					</el-upload>
				</el-form-item>

<!-- 				<el-form-item label="证件:">

					<el-upload name="imgFile" :action="updateDriverUrl" :auto-upload="true" list-type="picture-card"
					 :before-upload="beforeAvatarUpload" :on-success="handleDriverUrlSuccess" :show-file-list="false">
						　　<i class="el-icon-plus"></i>
						　　<div slot="tip" class="el-upload__tip">驾驶证</div>
					</el-upload>

					<el-upload name="imgFile"  :action="updateDrivingUrl" :auto-upload="true" list-type="picture-card"
					 :before-upload="beforeAvatarUpload" :on-success="handleDrivingUrlSuccess" :show-file-list="false">
						　　<i class="el-icon-plus"></i>
						　　<div slot="tip" class="el-upload__tip">行驶证</div>
					</el-upload>

					<el-upload name="imgFile"  :action="updatePostCardUrl" :auto-upload="true" list-type="picture-card"
					 :before-upload="beforeAvatarUpload" :on-success="handlePostCardUrlSuccess"  >
						　　<i class="el-icon-plus"></i>
						　　<div slot="tip" class="el-upload__tip">上岗证</div>
					</el-upload>

				</el-form-item> -->
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addInfo">确 定</el-button>
			</span>

		</el-dialog>


		<!-- 编辑地区的对话框 -->
		<el-dialog title="编辑车辆信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
			<!-- 创建的表单 -->
			<el-form :model="editForm" ref="editFormRef" label-width="100px">
				<el-form-item label="车主ID:">
					<el-input disabled v-model="editForm.driverNo"></el-input>
				</el-form-item>
				<el-form-item label="司机姓名:">
					<el-input v-model="editForm.driverName"></el-input>
				</el-form-item>
				<el-form-item label="司机联系方式:">
					<el-input v-model="editForm.driverTel"></el-input>
				</el-form-item>
				<el-form-item label="紧急联系人">
					<el-input v-model="editForm.driverEmergencyContact"></el-input>
				</el-form-item>
				<el-form-item label="关系:">
					<el-input v-model="editForm.driverRelationship"></el-input>
				</el-form-item>
				<el-form-item label="车主姓名:">
					<el-input v-model="editForm.driverCarOwner"></el-input>
				</el-form-item>
				<el-form-item label="车主联系方式:">
					<el-input v-model="editForm.driverOwnerTel"></el-input>
				</el-form-item>
				<el-form-item label="车牌:">
					<el-input v-model="editForm.driverLicense"></el-input>
				</el-form-item>
				<el-form-item label="车型:">
					<el-input v-model="editForm.driverModel"></el-input>
				</el-form-item>
				<el-form-item label="宽">
					<el-input v-model="editForm.driverWidth"></el-input>
				</el-form-item>
				<el-form-item label="高">
					<el-input v-model="editForm.driverHigh"></el-input>
				</el-form-item>
				<el-form-item label="载重">
					<el-input v-model="editForm.driverLoad"></el-input>
				</el-form-item>
				<el-form-item label="合同周期" placeholder="yyyy-MM-dd">
					<el-date-picker v-model="editContractData" type="daterange" range-separator="至" start-placeholder="开始日期"
					 end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" @change="handleditDataChange">
					</el-date-picker>
				</el-form-item>
				<el-form-item label="所属公司">
					<el-select v-model="editForm.driverCompany" clearable filterable remote placeholder="请选择公司" :remote-method="remoteMethod"
					 :loading="loading" style="width: 50%;">
						<el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="所属调度">
					<el-input v-model="editForm.driverScheduling"></el-input>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="editForm.driverStatus" placeholder="请选择">
						<el-option v-for="item in driverStatusSelect" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="驾驶证:">
					<el-image style="width: 100px; height: 50px;" :src="editForm.driverCertificateDriver"></el-image>
					<el-upload name="imgFile" :action="updateDriverUrl" :auto-upload="true" :on-success="handleEditDriverUrlSuccess"
					 :show-file-list="false" >
						<el-button size="small" type="primary" plain>重新上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="行驶证:">
					<el-image style="width: 100px; height: 50px;" :src="editForm.driverCertificateDriving"></el-image>
					<el-upload name="imgFile" :action="updateDrivingUrl" :auto-upload="true" :on-success="handleEditDrivingUrlUrlSuccess"
					  :show-file-list="false" >
						<el-button size="small" type="primary" plain>重新上传</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="上岗证:">
					<el-image style="width: 100px; height: 50px;" :src="editForm.driverCertificatePostCard"></el-image>
					<el-upload name="imgFile" :action="updatePostCardUrl" :auto-upload="true" :on-success="handleEditPostCardUrlSuccess"
					  :show-file-list="false" >
						<el-button size="small" type="primary" plain>重新上传</el-button>
					</el-upload>
				</el-form-item>
			</el-form>


			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editInfo">确 定</el-button>
			</span>

		</el-dialog>
		
		<!--  -->
		<el-dialog :visible.sync="showDriverCertificateDriver" width="50%" >
		<el-image  :src="showImageSrc"></el-image>
		</el-dialog>
		

	</div>
</template>

<script>
	export default {
		data() {
			return {
			showImageSrc:'',
				// 查询数据
				queryInfo: {
					driverName: '',
					driverCarOwner: '',
					driverLicense: '',
					pageNo: 1,
					pageSize: 10
				},
				// 总列表
				allDriverList: [],
				// 分页列表
				driverList: [
					
				],
				// 总条数
				total: 0,
				srcList:[],
				// 状态选项
				driverStatusSelect: [{
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
				driverLoadSelect: [{
					value: 'A',
					label: '5-10吨'
				}, {
					value: 'B',
					label: '11-20吨'
				}, {
					value: 'C',
					label: '21-30吨'
				}, {
					value: 'D',
					label: '31-40吨'
				}, {
					value: 'E',
					label: '41-50吨'
				}, {
					value: 'F',
					label: '51吨以上'
				}],
				// 创建对话框数据
				addDialogVisible: false,
				addForm: {
					// 创建时间选择器
					chooseContractData: [],
					driverCertificateDriver:'',
					driverCertificateDriving:'',
					driverCertificatePostCard:''
				},
				// 创建表单验证规则
				addFormRules:{
					driverName:[
						{required:true,message:"请输入司机姓名",trigger:'blur'}
					],
					driverTel:[
						{required:true,message:"请输入司机电话",trigger:'blur'}
					],
					driverEmergencyContact:[
						{required:true,message:"请输入紧急联系人",trigger:'blur'}
					],
					driverEmergencyTel:[
						{required:true,message:"请输入紧急电话",trigger:'blur'}
					],
					driverRelationship:[
						{required:true,message:"请选择关系",trigger:'blur'}
					],
					driverCarOwner:[
						{required:true,message:"请输入车主姓名",trigger:'blur'}
					],
					driverOwnerTel:[
						{required:true,message:"请输入车主电话",trigger:'blur'}
					],
					driverLicense:[
						{required:true,message:"请输入车牌",trigger:'blur'}
					],
					driverModel:[
						{required:true,message:"请选择车型",trigger:'blur'}
					],
					driverWidth:[
						{required:true,message:"请输入车宽",trigger:'blur'}
					],
					driverHigh:[
						{required:true,message:"请输入车高",trigger:'blur'}
					],
					driverLoad:[
						{required:true,message:"请输入载重",trigger:'blur'}
					],
					chooseContractData:[
						{required:true,message:"请输入合同周期",trigger:'blur'}
					],
					driverCompany:[
						{required:true,message:"请输入所属公司",trigger:'blur'}
					],
					searchEmployee:[
						{required:true,message:"请输入车所属调度",trigger:'blur'}
					],
					driverStatus:[
						{required:true,message:"请选择状态",trigger:'blur'}
					],
					driverCertificateDriver:[
						{required:true,message:"请上传驾驶证",trigger:'blur'}
					],
					driverCertificateDriving:[
						{required:true,message:"请上传行驶证",trigger:'blur'}
					],
					driverCertificatePostCard:[
						{required:true,message:"请上传上岗证",trigger:'blur'}
					],
					
				},
				// 紧急联系人关系选择
				relationSelect: [{
					value: '亲属',
					label: '亲属'
				}, {
					value: '子女',
					label: '子女'
				}, {
					value: '配偶',
					label: '配偶'
				}],
				// 车牌颜色下拉选择
				licenseColourSelect: [{
					value: '蓝牌',
					label: '蓝牌'
				}, {
					value: '黄牌',
					label: '黄牌'
				}],
				// 车型下拉选择
				driverModelSelect: [{
					value: '4.8M',
					label: '4.8M'
				}, {
					value: '6.9M',
					label: '6.9M'
				}, {
					value: '13M',
					label: '13M'
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

				updateDriverUrl: "http://81.70.151.121:8080/jeecg-boot/base/tBaDriver/uploadImageDriver",
				updateDrivingUrl: "http://81.70.151.121:8080/jeecg-boot/base/tBaDriver/uploadImageDriving",
				updatePostCardUrl: "http://81.70.151.121:8080/jeecg-boot/base/tBaDriver/uploadImagePostCard",
				
				// 图片放大
				showDriverCertificateDriver:false
			}
		},

		created() {
			this.getDriverList()
			this.getAllDriverList()
			this.getAllCompanyList()
		},

		methods: {


			// 获取所有公司名称
			async getAllCompanyList() {
				const {
					data: res
				} = await this.$http.get('base/tBaCompany/getAllCompanyName')

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
				this.options = this.companyList
			},

			// 创建页面选择公司方法
			remoteMethod(query) {
				if (query !== '') {
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
						this.options = this.companyList.filter(item => {
							return item.value.indexOf(query) > -1;
						});
					}, 300)
				} else {
					this.options = this.companyList
				}
			},

			// 查询总数据
			async getAllDriverList() {
				const {
					data: res
				} = await this.$http.get('base/tBaDriver/list')
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
				// console.log(res)
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				this.$message.success('获取信息成功')
				this.driverList = res.result.records
				this.total = res.result.total
				console.log(this.driverList)
			},

			handleClickImage(src){
				this.showImageSrc = src
				this.showDriverCertificateDriver=true
			},
			
			// 点击查询按钮
			async handleQueryBtn() {
				this.getDriverList()
				this.getAllDriverList()
			},
			
			// 点击返回按钮
			handleQueryBackBtn(){
				this.queryInfo.driverName = ''
				this.queryInfo.driverCarOwner = ''
				this.queryInfo.driverLicense = ''
				this.queryInfo.driverCompany = ''
				this.queryInfo.driverStatus = ''
				this.queryInfo.driverLoadClass = ''
				this.queryInfo.pageNo = 1
				this.queryInfo.pageSize = 10
				
				this.getDriverList()
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

			//上传时，判断文件的类型及大小是否符合规则
			beforeAvatarUpload(file) {
				const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
				const isLt2M = file.size / 1024 / 1024 < 2
				if (!isJPG) {
					this.$message.warning('上传头像图片只能是 JPG/PNG/GIF 格式!')
					return isJPG
				}
				if (!isLt2M) {
					this.$message.warning('上传头像图片大小不能超过 2MB!')
					return isLt2M
				}
				this.multfileImg = file
				return isJPG && isLt2M
			},
			// 创建图片上传成功的回调
			handleDriverUrlSuccess(response, file, fileList) {
				console.log(response)
				this.addForm.driverCertificateDriver = response.result.DriverFileName
				this.srcList[0] = this.addForm.driverCertificateDriver
			},
			handleDrivingUrlSuccess(response, file, fileList) {
				this.addForm.driverCertificateDriving = response.result.DrivingFileName
			},
			handlePostCardUrlSuccess(response, file, fileList) {
				this.addForm.driverCertificatePostCard = response.result.PostCardFileName
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
					} = await this.$http.post('base/tBaDriver/add', this.addForm)
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
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
				this.addForm = {}
				this.searchEmployee = ""
				this.options = this.companyList
			},


			// 编辑对话框操作	

			// 编辑上传图片的回调
			handleEditDriverUrlSuccess(response, file, fileList) {
				this.editForm.driverCertificateDriver = response.result.DriverFileName
			},
			
			// 编辑上传图片的回调
			handleEditDrivingUrlUrlSuccess(response, file, fileList) {
				this.editForm.driverCertificateDriving = response.result.DrivingFileName
			},
			
			// 编辑上传图片的回调
			handleEditPostCardUrlSuccess(response, file, fileList) {
				this.editForm.driverCertificatePostCard = response.result.PostCardFileName
			},
			// 展示编辑公司的对话框
			async showEditDialog(driverNo) {
				// console.log(driverNo)
				const {
					data: res
				} = await this.$http.get('base/tBaDriver/findDriver?driverNo=' + driverNo)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.editForm = res.result
				this.editContractData.push(res.result.driverStartContractPeriod)
				this.editContractData.push(res.result.driverEndContractPeriod)
				this.editContractData.join(',')
				console.log(this.editContractData)
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
					} = await this.$http.post('base/tBaDriver/edit', this.editForm)

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
			async removeById(driverId) {
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
			},

			// 创建日期时间选择
			handleDataChange() {
				console.log(this.addForm.chooseContractData)
				this.addForm.driverStartContractPeriod = this.addForm.chooseContractData[0]
				this.addForm.driverEndContractPeriod = this.addForm.chooseContractData[1]
			},
			// 编辑日期时间选择
			handleditDataChange() {
				console.log(this.editContractData)
				this.editForm.driverStartContractPeriod = this.editContractData[0]
				this.editForm.driverEndContractPeriod = this.editContractData[1]
			},

			// 根据员工编号/姓名查询
			async handleSearchEmployee() {
				const firstLetter = this.addForm.searchEmployee[0]
				// console.log(firstLetter)
				if (firstLetter == 0) {
					const {
						data: res
					} = await this.$http.get('tPfPlist/findEmployeeNameAndTeleByEmployeeNo?employeeNo=' + this.addForm.searchEmployee)
					// console.log(res)
					if (res.code !== 200) {
						return this.$message.error('获取信息失败')
					}
					this.addForm.plistEmployeeName = res.result.EMPLOYEE_NAME
					this.addForm.plistEmployeeTele = res.result.EMPLOYEE_TEL
					this.addForm.searchEmployee = res.result.EMPLOYEE_NAME + res.result.EMPLOYEE_TEL
					this.addForm.driverScheduling = res.result.EMPLOYEE_NAME + res.result.EMPLOYEE_TEL
					
				} else {

					const {
						data: res
					} = await this.$http.get('tPfPlist/findEmployeeNameAndTeleByEmployeeName?employeeName=' + this.addForm.searchEmployee)
					// console.log(res)
					if (res.code !== 200) {
						return this.$message.error('获取信息失败')
					}
					this.addForm.plistEmployeeName = res.result[0].EMPLOYEE_NAME
					this.addForm.plistEmployeeTele = res.result[0].EMPLOYEE_TEL
					this.addForm.searchEmployee = res.result[0].EMPLOYEE_NAME + res.result[0].EMPLOYEE_TEL
					this.addForm.driverScheduling = res.result[0].EMPLOYEE_NAME + res.result[0].EMPLOYEE_TEL
				}

			}
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
	
	.box-card{
		margin-top: 10px;
	}
</style>
