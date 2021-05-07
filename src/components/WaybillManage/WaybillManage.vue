<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>运单管理</el-breadcrumb-item>
		</el-breadcrumb>

		<!-- 卡片视图区 -->
		<el-card class="box-card">
			<!-- 创建按钮 -->
			<el-button type="primary" plain @click="addDialogVisible = true">创建</el-button>
			<el-input v-model="queryInfo.noText" placeholder="运单编号" clearable style="width: 200px;margin-left: 100px;"></el-input>
			<el-button type="primary" plain @click="handleQueryBtn" style="margin-left: 30px;">查询</el-button>
			<el-button type="primary" plain @click="handleQueryBackBtn" style="margin-left: 30px;">返回</el-button>

			<el-table :data="wybillList" border stripe style="width: 100%;margin-top: 8px;" :row-style="{height:'60px'}"
			 :cell-style="{padding:'0px'}" :header-cell-style="{background:'#f8f8f9', color:'#000000'}">
				<el-table-column prop="id" label="ID" v-if="false">
				</el-table-column>
				<el-table-column fixed prop="no" label="运单编号" width="100px">
				</el-table-column>
				<el-table-column prop="waybilltype" label="派单类型" width="100px">
				</el-table-column>
				<el-table-column prop="source" label="订单来源" width="100px">
				</el-table-column>
				<el-table-column prop="people" label="司机对接人" width="100px">
				</el-table-column>
				<el-table-column prop="goodsname" label="货物名称" width="150px">
				</el-table-column>
				<el-table-column prop="goodsweight" label="货物重量/方数" width="150px">
				</el-table-column>
				<el-table-column prop="overweight" label="是否超高/超宽/超重" width="100px">
				</el-table-column>
				<el-table-column prop="picture" label="运单截图" width="150px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="点击查看大图" placement="top">
							<el-image style="width: 80px; height: 40px" :src="scope.row.picture" :preview-src-list="srcList" @click="handleClickImage(scope.row.picture)"></el-image>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column prop="emptydistance" label="空车距离" width="150px">
				</el-table-column>
				<el-table-column prop="highspeed" label="高速预计距离" width="150px">
				</el-table-column>
				<el-table-column prop="estimatedistance" label="下道预计距离" width="150px">
				</el-table-column>
				<el-table-column prop="ban" label="是否禁行" width="150px">
				</el-table-column>
				<el-table-column prop="km" label="全程公里数" width="150px">
				</el-table-column>
				<el-table-column prop="deposit" label="定金（元）" width="150px">
				</el-table-column>
				<el-table-column prop="pay" label="到付（元）" width="150px">
				</el-table-column>
				<el-table-column prop="car" label="到车（元）" width="150px">
				</el-table-column>
				<el-table-column prop="cost" label="费用（元）" width="150px">
				</el-table-column>
				<el-table-column prop="nearcost" label="预估利润（元）" width="150px">
				</el-table-column>
				<el-table-column prop="aclient" label="发货客户企业" width="150px">
				</el-table-column>
				<el-table-column prop="uclient" label="收货客户企业" width="150px">
				</el-table-column>
				<el-table-column prop="kilometer" label="每公里成本" width="150px">
				</el-table-column>
				<el-table-column prop="lienses" label="车牌号" width="150px">
				</el-table-column>
				<el-table-column prop="creater" label="创建者" width="150px">
				</el-table-column>
				<el-table-column prop="creatime" label="创建时间" width="180px">
				</el-table-column>
				<el-table-column prop="stateText" label="订单状态" width="120px" fixed="right">
				</el-table-column>
				<el-table-column label="操作" width="120px" fixed="right">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.no)" style="margin-left: 15px;">详情</el-button>
						<!-- 删除按钮 -->
						<!-- <el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.id)" style="margin-left: 10px;">
							<el-button type="danger" size="mini" slot="reference">删除</el-button>
						</el-popconfirm> -->
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
		<el-dialog title="创建车辆信息" :visible.sync="addDialogVisible" width="85%" @close="addDialogClosed">
			<!-- 创建的表单 -->
			<el-form :model="addForm" ref="addFormRef" label-width="120px">
				<el-form-item label="运单编号:" prop="no" >
					<el-input disabled placeholder="自动生成"></el-input>
				</el-form-item>
				<el-form-item label="派单类型:" prop="waybilltype">
					<el-select v-model="addForm.waybilltype" placeholder="请选择" clearable>
						<el-option v-for="item in waybilltypeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单来源:" prop="source">
					<el-select v-model="addForm.source" placeholder="请选择" clearable>
						<el-option v-for="item in sourceList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="司机对接人:" prop="people">
					<el-input v-model="addForm.people"></el-input>
				</el-form-item>
				<el-form-item label="货物名称:" prop="goodsname">
					<el-input v-model="addForm.goodsname"></el-input>
				</el-form-item>
				<el-form-item label="货物重量/方数:" prop="goodsweight">
					<el-input v-model="addForm.goodsweight"></el-input>
				</el-form-item>
				<el-form-item label="是否超高/超宽/超重:" prop="overweight">
					<el-select v-model="addForm.overweight" placeholder="请选择" clearable>
						<el-option v-for="item in overweightList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运单截图:" prop="picture">
					<el-image v-if="addForm.picture" style="width: 150px;" :src="addForm.picture"></el-image>
					<el-upload name="imgFile" :action="updatePictureUrl" :auto-upload="true" :on-success="handlePictureUrlSuccess"
					 :show-file-list="false">
						<el-button size="small" type="primary" plain>上传运单截图</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="空车距离:" prop="emptydistance">
					<el-input v-model="addForm.emptydistance"></el-input>
				</el-form-item>
				<el-form-item label="高速预计距离:" prop="highspeed">
					<el-input v-model="addForm.highspeed"></el-input>
				</el-form-item>
				<el-form-item label="下道预计距离:" prop="estimatedistance">
					<el-input v-model="addForm.estimatedistance"></el-input>
				</el-form-item>
				<el-form-item label="是否禁行:" prop="ban">
					<el-select v-model="addForm.ban" placeholder="请选择" clearable>
						<el-option v-for="item in banList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="定金:" prop="deposit">
					<el-input v-model="addForm.deposit"></el-input>
				</el-form-item>
				<el-form-item label="到付:" prop="pay">
					<el-input v-model="addForm.pay"></el-input>
				</el-form-item>
				<el-form-item label="到车:" prop="car">
					<el-input v-model="addForm.car"></el-input>
				</el-form-item>
				<el-form-item label="下单客户" prop="aclient">
					<el-select v-model="addForm.aclient" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteMethod"
					 :loading="loading" style="width: 50%;" @change="searchUnloadingPoint">
						<el-option v-for="item in companyOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="收单客户" prop="uclient">
					<el-select v-model="addForm.uclient" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteMethod"
					 :loading="loading" style="width: 50%;" @change="searchUnloadingPoint">
						<el-option v-for="item in companyOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="装货信息">
					<template>
						<el-table :data="addForm.apoints" style="width: 100%">
							<el-table-column prop="spointphone" label="装货点电话">
								<template scope="scope">
									<el-input v-model="scope.row.spointphone" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="装货时间">
								<template scope="scope">
									<el-date-picker v-model="scope.row.stime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="sprovince" label="省">
								<template scope="scope">
									<el-select v-model="scope.row.sprovince" clearable filterable remote placeholder="省" @change="sprovinceChange(scope.row.sprovince,scope.$index)">
										<el-option v-for="item in sprovinceOptions" :key="item.index" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="scity" label="市">
								<template scope="scope">
									<el-select v-model="scope.row.scity" clearable filterable remote placeholder="市" @change="scityChange(scope.row.scity,scope.$index)">
										<el-option v-for="item in scope.row.scityOptions" :key="item.index" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="sarea" label="区">
								<template scope="scope">
									<el-select v-model="scope.row.sarea" clearable filterable remote placeholder="区" @change="sareaChange(scope.row.sprovince,scope.row.scity,scope.row.sarea,scope.$index)">
										<el-option v-for="item in scope.row.sareaOptions" :key="item.index" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="saddress" label="详细地址">
								<template scope="scope">
									<el-input v-model="scope.row.saddress" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="sgrade" label="市场等级">
								<template scope="scope">
									<el-input disabled v-model="scope.row.sgrade" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="shuafen" label="南北方界定">
								<template scope="scope">
									<el-input disabled v-model="scope.row.shuafen" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteApoints(scope.$index, addForm.apoints)">移除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<el-button @click="addApoints(addForm.apoints)">添加</el-button>
				</el-form-item>

				<el-form-item label="卸货信息">
					<template>
						<el-table :data="addForm.upoints" style="width: 100%">
							<el-table-column prop="spointphone" label="装货点电话">
								<template scope="scope">
									<el-input v-model="scope.row.dpointphone" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="装货时间">
								<template scope="scope">
									<el-date-picker v-model="scope.row.dtime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="sprovince" label="省">
								<template scope="scope">
									<el-select v-model="scope.row.dprovince" clearable filterable remote placeholder="省" @change="dprovinceChange(scope.row.dprovince,scope.$index)">
										<el-option v-for="item in dprovinceOptions" :key="item.index" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="dcity" label="市">
								<template scope="scope">
									<el-select v-model="scope.row.dcity" clearable filterable remote placeholder="市" @change="dcityChange(scope.row.dcity,scope.$index)">
										<el-option v-for="item in scope.row.dcityOptions" :key="item.index" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="darea" label="区">
								<template scope="scope">
									<el-select v-model="scope.row.darea" clearable filterable remote placeholder="区" @change="dareaChange(scope.row.dprovince,scope.row.dcity,scope.row.darea,scope.$index)">
										<el-option v-for="item in scope.row.dareaOptions" :key="item.index" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</template>
							</el-table-column>
							<el-table-column prop="saddress" label="详细地址">
								<template scope="scope">
									<el-input v-model="scope.row.daddress" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="sgrade" label="市场等级">
								<template scope="scope">
									<el-input disabled v-model="scope.row.dgrade" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="shuafen" label="南北方界定">
								<template scope="scope">
									<el-input disabled v-model="scope.row.dhuafen" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button @click.native.prevent="deleteUpoints(scope.$index, addForm.upoints)">移除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<el-button @click="addUpoints(addForm.upoints)">添加</el-button>
				</el-form-item>

				<el-form-item label="车牌号" prop="searchDriver">
					<el-select v-model="addForm.lienses" clearable filterable remote placeholder="请输入车牌号" :remote-method="chooseCarLicense"
					 :loading="carLicenseLoading" @change="handleChooseCarLicense">
						<el-option v-for="item in carLicenseOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="司机:" prop="lienses">
					<el-input disabled v-model="addForm.Lidriver"></el-input>
				</el-form-item>
				<el-form-item label="负责调度:" prop="lienses">
					<el-input disabled v-model="addForm.dispatch"></el-input>
				</el-form-item>

			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addInfo">提 交</el-button>
			</span>
		</el-dialog>


		<!-- 编辑的对话框 -->
		<el-dialog title="订单详情" :visible.sync="editDialogVisible" width="80%" @close="editDialogClosed">
			<!-- 编辑的表单 -->
			<el-form :model="editForm" ref="editFormRef" label-width="100px">

				<el-form-item v-if="!canClickEdit" label="驳回原因:" prop="bohuiyuanyin" class="redItem">
					<div style="color: red;">{{this.editForm.bohuiyuanyin}}</div>
				</el-form-item>

				<el-form-item label="运单编号:" prop="no" class="rt-input">
					<el-input disabled v-model="editForm.no"></el-input>
				</el-form-item>
				<el-form-item label="派单类型:" prop="waybilltype" class="rt-input">
					<el-select :disabled="canEdit" v-model="editForm.waybilltype" placeholder="请选择" clearable>
						<el-option v-for="item in waybilltypeList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="订单来源:" prop="source" class="rt-input">
					<el-select :disabled="canEdit" v-model="editForm.source" placeholder="请选择" clearable>
						<el-option v-for="item in sourceList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="司机对接人:" prop="people" class="rt-input">
					<el-input :disabled="canEdit" v-model="editForm.people"></el-input>
				</el-form-item>
				<el-form-item label="货物名称:" prop="goodsname" class="rt-input">
					<el-input :disabled="canEdit" v-model="editForm.goodsname"></el-input>
				</el-form-item>
				<el-form-item label="货物重量/方数:" prop="goodsweight" class="rt-input">
					<el-input :disabled="canEdit" v-model="editForm.goodsweight"></el-input>
				</el-form-item>
				<el-form-item label="是否超高/超宽/超重:" prop="overweight" class="rt-input">
					<el-select :disabled="canEdit" v-model="editForm.overweight" placeholder="请选择" clearable>
						<el-option v-for="item in overweightList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="运单截图:" prop="picture">
					<el-image v-if="editForm.picture" style="width: 150px;" :src="editForm.picture"></el-image>
					<el-upload name="imgFile" :action="updatePictureUrl" :auto-upload="true" :on-success="handleEditPictureUrlSuccess"
					 :show-file-list="false">
						<el-button :disabled="canEdit" size="small" type="primary" plain>上传运单截图</el-button>
					</el-upload>
				</el-form-item>
				<el-form-item label="空车距离:" prop="emptydistance" class="rt-input">
					<el-input :disabled="canEdit" v-model="editForm.emptydistance"></el-input>
				</el-form-item>
				<el-form-item label="高速预计距离:" prop="highspeed" class="rt-input">
					<el-input :disabled="canEdit" v-model="editForm.highspeed"></el-input>
				</el-form-item>
				<el-form-item label="下道预计距离:" prop="estimatedistance" class="rt-input">
					<el-input :disabled="canEdit" v-model="editForm.estimatedistance"></el-input>
				</el-form-item>
				<el-form-item label="是否禁行:" prop="ban" class="rt-input">
					<el-select :disabled="canEdit" v-model="editForm.ban" placeholder="请选择" clearable>
						<el-option v-for="item in banList" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="定金:" prop="deposit" class="rt-input">
					<el-input :disabled="canEdit" v-model="editForm.deposit"></el-input>
				</el-form-item>
				<el-form-item label="到付:" prop="pay" class="rt-input">
					<el-input :disabled="canEdit" v-model="editForm.pay"></el-input>
				</el-form-item>
				<el-form-item label="到车:" prop="car" class="rt-input">
					<el-input :disabled="canEdit" v-model="editForm.car"></el-input>
				</el-form-item>
				<el-form-item label="下单客户" prop="aclient" class="rt-input">
					<el-select :disabled="canEdit" v-model="editForm.aclient" clearable filterable remote placeholder="请输入公司名称"
					 :remote-method="remoteMethod" :loading="loading" style="width: 50%;" @change="searchUnloadingPoint">
						<el-option v-for="item in companyOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="收单客户" prop="uclient" class="rt-input">
					<el-select :disabled="canEdit" v-model="editForm.uclient" clearable filterable remote placeholder="请输入公司名称"
					 :remote-method="remoteMethod" :loading="loading" style="width: 50%;" @change="searchUnloadingPoint">
						<el-option v-for="item in companyOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="装货信息">
					<template>
						<el-table :data="editForm.apoints" style="width: 100%">
							<el-table-column prop="spointphone" label="装货点电话">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.spointphone" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="装货时间">
								<template scope="scope">
									<el-date-picker :disabled="canEdit" v-model="scope.row.stime" type="datetime" placeholder="选择日期时间"
									 value-format="yyyy-MM-dd HH:mm:ss" class="rt-input">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="sprovince" label="省">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.sprovince" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="scity" label="市">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.scity" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="sarea" label="区">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.sarea" class="rt-input"></el-input >
								</template>
							</el-table-column>
							<el-table-column prop="saddress" label="详细地址">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.saddress" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="sgrade" label="等级">
								<template scope="scope">
									<el-input disabled v-model="scope.row.sgrade" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="snanbei" label="南北方界定">
								<template scope="scope">
									<el-input disabled v-model="scope.row.snanbei" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button :disabled="canEdit" @click.native.prevent="deleteApoints(scope.$index, editForm.apoints)">移除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<el-button :disabled="canEdit" @click="addApoints(editForm.apoints)">添加</el-button>
				</el-form-item>

				<el-form-item label="卸货信息">
					<template>
						<el-table :data="editForm.upoints" style="width: 100%">
							<el-table-column prop="spointphone" label="装货点电话">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.dpointphone" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column label="装货时间">
								<template scope="scope">
									<el-date-picker :disabled="canEdit" v-model="scope.row.dtime" type="datetime" placeholder="选择日期时间"
									 value-format="yyyy-MM-dd HH:mm:ss" class="rt-input">
									</el-date-picker>
								</template>
							</el-table-column>
							<el-table-column prop="sprovince" label="省">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.dprovince" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="scity" label="市">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.dcity" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="sarea" label="区">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.darea" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="saddress" label="详细地址">
								<template scope="scope">
									<el-input :disabled="canEdit" v-model="scope.row.daddress" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="dgrade" label="等级">
								<template scope="scope">
									<el-input disabled v-model="scope.row.dgrade" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column prop="dnanbei" label="南北方界定">
								<template scope="scope">
									<el-input disabled v-model="scope.row.dnanbei" class="rt-input"></el-input>
								</template>
							</el-table-column>
							<el-table-column fixed="right" label="操作">
								<template slot-scope="scope">
									<el-button :disabled="canEdit" @click.native.prevent="deleteUpoints(scope.$index, editForm.upoints)">移除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</template>
					<el-button :disabled="canEdit" @click="addUpoints(editForm.upoints)">添加</el-button>
				</el-form-item>

				<el-form-item label="车牌号" prop="searchDriver" class="rt-input">
					<el-select :disabled="canEdit" v-model="editForm.lienses" clearable filterable remote placeholder="请输入车牌号"
					 :remote-method="chooseCarLicense" :loading="carLicenseLoading" @change="editChooseCarLicense">
						<el-option v-for="item in carLicenseOptions" :key="item.index" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="司机:" prop="lienses" class="rt-input">
					<el-input disabled v-model="editForm.Lidriver"></el-input>
				</el-form-item>
				<el-form-item label="负责调度:" prop="lienses" class="rt-input">
					<el-input disabled v-model="editForm.dispatch"></el-input>
				</el-form-item>
				
				<div v-if="showDisDetails">
					<el-form-item label="司机已交订单:" prop="depositis" class="rt-input">
						<el-input disabled v-model="editForm.depositis"></el-input>
					</el-form-item>
					<el-form-item label="定金是否已退还:" prop="returnd" class="rt-input">
						<el-input disabled v-model="editForm.returnd"></el-input>
					</el-form-item>
					<el-form-item label="运费是否结算:" prop="freight" class="rt-input">
						<el-input disabled v-model="editForm.freight"></el-input>
					</el-form-item>
					<el-form-item label="调整后利润:" prop="profits" class="rt-input">
						<el-input disabled v-model="editForm.profits"></el-input>
					</el-form-item>
					<el-form-item label="调整原因:" prop="why" class="rt-input">
						<el-input disabled v-model="editForm.why"></el-input>
					</el-form-item>
					<el-form-item label="回单是否已结算:" prop="returnis" class="rt-input">
						<el-input disabled v-model="editForm.returnis"></el-input>
					</el-form-item>
					<el-form-item label="回单完结备注:" prop="returnote" class="rt-input">
						<el-input disabled v-model="editForm.returnote"></el-input>
					</el-form-item>
					<el-form-item label="回单附件:" prop="riskpicture" class="rt-input">
						<el-image style="width: 120px;" :src="editForm.riskpicture"></el-image>
						
					</el-form-item>
					<el-form-item label="风险备注:" prop="risknote" class="rt-input">
						<el-input disabled v-model="editForm.risknote"></el-input>
					</el-form-item>
					<el-form-item label="风险附件:" prop="riskpicture" class="rt-input">
						<el-image style="width: 120px;" :src="editForm.riskpicture"></el-image>
						
					</el-form-item>
					<el-form-item label="车辆状态:" prop="carstatus" class="rt-input">
						<el-input disabled v-model="editForm.carstatus"></el-input>
					</el-form-item>
					<el-form-item label="拒单备注:" prop="refusenote" class="rt-input">
						<el-input disabled v-model="editForm.refusenote"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<span slot="footer" class="dialog-footer">

				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button v-if="canEdit" :disabled="canClickEdit" type="primary" @click="handlecanEdit">修 改</el-button>
				<el-button v-else type="primary" @click="editInfo">确 定</el-button>
			</span>

		</el-dialog>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 查询数据
				queryInfo: {
					pageNo: 1,
					pageSize: 10,
					// 倒叙必填
					order: "desc",
					column: "id",
					no: '',
				},
				// 分页列表
				wybillList: [],
				// 总条数
				total: 0,
				srcList: [],
				// 创建对话框数据
				addDialogVisible: false,
				addForm: {
					waybilltype: '',
					source: '',
					people: '',
					goodsname: '',
					goodsweight: '',
					overweight: '',
					picture: '',
					emptydistance: '',
					highspeed: '',
					estimatedistance: '',
					ban: '',
					deposit: '',
					pay: '',
					car: '',
					aclient: '',
					uclient: '',
					lienses: '',								
					Lidriver: '',
					dispatch: '',
					apoints: [{
						spointphone: "",
						stime: "",
						sprovince: "",
						scity: "",
						sarea: "",
						saddress: "",
						sgrade: "",
						shuafen: "",
						scityOptions: [],
						sareaOptions: [],
					}],
					upoints: [{
						dpointphone: "",
						dtime: "",
						dprovince: "",
						dcity: "",
						darea: "",
						daddress: "",
						dgrade: "",
						dhuafen: "",
						dcityOptions: [],
						dareaOptions: []
					}]
				},
				// 派单类型
				waybilltypeList: [{
					value: '前置派单',
					label: '前置派单'
				}, {
					value: '正常派单',
					label: '正常派单'
				}, {
					value: '补录派单',
					label: '补录派单'
				}],
				// 订单来源
				sourceList: [{
					value: '运满满',
					label: '运满满'
				}, {
					value: '货拉拉',
					label: '货拉拉'
				}, {
					value: '专线',
					label: '专线'
				}, {
					value: '签约工厂',
					label: '签约工厂'
				}, {
					value: '签约货站',
					label: '签约货站'
				}, {
					value: '其他',
					label: '其他'
				}],
				// 是否超高超重
				overweightList: [{
					value: '是',
					label: '是'
				}, {
					value: '否',
					label: '否'
				}],
				// 是否禁行
				banList: [{
					value: '是',
					label: '是'
				}, {
					value: '否',
					label: '否'
				}],
				// 创建页面公司选择框数据
				companyOptions: [],
				companyList: [],
				loading: false,
				states: [],
				// 创建页面选择车牌号数据
				carLicenseOptions: [],
				allCarLicenseList: [],
				carLicenseLoading: false,

				// 创建页面发货信息选择省
				sprovinceOptions: [],
				allSprovinceList: [],
				// 创建页面发货信息选择市
				allScityList: [],
				// 创建页面发货信息选择市
				allSareaList: [],

				// 创建页面卸货信息选择省
				dprovinceOptions: [],
				allDprovinceList: [],
				// 创建页面卸货信息选择市
				allDcityList: [],
				// 创建页面卸货信息选择市
				allDareaList: [],


				// 编辑对话框数据
				editDialogVisible: false,
				editForm: {
					Lidriver: '',
					dispatch: '',
				},
				// 能否修改
				canEdit: true,
				// 修改按钮可否点击
				canClickEdit: true,
				// 订单完结，显示配送详情
				showDisDetails:false,

				updatePictureUrl: "http://81.70.151.121:8080/jeecg-boot/waybill/uploadpicture",
			}
		},
		created() {
			this.queryInfo.userid = window.sessionStorage.getItem('userID') - 0
			this.getWaybillList()
			this.getAllCompanyList()
			this.findAllCarLicense()
			this.findAllSprovince()
		},
		methods: {
			deleteApoints(index, rows) {
				//删除改行
				rows.splice(index, 1);
			},
			addApoints(apoints, event) {
				console.log(apoints)
				console.log(event)
				apoints.push({
					spointphone: "",
					stime: "",
					sprovince: "",
					scity: "",
					sarea: "",
					saddress: "",
					sgrade: "",
					shuafen: "",
					scityOptions: [],
					sareaOptions: []
				})
			},
			deleteUpoints(index, rows) {
				//删除改行
				rows.splice(index, 1);
			},
			addUpoints(upoints, event) {
				upoints.push({
					dpointphone: "",
					dtime: "",
					dprovince: "",
					dcity: "",
					darea: "",
					daddress: "",
					dgrade: "",
					dhuafen: "",
					dcityOptions: [],
					dareaOptions: []
				})
			},


			// 获取所有客户公司名称
			async getAllCompanyList() {
				const {
					data: res
				} = await this.$http.get('waybill/findAllCompanyName')
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
			async searchUnloadingPoint(name) {
				this.companyOptions = this.companyList
				// if(name !== ''){
				// 	const {
				// 		data: res
				// 	} = await this.$http.get('waybill/findPointByCompanyName?companyName=' + name)
				// 	console.log(res)
				// 	if (res.code !== 200) {
				// 		this.addForm.searchEmployee = ''
				// 		return this.$message.error('查询失败')
				// 	}
				// 	this.companyOptions = this.companyList

				// }else{
				// 	this.companyOptions = this.companyList
				// }
			},

			// 获取所有车牌号
			async findAllCarLicense() {
				const {
					data: res
				} = await this.$http.get('waybill/findAllLicense')
				// console.log(res)
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
			// 创建选择车牌号后发起请求
			async handleChooseCarLicense(carLicense) {
				if (carLicense !== '') {
					const {
						data: res
					} = await this.$http.get('waybill/findDriverByLicense?license=' + carLicense)
					// console.log(res)
					if (res.code !== 200) {
						return
					}
					this.carLicenseOptions = this.allCarLicenseList
					this.addForm.Lidriver = res.result.driver
					this.addForm.dispatch = res.result.dispatch
				} else {
					this.carLicenseOptions = this.allCarLicenseList
					this.addForm.Lidriver = ''
					this.addForm.dispatch = ''
				}
			},
			// 修改选择车牌号后发起请求
			async editChooseCarLicense(carLicense) {
				if (carLicense !== '') {
					const {
						data: res
					} = await this.$http.get('waybill/findDriverByLicense?license=' + carLicense)
					// console.log(res)
					if (res.code !== 200) {
						return
					}
					this.carLicenseOptions = this.allCarLicenseList
					this.editForm.Lidriver = res.result.driver
					this.editForm.dispatch = res.result.dispatch
					this.$forceUpdate()
				} else {
					this.carLicenseOptions = this.allCarLicenseList
					this.editForm.Lidriver = ''
					this.editForm.dispatch = ''
				}

			},

			// 获取所有省
			async findAllSprovince() {
				this.allSprovinceList = []
				this.sprovinceOptions = []
				this.dprovinceOptions = []
				const {
					data: res
				} = await this.$http.get('waybill/findAllprovince')
				console.log(res)
				if (res.code !== 200) {
					return
				}
				this.allSprovinceList = res.result.map(item => {
					return {
						value: `${item}`,
						label: `${item}`
					};
				});
				this.sprovinceOptions = this.allSprovinceList
				this.dprovinceOptions = this.allSprovinceList
			},

			// 创建装货选择省后发起请求
			async sprovinceChange(province, index) {
				if (this.addForm.apoints[index].sprovince !== '') {
					const {
						data: res
					} = await this.$http.get('waybill/findcityByprovince?province=' + province)
					console.log(res)
					if (res.code !== 200) {
						return
					}
					this.allScityList = res.result.map(item => {
						return {
							value: `${item}`,
							label: `${item}`
						};
					});
					this.addForm.apoints[index].scityOptions = this.allScityList
				} else {
					this.addForm.apoints[index].scityOptions = []
					this.allScityList = []
					this.sareaOptions = []
					this.allSareaList = []
					this.addForm.apoints[index].scity = ''
					this.addForm.apoints[index].sarea = ''
					this.addForm.apoints[index].shuafen = ''
					this.addForm.apoints[index].schengben = ''
					this.addForm.apoints[index].sgrade = ''
				}
			},
			// 创建装货选择市后发起请求
			async scityChange(city, index) {
				if (this.addForm.apoints[index].scity !== '') {
					const {
						data: res
					} = await this.$http.get('waybill/findareaBycity?city=' + city)
					console.log(res)
					if (res.code !== 200) {
						return
					}
					this.allSareaList = res.result.map(item => {
						return {
							value: `${item}`,
							label: `${item}`
						};
					});
					this.addForm.apoints[index].sareaOptions = this.allSareaList
				} else {
					this.addForm.apoints[index].sareaOptions = []
					this.allSareaList = []
					this.addForm.apoints[index].sarea = ''
					this.addForm.apoints[index].shuafen = ''
					this.addForm.apoints[index].schengben = ''
					this.addForm.apoints[index].sgrade = ''
				}
			},
			// 创建装货选择区后发起请求
			async sareaChange(province, city, area, index) {
				if (province !== '' && city !== '' && area !== '') {
					const params = {
						province,
						city,
						area
					}
					const {
						data: res
					} = await this.$http.get('waybill/findhuanfenandchengben', {
						params: params
					})
					console.log(res)
					if (res.code !== 200) {
						return
					}
					this.addForm.apoints[index].shuafen = res.result[0].huafen
					this.addForm.apoints[index].schengben = res.result[0].chengben
					this.addForm.apoints[index].sgrade = res.result[0].grade

				} else {
					this.addForm.apoints[index].shuafen = ''
					this.addForm.apoints[index].schengben = ''
					this.addForm.apoints[index].sgrade = ''

				}
			},
			// 创建卸货选择省后发起请求
			async dprovinceChange(province, index) {
				if (this.addForm.upoints[index].dprovince !== '') {
					const {
						data: res
					} = await this.$http.get('waybill/findcityByprovince?province=' + province)
					console.log(res)
					if (res.code !== 200) {
						return
					}
					this.allDcityList = res.result.map(item => {
						return {
							value: `${item}`,
							label: `${item}`
						};
					});
					this.addForm.upoints[index].dcityOptions = this.allDcityList
				} else {
					this.addForm.upoints[index].dcityOptions = []
					this.allScityList = []
					this.dareaOptions = []
					this.allDareaList = []
					this.addForm.upoints[index].dcity = ''
					this.addForm.upoints[index].darea = ''
					this.addForm.upoints[index].dhuafen = ''
					this.addForm.upoints[index].dchengben = ''
					this.addForm.upoints[index].dgrade = ''
				}
			},
			// 创建卸货选择市后发起请求
			async dcityChange(city, index) {
				if (this.addForm.upoints[index].dcity !== '') {
					const {
						data: res
					} = await this.$http.get('waybill/findareaBycity?city=' + city)
					console.log(res)
					if (res.code !== 200) {
						return
					}
					this.allDareaList = res.result.map(item => {
						return {
							value: `${item}`,
							label: `${item}`
						};
					});
					this.addForm.upoints[index].dareaOptions = this.allDareaList
				} else {
					this.addForm.upoints[index].dareaOptions = []
					this.allDareaList = []
					this.addForm.upoints[index].darea = ''
					this.addForm.upoints[index].dhuafen = ''
					this.addForm.upoints[index].dchengben = ''
					this.addForm.upoints[index].dgrade = ''
				}
			},
			// 创建卸货选择区后发起请求
			async dareaChange(province, city, area, index) {
				if (province !== '' && city !== '' && area !== '') {
					const params = {
						province,
						city,
						area
					}
					const {
						data: res
					} = await this.$http.get('waybill/findhuanfenandchengben', {
						params: params
					})
					console.log(res)
					if (res.code !== 200) {
						return
					}
					this.addForm.upoints[index].dhuafen = res.result[0].huafen
					this.addForm.upoints[index].dchengben = res.result[0].chengben
					this.addForm.upoints[index].dgrade = res.result[0].grade

				} else {
					this.addForm.upoints[index].dhuafen = ''
					this.addForm.upoints[index].dchengben = ''
					this.addForm.upoints[index].dgrade = ''

				}
			},


			//分页区域
			// 根据分页查询列表
			async getWaybillList() {
				const {
					data: res
				} = await this.$http.get('waybill/list', {
					params: this.queryInfo
				})
				console.log('list', res)
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				// this.$message.success('获取信息成功')
				this.wybillList = res.result.records
				this.total = res.result.total
				this.wybillList.forEach(v => {
					if (v.state == 0) {
						v.stateText = "驳回"

					} else if (v.state == 1) {
						v.stateText = "审核中"

					} else {
						v.stateText = "审核完成"

					}
				})
			},

			//点击查看放大图片
			handleClickImage(src) {
				this.srcList = []
				this.srcList.push(src)
			},

			// 点击查询按钮
			handleQueryBtn() {
				this.queryInfo.no = "*" + this.queryInfo.noText + "*"
				this.getWaybillList()
			},
			// 返回按钮
			handleQueryBackBtn() {
				this.queryInfo.pageNo = 1
				this.queryInfo.pageSize = 10
				this.queryInfo.no = ''
				this.queryInfo.noText = ''
				this.getWaybillList()
			},

			// pageSize 改变的事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getWaybillList()
			},

			// 页码值改变事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNo = newPage
				this.getWaybillList()
			},

			// 创建图片上传成功的回调
			handlePictureUrlSuccess(response, file, fileList) {
				console.log(response)
				this.addForm.picture = response.result.pictureFileName
			},

			// 创建对话框
			addInfo() {
				// console.log(this.addForm)
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					// 发起添加信息的数据请求
					const {
						data: res
					} = await this.$http.post('waybill/addwaybill', this.addForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('添加信息失败')
					}
					// 添加成功，关闭对话框，刷新数据列表，提示添加成功
					this.addDialogVisible = false
					this.getWaybillList()
					// this.$message.success('添加信息成功')
				})
			},
			// 监听创建对话框关闭
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
				this.addForm = {
					waybilltype: '',
					source: '',
					people: '',
					goodsname: '',
					goodsweight: '',
					overweight: '',
					picture: '',
					emptydistance: '',
					highspeed: '',
					estimatedistance: '',
					ban: '',
					deposit: '',
					pay: '',
					car: '',
					aclient: '',
					uclient: '',
					lienses: '',	
					Lidriver: '',
					dispatch: '',
					apoints: [{
						spointphone: "",
						stime: "",
						sprovince: "",
						scity: "",
						sarea: "",
						saddress: "",
						sgrade: "",
						shuafen: "",
						scityOptions: [],
						sareaOptions: [],
					}],
					upoints: [{
						dpointphone: "",
						dtime: "",
						dprovince: "",
						dcity: "",
						darea: "",
						daddress: "",
						dgrade: "",
						dhuafen: "",
						dcityOptions: [],
						dareaOptions: []
					}]}

			},

			// 详情对话框操作
			// 展示详情的对话框
			async showEditDialog(plistNo) {
				this.canClickEdit = true
				this.showDisDetails = false
				const {
					data: res
				} = await this.$http.get('waybill/findListPage?plistNo=' + plistNo)
				console.log('详情', res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.editForm = res.result[0]
				this.editForm.LilicensePlate = this.editForm.liensess.licensePlate
				this.editForm.Lidriver = this.editForm.liensess.driver
				this.editForm.dispatch = this.editForm.liensess.dispatch
				if (res.result[0].state == 0) {
					this.canClickEdit = false
				} else if (res.result[0].state == 1) {
					this.canClickEdit = true
				} else if (res.result[0].state == 2) {
					this.canClickEdit = true
					this.showDisDetails = true
				}

				// 显示对话框
				this.editDialogVisible = true
			},

			// 修改图片上传成功的回调
			handleEditPictureUrlSuccess(response, file, fileList) {
				console.log(response)
				this.editForm.picture = response.result.pictureFileName
			},


			// 监听修改用户对话框关闭事件
			editDialogClosed() {
				this.$refs.editFormRef.resetFields()
				this.canEdit = true
			},
			handlecanEdit() {
				this.canEdit = false
			},

			editInfo() {
				this.$refs.editFormRef.validate(async valid => {
					if (!valid) return
					// 发起修改信息的数据请求
					const {
						data: res
					} = await this.$http.put('waybill/edit', this.editForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('更新信息失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.editDialogVisible = false

					this.getWaybillList()
					this.$message.success('更新信息成功')
				})
			},

		}
	}
</script>

<style scoped>
	.rt-input /deep/ .el-input__inner {
		color: #606266 !important;

	}
	
	/* 要实现驳回原因的label字体变红，需要把scoped去掉，但是去掉，上边禁用字体颜色样式就不起效果 */
	.redItem .el-form-item__label {
	     color: red;
	   }
</style>
