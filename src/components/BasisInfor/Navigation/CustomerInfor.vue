<template>
	<!-- 客户信息页面 -->
	<div>

		<!-- 创建搜索区 -->
		<el-row :gutter="20">

			<!-- 创建按钮 -->
			<el-col :span="2">
				<el-button type="info" size="mini" @click="showAddDialog">创建</el-button>
			</el-col>
			
			<!-- 地区查询 -->
			<el-col :span="1"><span>地区</span></el-col>
			<el-col :span="4">
				<el-input id='queryAddressinput' clearable type="text" v-model="queryInfo.clientAddress" style="width: 80%;" placeholder="高德接口"></el-input>
			</el-col>

			<!-- 等级下拉框 -->
			<el-col :span="1"><span>等级</span></el-col>
			<el-col :span="4">
				<el-select v-model="queryInfo.clientLevel" placeholder="全部" clearable>
					<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</el-col>

			<!-- 查询按钮 -->
			<el-col :span="2">
				<el-button type="info" size="mini" @click="handleQueryBtn">查询</el-button>
			</el-col>
		</el-row>

		<!-- 卡片视图区 -->
		<el-card class="box-card">
			<el-table :data="clientList" stripe style="width: 100%">
				<el-table-column v-if="false" prop="clientId" label="企业ID">
				</el-table-column>
				<el-table-column prop="clientNo" label="企业ID">
				</el-table-column>
				<el-table-column prop="clientName" label="企业名称">
				</el-table-column>
				<el-table-column prop="clientPointId" label="装配点ID">
				</el-table-column>
				<el-table-column prop="clientAddress" label="装配点地址">
				</el-table-column>
				<el-table-column  label="地址" width="50px">
					<template slot-scope="scope">
						<i class="el-icon-location"  @click="handleLocation(scope.row.clientAddress)"></i>
					</template>				
					
				</el-table-column>
				<el-table-column  label="复制" width="50px">
					
				<template slot-scope="scope">
						<i class="el-icon-document-copy" :data-clipboard-text="scope.row.clientName+ '  ' + scope.row.clientAddress+ '  ' + scope.row.clientFirstPerson+ ':' + scope.row.clientFirstTel+ '  ' + scope.row.clientSecondPerson+ ':' + scope.row.clientSecondTel+ '  ' + scope.row.clientThirdPerson+ ':' + scope.row.clientThirdTel" @click="copyAreaRule"></i>
					</template>		
							
				</el-table-column>
				<el-table-column prop="clientLevel" label="级别">
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
				<el-table-column label="操作"　width="200px">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.clientNo)">编辑</el-button>
						<!-- 删除按钮 -->
						
						<el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.clientId)" style="margin-left: 10px;">
							<el-button type="danger" size="mini" slot="reference" >删除</el-button>
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
		<el-dialog title="新增客户信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
			<!-- 创建的表单 -->
			<el-form :model="addForm" ref="addFormRef" label-width="100px">
				<el-form-item  label="客户ID:"></el-form-item>
				<el-form-item label="企业名称:">
					<el-input v-model="addForm.clientName"></el-input>
				</el-form-item>
				<el-form-item label="法人:">
					<el-input v-model="addForm.clientLegalPerson"></el-input>
				</el-form-item>
				<el-form-item label="业务对接人:">
					<el-input v-model="addForm.clientBusinessMatcher"></el-input>
				</el-form-item>
				<el-form-item label="对接人电话:">
					<el-input v-model="addForm.clientCall"></el-input>
				</el-form-item>
				<el-form-item label="办公地址:">
					<el-input id='tipinput' clearable type="text" v-model="addForm.clientOfficeAddress" style="width: 80%;" placeholder="高德接口"></el-input>
				</el-form-item>
				<el-form-item label="创建人:">
					<el-input v-model="addForm.clientFounder"></el-input>
				</el-form-item>
				<el-form-item label="电话:">
					<el-input v-model="addForm.clientFounderTel"></el-input>
				</el-form-item>
				<el-form-item label="维护人:">
					<el-input v-model="addForm.clientMaintain"></el-input>
				</el-form-item>
				<el-form-item label="电话:">
					<el-input v-model="addForm.clientMaintainTel"></el-input>
				</el-form-item>
				<el-form-item label="装配点ID:">
					<el-input v-model="addForm.clientPointId"></el-input>
				</el-form-item>
				<el-form-item label="装配点地址:">
					<el-input id='assemblyinput' clearable type="text" v-model="addForm.clientAddress" style="width: 80%;" placeholder="高德接口"></el-input>
				</el-form-item>
				<el-form-item label="地区等级:">
					<el-input v-model="addForm.clientLevel"></el-input>
				</el-form-item>
				<el-form-item label="类型:">
					<el-input v-model="addForm.clientType"></el-input>
				</el-form-item>
				<el-form-item label="一联系人:">
					<el-input v-model="addForm.clientFirstPerson"></el-input>
				</el-form-item>
				<el-form-item label="一电话:">
					<el-input v-model="addForm.clientFirstTel"></el-input>
				</el-form-item>
				<el-form-item label="二联系人:">
					<el-input v-model="addForm.clientSecondPerson"></el-input>
				</el-form-item>
				<el-form-item label="二电话:">
					<el-input v-model="addForm.clientSecondTel"></el-input>
				</el-form-item>
				<el-form-item label="三联系人:">
					<el-input v-model="addForm.clientThirdPerson"></el-input>
				</el-form-item>
				<el-form-item label="三电话:">
					<el-input v-model="addForm.clientThirdTel"></el-input>
				</el-form-item>
</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addInfo">确 定</el-button>
			</span>

		</el-dialog>


		<!-- 编辑的对话框 -->
		<el-dialog title="编辑客户信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
			<!-- 编辑的表单 -->
			<el-form :model="editForm" ref="editFormRef" label-width="100px">
				<el-form-item  label="客户ID:"></el-form-item>
				<el-form-item label="企业名称:">
					<el-input v-model="editForm.clientName"></el-input>
				</el-form-item>
				<el-form-item label="法人:">
					<el-input v-model="editForm.clientLegalPerson"></el-input>
				</el-form-item>
				<el-form-item label="业务对接人:">
					<el-input v-model="editForm.clientBusinessMatcher"></el-input>
				</el-form-item>
				<el-form-item label="对接人电话:">
					<el-input v-model="editForm.clientCall"></el-input>
				</el-form-item>
				<el-form-item label="办公地址:">
					<el-input v-model="editForm.clientOfficeAddress"></el-input>
				</el-form-item>
				<el-form-item label="创建人:">
					<el-input v-model="editForm.clientFounder"></el-input>
				</el-form-item>
				<el-form-item label="电话:">
					<el-input v-model="editForm.clientFounderTel"></el-input>
				</el-form-item>
				<el-form-item label="维护人:">
					<el-input v-model="editForm.clientMaintain"></el-input>
				</el-form-item>
				<el-form-item label="电话:">
					<el-input v-model="editForm.clientMaintainTel"></el-input>
				</el-form-item>
				<el-form-item label="装配点ID:">
					<el-input v-model="editForm.clientPointId"></el-input>
				</el-form-item>
				<el-form-item label="装配点地址:">
					<el-input v-model="editForm.clientAddress"></el-input>
				</el-form-item>
				<el-form-item label="地区等级:">
					<el-input v-model="editForm.clientLevel"></el-input>
				</el-form-item>
				<el-form-item label="类型:">
					<el-input v-model="editForm.clientType"></el-input>
				</el-form-item>
				<el-form-item label="一联系人:">
					<el-input v-model="editForm.clientFirstPerson"></el-input>
				</el-form-item>
				<el-form-item label="一电话:">
					<el-input v-model="editForm.clientFirstTel"></el-input>
				</el-form-item>
				<el-form-item label="二联系人:">
					<el-input v-model="editForm.clientSecondPerson"></el-input>
				</el-form-item>
				<el-form-item label="二电话:">
					<el-input v-model="editForm.clientSecondTel"></el-input>
				</el-form-item>
				<el-form-item label="三联系人:">
					<el-input v-model="editForm.clientThirdPerson"></el-input>
				</el-form-item>
				<el-form-item label="三电话:">
					<el-input v-model="editForm.clientThirdTel"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="editInfo">确 定</el-button>
			</span>

		</el-dialog>
		
		<!-- 高德的对话框 -->
		<el-dialog title="地图" :visible.sync="locationDialogVisible" width="50%" >
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
					queryRegion: '',
					areaNo: '',
					areaGrade: '',
					pageNo: 1,
					pageSize: 10
				},
				// 列表
				clientList: [],
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
				addForm: {},
				// 编辑对话框数据
				// 编辑对话框显示与隐藏
				editDialogVisible: false,
				editForm: {},
				
				// 地图icon显示地图
				locationDialogVisible:false,
				licationAddress:''
			}
		},

		created() {
			this.getClientList();
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
			
			showAddDialog(){
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
						that.addForm.clientOfficeAddress = e.poi.district 
					}
					
					var assemblyauto = new AMap.Autocomplete({
						input: "assemblyinput"
					});
					AMap.event.addListener(assemblyauto, "select", assemblyselect); //注册监听，当选中某条记录时会触发
					function assemblyselect(e) {
						console.log(e)
						that.addForm.clientAddress = e.poi.district 
					}
				})
			},

			//分页区域 
			// 根据分页查询列表
			async getClientList() {
				const {
					data: res
				} = await this.$http.get('base/tBaClient/list', {
					params: this.queryInfo
				})

				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				console.log(res)
				// this.$message.success('获取地区信息成功')
				this.clientList = res.result.records
				this.total = res.result.total
			},

			// 点击查询按钮
			async handleQueryBtn() {
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
					} = await this.$http.post('base/tBaClient/edit', this.editForm)

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
			copyAreaRule(){
				let clipboard = new this.Clipboard(".el-icon-document-copy");
				      clipboard.on("success", e => {
				        // 释放内存
								this.$message.success('已成功复制')
				        clipboard.destroy();
				      });
			},
			
			// 高德poi接口,根据地址在页面显示地址
			handleLocation(clientAddress){
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
				                    zoom: 12 　　　　　　 // 设置地图的缩放级别，0 - 20
				                });
				                        
				                // 添加标记
				                var marker = new AMap.Marker({
				                    map: map,
				                    position: new AMap.LngLat(lng, lat),   // 经纬度
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
	width: 31.25rem;
	height: 500px;
}
</style>
