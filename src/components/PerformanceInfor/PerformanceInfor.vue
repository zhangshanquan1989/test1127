<template>
	<div>
		<!-- 创建搜索区域 -->
		<el-row :gutter="10">

			<el-col :span="2">
				<el-button type="info" @click="showAddCompanyDialog">创建</el-button>
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
				<el-table-column prop="plistNo" label="订单ID">
				</el-table-column>
				<el-table-column prop="plistFristApointId" label="装货点ID">
				</el-table-column>
				<el-table-column prop="plistFristApointAddr" label="地址">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristApointFname" label="装配点第一联系人">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristApointFtele" label="装配点第一联系人电话">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristApointSname" label="装配点第二联系人">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristApointStele" label="装配点第二联系人电话">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristApointTname" label="装配点第三联系人">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristApointTtele" label="装配点第三联系人电话">
				</el-table-column>
				<el-table-column label="定位" width="50px">
					<template slot-scope="scope">
						<i class="el-icon-location" @click="handleLocation(scope.row.plistFristApointAddr)"></i>
					</template>
				</el-table-column>
				<el-table-column label="复制" width="50px">

					<template slot-scope="scope">
						<i class="el-icon-document-copy" :data-clipboard-text="scope.row.plistFristApointAddr+ '  ' + scope.row.plistFristApointFname+ ':' + scope.row.plistFristApointFtele+ '  ' + scope.row.plistFristApointSname+ ':' + scope.row.plistFristApointStele+ '  ' + scope.row.plistFristApointTname+ ':' + scope.row.plistFristApointTtele"
						 @click="copyAreaRule"></i>
					</template>

				</el-table-column>
				<el-table-column  label="悬停">
					<template slot-scope="scope">
					 <el-tooltip class="item" effect="dark" :content="scope.row.plistFristApointFname+ ':' + scope.row.plistFristApointFtele" placement="top">
					      <i class="el-icon-phone"></i>
					    </el-tooltip>
							</template>
				</el-table-column>
				<el-table-column prop="plistFristApointGrade" label="等级">
				</el-table-column>
				<el-table-column prop="plistFristApointUtime" label="装配时间">
				</el-table-column>


				<el-table-column prop="plistFristUpointId" label="卸货点ID">
				</el-table-column>
				<el-table-column prop="plistFristUpointAddr" label="地址">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristUpointFname" label="卸货点第一联系人">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristUpointFtele" label="卸货点第一联系人电话">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristUpointSname" label="卸货点第二联系人">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristUpointStele" label="卸货点第二联系人电话">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristUpointTname" label="卸货点第三联系人">
				</el-table-column>
				<el-table-column v-if="false" prop="plistFristUpointTtele" label="卸货点第三联系人电话">
				</el-table-column>
				<el-table-column label="定位" width="50px">
					<template slot-scope="scope">
						<i class="el-icon-location" @click="handleLocation(scope.row.plistFristUpointAddr)"></i>
					</template>
				</el-table-column>
				<el-table-column label="复制" width="50px">

					<template slot-scope="scope">
						<i class="el-icon-document-copy" :data-clipboard-text="scope.row.plistFristUpointAddr+ '  ' + scope.row.plistFristUpointFname+ ':' + scope.row.plistFristUpointFtele+ '  ' + scope.row.plistFristUpointSname+ ':' + scope.row.plistFristUpointStele+ '  ' + scope.row.plistFristUpointTname+ ':' + scope.row.plistFristUpointTtele"
						 @click="copyAreaRule"></i>
					</template>

				</el-table-column>
				
				<el-table-column  label="悬停">
					<template slot-scope="scope">
					 <el-tooltip class="item" effect="dark" :content="scope.row.plistFristUpointFname+ ':' + scope.row.plistFristUpointFtele" placement="top">
					      <i class="el-icon-phone"></i>
					    </el-tooltip>
							</template>
				</el-table-column>
				<el-table-column prop="plistFristUpointGrade" label="等级">
				</el-table-column>
				<el-table-column prop="plistFristUpointFtime" label="卸货时间">
				</el-table-column>


				<el-table-column prop="plistState" label="状态">
				</el-table-column>
				<el-table-column label="操作" width="200px">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.plistNo)">详情</el-button>
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
		<el-dialog title="新增信息" :visible.sync="addDialogVisible" width="80%" @close="addDialogClosed">
			<!-- 创建的表单 -->
			<el-form :model="addForm" ref="addFormRef" label-width="100px">
				<el-form-item label="订单ID:">
					<el-input disabled placeholder="自动生成"></el-input>
				</el-form-item>
				<el-form-item label="创建时间:">
					<el-input disabled placeholder="自动生成"></el-input>
				</el-form-item>
				<el-form-item label="状态:">
					<el-select v-model="addForm.plistState" clearable placeholder="状态">
						<el-option v-for="item in plistStateData" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="承运对接人:"></el-form-item>

				<el-form-item label="查询:">
					<el-input placeholder="请输入员工ID/姓名" v-model="searchEmployee">
						<el-button slot="append" icon="el-icon-search" @click="handleSearchEmployee"></el-button>
					</el-input>
				</el-form-item>

				<el-form-item label="员工姓名:">
					<el-input v-model="addForm.plistEmployeeName" placeholder="员工姓名"></el-input>
				</el-form-item>

				<el-form-item label="员工手机号:">
					<el-input v-model="addForm.plistEmployeeTele" placeholder="员工手机号"></el-input>
				</el-form-item>

				<el-form-item label="下单企业">
					<el-select v-model="addForm.plistCompanyName" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteMethod"
					 :loading="loading" style="width: 50%;">
						<el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="查询:">
					<el-input placeholder="请输入车牌号" v-model="searchDriver">
						<el-button slot="append" icon="el-icon-search" @click="handleSearchDriver"></el-button>
					</el-input>
				</el-form-item>

				<el-form-item label="车牌号">
					<el-input v-model="addForm.plistDriverLicense" placeholder="车牌号"></el-input>
				</el-form-item>

				<el-form-item label="司机">
					<el-input v-model="addForm.plistDriverName" placeholder="司机"></el-input>
				</el-form-item>

				<el-form-item label="司机电话">
					<el-input v-model="addForm.plistDriverTele" placeholder="司机电话"></el-input>
				</el-form-item>

				<el-form-item label="类型">
					<el-input v-model="addForm.plistDriverModel" placeholder="类型"></el-input>
				</el-form-item>


				<el-form-item label="定金">
					<el-input type="number" v-model.number="addForm.plistDeposit" placeholder="单位:元"></el-input>
				</el-form-item>
				<el-form-item label="尾款">
					<el-input type="number" v-model.number="addForm.plistBp" placeholder="单位:元"></el-input>
				</el-form-item>
				<el-form-item label="支付时间">
					    <el-date-picker
					      v-model="addForm.plistPtime"
					      type="datetime"
					      placeholder="选择日期时间"
								value-format="yyyy-MM-dd HH:mm:ss"
								>
					    </el-date-picker>
					
				</el-form-item>

				<el-form-item label="履约详情">
				</el-form-item>
				<el-form-item label="配送里程">
					<el-input v-model="addForm.plistDr" placeholder="Km"></el-input>
				</el-form-item>
				<el-form-item label="空置里程">
					<el-input v-model="addForm.plistCr" placeholder="Km"></el-input>
				</el-form-item>
				<!-- 装货点 -->
				<el-form-item label="装货信息">
					<template>
						<el-table :data="addForm.apoints" style="width: 100%">
							<el-table-column prop="apointId" label="装货点8位ID" style="width:6vw;">
								<template scope="scope">
									<el-input size="mini" v-model="scope.row.apointId"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="apointAddress"  label="地址">
								<template scope="scope">
									<!-- <el-input id='apointAddress' clearable type="text" v-model="scope.row.apointAddress" style="width: 80%;" ></el-input> -->
									<el-input size="mini" v-model="scope.row.apointAddress"></el-input>
								</template>
								
							</el-table-column>
							<el-table-column prop="apointDate" label="时间">
								<template scope="scope">
									<el-date-picker
									  v-model="scope.row.apointDate"
									  type="datetime"
									  placeholder="选择日期时间"
										value-format="yyyy-MM-dd HH:mm:ss"
										>									
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteApointInfo(scope.$index, addForm.apoints)" size="small"> 移除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<el-button @click="addApointInfo(addForm.apoints)">添加</el-button>
				</el-form-item>

				<!-- 卸货点 -->
				<el-form-item label="卸货信息">
					<template>
						<el-table :data="addForm.upoints" style="width: 100%">
							<el-table-column prop="upointId" label="卸货点8位ID" style="width:6vw;">
								<template scope="scope">
									<el-input size="mini" v-model="scope.row.upointId"></el-input>
								</template>
							</el-table-column>
							
							<el-table-column prop="upointAddress" label="地址">
								<template scope="scope">
									<!-- <el-input id='upointAddress' clearable type="text" v-model="scope.row.upointAddress" style="width: 80%;"></el-input> -->
									<el-input size="mini" v-model="scope.row.upointAddress"></el-input>
								</template>
							</el-table-column>
							
							<el-table-column prop="upointDate" label="时间">
								<template scope="scope">
								<el-date-picker
								  v-model="scope.row.upointDate"
								  type="datetime"
								  placeholder="选择日期时间"
									value-format="yyyy-MM-dd HH:mm:ss"
									>									
								</el-date-picker>
								
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteUpointInfo(scope.$index, addForm.upoints)" size="small"> 移除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<el-button @click="addUpointInfo(addForm.upoints)">添加</el-button>
				</el-form-item>
				
				<!-- 备注信息 -->
				<el-form-item label="备注信息">
					<template>
						<el-table :data="addForm.notes" style="width: 100%">
							<el-table-column prop="noteArea" label="备注" style="width:6vw;">
								<template scope="scope">
									<el-input size="mini" v-model="scope.row.noteArea"></el-input>
								</template>
							</el-table-column>

							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteNotesInfo(scope.$index, addForm.notes)" size="small"> 移除
									</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<el-button @click="addNotesInfo(addForm.notes)">添加</el-button>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addInfo">确 定</el-button>
			</span>

		</el-dialog>

		<!-- 详情的对话框 -->
		<el-dialog title="新增信息" :visible.sync="editDialogVisible" width="80%" @close="editDialogClosed">
			<!-- 详情的表单 -->
			<el-form :model="editForm" ref="editFormRef" label-width="100px">
				<el-form-item label="订单ID:">
					<el-input v-model="editForm.plistId" ></el-input>
				</el-form-item>
				<el-form-item label="创建时间:">
					<el-input v-model="editForm.plistCtime"></el-input>
				</el-form-item>
				<el-form-item label="状态:">
					<el-select v-model="editForm.plistState" clearable placeholder="状态">
						<el-option v-for="item in plistStateData" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="承运对接人:"></el-form-item>

				<el-form-item label="员工姓名:">
					<el-input v-model="editForm.plistEmployeeName" placeholder="员工姓名"></el-input>
				</el-form-item>

				<el-form-item label="员工手机号:">
					<el-input v-model="editForm.plistEmployeeTele" placeholder="员工手机号"></el-input>
				</el-form-item>

				<el-form-item label="下单企业">
					<el-select v-model="editForm.plistCompanyName" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteMethod"
					 :loading="loading" style="width: 50%;">
						<el-option v-for="item in options" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="车牌号">
					<el-input v-model="editForm.plistDriverLicense" placeholder="车牌号"></el-input>
				</el-form-item>

				<el-form-item label="司机">
					<el-input v-model="editForm.plistDriverName" placeholder="司机"></el-input>
				</el-form-item>

				<el-form-item label="司机电话">
					<el-input v-model="editForm.plistDriverTele" placeholder="司机电话"></el-input>
				</el-form-item>

				<el-form-item label="类型">
					<el-input v-model="editForm.plistDriverModel" placeholder="类型"></el-input>
				</el-form-item>


				<el-form-item label="定金">
					<el-input type="number" v-model.number="editForm.plistDeposit" placeholder="单位:元"></el-input>
				</el-form-item>
				<el-form-item label="尾款">
					<el-input type="number" v-model.number="editForm.plistBp" placeholder="单位:元"></el-input>
				</el-form-item>
				<el-form-item label="支付时间">
					    <el-date-picker
					      v-model="editForm.plistPtime"
					      type="datetime"
					      placeholder="选择日期时间"
								value-format="yyyy-MM-dd HH:mm:ss"
								>
					    </el-date-picker>
					
				</el-form-item>

				<el-form-item label="履约详情">
				</el-form-item>
				<el-form-item label="配送里程">
					<el-input v-model="editForm.plistDr" placeholder="Km"></el-input>
				</el-form-item>
				<el-form-item label="空置里程">
					<el-input v-model="editForm.plistCr" placeholder="Km"></el-input>
				</el-form-item>
				<!-- 装货点 -->
				<el-form-item label="装货信息">
					<template>
						<el-table :data="editForm.apoints" style="width: 100%">
							<el-table-column prop="apointId" label="装货点8位ID" style="width:6vw;">
								<template scope="scope">
									<el-input size="mini" v-model="scope.row.apointId"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="apointAddress"  label="地址">
								<template scope="scope">
									<!-- <el-input id='apointAddress' clearable type="text" v-model="scope.row.apointAddress" style="width: 80%;" ></el-input> -->
									<el-input size="mini" v-model="scope.row.apointAddress"></el-input>
								</template>
								
							</el-table-column>
							<el-table-column prop="apointDate" label="时间">
								<template scope="scope">
									<el-date-picker
									  v-model="scope.row.apointDate"
									  type="datetime"
									  placeholder="选择日期时间"
										value-format="yyyy-MM-dd HH:mm:ss"
										>									
									</el-date-picker>
								</template>
							</el-table-column>
<!-- 							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteApointInfo(scope.$index, editForm.apoints)" size="small"> 移除
									</el-button>
								</template>
							</el-table-column> -->
						</el-table>
					</template>
					<!-- <el-button @click="addApointInfo(editForm.apoints)">添加</el-button> -->
				</el-form-item>

				<!-- 卸货点 -->
				<el-form-item label="卸货信息">
					<template>
						<el-table :data="editForm.upoints" style="width: 100%">
							<el-table-column prop="upointId" label="卸货点8位ID" style="width:6vw;">
								<template scope="scope">
									<el-input size="mini" v-model="scope.row.upointId"></el-input>
								</template>
							</el-table-column>
							
							<el-table-column prop="upointAddress" label="地址">
								<template scope="scope">
									<!-- <el-input id='upointAddress' clearable type="text" v-model="scope.row.upointAddress" style="width: 80%;"></el-input> -->
									<el-input size="mini" v-model="scope.row.upointAddress"></el-input>
								</template>
							</el-table-column>
							
							<el-table-column prop="upointDate" label="时间">
								<template scope="scope">
								<el-date-picker
								  v-model="scope.row.upointDate"
								  type="datetime"
								  placeholder="选择日期时间"
									value-format="yyyy-MM-dd HH:mm:ss"
									>									
								</el-date-picker>
								
								</template>
							</el-table-column>
							<!-- <el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteUpointInfo(scope.$index, editForm.upoints)" size="small"> 移除
									</el-button>
								</template>
							</el-table-column> -->
						</el-table>
					</template>
					<!-- <el-button @click="addUpointInfo(editForm.upoints)">添加</el-button> -->
				</el-form-item>
				
				<!-- 备注信息 -->
				<el-form-item label="备注信息">
					<template>
						<el-table :data="editForm.notes" stripe style="width: 100%">
							<el-table-column prop="noteDate" label="时间">
<!-- 								<template scope="scope">
									<el-input size="mini" v-model="scope.row.noteDate"></el-input>
								</template> -->
							</el-table-column>
							<el-table-column prop="noteName" label="操作人" >
								
							</el-table-column>
							<el-table-column prop="noteArea" label="备注" >
								<template scope="scope">
									<el-input size="mini" v-model="scope.row.noteArea"></el-input>
								</template>
							</el-table-column>
							

						<!-- 	<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteNotesInfo(scope.$index, editForm.notes)" size="small"> 移除
									</el-button>
								</template>
							</el-table-column> -->
						</el-table>
					</template>
					<el-button @click="addNotesInfo(editForm.notes)">添加</el-button>
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
	export default {
		data() {
			return {



				// 查询数据
				queryInfo: {
					plistEmployeeId: '',
					plistEmployeeName: '',
					plistDriverLicense: '',
					plistDriverId: '',
					plistDriverOwner: '',
					plistCompanyId: '',
					plistCompanyName: '',
					plistState: '',
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
					plistEmployeeName: '',
					plistEmployeeTele: '',
					plistDriverLicense: '',
					plistDriverName: '',
					plistDriverTele: '',
					plistDriverModel: '',
					plistPtime:'',
					upointDate:'',
					apointDate:'',
					apoints: [{
						"apointId": "",
						"apointAddress": "",
						"apointDate": ""
					}],
					upoints: [{
						"upointId": "",
						"upointAddress": "",
						"upointDate": ""
					}],
					notes:[{
						"noteArea": ""
					}]
				},
				// 查询
				// 员工ID/姓名查询
				searchEmployee: '',
				// 车牌号查询
				searchDriver: '',

				// 地图icon显示地图
				locationDialogVisible: false,
				licationAddress: '',

				// 创建页面公司选择框数据
				options: [],
				companyList: [],
				loading: false,
				states: [],
				
				// 编辑对话框数据
				editDialogVisible:false,
				editForm:{
					
				},
			}
		},
		created() {
			this.getPerformanceList(),
				this.getAllCompanyList()
		},
		methods: {
			deleteApointInfo(index, rows) {
				//删除改行
				rows.splice(index, 1);
			},
			addApointInfo(apointsData, event) {
				apointsData.push({
					"apointId": "",
					"apointAddress": "",
					"apointDate": ""
				})
			},
			deleteUpointInfo(index, rows) {
				//删除改行
				rows.splice(index, 1);
			},
			addUpointInfo(upointsData, event) {
				upointsData.push({
					"upointId": "",
					"upointAddress": "",
					"upointDate": ""
				})
			},
			deleteNotesInfo(index, rows) {
				//删除改行
				rows.splice(index, 1);
			},
			addNotesInfo(noteAreaData, event) {
				noteAreaData.push({
					"noteArea": ""
				})
			},
			
			// 显示创建对话框
			showAddCompanyDialog(){
				this.addDialogVisible=true
				// 因为el-dialog显示时，高德搜索框加载未完成，用它在nextTick回调中加载，就成功了
				// 装货信息地址高德接口
				this.$nextTick(() => {
					let that = this
					//输入提示
					var autoapoints = new AMap.Autocomplete({
						input: "apointAddress"
					});
					AMap.event.addListener(autoapoints, "select", select); //注册监听，当选中某条记录时会触发
					function select(e) {
						that.addForm.apoints.apointAddress = e.poi.district + e.poi.address
					}
				})
				// 卸货信息地址高德接口
				this.$nextTick(() => {
					let that = this
					//输入提示
					var autoupoints = new AMap.Autocomplete({
						input: "upointAddress"
					});
					AMap.event.addListener(autoupoints, "select", select); //注册监听，当选中某条记录时会触发
					function select(e) {
						that.addForm.upoints.upointAddress = e.poi.district + e.poi.address

					}
				})
			},
			
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


			// 搜索区域
			handleQueryBtn() {
				this.getPerformanceList()
				this.queryInfo.queryInfo = ''
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
				this.$message.success('获取信息成功')
				this.performanceList = res.result.records
				this.total = res.result.total
			},

			// 点击查询按钮
			async handleQueryBtn() {
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

			// 创建公对话框
			addInfo() {
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					// 发起添加信息的数据请求
					const {
						data: res
					} = await this.$http.post('tPfPlist/add', this.addForm)
					console.log(res)
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
				this.$refs.addFormRef.resetFields(),
					this.addForm.plistEmployeeId = '',
					this.addForm.plistEmployeeName = '',
					this.addForm.plistEmployeeTele = '',
					this.addForm.plistDriverLicense = '',
					this.addForm.plistDriverName = '',
					this.addForm.plistDriverTele = '',
					this.addForm.plistDriverModel = '',
					this.addForm.upointDate = '',
					this.addForm.apointDate = ''
			},

			// 根据员工编号/姓名查询
			async handleSearchEmployee() {
				const firstLetter = this.searchEmployee[0]
				if (firstLetter == 0) {
					const {
						data: res
					} = await this.$http.get('tPfPlist/findEmployeeNameAndTeleByEmployeeNo?employeeNo=' + this.searchEmployee)
					if (res.code !== 200) {
						return this.$message.error('获取信息失败')
					}

					this.$message.success('获取地区信息成功')
					this.addForm.plistEmployeeName = res.result.EMPLOYEE_NAME
					this.addForm.plistEmployeeTele = res.result.EMPLOYEE_TEL
				} else {
					const {
						data: res
					} = await this.$http.get('tPfPlist/findEmployeeNameAndTeleByEmployeeName?employeeName=' + this.searchEmployee)
					if (res.code !== 200) {
						return this.$message.error('获取信息失败')
					}

					this.$message.success('获取信息成功')
					this.addForm.plistEmployeeName = res.result[0].EMPLOYEE_NAME
					this.addForm.plistEmployeeTele = res.result[0].EMPLOYEE_TEL
				}

			},

			// 根据车牌号查询
			async handleSearchDriver() {

				const {
					data: res
				} = await this.$http.get('tPfPlist/findDriverByLicense?license=' + this.searchDriver)
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}

				this.$message.success('获取信息成功')

				this.addForm.plistDriverLicense = this.searchDriver
				this.addForm.plistDriverName = res.result.DRIVER_NAME
				this.addForm.plistDriverTele = res.result.DRIVER_TEL
				this.addForm.plistDriverModel = res.result.DRIVER_MODEL
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
			},
			
			// 编辑对话框操作
			// 展示编辑的对话框
			async showEditDialog(plistNo) {
				// console.log(Id)
				const {
					data: res
				} = await this.$http.get('tPfPlist/findListPage?plistNo=' + plistNo)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.editForm = res.result[0]
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
					} = await this.$http.put('tPfPlist/edit', this.editForm)
			
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
			
		}
	}
</script>

<style scoped>
	#container {
		width: 31.25rem;
		height: 500px;
	}
</style>
