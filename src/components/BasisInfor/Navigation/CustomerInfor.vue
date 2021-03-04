<template>
	<!-- 客户信息页面 -->
	<div>

		<!-- 创建搜索区 -->
		<el-row>
			<el-col :span="2">
				<el-button type="info" @click="showAddDialog">创建</el-button>
			</el-col>
			<!-- 地区查询 -->
			<el-col :span="1" style="font-size: 17px;margin-top: 8px;padding-left: 5px;"><span>地区：</span></el-col>
			<el-col :span="2">
				<el-cascader clearable :options="cityData" v-model="chooseQueryCity" @change="handleClientAddress"></el-cascader>
				<!-- <el-input id='queryAddressinput' clearable type="text" v-model="queryInfo.clientAddress" style="width: 80%;" placeholder="高德接口"></el-input> -->
			</el-col>

			<!-- 等级下拉框 -->
			<el-col :span="1" style="font-size: 17px;margin-top: 8px;padding-left: 5px;margin-left: 20px;"><span>等级：</span></el-col>
			<el-col :span="2">
				<el-select v-model="queryInfo.grade" placeholder="选择等级" clearable>
					<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>

			<!-- 查询按钮 -->
			<el-col :span="2" style="margin-left: 20px;">
				<el-button type="info" @click="handleQueryBtn">查询</el-button>
			</el-col>
			<!-- 返回按钮 -->
			<el-col :span="2" style="margin-left: 20px;">
				<el-button type="info" @click="handleQueryBackBtn">返回</el-button>
			</el-col>

		</el-row>

		<!-- 卡片视图区 -->
		<el-card class="box-card" style="margin-top: 8px;">
			<el-table :data="newClientList" style="width: 100%" :span-method="arraySpanMethod">
				<el-table-column v-if="false" prop="clientId" label="客户ID">
				</el-table-column>
				<el-table-column prop="clientNo" label="客户ID">
				</el-table-column>
				<el-table-column prop="clientName" label="客户名称">
				</el-table-column>
				<el-table-column prop="id" label="装配点ID">
				</el-table-column>
				<el-table-column prop="clientAddress" label="装配点地址">
				</el-table-column>
				<el-table-column width="30px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="定位" placement="top">
						<i class="el-icon-location" @click="handleLocation(scope.row.clientAddress)"></i>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column width="30px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="复制" placement="top">
						<i class="el-icon-document-copy" :data-clipboard-text="scope.row.clientName+ '  ' + scope.row.clientAddress+ '  ' + scope.row.clientFirstPerson+ ':' + scope.row.clientFirstTel+ '  ' + scope.row.clientSecondPerson+ ':' + scope.row.clientSecondTel+ '  ' + scope.row.clientThirdPerson+ ':' + scope.row.clientThirdTel"
						 @click="copyAreaRule"></i>
						 </el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="clientLevel" label="级别" width="50px">
				</el-table-column>
				<el-table-column prop="clientType" label="类型">
				</el-table-column>
				<el-table-column prop="clientFirstPerson" label="联系人">
				</el-table-column>
				<el-table-column prop="clientFirstTel" label="电话">
				</el-table-column>
				<el-table-column prop="clientSecondPerson" label="联系人">
				</el-table-column>
				<el-table-column prop="clientSecondTel" label="电话">
				</el-table-column>
				<el-table-column prop="clientThirdPerson" label="联系人">
				</el-table-column>
				<el-table-column prop="clientThirdTel" label="电话">
				</el-table-column>
				<el-table-column label="操作" 　>
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.clientNo)">编辑</el-button>
						<!-- 删除按钮 -->

						<!-- 						<el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.clientId)" style="margin-left: 10px;">
							<el-button type="danger" size="mini" slot="reference" >删除</el-button>
						</el-popconfirm> -->

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
		<el-dialog title="新增客户信息" :visible.sync="addDialogVisible" width="85%" @close="addDialogClosed">
			<!-- 创建的表单 -->
			<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
				<div style="display: flex;">
				<el-form-item label="客户ID:">
					<el-input placeholder="自动生成" style="width: 100px;" disabled class="rt-input"></el-input>
				</el-form-item>
				<el-form-item label="客户名称:" prop="clientName">
					<el-input v-model="addForm.clientName"></el-input>
				</el-form-item>
				<el-form-item label="法人:" prop="clientLegalPerson">
					<el-input v-model="addForm.clientLegalPerson"></el-input>
				</el-form-item>
				<el-form-item label="业务对接人:" prop="clientBusinessMatcher">
					<el-input v-model="addForm.clientBusinessMatcher"></el-input>
				</el-form-item>
				<el-form-item label="电话:" prop="clientCall">
					<el-input v-model="addForm.clientCall"></el-input>
				</el-form-item>
				</div>
				<el-form-item label="办公地址:" prop="clientOfficeAddress">
					<el-input  id='tipinput' clearable type="text" v-model="addForm.clientOfficeAddress" style="width: 800px;"
					 placeholder="高德接口"></el-input>
				</el-form-item>
				<div style="display: flex;">
				<el-form-item label="创建人:" prop="clientFounder">
					<el-input disabled v-model="addForm.clientFounder"></el-input>
				</el-form-item>
				<el-form-item label="电话:" prop="clientFounderTel">
					<el-input disabled v-model="addForm.clientFounderTel"></el-input>
				</el-form-item>
				<el-form-item label="维护人:" prop="searchEmployee">
					<el-select v-model="addForm.searchEmployee" clearable filterable remote placeholder="请输入姓名" :remote-method="chooseEmployeeName"
					 :loading="employeeNameLoading"  @change="handleChooseName">
						<el-option v-for="item in employeeNameOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
					<!-- 					<el-input v-model="addForm.clientMaintain"></el-input> -->
				</el-form-item>
				<el-form-item label="电话:" prop="clientMaintainTel">
					<el-input disabled v-model="addForm.clientMaintainTel"></el-input>
				</el-form-item>
				</div>
				<!-- 装配站信息 -->
				
				<!-- 地址搜索 -->
				<div style="display: flex;">
				<el-form-item label="查询地址:">
				</el-form-item>
				<el-form-item label="输入公司">
					<el-input clearable id='pointsAddress' v-model="detailedAddress" style="width: 250px"></el-input>
				</el-form-item>
				
				<el-form-item label="详细地址">
					<el-input clearable v-model="chooseDetailedAddress" style="width: 500px" >
						<el-button slot="prepend">复制</el-button>
<!-- 		<i class="el-icon-document-copy" slot="append" :data-clipboard-text="chooseDetailedAddress"	 @click="copyAreaRule" style="margin-left: 20px;">复制</i> -->
					</el-input>
				</el-form-item>
			</div>
				<el-form-item label="装配站:" prop="points">
					<template>
						<el-table :data="addForm.points" style="width: 100%">
							<el-table-column label="ID" width="40px">
							</el-table-column>

							<el-table-column label="地址" width="300px">
								<template scope="scope">
									<el-input  clearable type="text" v-model="scope.row.clientAddress" style="width: 100%;" >
										
									</el-input>
								</template>
							</el-table-column>
							<el-table-column label="地区等级"width="180px">
								<template scope="scope">
									<el-input disabled  v-model="scope.row.clientLevel"><el-button slot="append" icon="el-icon-search" @click="choosePointsAddress(scope.$index)" >查询</el-button></el-input>
								</template>
							</el-table-column>
							<el-table-column label="装配站类型">
								<template scope="scope">
									<el-select  v-model="scope.row.clientType" clearable>
										<el-option v-for="item in typeSelect" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="联系人">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientFirstPerson"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="电话">
								<template scope="scope">
									<el-input clearable v-model="scope.row.clientFirstTel"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="联系人">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientSecondPerson"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="电话">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientSecondTel"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="联系人">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientThirdPerson"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="电话">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientThirdTel"></el-input>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deletePointsInfo(scope.$index, addForm.points)" > 移除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<el-button @click="addPointsInfo(addForm.points)">添加</el-button>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addInfo">确 定</el-button>
			</span>

		</el-dialog>


		<!-- 编辑的对话框 -->
		<el-dialog title="编辑客户信息" :visible.sync="editDialogVisible" width="90%" @close="editDialogClosed">
			<!-- 编辑的表单 -->
			<el-form :model="editForm" ref="editFormRef" label-width="100px">
				<div style="display: flex;">
				<el-form-item label="客户ID:" >
					<el-input clearable v-model="editForm.clientNo" style="width: 100px;" disabled class="rt-input"></el-input>
				</el-form-item>
				<el-form-item label="企业名称:">
					<el-input clearable v-model="editForm.clientName" style="width: 250px;"></el-input>
				</el-form-item>
				<el-form-item label="法人:">
					<el-input clearable v-model="editForm.clientLegalPerson" style="width: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="业务对接人:" style="margin-left: 30px;">
					<el-input clearable v-model="editForm.clientBusinessMatcher" style="width: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="对接人电话:" style="margin-left: 30px;">
					<el-input clearable v-model="editForm.clientCall"></el-input>
				</el-form-item>
				</div>
				<el-form-item label="办公地址:">
					<el-input clearable v-model="editForm.clientOfficeAddress" style="width: 800px;"></el-input>
				</el-form-item>
				<div style="display: flex;">
				<el-form-item label="创建人:">
					<el-input disabled v-model="editForm.clientFounder" class="rt-input"></el-input>
				</el-form-item>
				<el-form-item label="电话:">
					<el-input  v-model="editForm.clientFounderTel" disabled class="rt-input"></el-input>
				</el-form-item>
				<el-form-item label="维护人:">
					<el-input v-model="editForm.clientMaintain"></el-input>
				</el-form-item>
				<el-form-item label="电话:">
					<el-input v-model="editForm.clientMaintainTel"></el-input>
				</el-form-item>
				</div>
				<el-form-item  >
					<template>
						<el-table :data="editForm.points" >
							<el-table-column label="ID" width="120px" >
								<template scope="scope">
									<el-input disabled  v-model="scope.row.clientPointId" class="rt-input"></el-input>
								</template>
							</el-table-column>

							<el-table-column label="地址" width="180px">
								<template scope="scope">
									<el-input id='pointsAddress' clearable type="text" v-model="scope.row.clientAddress" ></el-input>
									<!-- 	<el-input clearable size="mini" v-model="scope.row.clientAddress"></el-input> -->
								</template>
							</el-table-column>
							<el-table-column label="地区等级" width="100px">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientLevel"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="装配站类型">
								<template scope="scope">
									<el-select v-model="scope.row.clientType" clearable>
										<el-option v-for="item in typeSelect" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column label="联系人">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientFirstPerson"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="电话">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientFirstTel"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="联系人">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientSecondPerson"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="电话">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientSecondTel"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="联系人">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientThirdPerson"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="电话">
								<template scope="scope">
									<el-input clearable  v-model="scope.row.clientThirdTel"></el-input>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="editDeletePointsInfo(scope.$index, editForm.points, scope.row.clientPointId)"> 移除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<el-button @click="editPointsInfo(editForm.points)" style="margin-left: 10px;margin-top: 10px;">添加</el-button>
				</el-form-item>

			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editInfo">确 定</el-button>
			</span>

		</el-dialog>

		<!-- 高德的对话框 -->
		<el-dialog title="地图" :visible.sync="locationDialogVisible" width="50%">
			<div>{{licationAddress}}:</div>
			<div id="container"></div>


		</el-dialog>



	</div>
</template>

<script>
	import cityData from '../../Assembly/citydata.js'
	export default {
		data() {
			return {
				my:100,
				detailedAddress:'',
				chooseDetailedAddress:'',
				// 搜索，城市
				chooseQueryCity: [],
				cityData: cityData,
				// 查询数据
				queryInfo: {
					address: '',
					grade: '',
					pageNo: 1,
					pageSize: 10
				},
				// 列表
				clientList: [],
				// 二维数组转换后的一维数组
				newClientList: [],
				// 要合并的行的数组
				spanArray: [],
				// 要合并的行的数组的下标
				tableIndex: '',
				// 总条数
				total: 0,
				// 添加的状态选项
				status: [{
					value: 'A',
					label: 'A'
				}, {
					value: 'B',
					label: 'B'
				}, {
					value: 'C',
					label: 'C'
				}, {
					value: 'D',
					label: 'D'
				}, {
					value: 'E',
					label: 'E'
				}],
				// 创建对话框数据
				addDialogVisible: false,
				i: 0,
				addForm: {
					"clientName": "",
					"clientLegalPerson": "",
					"clientBusinessMatcher": "",
					"clientCall": "",
					"clientOfficeAddress": "",
					"ClientOfficeLevel": "",
					"clientFounder": "",
					"clientFounderTel": "",
					"clientMaintain": "",
					"clientMaintainTel": "",
					"points": [{
						"clientAddress": "",
						"clientLevel": "",
						"clientType": "",
						"clientFirstPerson": "",
						"clientFirstTel": "",
						"clientSecondPerson": "",
						"clientSecondTel": "",
						"clientThirdPerson": "",
						"clientThirdTel": ""
					}]
				},
				// 创建页面选择员工数据
				employeeNameOptions: [],
				allEmployeeNameList: [],
				employeeNameLoading: false,

				// 创建表单验证规则
				addFormRules: {
					clientName: [{
						required: true,
						message: "请输入客户名称",
						trigger: 'blur'
					}],
					clientLegalPerson: [{
						required: true,
						message: "请输入法人",
						trigger: 'blur'
					}],
					clientBusinessMatcher: [{
						required: true,
						message: "请输入业务对接人",
						trigger: 'blur'
					}],
					clientCall: [{
						required: true,
						message: "请输入电话",
						trigger: 'blur'
					}],
					clientOfficeAddress: [{
						required: true,
						message: "请输入办公地址",
						trigger: 'blur'
					}],
					clientFounder: [{
						required: true,
						message: "请输入创建人",
						trigger: 'blur'
					}],
					clientFounderTel: [{
						required: true,
						message: "请输入电话",
						trigger: 'blur'
					}],
					searchEmployee: [{
						required: true,
						message: "请输入维护人",
						trigger: 'blur'
					}],
					clientMaintainTel: [{
						required: true,
						message: "请选择电话",
						trigger: 'blur'
					}],
					points: [{
						required: true,
						message: "请填入信息",
						trigger: 'blur'
					}],

				},

				// 装配站类型选择
				// 状态选项
				typeSelect: [{
					value: '大货站',
					label: '大货站'
				}, {
					value: '中货站',
					label: '中货站'
				}, {
					value: '小货站',
					label: '小货站'
				}, {
					value: '大工厂',
					label: '大工厂'
				}, {
					value: '中工厂',
					label: '中工厂'
				}, {
					value: '小工厂',
					label: '小工厂'
				}],
				// 编辑对话框数据
				// 编辑对话框显示与隐藏
				editDialogVisible: false,
				editForm: {},

				// 地图icon显示地图
				locationDialogVisible: false,
				licationAddress: ''
			}
		},

		created() {
			this.getClientList();
			this.findLogin();
			this.findAllEmployeeName();

			this.$nextTick(() => {
				let that = this
				//输入提示
				var queryAddressauto = new AMap.Autocomplete({
					input: "queryAddressinput"
				});
				AMap.event.addListener(queryAddressauto, "select", queryAddressselect); //注册监听，当选中某条记录时会触发
				function queryAddressselect(e) {
					that.queryInfo.clientAddress = e.poi.district
				}
			})
		},
		mounted() {

		},

		methods: {
			// 查询选择城市
			handleClientAddress(e) {
				let city = '';
				this.chooseQueryCity.forEach(v => {
					city = city + v
				})
				this.queryInfo.address = city
				// console.log(e)
				console.log(this.queryInfo.address)
			},

			showAddDialog() {
				this.addDialogVisible = true
				// 因为el-dialog显示时，高德搜索框加载未完成，用它在nextTick回调中加载，就成功了
				this.$nextTick(() => {
					let that = this
					//输入提示
					var auto = new AMap.Autocomplete({
						input: "tipinput"
					});
					AMap.event.addListener(auto, "select", select); //注册监听，当选中某条记录时会触发
					function select(e) {
						console.log(e)
						that.addForm.clientOfficeAddress = e.poi.district + e.poi.address
					}

					// var assemblyauto = new AMap.Autocomplete({
					// 	input: "pointsAddress"
					// });
					// AMap.event.addListener(assemblyauto, "select", assemblyselect); //注册监听，当选中某条记录时会触发
					// function assemblyselect(e) {
					// 	console.log(e)
					// 	that.addForm.clientAddress = e.poi.district 
					// }
				})


				
				this.$nextTick(() => {
					let that = this
					var assemblyauto101 = new AMap.Autocomplete({
						input: "pointsAddress"
					});
					AMap.event.addListener(assemblyauto101, "select", assemblyselect); //注册监听，当选中某条记录时会触发
					function assemblyselect(e) {
						// console.log(e)
						// that.addForm.points[0].clientAddress = e.poi.district + e.poi.address
						that.chooseDetailedAddress = e.poi.district + e.poi.address
						// that.choosePointsAddress();
						// console.log(that.addForm.points.clientAddress)
					}
				})
			},
			// 根据选择的地址查询地区等级
			async choosePointsAddress(index) {
				console.log(index)
				const {
					data: res
				} = await this.$http.get('base/tBaClient/findGradeByAddress?address=' + this.addForm.points[index].clientAddress)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				this.addForm.points[index].clientLevel = res.result[0]
				console.log(this.addForm.points[index].clientLevel)
			},
			//分页区域 
			// 根据分页查询列表
			async getClientList() {
				this.newClientList = []
				const {
					data: res
				} = await this.$http.get('base/tBaClient/list', {
					params: this.queryInfo
				})
				console.log(res)
				// if (res.code !== 200) {
				// 	return this.$message.error('获取信息失败')
				// }

				// this.$message.success('获取地区信息成功')
				this.clientList = res.rows
				// 将请求的二维数组，转换为一维数组
				this.clientList.forEach((item, index) => {
					for (let i = 0; i < item.points.length; i++) {
						let current = {
							clientBusinessMatcher: item.clientBusinessMatcher,
							clientCall: item.clientCall,
							clientFounder: item.clientFounder,
							clientFounderTel: item.clientFounderTel,
							clientId: item.clientId,
							clientLegalPerson: item.clientLegalPerson,
							clientMaintain: item.clientMaintain,
							clientMaintainTel: item.clientMaintainTel,
							clientName: item.clientName,
							clientNo: item.clientNo,
							clientOfficeAddress: item.clientOfficeAddress,
							clientOfficeLevel: item.clientOfficeLevel,
							clientAddress: item.points[i].clientAddress,
							clientCompany: item.points[i].clientCompany,
							clientCtime: item.points[i].clientCtime,
							clientDeliveryFrequency: item.points[i].clientDeliveryFrequency,
							clientDisApoint: item.points[i].clientDisApoint,
							clientFirstPerson: item.points[i].clientFirstPerson,
							clientFirstTel: item.points[i].clientFirstTel,
							clientFounder: item.points[i].clientFounder,
							clientFounderTel: item.points[i].clientFounderTel,
							clientLevel: item.points[i].clientLevel,
							clientListPerformance: item.points[i].clientListPerformance,
							clientPointId: item.points[i].clientPointId,
							clientSecondPerson: item.points[i].clientSecondPerson,
							clientSecondTel: item.points[i].clientSecondTel,
							clientThirdPerson: item.points[i].clientThirdPerson,
							clientThirdTel: item.points[i].clientThirdTel,
							clientType: item.points[i].clientType,
							id: item.points[i].id,
							isDelete: item.points[i].isDelete,
						}
						this.newClientList.push(current);
					}
				})

				// 对新数组操作，确定要合并的行
				this.spanArray = []
				this.tableIndex = ''
				this.newClientList.forEach((item, index) => {
					if (index == 0) {
						// 第一项
						this.spanArray.push(1);
						this.tableIndex = 0
					} else {
						if (this.newClientList[index].clientNo == this.newClientList[index - 1].clientNo) {
							this.spanArray[this.tableIndex] = this.spanArray[this.tableIndex] + 1;
							this.spanArray.push(0)
						} else {
							this.spanArray.push(1);
							this.tableIndex = index;
						}
					}
				})
				console.log(this.newClientList)
				console.log(this.spanArray)
				this.total = res.total
			},

			// 合并行
			arraySpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (columnIndex === 0 || columnIndex === 1 || columnIndex === 14) {
					let _row = this.spanArray[rowIndex];
					let _col = _row > 0 ? 1 : 0;
					return {
						rowspan: _row,
						colspan: _col
					}
				}
			},

			// 点击查询按钮
			handleQueryBtn() {
				this.getClientList()
			},
			// 点击返回按钮
			handleQueryBackBtn() {
				this.queryInfo.address = ''
				this.queryInfo.grade = ''
				this.queryInfo.pageNo = 1
				this.queryInfo.pageSize = 10
				this.getClientList()
			},
			// pageSize 改变的事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getClientList()
			},

			// 页码值改变事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNo = newPage
				this.getClientList()
			},

			// 创建公司对话框
			addInfo() {
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					// 发起添加信息的数据请求
					const {
						data: res
					} = await this.$http.post('base/tBaClient/add', this.addForm)

					if (res.code !== 200) {
						return this.$message.error('添加信息失败')
					}
					// 添加成功，关闭对话框，刷新数据列表，提示添加成功
					this.addDialogVisible = false
					this.getClientList()
					this.$message.success('添加信息成功')
				})
			},
			// 创建时候获取创建人及电话
			async findLogin() {
				const {
					data: res
				} = await this.$http.get('base/tBaClient/findLogin')
				console.log(res)
				this.addForm.clientFounder = res.result.EMPLOYEE_NAME
				this.addForm.clientFounderTel = res.result.EMPLOYEE_TEL
			},
			// 获取所有员工姓名
			async findAllEmployeeName() {
				const {
					data: res
				} = await this.$http.get('tPfPlist/findAllEmployeeName')
				console.log(res)
				if (res.code !== 200) {
					return
				}
				this.allEmployeeNameList = res.result.map(item => {
					return {
						value: `${item}`,
						label: `${item}`
					};
				});
				this.employeeNameOptions = this.allEmployeeNameList
			},
			// 创建页面选择员工方法
			chooseEmployeeName(query) {
				if (query !== '') {
					this.employeeNameLoading = true;
					setTimeout(() => {
						this.employeeNameLoading = false;
						this.employeeNameOptions = this.allEmployeeNameList.filter(item => {
							return item.value.indexOf(query) > -1;
						});
					}, 300)
				} else {
					this.employeeNameOptions = this.allEmployeeNameList
				}
			},
			// 选择员工后发起查询请求
			async handleChooseName(name) {
				this.employeeNameOptions = this.allEmployeeNameList
				if (name !== '') {
					const {
						data: res
					} = await this.$http.get('tPfPlist/findEmployeeNameAndTeleByEmployeeName?employeeName=' + name)
					console.log(res)
					if (res.code !== 200) {
						return
					}
					
					this.addForm.clientMaintain = res.result[0].EMPLOYEE_NO
					this.addForm.clientMaintainTel = res.result[0].EMPLOYEE_TEL
					this.addForm.searchEmployee = res.result[0].EMPLOYEE_NAME
				} else {
					this.addForm.clientMaintain = ''
					this.addForm.clientMaintainTel = ''
				}

			},
			// 创建页面表格添加删除
			deletePointsInfo(index, rows) {
				//删除改行
				rows.splice(index, 1);
			},
			addPointsInfo(pointsData, event) {
				
				pointsData.push({
					"clientAddress": "",
					"clientLevel": "",
					"clientType": "",
					"clientFirstPerson": "",
					"clientFirstTel": "",
					"clientSecondPerson": "",
					"clientSecondTel": "",
					"clientThirdPerson": "",
					"clientThirdTel": ""
				})
				this.my++
			},

			// 编辑页面表格添加删除
			async editDeletePointsInfo(index, rows, clientPointId) {
				//删除改行
				const {
					data: res
				} = await this.$http.put('base/tBaClient/deleteById?clientPointId=' + clientPointId)
				console.log(res)
				rows.splice(index, 1);
			},
			editPointsInfo(pointsData, event) {
				this.my+=1
				pointsData.push({
					"clientAddress": "",
					"clientLevel": "",
					"clientType": "",
					"clientFirstPerson": "",
					"clientFirstTel": "",
					"clientSecondPerson": "",
					"clientSecondTel": "",
					"clientThirdPerson": "",
					"clientThirdTel": ""
				})
			},

			// 监听创建对话框关闭
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
			},

			// 编辑对话框操作	
			// 展示编辑公司的对话框
			async showEditDialog(clientNo) {
				const {
					data: res
				} = await this.$http.get('base/tBaClient/findClient?clientNo=' + clientNo)
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
					} = await this.$http.put('base/tBaClient/edit', this.editForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('更新信息失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.editDialogVisible = false
					this.getClientList()
					this.$message.success('更新信息成功')
				})
			},

			// 删除操作
			async removeById(clientId) {
				const {
					data: res
				} = await this.$http.get('base/tBaClient/deleteById?clientId=' + clientId)

				if (res.code !== 200) {
					return this.$message.error('删除失败')
				}
				// 删除成功，刷新数据列表，提示删除成功
				this.getClientList()
				this.$message.success('删除成功')
			},

			// 复制限行规则
			copyAreaRule() {
				let clipboard = new this.Clipboard(".el-icon-document-copy");
				clipboard.on("success", e => {
					// 释放内存
					this.$message.success('已成功复制')
					clipboard.destroy();
				});
			},

			// 高德poi接口,根据地址在页面显示地址
			handleLocation(clientAddress) {
				this.locationDialogVisible = true
				this.licationAddress = clientAddress
				this.$nextTick(() => {
					var geocoder = new AMap.Geocoder();
					geocoder.getLocation(clientAddress, function(status, result) {
						if (status === 'complete' && result.info === 'OK') {

							// 经纬度                      
							var lng = result.geocodes[0].location.lng;
							var lat = result.geocodes[0].location.lat;

							// 地图实例
							var map = new AMap.Map("container", {
								resizeEnable: true, // 允许缩放
								center: [lng, lat], // 设置地图的中心点
								zoom: 12 // 设置地图的缩放级别，0 - 20
							});
							
						
							    //加载工具条
							    var tool = new AMap.ToolBar();
						map.addControl(tool);

							// 添加标记
							var marker = new AMap.Marker({
								map: map,
								position: new AMap.LngLat(lng, lat), // 经纬度
							});
						} else {
							console.log('定位失败！');
						}
					});

				})
			}
		}
	}
</script>

<style scoped>
	#container {
		width: 100%;
		height: 500px;
	}
	
	.rt-input /deep/ .el-input__inner {
	  color: #606266 !important;
	  
	}
	
</style>
