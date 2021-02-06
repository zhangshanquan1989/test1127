<template>
	<!-- 地区信息页面 -->
	<div>

		<!-- 创建搜索区 -->
		<el-row :gutter="20">

			<!-- 创建按钮 -->
			<el-col :span="2">
				<el-button type="info" size="mini" @click="addDialogVisible = true">创建</el-button>
			</el-col>



			<!-- 等级下拉框 -->
			<el-col :span="1"><span>等级</span></el-col>
			<el-col :span="4">
				<el-select v-model="queryInfo.areaGrade" placeholder="全部" clearable>
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
			<el-table :data="regionlist" stripe style="width: 100%">
				<el-table-column prop="areaId" label="地区编号">
				</el-table-column>
				<el-table-column prop="areaProvince" label="省/直辖区">
				</el-table-column>
				<el-table-column prop="areaCity" label="市/直辖市">
				</el-table-column>
				<el-table-column prop="areaCounty" label="区/县">
				</el-table-column>
				<el-table-column prop="areaGrade" label="等级">
				</el-table-column>
				<el-table-column prop="areaRule" label="限行规则">
				</el-table-column>
				
				<el-table-column>
					<template slot-scope="scope">
						<i class="el-icon-document-copy" :data-clipboard-text="scope.row.areaRule" @click="copyAreaRule"></i>
					</template>				
				</el-table-column>


				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- 修改按钮 -->
						<el-button type="primary" size="mini" @click="showEditDialog(scope.row.areaId)">编辑</el-button>
						<!-- 删除按钮 -->
						
						<el-popconfirm title="确定删除吗？" @confirm="removeById(scope.row.areaId)" style="margin-left: 10px;">
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
		<el-dialog title="新增地区信息" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
			<!-- 创建的表单 -->
			<el-form :model="addForm" ref="addFormRef" label-width="100px">
				<el-form-item v-if="false" label="地区编号:"></el-form-item>
				<el-form-item label="省/直辖区:">
					<el-input v-model="addForm.areaProvince"></el-input>
				</el-form-item>
				<el-form-item label="市/直辖市:">
					<el-input v-model="addForm.areaCity"></el-input>
				</el-form-item>
				<el-form-item label="区/县">
					<el-input v-model="addForm.areaCounty"></el-input>
				</el-form-item>
				<el-form-item label="等级">
					<el-select v-model="addForm.areaGrade" placeholder="请选择">
						<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="限行规则:">
					<el-input v-model="addForm.areaRule"></el-input>
				</el-form-item>
			</el-form>

			<span slot="footer" class="dialog-footer">
				<el-button @click="addDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addInfo">确 定</el-button>
			</span>

		</el-dialog>


		<!-- 编辑的对话框 -->
		<el-dialog title="编辑地区信息" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
			<!-- 编辑的表单 -->
			<el-form :model="editForm" ref="editFormRef" label-width="100px">
				<el-form-item label="地区编号:">{{editForm.areaNo}}</el-form-item>
				<el-form-item label="省/直辖区:">{{editForm.areaProvince}}</el-form-item>
				<el-form-item label="市/直辖市:">{{editForm.areaCity}}</el-form-item>
				<el-form-item label="区/县">{{editForm.areaCounty}}</el-form-item>
				<el-form-item label="等级">
					<el-select v-model="editForm.areaGrade" :placeholder="editForm.areaGrade">
						<el-option v-for="item in status" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>

				<el-form-item label="限行规则:">
					<el-input v-model="editForm.areaRule"></el-input>
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
				// 查询数据
				queryInfo: {
					queryRegion: '',
					areaNo: '',
					areaGrade: '',
					pageNo: 1,
					pageSize: 10
				},
				// 列表
				regionlist: [],
				// 总条数
				total: 0,
				// 添加表单的状态选项
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
			}
		},

		created() {
			this.getRegionList()
		},

		methods: {

			//分页区域 
			// 根据分页查询列表
			async getRegionList() {
				const {
					data: res
				} = await this.$http.get('base/tBaArea/list', {
					params: this.queryInfo
				})

				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}

				this.regionlist = res.result.records
				this.total = res.result.total
			},

			// 点击查询按钮
			async handleQueryBtn() {
				this.getRegionList()
				this.queryInfo.areaGrade = ''
			},
			// pageSize 改变的事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getRegionList()
			},

			// 页码值改变事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNo = newPage
				this.getRegionList()
			},

			// 创建对话框
			addInfo() {
				this.$refs.addFormRef.validate(async valid => {
					if (!valid) return
					// 发起添加信息的数据请求
					const {
						data: res
					} = await this.$http.post('base/tBaArea/add', this.addForm)

					if (res.code !== 200) {
						return this.$message.error('添加信息失败')
					}
					// 添加成功，关闭对话框，刷新数据列表，提示添加成功
					this.addDialogVisible = false
					this.getRegionList()
					this.$message.success('添加信息成功')
				})
			},
			// 监听创建对话框关闭
			addDialogClosed() {
				this.$refs.addFormRef.resetFields()
			},

			// 编辑对话框操作	
			// 展示编辑的对话框
			async showEditDialog(areaId) {
				console.log(areaId)
				const {
					data: res
				} = await this.$http.get('base/tBaArea/selectOne?areaId=' + areaId)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.editForm = res.result
				// 显示对话框
				this.editDialogVisible = true
			},

			// 监听修改对话框关闭事件
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
					} = await this.$http.post('base/tBaArea/edit', this.editForm)

					if (res.code !== 200) {
						return this.$message.error('更新信息失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.editDialogVisible = false
					this.getRegionList()
					this.$message.success('更新信息成功')
				})
			},

			// 删除操作
			async removeById(areaId) {
				const {
					data: res
				} = await this.$http.get('base/tBaArea/deleteById?areaId=' + areaId)

				if (res.code !== 200) {
					return this.$message.error('删除失败')
				}
				// 删除成功，刷新数据列表，提示删除成功
				this.getRegionList()
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
			}
		}
	}
</script>

<style scoped>

</style>
