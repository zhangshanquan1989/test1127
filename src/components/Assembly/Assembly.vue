<template>
	<!-- 信息页面 -->
	<div>

		<!-- 创建搜索区 -->			
			<!-- 地区查询 -->
			<span style="font-size: 18px;">地区：</span>
			
			<el-cascader clearable :options="cityData" v-model="chooseQueryCity" @change="handleClientAddress"></el-cascader>

			<!-- 等级下拉框 -->
			<span style="font-size: 18px;margin-left: 20px;">等级：</span>
				<el-select v-model="queryInfo.clientLevel" placeholder="全部" clearable>
					<el-option v-for="item in levelSelect" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>

			<!-- 查询按钮 -->
				<el-button type="info"  @click="handleQueryBtn" style="margin-left: 20px;">查询</el-button>
			
			<!-- 返回按钮 -->
				<el-button type="info"  @click="handleQueryBackBtn" style="margin-left: 40px;">返回</el-button>

		<!-- 卡片视图区 -->
		<el-card class="box-card" style="margin-top: 8px;">
			<el-table :data="pagingList" stripe style="width: 100%">
				<el-table-column v-if="false" prop="clientId" label="企业ID">
				</el-table-column>
				<el-table-column v-if="false" prop="clientNo" label="企业ID">
				</el-table-column>

				<el-table-column prop="clientPointId" label="装配点ID">
				</el-table-column>
				<el-table-column prop="clientCompany" label="企业名称">
				</el-table-column>
				<el-table-column prop="clientType" label="类型">
				</el-table-column>
				<el-table-column prop="clientAddress" label="装配点地址">
				</el-table-column>
				<el-table-column  width="50px">
					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="定位" placement="top">
						<i class="el-icon-location" @click="handleLocation(scope.row.clientAddress)"></i>
						</el-tooltip>
					</template>

				</el-table-column>
				<el-table-column  width="50px">

					<template slot-scope="scope">
						<el-tooltip class="item" effect="dark" content="复制" placement="top">
						<i class="el-icon-document-copy" :data-clipboard-text=" scope.row.clientAddress+ '  ' + scope.row.clientFirstPerson+ ':' + scope.row.clientFirstTel+ '  ' + scope.row.clientSecondPerson+ ':' + scope.row.clientSecondTel+ '  ' + scope.row.clientThirdPerson+ ':' + scope.row.clientThirdTel"
						 @click="copyAreaRule"></i>
						</el-tooltip>
						
					</template>

				</el-table-column>
				<el-table-column prop="clientLevel" label="级别">
				</el-table-column>
				<el-table-column prop="clientListPerformance" label="履约情况(单)">
					
				</el-table-column>
				<el-table-column prop="clientDeliveryFrequency" label="发货频次(/上周)">
				</el-table-column>
				<el-table-column  prop="clientFirstPerson" label="联系人">
				</el-table-column>
				<el-table-column prop="clientFirstTel" label="电话">
				</el-table-column>
				<el-table-column v-if="false" prop="clientSecondPerson" label="装配点第二联系人">
				</el-table-column>
				<el-table-column v-if="false" prop="clientSecondTel" label="装配点第二联系人电话">
				</el-table-column>
				<el-table-column v-if="false" prop="clientThirdPerson" label="装配点第三联系人">
				</el-table-column>
				<el-table-column v-if="false" prop="clientThirdTel" label="装配点第三联系人电话">
				</el-table-column>
				<el-table-column prop="clientFounder" label="创建人">
				</el-table-column>
				<el-table-column prop="clientFounderTel" label="电话">
				</el-table-column>
				<el-table-column prop="clientDisApoint" label="关联装配点">
				</el-table-column>
				<el-table-column label="操作" 　width="200px">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row)">详情</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-card>

		<!-- 分页区域 -->
		<el-col style="margin-top: 10px;">
			<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pageNo"
			 :page-sizes="[5, 10, 15, 20]" :page-size="queryInfo.pageSize" layout="total, sizes, prev, pager, next, jumper"
			 :total="total">
			</el-pagination>
		</el-col>

		<!-- 详情的对话框 -->
		<el-dialog title="装配点详情" :visible.sync="editDialogVisible" width="80%" @close="editDialogClosed">
			<!-- 详情的表单 -->
			<el-form :model="editForm" ref="editFormRef" label-width="100px">
				<div class="firstLine" style="display: flex;">
				<el-form-item label="装配点ID:">
					<el-input disabled  v-model="editForm.clientPointId" class="rt-input"></el-input>
				</el-form-item>
				<el-form-item label="名称:">
					<el-input disabled  v-model="editForm.clientCompany" class="rt-input"></el-input>
				</el-form-item>
				<el-form-item label="地址:" style="width: 300px;">
					<el-input disabled  v-model="editForm.clientAddress" class="rt-input" style="width: 280px;"></el-input>
				</el-form-item>
				<el-form-item style="width: 20px;margin-left: 0;">
					<template>
						<el-tooltip class="item" effect="dark" content="定位" placement="top">
						<i class="el-icon-location" @click="handleLocation(editForm.clientAddress)"></i>
						</el-tooltip>						
					</template>
				</el-form-item>
				<el-form-item >
					<template>						
						<el-tooltip class="item" effect="dark" content="复制联系人" placement="top">
						<i class="el-icon-document-copy" :data-clipboard-text="editForm.clientName+ '  ' + editForm.clientAddress+ '  ' + editForm.clientFirstPerson+ ':' + editForm.clientFirstTel+ '  ' + editForm.clientSecondPerson+ ':' + editForm.clientSecondTel+ '  ' + editForm.clientThirdPerson+ ':' + editForm.clientThirdTel"
						 @click="copyAreaRule"></i>
						</el-tooltip>							
					</template>
				</el-form-item>
				
				<el-form-item label="类型:">
					<el-input disabled  v-model="editForm.clientType" class="rt-input" style="width: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="履约共计:">
					<el-input disabled  v-model="editForm.clientListPerformance + '单' " class="rt-input" style="width: 70px;"></el-input>
				</el-form-item>
				</div>
				<div class="secondLine" style="display: flex;">
				<el-form-item label="联系人:">
					<el-input disabled  v-model="editForm.clientFirstPerson" class="rt-input" style="width: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="电话:">
					<el-input disabled  v-model="editForm.clientFirstTel" class="rt-input" style="width: 150px;"></el-input>
				</el-form-item>
				<el-form-item label="创建日期:">
					<el-input disabled  v-model="editForm.clientCtime" class="rt-input" style="width: 200px;"></el-input>
				</el-form-item>
				<el-form-item label="创建人:">
					<el-input disabled  v-model="editForm.clientFounder" class="rt-input" style="width: 100px;"></el-input>
				</el-form-item>
				<el-form-item label="电话:">
				<el-input disabled  v-model="editForm.clientFounderTel" class="rt-input" style="width: 150px;"></el-input>
				</el-form-item>
</div>
				<!-- 关联查询，需要更改 -->
				<el-form-item label="关联查询:">
					<!-- 创建搜索区 -->
					<el-row :gutter="20">

						<!-- 地区下拉框 -->
						<el-col :span="2"><span>地区</span></el-col>
						<el-col :span="4">
							<el-cascader clearable :options="cityData" v-model="chooseRelatedAreas" @change="handleRelatedAreas" @clear="handleClearAddress"></el-cascader>
					<!-- 		<el-input v-model="associatedQueryInfo.address" placeholder="地区" clearable @clear="handleClearAddress"></el-input> -->
						</el-col>

						<el-col :span="2"><span>地区等级</span></el-col>
						<el-col :span="4">
							<el-select v-model="associatedQueryInfo.addrGrade" placeholder="请选择" clearable @clear="handleClearAddrGrade">
								<el-option v-for="item in levelSelect" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<el-col :span="2"><span>关联距离</span></el-col>
						<el-col :span="4">
							<el-select v-model="associatedQueryInfo.distance" placeholder="单位:KM" clearable @clear="handleClearDistance">
								<el-option v-for="item in distanceSelect" :key="item.value" :label="item.label" :value="item.value">
								</el-option>
							</el-select>
						</el-col>
						<!-- 查询按钮 -->
						<el-col :span="2">
							<el-button type="info" size="mini" @click="handleAssociatedQueryBtn">查询</el-button>
						</el-col>
					</el-row>
				</el-form-item>
			</el-form>


			<el-card class="box-card">
				<el-table :data="findList" stripe style="width: 100%;" :row-style="rowClass">
					<el-table-column v-if="false" prop="CLIENT_ID" label="企业ID">
					</el-table-column>
					<el-table-column v-if="false" prop="CLIENT_NO" label="企业ID">
					</el-table-column>

					<el-table-column prop="CLIENT_POINT_ID" label="装配点ID">
					</el-table-column>
					<el-table-column prop="CLIENT_COMPANY" label="企业名称">
					</el-table-column>
					<el-table-column prop="CLIENT_ADDRESS" label="装配点地址">
					</el-table-column>
					<el-table-column label="地址" width="50px">
						<template slot-scope="scope">
							<el-tooltip class="item" effect="dark" content="定位" placement="top">
							<i class="el-icon-location" @click="handleLocation(scope.row.CLIENT_ADDRESS)"></i>
							</el-tooltip>
							
						</template>

					</el-table-column>
					<el-table-column label="复制" width="50px">

						<template slot-scope="scope">
							<el-tooltip class="item" effect="dark" content="复制" placement="top">
							<i class="el-icon-document-copy" :data-clipboard-text="scope.row.CLIENT_NAME+ '  ' + scope.row.CLIENT_ADDRESS+ '  ' + scope.row.clientFirstPerson+ ':' + scope.row.clientFirstTel+ '  ' + scope.row.clientSecondPerson+ ':' + scope.row.clientSecondTel+ '  ' + scope.row.clientThirdPerson+ ':' + scope.row.clientThirdTel"
							 @click="copyAreaRule"></i>
							</el-tooltip>
							
						</template>

					</el-table-column>
					<el-table-column prop="CLIENT_LEVEL" label="级别">
					</el-table-column>
					<el-table-column prop="CLIENT_TYPE" label="类型">
					</el-table-column>
					<el-table-column prop="RELATED_PERFORMANCR" label="关联履约">
					</el-table-column>
					<el-table-column prop="CLIENT_DELIVERY_FREQUENCY" label="发货频次">
					</el-table-column>
					<el-table-column prop="CLIENT_FIRST_PERSON" label="第一联系人">
					</el-table-column>
					<el-table-column prop="CLIENT_FIRST_TEL" label="电话">
					</el-table-column>
					<el-table-column prop="CLIENT_SECOND_PERSON" label="第二联系人">
					</el-table-column>
					<el-table-column prop="CLIENT_SECOND_TEL" label="电话">
					</el-table-column>
					<el-table-column prop="CLIENT_THIRD_PERSON" label="第三联系人">
					</el-table-column>
					<el-table-column prop="CLIENT_THIRD_TEL" label="电话">
					</el-table-column>
					<el-table-column prop="CLIENT_DISTANCE" label="关联距离">
					</el-table-column>
					<el-table-column prop="CLIENT_DISTANCE" label="地图路线">
						<template slot-scope="scope">
							<el-tooltip class="item" effect="dark" content="定位" placement="top">
							<i class="el-icon-s-promotion" @click="handleNavigation(scope.row.CLIENT_ADDRESS)"></i>
							</el-tooltip>
							
						</template>
					</el-table-column>
					<el-table-column prop="AREA_RULE" label="限行规则">
					</el-table-column>

				</el-table>
			</el-card>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<!-- <el-button type="primary" @click="editInfo">确 定</el-button> -->
			</span>

		</el-dialog>

		<!-- 高德的对话框 -->
		<el-dialog title="地图" :visible.sync="locationDialogVisible" width="50%">
			<!-- <div>{{licationAddress}}:</div> -->
			<div id="container"></div>
		</el-dialog>

		<!-- 高德导航路线的对话框 -->
		<el-dialog title="导航" :visible.sync="navigationDialogVisible" width="50%">
			<div id="navigationContainer"></div>
			<div id="panel"></div>
		</el-dialog>


	</div>
</template>

<script>
	import cityData from './citydata.js'
	export default {
		data() {
			return {
				// 搜索，城市
				chooseQueryCity:[],
				cityData:cityData,
				// 查询数据
				queryInfo: {
					clientAddress: '',
					clientLevel: '',
					pageNo: 1,
					pageSize: 10
				},
				// 分页列表
				pagingList: [],
				// 分页总条数
				total: 0,
				// 添加公司表单的状态选项
				levelSelect: [{
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

				// 详情对话框数据
				// 详情对话框显示与隐藏
				editDialogVisible: false,
				editForm: {},
				// 关联装配站列表
				findList: {},
				// 关联查询，地区
				chooseRelatedAreas:[],
				// 详情查询数据
				associatedQueryInfo: {
					address: '',
					addrGrade: '',
					distance: ''
				},
				distanceSelect: [{
					value: '0-50',
					label: '0-50'
				}, {
					value: '50-100',
					label: '50-100'
				}, {
					value: '100-200',
					label: '100-200'
				}, {
					value: '200-500',
					label: '200-500'
				}, {
					value: '500-2000',
					label: '500-2000'
				}],

				// 地图icon显示地图
				locationDialogVisible: false,
				licationAddress: '',

				// 地图导航起始坐标
				navigationDialogVisible: false,
				startLngLat: [],
				endLngLat: []
			}
		},

		created() {
			this.getClientList()
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
rowClass ({row, rowIndex}) {
      console.log(row)
      console.log(rowIndex)
			if(row.IS_DELETE == 1){
				return { "color": "#d1cbd1" }
			}
    },
			
			// 查询选择城市
handleClientAddress(e){
	let city = '';
	this.chooseQueryCity.forEach(v=>{
		city = city + v
	})
	this.queryInfo.clientAddress = "*" + city + "*"
	// console.log(e)
	console.log(this.queryInfo.clientAddress)
},
handleRelatedAreas(){
	let city = '';
	this.chooseRelatedAreas.forEach(v=>{
		city = city + v
	})
	this.associatedQueryInfo.address =  city 
},

// 详情页关联地区查询

			//分页区域 
			// 根据分页查询列表
			async getClientList() {
				const {
					data: res
				} = await this.$http.get('tPfDisApoint/list', {
					params: this.queryInfo
				})
console.log(res)
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}

				this.$message.success('获取信息成功')
				this.pagingList = res.result.records
				this.total = res.result.total
			},

			// 点击查询按钮
			handleQueryBtn() {
				
				this.getClientList()
			},
			// 点击返回按钮
			handleQueryBackBtn(){
				this.chooseQueryCity = ''
				this.queryInfo.clientAddress = ""
				this.queryInfo.clientLevel = ""
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


			// 编辑对话框操作	
			// 展示详情的对话框
			async showEditDialog(row) {
				// 拿到详情的装配点地址，配置经纬度
				console.log(row.clientAddress)
				var geocoder = new AMap.Geocoder();
				geocoder.getLocation(row.clientAddress, (status, result) => {

					if (status === 'complete' && result.info === 'OK') {

						// 经纬度                      
						var lng = result.geocodes[0].location.lng;
						var lat = result.geocodes[0].location.lat;
						this.startLngLat = [lng, lat];

					} else {
						console.log('定位失败！');
					}
				});
				this.associatedQueryInfo.pointId = row.clientPointId
				// 获取装配站信息
				const {
					data: res
				} = await this.$http.get('tPfDisApoint/findListDetails?pointId=' + row.clientPointId)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				// console.log(res)
				this.editForm = res.result

				// 获取关联装配站的信息
				const {
					data: result
				} = await this.$http.get('tPfDisApoint/findListDisPoints?pointId=' + row.clientPointId)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				console.log(result)
				this.findList = result.result
				// 显示对话框
				this.editDialogVisible = true
			},

			// 监听详情对话框关闭事件
			editDialogClosed() {
				this.$refs.editFormRef.resetFields()
			},

			// 详情页面关联查询
			async handleAssociatedQueryBtn() {
				console.log(this.associatedQueryInfo)
				const {
					data: res
				} = await this.$http.get('tPfDisApoint/findListDisPoints', {
					params: this.associatedQueryInfo
				})
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}

				this.$message.success('获取信息成功')
				this.findList = res.result
			},
			handleClearAddress() {
				this.associatedQueryInfo.address = ''
			},
			handleClearAddrGrade() {
				this.associatedQueryInfo.addrGrade = ''
			},
			handleClearDistance() {
				this.associatedQueryInfo.distance = ''
			},
			// // 修改信息并提交
			// editInfo() {
			// 	this.$refs.editFormRef.validate(async valid => {
			// 		if (!valid) return
			// 		// 发起修改信息的数据请求
			// 		const {
			// 			data: res
			// 		} = await this.$http.post('base/tBaClient/edit', this.editForm)

			// 		if (res.code !== 200) {
			// 			return this.$message.error('更新信息失败')
			// 		}
			// 		// 更新成功，关闭对话框，刷新数据列表，提示修改成功
			// 		this.editDialogVisible = false
			// 		this.getClientList()
			// 		this.$message.success('更新信息成功')
			// 	})
			// },

			// 复制
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
			handleNavigation(endAddress) {
				this.navigationDialogVisible = true
				this.$nextTick(() => {
				// 拿到详情的装配点地址，配置经纬度
				var geocoder = new AMap.Geocoder();
				geocoder.getLocation(endAddress, (status, result) => {

					if (status === 'complete' && result.info === 'OK') {

						// 经纬度                      
						var endlng = result.geocodes[0].location.lng;
						var endlat = result.geocodes[0].location.lat;
						this.endLngLat = [endlng, endlat];
						
						
						console.log(this.startLngLat);
						console.log(this.endLngLat);
						//基本地图加载
						var map = new AMap.Map("navigationContainer", {
							resizeEnable: true,
							center:  this.startLngLat, //地图中心点
							zoom: 13 //地图显示的缩放级别
						});
						//构造路线导航类
						var driving = new AMap.Driving({
							map: map,
							panel: "panel"
						});
						
						var tool = new AMap.ToolBar();
						map.addControl(tool);
						
						// 根据起终点经纬度规划驾车导航路线
						driving.search(this.startLngLat,this.endLngLat, function(status, result) {
							// result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
							if (status === 'complete') {
								console.log('绘制驾车路线完成')
							} else {
								console.log('获取驾车数据失败：' + result)
							}
						});
					} else {
						console.log('定位失败！');
					}
				});

	
				
				// // 根据起终点经纬度规划驾车导航路线
				// driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function(status, result) {
				// 	// result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
				// 	if (status === 'complete') {
				// 		console.log('绘制驾车路线完成')
				// 	} else {
				// 		console.log('获取驾车数据失败：' + result)
				// 	}
				// });
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

	#navigationContainer {
		width: 100%;
		height: 500px;
	}

	#panel {
		position: fixed;
		background-color: white;
		max-height: 90%;
		overflow-y: auto;
		top: 10px;
		right: 10px;
		width: 280px;
	}

	#panel .amap-call {
		background-color: #009cf9;
		border-top-left-radius: 4px;
		border-top-right-radius: 4px;
	}

	#panel .amap-lib-driving {
		border-bottom-left-radius: 4px;
		border-bottom-right-radius: 4px;
		overflow: hidden;
	}
	
.success-row {
	    color: blue ;
	}
	
.warning-row {
	background-color: #000080;
	    color: red ;
	}
	
	.rt-input /deep/ .el-input__inner {
	  color: #606266 !important;
	  
	}
</style>
