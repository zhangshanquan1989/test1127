<template>
	<!-- 公司信息页面 -->
	<div>
		<el-button type="info"  @click="showAddCompanyDialog">创建</el-button>
		<el-input v-model="queryInfo.companyName" placeholder="公司名" clearable style="width: 200px;margin-left: 20px;"></el-input>
		<el-input v-model="queryInfo.companyLegal" placeholder="法人" clearable style="width: 200px;margin-left: 20px;"></el-input>
		<el-button type="info"  @click="handleQueryBtn" style="margin-left: 20px;">查询</el-button>
		<el-button type="info"  @click="handleQueryBackBtn" style="margin-left: 100px;">返回</el-button>
		<el-card class="box-card">
			<el-table :data="companylist" stripe style="width: 100%">
				<el-table-column v-if="false" prop="companyId" label="序号">
				</el-table-column>
				<el-table-column prop="companyNo" label="公司ID" width="100px">
				</el-table-column>
				<el-table-column prop="companyName" label="公司名称" width="250px">
				</el-table-column>
				<el-table-column prop="companyStatus" label="状态" width="100px">
				</el-table-column>
				<el-table-column prop="companyBusiness" label="业务对接人" width="100px">
				</el-table-column>
				<el-table-column prop="companyLegal" label="法人" width="100px">
				</el-table-column>
				<el-table-column prop="companyAddress" label="办公地址" width="420px">
				</el-table-column>
				<el-table-column label="营业执照" width="150px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="点击查看大图" placement="top">
						<el-image style="width: 80px; height: 40px" :src="scope.row.business"   @click="handleClickImage(scope.row.business)" ></el-image>
						</el-tooltip>						
					</template>
				</el-table-column>
				<el-table-column  label="运输许可证" width="150px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="点击查看大图" placement="top">
						<el-image style="width: 80px; height: 40px" :src="scope.row.transport"   @click="handleClickImage(scope.row.transport)" ></el-image>
						</el-tooltip>						
					</template>
				</el-table-column>
				<el-table-column label="操作" width="200">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.companyNo)">编辑</el-button>
						<!-- 删除按钮 -->

							<el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.companyId)" style="margin-left: 10px;">
								<el-button type="danger" size="mini" slot="reference" >删除</el-button>
							</el-popconfirm>
					</template>
				</el-table-column>
			</el-table>

			<!-- 分页区域 -->
			<el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo"
			 :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total" style="margin-top: 10px;">
			</el-pagination>



			<!-- 创建公司的对话框 -->
			<el-dialog class="dialog" title="创建公司" :visible.sync="addCompanyDialogVisible" width="50%" @close="addCompanyDialogClosed">
				<!-- 添加公司的表单 -->
				<el-form :model="addCompanyForm" :rules="addCompanyFormRules" ref="addCompanyFormRef" label-width="100px">
					<el-form-item label="公司名称:" prop="companyName">
						<el-input v-model="addCompanyForm.companyName" style="width: 50%;"></el-input>
					</el-form-item>

					<el-form-item label="状态:" prop="companyStatus">
						<el-select v-model="addCompanyForm.companyStatus" placeholder="请选择" style="width: 30%;">
							<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="业务对接人:" prop="companyBusiness" >
						<el-input v-model="addCompanyForm.companyBusiness" style="width: 50%;"></el-input>
					</el-form-item>
					<el-form-item label="法人:" prop="companyLegal">
						<el-input v-model="addCompanyForm.companyLegal" style="width: 50%;"></el-input>
					</el-form-item>
					<el-form-item label="办公地址:" prop="companyAddress" >
						<el-input id='tipinput' clearable type="text" v-model="addCompanyForm.companyAddress" style="width: 80%;" placeholder="高德接口"></el-input>
					</el-form-item>
					
					<el-form-item label="营业执照:">
						<el-image v-if="addCompanyForm.business"  style="width: 100px; height:150px;" :src="addCompanyForm.business"></el-image>
						<el-upload name="imgFile"  :action="updateBusinessUrl" :auto-upload="true" :on-success="handleBusinessSuccess" :show-file-list="false" >
							<el-button size="small" type="primary" plain>点击上传</el-button>
						</el-upload>
					</el-form-item>
					
					<el-form-item label="运输许可证:">
						<el-image v-if="addCompanyForm.transport"  style="width: 100px; height:150px;" :src="addCompanyForm.transport"></el-image>
						<el-upload name="imgFile"  :action="updateTransportUrl" :auto-upload="true" :on-success="handleTransportSuccess" :show-file-list="false" >
							<el-button size="small" type="primary" plain>点击上传</el-button>
						</el-upload>
					</el-form-item>
				</el-form>

				<span slot="footer" class="dialog-footer">
					<el-button @click="addCompanyDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="addCompany">确 定</el-button>
				</span>

			</el-dialog>

			<!-- 编辑公司的对话框 -->
			<el-dialog title="编辑公司" :visible.sync="editDialogVisible" width="50%" @close="editCompanyDialogClosed">
				<!-- 编辑公司的表单 -->
				<el-form :model="editCompanyForm" :rules="editCompanyFormRules" ref="editCompanyFormRef" label-width="100px">
					<el-form-item label="公司ID:">{{editCompanyForm.companyNo}}</el-form-item>
					<el-form-item label="公司名称:" prop="companyName">
						<el-input clearable v-model="editCompanyForm.companyName"></el-input>
					</el-form-item>

					<el-form-item label="状态:" prop="companyStatus">
						<el-select v-model="editCompanyForm.companyStatus" placeholder="请选择">
							<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
							</el-option>
						</el-select>
					</el-form-item>
					<el-form-item label="业务对接人:" prop="companyBusiness">
						<el-input clearable v-model="editCompanyForm.companyBusiness"></el-input>
					</el-form-item>
					<el-form-item label="法人:" prop="companyLegal">
						<el-input clearable v-model="editCompanyForm.companyLegal"></el-input>
					</el-form-item>
					<el-form-item label="办公地址:" prop="companyAddress">
						<el-input id='editInput' clearable type="text" v-model="editCompanyForm.companyAddress" style="width: 80%;" placeholder="高德接口"></el-input>					
					</el-form-item>
					<el-form-item label="营业执照:">
						<el-image v-if="editCompanyForm.business"  style="width: 100px; height:150px;" :src="editCompanyForm.business"></el-image>
						<el-upload name="imgFile"  :action="updateBusinessUrl" :auto-upload="true" :on-success="handleEditBusinessSuccess" :show-file-list="false" >
							<el-button size="small" type="primary" plain>点击上传</el-button>
						</el-upload>
					</el-form-item>
					
					<el-form-item label="运输许可证:">
						<el-image v-if="editCompanyForm.transport"  style="width: 100px; height:150px;" :src="editCompanyForm.transport"></el-image>
						<el-upload name="imgFile"  :action="updateTransportUrl" :auto-upload="true" :on-success="handleEditTransportSuccess" :show-file-list="false" >
							<el-button size="small" type="primary" plain>点击上传</el-button>
						</el-upload>
					</el-form-item>
				</el-form>

				<span slot="footer" class="dialog-footer">
					<el-button @click="editDialogVisible = false">取 消</el-button>
					<el-button type="primary" @click="editCompanyInfo">确 定</el-button>
				</span>

			</el-dialog>

		</el-card>
		
		<!-- 显示大图 -->
		<el-dialog :visible.sync="showDriverCertificateDriver" width="35%">
		<el-image  :src="showImageSrc" style="width: 100%;"></el-image>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 大图
				showImageSrc:'',
				// 图片放大
				showDriverCertificateDriver:false,
				// 查询参数对象
				queryInfo: {
					pageNo: 1,
					pageSize: 10
				},
				// 商品列表
				companylist: [],
				// 商品总条数
				total: 0,

				// 添加公司数据
				// 控制添加公司对话框的显示与隐藏
				addCompanyDialogVisible: false,

				// 添加公司的表单数据对象
				addCompanyForm: {
					companyAddress: "",
					companyBusiness: "",
					companyLegal: "",
					companyName: "",
					companyStatus: "运营中",
					business:'',
					transport:''
				},
				// 添加公司营业执照的网址
				updateBusinessUrl:'http://81.70.151.121:8080/jeecg-boot/base/tBaCompany/uploadbusiness',
				// 添加运输许可证网址
				updateTransportUrl:'http://81.70.151.121:8080/jeecg-boot/base/tBaCompany/uploadtransport',
				
				// 添加的表单验证规则
				addCompanyFormRules:{
					companyName:[
						{required:true,message:"请输入公司名",trigger:'blur'}
					],
					companyStatus:[
						{required:true,message:"请选择状态",trigger:'blur'}
					],
					companyBusiness:[
						{required:true,message:"请输入对接人",trigger:'blur'}
					],
					companyLegal:[
						{required:true,message:"请输入法人",trigger:'blur'}
					],
					companyAddress:[
						{required:true,message:"请输入办公地址",trigger:'blur'}
					],
				},
				// 编辑公司的表单验证规则
				editCompanyFormRules:{
					companyName:[
						{required:true,message:"请输入公司名",trigger:'blur'}
					],
					companyStatus:[
						{required:true,message:"请选择状态",trigger:'blur'}
					],
					companyBusiness:[
						{required:true,message:"请输入对接人",trigger:'blur'}
					],
					companyLegal:[
						{required:true,message:"请输入法人",trigger:'blur'}
					],
					companyAddress:[
						{required:true,message:"请输入办公地址",trigger:'blur'}
					],
				},

				// 添加公司表单的状态选项
				status: [{
					value: '运营中',
					label: '运营中'
				}, {
					value: '已注销',
					label: '已注销'
				}],

				// 编辑公司对话框数据
				// 编辑公司对话框显示与隐藏
				editDialogVisible: false,
				editCompanyForm: {},

			}
		},
		beforeCreate() {

		},
		created() {

			this.getCompanyList()
		},
		mounted() {

		},
		methods: {
			// 根据分页查询列表
			async getCompanyList() {
				const {
					data: res
				} = await this.$http.get('base/tBaCompany/list', {
					params: this.queryInfo
				})
console.log(res)
				if (res.code !== 200) {
					return this.$message.error('获取公司列表失败')
				}
				this.companylist = res.result.records
				this.total = res.result.total
			},

			// pageSize 改变的事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getCompanyList()
			},

			// 页码值改变事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNo = newPage
				this.getCompanyList()
			},
			// 点击查询按钮
			handleQueryBtn(){
				this.getCompanyList()
			},
			// 返回按钮
			handleQueryBackBtn(){
				this.queryInfo.pageNo = 1
				this.queryInfo.pageSize = 10
				this.queryInfo.companyName = ''
				this.queryInfo.companyLegal = ''
				this.getCompanyList()
			},
			
			handleClickImage(src){
				this.showImageSrc = src
				this.showDriverCertificateDriver=true
			},
			// 创建对话框操作
			
			// 添加营业执照成功
			handleBusinessSuccess(response, file, fileList){
				this.addCompanyForm.business = response.result.businessFileName
				console.log(this.addCompanyForm.business)
			},
			handleTransportSuccess(response, file, fileList){
				this.addCompanyForm.transport = response.result.transportFileName
				console.log(this.addCompanyForm.transport)
			},
			
			// 修改营业执照成功
			handleEditBusinessSuccess(response, file, fileList){
				this.editCompanyForm.business = response.result.businessFileName
				console.log(this.addCompanyForm.business)
			},
			handleEditTransportSuccess(response, file, fileList){
				this.editCompanyForm.transport = response.result.transportFileName
				console.log(this.addCompanyForm.transport)
			},

			// 点击按钮，展示添加对话框
			showAddCompanyDialog() {
				this.addCompanyDialogVisible = true
				// 因为el-dialog显示时，高德搜索框加载未完成，用它在nextTick回调中加载，就成功了
				this.$nextTick(() => {
					let that = this
					//输入提示
					var auto = new AMap.Autocomplete({
						input: "tipinput"
					});
					AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
					function select(e) {
						that.addCompanyForm.companyAddress = e.poi.district + e.poi.address
					}
				})
			},

			// 点击确定按钮，添加新的分类
			addCompany() {
				this.$refs.addCompanyFormRef.validate(async valid => {
					if (!valid) return
					const {
						data: res
					} = await this.$http.post('base/tBaCompany/add', this.addCompanyForm)
					// console.log(res)
					if (res.code !== 200) {
						return this.$message.error('添加公司失败!')
					}
					this.$message.success('添加公司成功！')
					this.getCompanyList()
					this.addCompanyDialogVisible = false
				})
			},

			// 监听对话框的关闭事件，重置表单数据
			addCompanyDialogClosed() {
				this.$refs.addCompanyFormRef.resetFields()
				// this.addCompanyForm.companyAddress = ""
				// this.addCompanyForm.companyBusiness = ""
				// this.addCompanyForm.companyLegal = ""
				// this.addCompanyForm.companyName = ""
				this.addCompanyForm.companyStatus = "运营中"
				this.addCompanyForm.business = ""
				this.addCompanyForm.transport = ""
			},

			// 编辑对话框操作	
			// 展示编辑公司的对话框
			async showEditDialog(companyId) {
				const {
					data: res
				} = await this.$http.get('base/tBaCompany/selectOne?companyId=' + companyId)
				if (res.code !== 200) {
					return this.$message.error('查询公司信息失败！')
				}
				this.editCompanyForm = res.result
				
				// 因为el-dialog显示时，高德搜索框加载未完成，用它在nextTick回调中加载，就成功了
				this.$nextTick(() => {
					let that = this
					//输入提示
					var auto = new AMap.Autocomplete({
						input: "editInput"
					});
					AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
					function select(e) {
						that.editCompanyForm.companyAddress = e.poi.district + e.poi.address
					}
				})
				// 显示对话框
				this.editDialogVisible = true
			},
			// 监听修改用户对话框关闭事件
			editCompanyDialogClosed() {
				this.$refs.editCompanyFormRef.resetFields()
			},
			// 修改公司信息并提交
			editCompanyInfo() {
				this.$refs.editCompanyFormRef.validate(async valid => {
					if (!valid) return
					// 发起修改用户信息的数据请求
					const {
						data: res
					} = await this.$http.post('base/tBaCompany/edit', this.editCompanyForm)

					if (res.code !== 200) {
						return this.$message.error('修改公司信息失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.editDialogVisible = false
					this.getCompanyList()
					this.$message.success('修改公司信息成功')
				})
			},

			// 删除按钮
			async removeById(companyId) {
				const {
					data: res
				} = await this.$http.get('base/tBaCompany/deleteById?companyId=' + companyId)
				if (res.code !== 200) {
					return this.$message.error('删除公司失败')
				}
				// 删除成功，刷新数据列表，提示删除成功
				this.getCompanyList()
				this.$message.success('删除成功')
			},

		}
	}
</script>

<style scoped>
	.box-card {
		margin-top: 10px
	}
</style>
