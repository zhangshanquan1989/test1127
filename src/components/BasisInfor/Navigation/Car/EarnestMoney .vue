<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
			<el-breadcrumb-item>车辆管理</el-breadcrumb-item>
			<el-breadcrumb-item>车辆保证金</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card class="box-card">
			<el-table :data="pageList" border stripe style="width: 100%;margin-top: 8px;" :row-style="{height:'60px'}"
			 :cell-style="{padding:'0px'}" :header-cell-style="{background:'#f8f8f9', color:'#000000'}">
				<el-table-column prop="id" label="id" v-if="false">
				</el-table-column>
				<el-table-column prop="license" label="车牌号">
				</el-table-column>
				<el-table-column prop="margin" label="保证金">
				</el-table-column>
				<el-table-column prop="fines" label="罚款">
				</el-table-column>
				<el-table-column prop="remain" label="保证金余额">
					<template slot-scope="scope">
						<span :style="{'color':scope.row.remain < 500?'red':'black'}">{{scope.row.remain}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- 充值按钮 -->
						<el-button type="primary" size="mini" @click="showRechargeDialog(scope.row.id)">充值</el-button>
						<!-- 罚款按钮 -->
						<el-button type="warning" size="mini" @click="showFineDialog(scope.row.id)">罚款</el-button>
						<!-- 修改按钮 -->
						<!-- <el-button type="primary" size="mini" @click="showEditDialog(scope.row.id)">记录</el-button> -->
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

		<!-- 充值的对话框 -->
		<el-dialog title="充值页面" :visible.sync="rechargeDialogVisible" width="45%" @close="rechargeDialogClosed">
			<!-- 充值的表单 -->
			<el-form :model="addRechargeForm" ref="addRechargeFormRef" label-width="100px">
				<el-form-item v-if="false" label="充值id:" prop="parentid">
					<el-input v-model="addRechargeForm.parentid"></el-input>
				</el-form-item>
				<el-form-item label="充值金额:" prop="amountS">
					<el-input v-model="addRechargeForm.amountS"></el-input>
				</el-form-item>
			</el-form>	
			
			<!-- <span slot="footer" class="dialog-footer"> -->
			<span style="float:right">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRechargeInfo">确 定</el-button>
			</span>	
						
			<!-- 充值的记录 -->
			<el-table :data="rechargeRecordList" border stripe style="width: 100%;margin-top: 100px;" :row-style="{height:'60px'}"
			 :cell-style="{padding:'0px'}" :header-cell-style="{background:'#f8f8f9', color:'#000000'}">
				<el-table-column type="index" width="100" label="序号">
				</el-table-column>
				<el-table-column prop="amount" label="充值金额">
				</el-table-column>
				<el-table-column prop="people" label="充值人">
				</el-table-column>
				<el-table-column prop="time" label="充值时间">
				</el-table-column>
			</el-table>
			
		
		</el-dialog>

		<!-- 罚款的对话框 -->
		<el-dialog title="罚款页面" :visible.sync="fineDialogVisible" width="45%" @close="fineDialogClosed">
			<!-- 罚款的表单 -->
			<el-form :model="fineForm" ref="fineFormFormRef" label-width="100px">
				<el-form-item v-if="false" label="充值id:" prop="parentid">
					<el-input v-model="fineForm.parentid"></el-input>
				</el-form-item>
				<el-form-item label="罚款金额:" prop="fine">
					<el-input v-model="fineForm.fine"></el-input>
				</el-form-item>
				<el-form-item label="罚款原因:" prop="finecase">
					<el-input v-model="fineForm.finecase"></el-input>
				</el-form-item>
			</el-form>
			
			<!-- <span slot="footer" class="dialog-footer"> -->
				<span style="float:right">
				<el-button @click="fineDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="fineInfo">确 定</el-button>
			</span>
			
			<!-- 罚款的记录 -->
			<el-table :data="fineRecordList" border stripe style="width: 100%;margin-top: 100px;" :row-style="{height:'60px'}"
			 :cell-style="{padding:'0px'}" :header-cell-style="{background:'#f8f8f9', color:'#000000'}">
				<el-table-column type="index" width="100" label="序号">
				</el-table-column>
				<el-table-column prop="fine" label="罚款金额">
				</el-table-column>
				<el-table-column prop="finecase" label="罚款原因">
				</el-table-column>
				<el-table-column prop="people" label="罚款处理人">
				</el-table-column>
				<el-table-column prop="finetime" label="罚款时间">
				</el-table-column>
			</el-table>

	

		</el-dialog>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 分页查询数据
				queryInfo: {
					pageNo: 1,
					pageSize: 10,
					// // 倒叙必填
					order: "desc",
					column: "id"
				},
				// 分页列表
				pageList: [],
				total: 0,
				// 充值页面显示
				rechargeDialogVisible: false,
				// 充值记录
				rechargeRecordList: [],
				addRechargeForm: {},
				// 罚款页面显示
				fineDialogVisible: false,
				// 罚款记录
				fineRecordList: [],
				fineForm: {},
			}
		},
		created() {
			this.getPageList();
		},
		methods: {
			// 根据分页查询列表
			async getPageList() {
				const {
					data: res
				} = await this.$http.get('base/margin/list', {
					params: this.queryInfo
				})
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				// this.$message.success('获取信息成功')
				this.pageList = res.result.records
				this.total = res.result.total

			},

			// pageSize 改变的事件
			handleSizeChange(newSize) {
				this.queryInfo.pageSize = newSize
				this.getPageList()
			},

			// 页码值改变事件
			handleCurrentChange(newPage) {
				this.queryInfo.pageNo = newPage
				this.getPageList()
			},

			// 显示充值页面
			async showRechargeDialog(id) {
				const {
					data: res
				} = await this.$http.get('base/margin/selecttop?id=' + id)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.rechargeRecordList = res.result
				this.addRechargeForm.parentid = id
				this.rechargeDialogVisible = true
			},
			// 充值
			async addRechargeInfo() {
				this.$refs.addRechargeFormRef.validate(async valid => {
					if (!valid) return
					// 发起修改信息的数据请求
					this.addRechargeForm.amount = this.addRechargeForm.amountS - 0
					console.log(this.addRechargeForm)
					const {
						data: res
					} = await this.$http.post('base/top/add', this.addRechargeForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.rechargeDialogVisible = false
					this.getPageList()
					this.$message.success('成功')
				})
			},

			// 监听充值对话框关闭事件
			rechargeDialogClosed() {
				this.$refs.addRechargeFormRef.resetFields()
			},

			// 显示罚款页面
			async showFineDialog(id) {
				const {
					data: res
				} = await this.$http.get('base/margin/selectdown?id=' + id)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.fineRecordList = res.result
				this.fineForm.parentid = id
				this.fineDialogVisible = true
			},
			// 罚款
			async fineInfo() {
				this.$refs.fineFormFormRef.validate(async valid => {
					if (!valid) return
					// 发起修改信息的数据请求
					this.fineForm.fine = this.fineForm.fine - 0
					console.log(this.fineForm)
					const {
						data: res
					} = await this.$http.post('base/down/add', this.fineForm)
					console.log(this.fineForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error(res.message)
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.fineDialogVisible = false
					this.getPageList()
					this.$message.success('成功')
				})
			},

			// 监听罚款对话框关闭事件
			fineDialogClosed() {
				this.$refs.fineFormFormRef.resetFields()
			},
		}
	}
</script>

<style scoped>

</style>
