<template>
	<div>
		<!-- 面包屑导航区 -->
		<el-breadcrumb separator-class="el-icon-arrow-right">
			<el-breadcrumb-item>首页</el-breadcrumb-item>
			<el-breadcrumb-item>基础信息管理</el-breadcrumb-item>
			<el-breadcrumb-item>车辆管理</el-breadcrumb-item>
			<el-breadcrumb-item>车辆管理费</el-breadcrumb-item>
		</el-breadcrumb>

		<el-card class="box-card">
			<el-table :data="pageList" border stripe style="width: 100%;margin-top: 8px;" :row-style="{height:'60px'}"
			 :cell-style="{padding:'0px'}" :header-cell-style="{background:'#f8f8f9', color:'#000000'}">
				<el-table-column prop="id" label="id" v-if="false">
				</el-table-column>
				<el-table-column prop="licensePlate" label="车牌号">
				</el-table-column>
				<el-table-column prop="managementcycle" label="交费周期">
				</el-table-column>
				<el-table-column prop="paytime" label="缴费时间">
				</el-table-column>
				<el-table-column prop="asoftime" label="到期时间">
					<template slot-scope="scope">
						<span :style="{'color':scope.row.owe == '是'?'red':'black'}">{{scope.row.asoftime}}</span>
					</template>
				</el-table-column>
				<el-table-column prop="owe" label="是否快到期">
					<template slot-scope="scope">
						<span :style="{'color':scope.row.owe == '是'?'red':'black'}">{{scope.row.owe}}</span>
					</template>
				</el-table-column>
				<el-table-column label="操作">
					<template slot-scope="scope">
						<!-- 缴费按钮 -->
						<el-button type="primary" size="mini" @click="payCostDialog(scope.row.licensePlate,scope.row.id)">缴费</el-button>
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

		<!-- 缴费的对话框 -->
		<el-dialog title="缴费页面" :visible.sync="payCostDialogVisible" width="40%" @close="payCostDialogClosed">
			<!-- 缴费的表单 -->
			<el-form :model="payCostForm" ref="payCostFormRef" label-width="100px">
				<el-form-item label="缴费周期:" prop="managementcycle">
					<el-select v-model="payCostForm.managementcycle" placeholder="请选择">
						<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="到期时间:" prop="asoftime">
					 <el-date-picker v-model="payCostForm.asoftime" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
					 </el-date-picker>
				</el-form-item>
			</el-form>
			
			<!-- <span slot="footer" class="dialog-footer"> -->
			<span style="float:right">
				<el-button @click="editDialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="payCostInfo">确 定</el-button>
			</span>
			
			<!-- 缴费的记录 -->
			<el-table :data="payCostList" border stripe style="width: 100%;margin-top: 100px;" :row-style="{height:'60px'}"
			 :cell-style="{padding:'0px'}" :header-cell-style="{background:'#f8f8f9', color:'#000000'}">
				<el-table-column type="index" width="100" label="序号">
				</el-table-column>
				<el-table-column prop="managementcycle" label="缴费周期">
				</el-table-column>
				<el-table-column prop="asoftime" label="到期时间">
				</el-table-column>
				<el-table-column prop="adduser" label="操作人">
				</el-table-column>
				<el-table-column prop="paytime" label="操作时间">
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
					// 倒叙必填
					order: "desc",
					column: "id"
				},
				// 分页列表
				pageList: [],
				total: 0,
				// 充值页面显示
				payCostDialogVisible: false,
				// 充值记录
				payCostList: [],
				payCostForm: {
					managementcycle:'',
					asoftime:''
				},
				// 选择缴费周期
				options: [{
					value: '月付',
					label: '月付'
				}, {
					value: '季度付',
					label: '季度付'
				}, {
					value: '半年付',
					label: '半年付'
				}, {
					value: '年付',
					label: '年付'
				}],
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
				} = await this.$http.get('kmanagement/list', {
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

			// 显示缴费页面
			async payCostDialog(licensePlate,id) {
				console.log(licensePlate)
				console.log(id)
				const {
					data: res
				} = await this.$http.get('kmanagementRecords/list?licensePlate=' + licensePlate)
				console.log(res)
				if (res.code !== 200) {
					return this.$message.error('查询信息失败')
				}
				this.payCostList = res.result.records
				this.payCostForm.licensePlate = licensePlate
				this.payCostForm.id = id
				this.payCostDialogVisible = true
			},
			// 充值
			async payCostInfo() {
				this.$refs.payCostFormRef.validate(async valid => {
					if (!valid) return
					// 发起修改信息的数据请求
					const {
						data: res
					} = await this.$http.post('kmanagement/edit', this.payCostForm)
					console.log(res)
					if (res.code !== 200) {
						return this.$message.error('失败')
					}
					// 更新成功，关闭对话框，刷新数据列表，提示修改成功
					this.payCostDialogVisible = false
					this.getPageList()
					this.$message.success('成功')
				})
			},

			// 监听充值对话框关闭事件
			payCostDialogClosed() {
				this.$refs.payCostFormRef.resetFields()
			},

		}
	}
</script>

<style scoped>

</style>
