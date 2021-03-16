<template>
	<div>
		<!-- 创建搜索区域 -->

				<el-button type="info" @click="showAddDialog">创建</el-button>

				<el-input placeholder="调度" v-model="queryPlistEmployee" clearable style="width: 100px;margin-left: 20px;"></el-input>

				<el-input placeholder="订单号" v-model="queryPlistNo" clearable style="width: 100px;margin-left: 20px;"></el-input>

			<el-date-picker v-model="queryPlistCtime" type="daterange" range-separator="至" start-placeholder="开始日期"
			 end-placeholder="结束日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" @change="handleDataChange" style="width: 300px;margin-left: 20px;">
			</el-date-picker>	
				
				<el-select v-model="queryPlistAclient" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteMethod" :loading="loading" style="width: 150px;margin-left: 20px;" @change="searchQueryPlist">
					<el-option v-for="item in companyOptions" :key="item.index" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

				<el-select v-model="queryInfo.plistState" clearable placeholder="请选择状态" style="width: 100px;margin-left: 20px;">
					<el-option v-for="item in plistStateData" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

				<el-button type="info" @click="handleQueryBtn" style="margin-left: 20px;">查询</el-button>

			
			<!-- 返回按钮 -->

				<el-button type="info"  @click="handleQueryBackBtn" style="margin-left: 20px;">返回</el-button>

			
			<!-- 下载excel -->

				<!-- <a :href="downloadUrl">
				<el-button type="info" style="margin-left: 20px;">下载</el-button>
				</a> -->


		<!-- 卡片视图区域 -->
		<el-card class="box-card" style="margin-top: 8px;">
			<el-table :data="performanceList" stripe style="width: 100%">
				<el-table-column prop="plistNo" label="订单ID">
				</el-table-column>
				<el-table-column prop="plistAclient" label="下单公司">
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
				<el-table-column width="30px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="定位" placement="top">
						<i class="el-icon-location" @click="handleLocation(scope.row.plistFristApointAddr)"></i>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column width="30px">

					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="复制" placement="top">
						<i class="el-icon-document-copy" :data-clipboard-text="scope.row.plistFristApointAddr+ '  ' + scope.row.plistFristApointFname+ ':' + scope.row.plistFristApointFtele+ '  ' + scope.row.plistFristApointSname+ ':' + scope.row.plistFristApointStele+ '  ' + scope.row.plistFristApointTname+ ':' + scope.row.plistFristApointTtele"
						 @click="copyAreaRule"></i>
						 </el-tooltip>
					</template>

				</el-table-column>
				<el-table-column width="40px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" :content="scope.row.plistFristApointFname+ ':' + scope.row.plistFristApointFtele"
						 placement="top">
							<i class="el-icon-phone"></i>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="plistFristApointGrade" label="等级" width="50px">
				</el-table-column>
				<el-table-column prop="plistFristApointUtime" label="装配时间">
				</el-table-column>


				<el-table-column prop="plistUclient" label="卸货公司">
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
				<el-table-column width="30px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="定位" placement="top">
						<i class="el-icon-location" @click="handleLocation(scope.row.plistFristUpointAddr)"></i>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column width="30px">

					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="复制" placement="top">
						<i class="el-icon-document-copy" :data-clipboard-text="scope.row.plistFristUpointAddr+ '  ' + scope.row.plistFristUpointFname+ ':' + scope.row.plistFristUpointFtele+ '  ' + scope.row.plistFristUpointSname+ ':' + scope.row.plistFristUpointStele+ '  ' + scope.row.plistFristUpointTname+ ':' + scope.row.plistFristUpointTtele"
						 @click="copyAreaRule"></i>
						 </el-tooltip>
					</template>

				</el-table-column>

				<el-table-column width="40px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" :content="scope.row.plistFristUpointFname+ ':' + scope.row.plistFristUpointFtele" placement="top">
							<i class="el-icon-phone"></i>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="plistFristUpointGrade" label="等级" width="50px">
				</el-table-column>
				<el-table-column prop="plistFristUpointFtime" label="卸货时间">
				</el-table-column>


				<el-table-column prop="plistState" label="状态">
				</el-table-column>
				<el-table-column label="操作" width="200px">
					<template slot-scope="scope">
						<!-- 详情按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.plistNo)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>

		<!-- 分页区域 -->
		<el-col style="margin-top: 10px;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNum"
			 :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</el-col>


		<!-- 创建的对话框 -->
		<el-dialog title="新增信息" :visible.sync="addDialogVisible" width="80%" @close="addDialogClosed">
			<!-- 创建的表单 -->
			<el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
				<div style="display: flex;">
				<el-form-item label="订单ID:">
					<el-input disabled placeholder="自动生成"></el-input>
				</el-form-item>
				<el-form-item label="创建时间:">
					<el-input disabled placeholder="自动生成"></el-input>
				</el-form-item>
				<el-form-item label="状态:" prop="plistState">
					<el-select v-model="addForm.plistState" clearable placeholder="状态">
						<el-option v-for="item in plistStateData" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
</div>
<div style="display: flex;">
				<el-form-item label="承运对接人:" prop="searchEmployee">
					<el-select v-model="addForm.searchEmployee" clearable filterable remote placeholder="请输入对接人姓名" :remote-method="chooseEmployeeName" :loading="employeeNameLoading"  @change="handleChooseName">
						<el-option v-for="item in employeeNameOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<!-- 	<el-form-item label="查询:">
					<el-input placeholder="请输入员工姓名" v-model="searchEmployee">
						<el-button slot="append" icon="el-icon-search" @click="handleSearchEmployee"></el-button>
					</el-input>
				</el-form-item>

				<el-form-item label="员工姓名:">
					<el-input v-model="addForm.plistEmployeeName" placeholder="员工姓名"></el-input>
				</el-form-item> -->

				<el-form-item label="电话:" prop="plistEmployeeTele">
					<el-input disabled v-model="addForm.plistEmployeeTele" placeholder="员工手机号"></el-input>
				</el-form-item>
</div>

				<!-- 
				<el-form-item label="查询:">
					
					<el-input placeholder="请输入车牌号" v-model="searchDriver">
						<el-button slot="append" icon="el-icon-search" @click="handleSearchDriver"></el-button>
					</el-input>
				</el-form-item> -->
				
				<div style="display: flex;">
				<el-form-item label="车牌号" prop="searchDriver">
					<el-select v-model="addForm.searchDriver" clearable filterable remote placeholder="请输入车牌号" :remote-method="chooseCarLicense"
					 :loading="carLicenseLoading"  @change="handleChooseCarLicense">
						<el-option v-for="item in carLicenseOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="司机" prop="plistDriverName">
					<el-input disabled v-model="addForm.plistDriverName" placeholder="司机"></el-input>
				</el-form-item>

				<el-form-item label="司机电话" prop="plistDriverTele">
					<el-input disabled v-model="addForm.plistDriverTele" placeholder="司机电话"></el-input>
				</el-form-item>

				<el-form-item label="车型" prop="plistDriverModel">
					<el-input disabled v-model="addForm.plistDriverModel" placeholder="类型"></el-input>
				</el-form-item>
				</div>
				<div style="display: flex;">
				<el-form-item label="定金" prop="plistDeposit">
					<el-input clearable  v-model="addForm.plistDeposit" placeholder="单位:元(保留两位小数)"></el-input>
				</el-form-item>
				<el-form-item label="尾款" prop="plistBp">
					<el-input clearable v-model="addForm.plistBp" placeholder="单位:元(保留两位小数)"></el-input>
				</el-form-item>
				<el-form-item label="支付时间" prop="plistPtime">
					<el-date-picker v-model="addForm.plistPtime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>

				</el-form-item>
</div>

				<el-form-item label="履约详情" >
				</el-form-item>

				<!-- 装货点 -->
				<el-form-item label="下单客户" prop="plistAclient">
					<el-select v-model="addForm.plistAclient" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteMethod"
					 :loading="loading" style="width: 50%;" @change="searchAssemblyPoint">
						<el-option v-for="item in companyOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="装货信息" >
					<template>
						<el-table :data="allAssemblyPointData" style="width: 100%">
							<el-table-column prop="apointId" label="装货点8位ID" style="width:6vw;">
								<template scope="scope">
									<el-input disabled v-model="scope.row.clientPointId" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="地址">
								<template scope="scope">
									<el-input disabled  v-model="scope.row.clientAddress" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="选择">
								<template scope="scope">
									<el-checkbox v-model="scope.row.choose" @change="checkboxChange"></el-checkbox>
								</template>
							</el-table-column>
							<el-table-column label="时间">
								<template scope="scope">
									<el-date-picker v-if="scope.row.choose" v-model="scope.row.apointDate" type="datetime" placeholder="选择日期时间"
									 value-format="yyyy-MM-dd HH:mm:ss">
									</el-date-picker>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-form-item>

				<!-- 卸货点 -->
				<div style="font-size: 28px;margin-bottom: 8px;margin-left: 10px;">送至:</div>
				<div style="display: flex;">
				<el-form-item label="配送里程" prop="plistDr">
					<el-input v-model="addForm.plistDr" placeholder="单位:Km"></el-input>
				</el-form-item>
				<el-form-item label="空置里程" prop="plistCr">
					<el-input v-model="addForm.plistCr" placeholder="单位:Km"></el-input>
				</el-form-item>
				</div>
				<el-form-item label="收单客户" prop="plistUclient">
					<el-select v-model="addForm.plistUclient" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteMethod"
					 :loading="loading" style="width: 50%;" @change="searchUnloadingPoint">
						<el-option v-for="item in companyOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="卸货信息">
					<template>
						<el-table :data="allUnloadingPointData" style="width: 100%">
							<el-table-column prop="apointId" label="装货点8位ID" style="width:6vw;">
								<template scope="scope">
									<el-input disabled  v-model="scope.row.clientPointId" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="地址">
								<template scope="scope">
									<el-input disabled  v-model="scope.row.clientAddress" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="选择">
								<template scope="scope">
									<el-checkbox v-model="scope.row.choose" @change="checkboxChange"></el-checkbox>
								</template>
							</el-table-column>
							<el-table-column label="时间">
								<template scope="scope">
									<el-date-picker v-if="scope.row.choose" v-model="scope.row.upointDate" type="datetime" placeholder="选择日期时间"	 value-format="yyyy-MM-dd HH:mm:ss">
									</el-date-picker>
								</template>
							</el-table-column>

						</el-table>
					</template>

				</el-form-item>

				<!-- 备注信息 -->
				<el-form-item label="备注信息" prop="notes">
					<template>
						<el-table :data="addForm.notes" style="width: 100%">
							<el-table-column prop="noteArea" label="备注" style="width:6vw;">
								<template scope="scope">
									<el-input  v-model="scope.row.noteArea" clearable placeholder="必填"></el-input>
								</template>
							</el-table-column>

							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteNotesInfo(scope.$index, addForm.notes)">移除</el-button>
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
		<el-dialog title="订单详情" :visible.sync="editDialogVisible" width="80%" @close="editDialogClosed">
			<!-- 详情的表单 -->
			<el-form :model="editForm" ref="editFormRef" label-width="100px">
				<div style="display: flex;">
				<el-form-item label="订单ID:">
					<el-input disabled v-model="editForm.plistNo"></el-input>
				</el-form-item>
				<el-form-item label="创建时间:">
					<el-input disabled v-model="editForm.plistCtime"></el-input>
				</el-form-item>
				<el-form-item label="状态:">
					<el-select :disabled="disabled" v-model="editForm.plistState" clearable placeholder="状态" >
						<el-option v-for="item in plistStateData" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				</div>
				
				<div style="display: flex;">
				<el-form-item label="承运对接人:">
					<el-input disabled v-model="editForm.employeeName" placeholder="员工姓名"></el-input>
				</el-form-item>

				<el-form-item label="电话:">
					<el-input disabled v-model="editForm.employeeTel" placeholder="员工手机号"></el-input>
				</el-form-item>
				</div>
				<div style="display: flex;">
				<el-form-item label="车牌号">
					<el-input disabled v-model="editForm.driverLicense" placeholder="车牌号"></el-input>
				</el-form-item>

				<el-form-item label="司机">
					<el-input disabled v-model="editForm.driverName" placeholder="司机"></el-input>
				</el-form-item>

				<el-form-item label="电话">
					<el-input disabled v-model="editForm.driverTel" placeholder="司机电话"></el-input>
				</el-form-item>

				<el-form-item label="车型">
					<el-input disabled v-model="editForm.driverModel" placeholder="类型"></el-input>
				</el-form-item>
				</div>
				<div style="display: flex;">
				<el-form-item label="定金">
					<el-input disabled v-model="editForm.plistDeposit" placeholder="单位:元"></el-input>
				</el-form-item>
				<el-form-item label="尾款">
					<el-input disabled v-model="editForm.plistBp" placeholder="单位:元"></el-input>
				</el-form-item>
				<el-form-item label="实际收入">
					<el-input disabled v-model="editForm.plistIncome" placeholder="单位:元"></el-input>
				</el-form-item>
				<el-form-item label="支付时间">
					<el-date-picker disabled v-model="editForm.plistPtime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
					</el-date-picker>
				</el-form-item>
				</div>
				<div style="font-size: 18px;margin-bottom: 10px;">履约详情</div>
				<el-form-item label="下单客户">
					<el-select disabled v-model="editForm.plistAclient" clearable filterable remote placeholder="请输入公司名称"
					 :remote-method="remoteMethod" :loading="loading" style="width: 50%;">
					</el-select>
				</el-form-item>

				<!-- 装货点 -->

				<el-form-item label="装货信息">
					<template>
						<el-table :data="editAssemblyPointData" style="width: 100%">
							<el-table-column label="装货点8位ID">
								<template scope="scope">
									<el-input disabled v-model="scope.row.clientPointId" ></el-input>
								</template>
							</el-table-column>
							<el-table-column label="地址">
								<template scope="scope">
									<el-input disabled v-model="scope.row.clientAddress" ></el-input>
								</template>
							</el-table-column>

							<el-table-column label="选择">
								<template scope="scope">
									<el-checkbox :disabled="scope.row.isdisabled" v-model="scope.row.choose" @change="editAssemblycheckboxChange( scope.row.choose,scope.$index)"></el-checkbox>
								</template>
							</el-table-column>
							<el-table-column label="时间">
								<template scope="scope">
									<el-date-picker v-if="scope.row.choose" v-model="scope.row.apointDate" type="datetime" placeholder="选择日期时间"
									 value-format="yyyy-MM-dd HH:mm:ss" :disabled="scope.row.isdisabled">
									</el-date-picker>
								</template>
							</el-table-column>
						</el-table>
					</template>
				</el-form-item>

				<!-- 卸货点 -->
				<div style="font-size: 18px;margin-bottom: 10px;">送至</div>
				<div style="display: flex;">
				<el-form-item label="配送里程">
					<el-input disabled v-model="editForm.plistDr" placeholder="Km"></el-input>
				</el-form-item>
				<el-form-item label="空置里程">
					<el-input disabled v-model="editForm.plistCr" placeholder="Km"></el-input>
				</el-form-item>
				</div>
				<el-form-item label="收单客户">
					<el-select disabled v-model="editForm.plistUclient" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteMethod"
					 :loading="loading" style="width: 50%;">
					</el-select>
				</el-form-item>
				<el-form-item label="卸货信息">
					<template>
						<el-table :data="editUnloadingPointData" style="width: 100%">
							<el-table-column  label="卸货点" style="width:6vw;">
								<template scope="scope">
									<el-input disabled v-model="scope.row.clientPointId"></el-input>
								</template>
							</el-table-column>

							<el-table-column label="地址信息">
								<template scope="scope">
									<el-input disabled  v-model="scope.row.clientAddress"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="选择">
								<template scope="scope">
									<el-checkbox  :disabled="scope.row.isdisabled" v-model="scope.row.choose" @change="checkboxChange"></el-checkbox>
								</template>
							</el-table-column>
							<el-table-column label="时间">
								<template scope="scope">
									<el-date-picker :disabled="scope.row.isdisabled" v-if="scope.row.choose" v-model="scope.row.upointDate" type="datetime" placeholder="选择日期时间"
									 value-format="yyyy-MM-dd HH:mm:ss">
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
							<el-table-column prop="noteDate" label="时间"  width="150px">
								<!-- 								<template scope="scope">
									<el-input size="mini" v-model="scope.row.noteDate"></el-input>
								</template> -->
							</el-table-column>
							<el-table-column prop="noteName" label="操作人" width="150px">

							</el-table-column>
							<el-table-column prop="noteArea" label="备注">
								<template scope="scope">
									<el-input :disabled="scope.row.hiddenNoteArea"  v-model="scope.row.noteArea"></el-input>
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
					<el-button v-if="!disabled" @click="addNotesInfo(editForm.notes)">添加</el-button>
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
				// 下载网址
				downloadUrl:'http://81.70.151.121:8080/jeecg-boot/tPfPlist/exportXls',
				// 查询数据
				queryPlistEmployee: '',
				queryPlistNo: '',
				queryPlistCtime: [],
				queryPlistAclient: '',
				queryInfo: {
					plistEmployee:'',
					plistCtime1:'',
					plistCtime2:'',
					plistAclient:'',
					plistState: '',
					plistNo: '',
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
				// 创建对话框数据
				addDialogVisible: false,
				addForm: {
					plistState:'',
					searchEmployee:'',
					plistEmployee:'',
					plistEmployeeId:'',
					plistEmployeeTele: '',
					searchDriver:'',
					plistDriverId:'',
					plistDriverLicense: '',
					plistDriverName: '',
					plistDriverTele: '',
					plistDriverModel: '',
					plistDeposit:'',
					plistBp:'',
					plistPtime: '',
					plistAclient: '',
					plistDr:'',
					plistCr:'',
					plistUclient:'',
					apoints: [],
					upoints: [],
					notes: [{
						"noteArea": ""
					}]
				},

				// 地图icon显示地图
				locationDialogVisible: false,
				licationAddress: '',

				// 创建页面公司选择框数据
				companyOptions: [],
				companyList: [],
				loading: false,
				states: [],
				allAssemblyPointData: [],
				allUnloadingPointData: [],

				// 创建页面选择员工数据
				employeeNameOptions: [],
				allEmployeeNameList: [],
				employeeNameLoading: false,


				// 创建页面选择车牌号数据
				carLicenseOptions: [],
				allCarLicenseList: [],
				carLicenseLoading: false,
				// 创建表单验证规则
				addFormRules:{
					plistState:[
						{required:true,message:"请选择状态",trigger:'blur'}
					],
					searchEmployee:[
						{required:true,message:"请输入对接人",trigger:'blur'}
					],
					plistEmployeeTele:[
						{required:true,message:"请输入电话",trigger:'blur'}
					],
					searchDriver:[
						{required:true,message:"请输入车牌号",trigger:'blur'}
					],
					plistDriverName:[
						{required:true,message:"请输入司机",trigger:'blur'}
					],
					plistDriverTele:[
						{required:true,message:"请输入司机电话",trigger:'blur'}
					],
					plistDriverModel:[
						{required:true,message:"请输入车型",trigger:'blur'}
					],
					plistDeposit:[
						{required:true,message:"请输入定金",trigger:'blur'}
					],
					plistBp:[
						{required:true,message:"请输入尾款",trigger:'blur'}
					],
					plistPtime:[
						{required:true,message:"请填入下单客户",trigger:'blur'}
					],
					plistAclient:[
						{required:true,message:"请填入支付时间",trigger:'blur'}
					],
					allAssemblyPointData:[
						{required:true,message:"请填入装货信息",trigger:'blur'}
					],
				plistDr:[
					{required:true,message:"请填入配送里程",trigger:'blur'}
				],
				plistCr:[
					{required:true,message:"请填入空置里程",trigger:'blur'}
				],
				plistUclient:[
					{required:true,message:"请填入收单客户",trigger:'blur'}
				],
				allUnloadingPointData:[
					{required:true,message:"请填入卸货信息",trigger:'blur'}
				],
				notes:[
					{required:true,message:"请填入备注信息",trigger:'blur'}
				],
				},

				// 编辑对话框数据
				editDialogVisible: false,
				editForm: {
					plistState:'',
					plistNo:'',
					plistCtime:'',
					employeeName:'',
					employeeTel:'',
					driverLicense:'',
					driverName:'',
					driverTel:'',
					driverModel:'',
					plistDeposit:'',
					plistBp:'',
					plistIncome:'',
					plistPtime:'',
					plistAclient:'',
					
					plistDr:'',
					plistCr:'',
					plistUclient:'',
					apoints: [],
					upoints: [],
					notes: []
				},
				editAssemblyPointData: [{
					clientPointId:'',
					clientAddress:'',
					isdisabled:'',
					choose:'',
					apointDate:'',
				}],
				editUnloadingPointData: [
					{
						clientPointId:'',
						clientAddress:'',
						isdisabled:'',
						choose:'',
						upointDate:'',
					}
				],
				
				// 详情状态能否选择
				disabled:false,

			}
		},
		created() {
			this.getPerformanceList(),
				this.getAllCompanyList()
			this.findAllEmployeeName()
			this.findAllCarLicense()
		},
		methods: {
			// 搜索区域选址时间
			handleDataChange() {
				
			},
			
			checkboxChange(e) {
				console.log(e)

			},
			editAssemblycheckboxChange(e, index) {
				console.log(e)
				console.log(index)
				console.log(this.editAssemblyPointData)
				console.log(this.editAssemblyPointData[index].choose)
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
			showAddDialog() {
				this.addDialogVisible = true
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
				} = await this.$http.get('tPfPlist/findAllCompanyName')
				// console.log(res)
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
				this.companyOptions = this.companyList
			},

			// 创建页面选择公司方法
			remoteMethod(query) {
				if (query !== '') {
					this.loading = true;
					setTimeout(() => {
						this.loading = false;
						this.companyOptions = this.companyList.filter(item => {
							return item.value.indexOf(query) > -1;
						});
					}, 300)
				} else {
					this.companyOptions = this.companyList
				}
			},
			// 选择公司后回复下拉列表
			searchQueryPlist(){
				this.companyOptions = this.companyList
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
				if(name !== ''){
					const {
						data: res
					} = await this.$http.get('tPfPlist/findEmployeeNameAndTeleByEmployeeName?employeeName=' + name)
					console.log(res)
					if (res.code !== 200) {
						this.addForm.searchEmployee = ''
						return this.$message.error('查询失败')
					}
					this.employeeNameOptions = this.allEmployeeNameList
					
					this.addForm.plistEmployeeId = res.result[0].EMPLOYEE_NO
					this.addForm.plistEmployeeTele = res.result[0].EMPLOYEE_TEL
					this.addForm.plistEmployee = res.result[0].EMPLOYEE_NAME
				}else{
					this.employeeNameOptions = this.allEmployeeNameList
					this.addForm.plistEmployeeId = ''
					this.addForm.plistEmployeeTele = ''
					this.addForm.plistEmployee = ''
				}
	
			},

			// 获取所有车牌号
			async findAllCarLicense() {
				const {
					data: res
				} = await this.$http.get('tPfPlist/findAllLicense')
				console.log(res)
				if (res.code !== 200) {
					return
				}
				this.allCarLicenseList = res.result.map(item => {
					return {
						value: `${item}`,
						label: `${item}`
					};
				});
				this.carLicenseOptions = this.allCarLicenseList
			},
			// 创建页面选择车牌号方法
			chooseCarLicense(query) {
				if (query !== '') {
					this.carLicenseLoading = true;
					setTimeout(() => {
						this.carLicenseLoading = false;
						this.carLicenseOptions = this.allCarLicenseList.filter(item => {
							return item.value.indexOf(query) > -1;
						});
					}, 300)
				} else {
					this.carLicenseOptions = this.allCarLicenseList
				}
			},
			// 选择车牌号后发起请求
			async handleChooseCarLicense(carLicense) {
				if(carLicense !== ''){
					const {
						data: res
					} = await this.$http.get('tPfPlist/findDriverByLicense?license=' + carLicense)
					console.log(res)
					if (res.code !== 200) {
						return
					}
					this.carLicenseOptions = this.allCarLicenseList
					this.addForm.plistDriverId = res.result.DRIVER_NO
					this.addForm.plistDriverName = res.result.DRIVER_NAME
					this.addForm.plistDriverTele = res.result.DRIVER_TEL
					this.addForm.plistDriverModel = res.result.DRIVER_MODEL
				}else{
					this.carLicenseOptions = this.allCarLicenseList
					this.addForm.plistDriverId = ''
					this.addForm.plistDriverName = ''
					this.addForm.plistDriverTele = ''
					this.addForm.plistDriverModel = ''
				}
				
			},

			// // 搜索区域
			// handleQueryBtn() {
			// 	this.getPerformanceList()
			// 	this.queryInfo.queryInfo = ''
			// },

			//分页区域
			// 根据分页查询列表
			async getPerformanceList() {
				const {
					data: res
				} = await this.$http.get('tPfPlist/list', {
					params: this.queryInfo
				})
				console.log(res)
				// if (res.code !== 200) {
				// 	return this.$message.error('获取信息失败')
				// }
				this.$message.success('获取信息成功')
				this.performanceList = res.rows
				this.total = res.total
			},

			// 点击查询按钮
			handleQueryBtn() {
				console.log(this.queryPlistCtime)
				if(this.queryPlistCtime){
					
					this.queryInfo.plistCtime1 = this.queryPlistCtime[0]
					this.queryInfo.plistCtime2 = this.queryPlistCtime[1]
				}else{
					this.queryInfo.plistCtime1 = ''
					this.queryInfo.plistCtime2 = ''
				}
				this.queryInfo.plistEmployee =  this.queryPlistEmployee 
				this.queryInfo.plistNo =  this.queryPlistNo 
				this.queryInfo.plistAclient =  this.queryPlistAclient 
				console.log(this.queryInfo)
				this.getPerformanceList()
				// this.getAllDriverList()
				this.companyOptions = this.companyList

			},
			// 点击返回按钮
			handleQueryBackBtn(){
				this.queryPlistEmployee = ''
				this.queryPlistNo = ''
				this.queryPlistCtime = ''
				this.queryInfo.plistCtime1 = ''
				this.queryInfo.plistCtime2 = ''
				this.queryPlistAclient = ''
				this.queryInfo.plistState = ""
				this.queryInfo.plistEmployee = ""
				this.queryInfo.plistNo = ""
				this.queryInfo.plistCtimet = ""
				this.queryInfo.plistAclient = ""
				this.queryInfo.pageNum = 1
				this.queryInfo.pageSize = 10
				this.getPerformanceList()
				this.companyOptions = this.companyList
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
			
			// // 搜索区域选择公司
			// async handleQueryPlistAclient(){
			// 	const {
			// 		data: res
			// 	} = await this.$http.get('tPfPlist/findPointByCompanyName?companyName=' + this.queryPlistAclient)
			// 	console.log(res)
			// 	if (res.code !== 200) {
			// 		return this.$message.error('获取信息失败')
			// 	}
				
			// 	this.queryInfo.plistAclient = "*" + res.result + "*"
			// },

			// 创建公对话框
			addInfo() {
				this.allAssemblyPointData.forEach(v => {
					if (v.choose == true) {
						this.addForm.apoints.push(v)
					}
				})
				this.addForm.apoints.forEach(v => {
					v.apointId = v.clientPointId
				})
				this.allUnloadingPointData.forEach(v => {
					if (v.choose == true) {
						this.addForm.upoints.push(v)
					}
				})
				this.addForm.upoints.forEach(v => {
					v.upointId = v.clientPointId
				})
				this.addForm.plistDeposit = parseFloat(this.addForm.plistDeposit).toFixed(2);

				this.addForm.plistBp = parseFloat(this.addForm.plistBp).toFixed(2);
				// this.addForm.plistEmployee = this.addForm.searchEmployee
				console.log(this.addForm)
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
					this.addForm.plistEmployeeTele = '',
					this.addForm.plistDriverLicense = '',
					this.addForm.plistDriverName = '',
					this.addForm.plistDriverTele = '',
					this.addForm.plistDriverModel = '',
					this.addForm.upointDate = '',
					this.addForm.apointDate = '',
					this.addForm.plistDeposit = '',
					this.addForm.plistBp = '',
					this.addForm.upoints = [],
					this.addForm.apoints = [],
					this.addForm.notes = [{"noteArea": ""}],
					this.allAssemblyPointData = [] ,
					this.allUnloadingPointData = []
					
			},

			// // 根据员工编号/姓名查询
			// async handleSearchEmployee() {
			// 	const {
			// 		data: res
			// 	} = await this.$http.get('tPfPlist/findEmployeeNameAndTeleByEmployeeName?employeeName=' + this.searchEmployee)
			// 	if (res.code !== 200) {
			// 		return this.$message.error('获取信息失败')
			// 	}
				 
			// 	this.$message.success('获取信息成功')
			// 	this.addForm.plistEmployee = res.result[0].EMPLOYEE_NAME
			// 	this.addForm.plistEmployeeTele = res.result[0].EMPLOYEE_TEL
			// 	this.addForm.plistEmployeeId = res.result[0].EMPLOYEE_NO
			// },

			// // 根据车牌号查询
			// async handleSearchDriver() {

			// 	const {
			// 		data: res
			// 	} = await this.$http.get('tPfPlist/findDriverByLicense?license=' + this.searchDriver)
			// 	if (res.code !== 200) {
			// 		return this.$message.error('获取信息失败')
			// 	}

			// 	this.$message.success('获取信息成功')

			// 	this.addForm.plistDriverLicense = this.searchDriver
			// 	this.addForm.plistDriverName = res.result.DRIVER_NAME
			// 	this.addForm.plistDriverTele = res.result.DRIVER_TEL
			// 	this.addForm.plistDriverModel = res.result.DRIVER_MODEL
			// 	this.addForm.plistDriverId = res.result.DRIVER_NO
			// },

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
							
							// 添加工具条
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
			},
			// 根据选择的公司查询装配点
			async searchAssemblyPoint(plistAclientName) {
				if(plistAclientName !== ''){
					const {
						data: res
					} = await this.$http.get('tPfPlist/findPointByCompanyName?companyName=' + plistAclientName)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('获取信息失败')
					}
					this.companyOptions = this.companyList
					this.allAssemblyPointData = res.result
				}else{
					this.companyOptions = this.companyList
					this.allAssemblyPointData = []
				}

			},
			// 根据选择的公司查询卸货点
			async searchUnloadingPoint(plistUclientName) {
				if(plistUclientName !== ''){
					const {
						data: res
					} = await this.$http.get('tPfPlist/findPointByCompanyName?companyName=' + this.addForm.plistUclient)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('获取信息失败')
					}
					this.companyOptions = this.companyList
					this.allUnloadingPointData = res.result
				}else{
					this.companyOptions = this.companyList
					this.allUnloadingPointData = []
				}

			},

			// 详情对话框操作
			// 展示详情的对话框
			async showEditDialog(plistNo) {
				const {
					data: res
				} = await this.$http.get('tPfPlist/findListPage?plistNo=' + plistNo)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.editForm = res.result[0]
				// 显示对话框

				this.editForm.employeeName = this.editForm.employee.employeeName
				this.editForm.employeeTel = this.editForm.employee.employeeTel
				this.editForm.driverName = this.editForm.driver.driverName
				this.editForm.driverLicense = this.editForm.driver.driverLicense
				this.editForm.driverTel = this.editForm.driver.driverTel
				this.editForm.driverModel = this.editForm.driver.driverModel
				

				// 根据下单公司、收获公司获取装货点
				const {
					data: res1
				} = await this.$http.get('tPfPlist/findPointByCompanyName?companyName=' + this.editForm.plistAclient)
				this.editAssemblyPointData = res1.result
				const {
					data: res2
				} = await this.$http.get('tPfPlist/findPointByCompanyName?companyName=' + this.editForm.plistUclient)
				this.editUnloadingPointData = res2.result

				this.editForm.apoints.forEach(v => {
					this.editAssemblyPointData.forEach(j => {
						if (j.clientPointId === v.apointId) {
							j.choose = true
							j.apointDate = v.apointDate
							j.apointId = v.apointId
							j.isdisabled = true
						}
					})
				})

				this.editForm.upoints.forEach(v => {
					this.editUnloadingPointData.forEach(j => {
						if (j.clientPointId === v.upointId) {
							j.choose = true
							j.upointDate = v.upointDate
							j.upointId = v.upointId
							j.isdisabled = true
						}
					})
				})
				
				// 根据备注内容判断
				this.editForm.notes.forEach(v=>{
					if(v.noteArea !== ""){
						v.hiddenNoteArea = true
					}else{
						v.hiddenNoteArea = false
					}
				})
				
				// 判断状态是否是结算
				if(this.editForm.plistState == "结算"){
					this.disabled = true
					this.editAssemblyPointData.forEach(j =>{
						j.isdisabled = true
					})
					this.editUnloadingPointData.forEach(j =>{
						j.isdisabled = true
					})
					this.editForm.notes.forEach(v=>{
						v.hiddenNoteArea = true
					})
				}
				// 显示对话框
				this.editDialogVisible = true
			},


			// 监听修改用户对话框关闭事件
			editDialogClosed() {
				this.$refs.editFormRef.resetFields()
				this.editForm.apoints = []
				this.editForm.upoints = []
				this.editForm.notes = []
				this.disabled = false
				this.editDialogVisible = false
			},



			// 编辑界面状态选择/////////////////////////////////
			//////////////////////////////////////////////////
			editPlistStateChange(e) {
				let nowPlistState = this.editForm.plistState
				console.log(e)
				console.log(nowPlistState)
				if (e == '结算') {
					this.$confirm('此操作将不可再编辑, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.editForm.plistState = e
						this.$message({
							type: 'success',
							message: '已完结!'
						});
					}).catch(() => {
						this.editForm.plistState = nowPlistState
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
				}
			},
			// 修改信息并提交
			editInfo() {
				if (this.editForm.plistState == '结算') {
					this.$confirm('状态选择结算后将不可再编辑, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						this.handleEditInfo()
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消'
						});
					});
				}else{
					this.handleEditInfo()
				}
			},
			
			handleEditInfo(){
				this.editForm.apoints = []
				this.editForm.upoints = []
				this.editAssemblyPointData.forEach(v => {
					if (v.choose == true) {
						this.editForm.apoints.push(v)
					}
				})
				
				this.editForm.apoints.forEach(v => {
					v.apointId = v.clientPointId
				})
				this.editUnloadingPointData.forEach(v => {
					if (v.choose == true) {
						this.editForm.upoints.push(v)
					}
				})
				this.editForm.upoints.forEach(v => {
					v.upointId = v.clientPointId
				})
				this.$refs.editFormRef.validate(async valid => {
					if (!valid) return
					// 发起修改信息的数据请求
					const {
						data: res
					} = await this.$http.put('tPfPlist/edit', this.editForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('更新信息失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.editDialogVisible = false
				
					this.getPerformanceList()
					this.$message.success('更新信息成功')
				})
			},

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
