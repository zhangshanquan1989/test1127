<template>
	<div>
		<!-- 搜索区域 -->
		<div>
			<span style="font-size: 18px;">公司名：</span>
			<el-select v-model="queryCompanyName" clearable filterable remote placeholder="请输入公司名称" :remote-method="remoteCompanyMethod"
			 :loading="companyLoading" style="width: 200px;" @change="queryCompanyNameChange">
				<el-option v-for="item in companyOptions" :key="item.index" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			
			<span style="font-size: 18px;margin-left: 20px;">车主：</span>
			<el-select v-model="queryCarOwner" clearable filterable remote placeholder="请输入车主姓名" :remote-method="remoteCarOwnerMethod"
			 :loading="carOwnerLoading" style="width: 200px;" @change="queryCarOwnerChange">
				<el-option v-for="item in carOwnerOptions" :key="item.index" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			
			<span style="font-size: 18px;margin-left: 20px;">车牌：</span>
			<el-select v-model="queryPlateNumber" clearable filterable remote placeholder="请输入车牌号" :remote-method="remotePlateNumberMethod"
			 :loading="plateNumberLoading" style="width: 200px;" @change="queryPlateNumberChange">
				<el-option v-for="item in plateNumberOptions" :key="item.index" :label="item.label" :value="item.value">
				</el-option>
			</el-select>

			<span style="font-size: 18px;margin-left: 20px;">时间：</span>
			<el-date-picker v-model="queryPlistCtime" type="datetimerange" range-separator="至" start-placeholder="开始日期"
			 end-placeholder="结束日期"  value-format="yyyy-MM-dd HH:mm:ss" @change="handleDataChange" style="width: 300px;">
			</el-date-picker>

			<el-button type="info" @click="handleQueryBtn" style="margin-left: 20px;">查询</el-button>

			<!-- 返回按钮 -->
			<el-button type="info" @click="handleQueryBackBtn" style="margin-left: 20px;">返回</el-button>

		</div>
		<!-- 图标展示区域 -->
		<el-card class="box-card" style="margin-top: 20px;">
		<div>
			<!-- echarts图表 -->
			<div id="main" style="width:100%;height: 600px;"></div>
		</div>
		</el-card>
		
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryInfo: {
					company: '安丘货好多供应链管理有限公司',
					driver:'',
					linces:'',
					plistCtime1: '2021-01-04 10:00:00',
					plistCtime2: '2021-01-17 10:00:00'
				},
				// 公司选择框数据
				queryCompanyName: '',
				companyOptions: [],
				companyList: [],
				companyLoading: false,
				companyStates: [],
				// 车主选择数据框
				queryCarOwner: '',
				carOwnerOptions: [],
				carOwnerLoading: false,
				carOwnerStates: [],
				carOwnerList: [],
				newCarOwnerList: [],
				newCarOwnerStates: [],
				// 选择车牌数据
				queryPlateNumber: '',
				plateNumberLoading: false,
				plateNumberOptions: [],
				plateNumberStates: [],
				plateNumberList: [],
				newPlateNumberList: [],
				newPlateNumberStates: [],
				// 时间
				queryPlistCtime: '',
				// 图表
				sourceData:[],
				xDataArr:[],
				yDataArr1:[],
				yDataArr2:[],
			}
		},
		created() {
			this.getQueryData()
			this.getAllCompanyList()
			this.getAllCarOwnerList()
			this.getAllPlateNumberList()
			
		},
		// updated(){
		// 	this.creatEchartsMethod()
		// },
		// mounted中新建图表，created中的数据还没有获取到，展示不成功
		mounted() {
			// this.creatEchartsMethod()
			  setTimeout(() => {
			 this.creatEchartsMethod()
			 }, 500);			
		},
		methods: {
			// 获取所有公司名称
			async getAllCompanyList() {
				const {
					data: res
				} = await this.$http.get('/base/tBaCompany/getAllCompanyName')
				// console.log(res)
				if (res.code !== 200) {
					return
				}
				this.companyStates = res.result
				this.companyList = this.companyStates.map(item => {
					return {
						value: `${item}`,
						label: `${item}`
					};
				});
				this.companyOptions = this.companyList
			},
			// 获取所有车主姓名
			async getAllCarOwnerList() {
				const {
					data: res
				} = await this.$http.get('/base/tBaDriver/findDriverOwner')
				console.log(res)
				if (res.code !== 200) {
					return
				}
				res.result.forEach(v => {
					this.carOwnerStates.push(v.driverCarOwner)
				})
				this.carOwnerList = this.carOwnerStates.map(item => {
					return {
						value: `${item}`,
						label: `${item}`
					};
				});
				this.carOwnerOptions = this.carOwnerList
			},
			// 获取所有车牌号
			async getAllPlateNumberList() {
				const {
					data: res
				} = await this.$http.get('/base/tBaDriver/findDriverLicense')
				if (res.code !== 200) {
					return
				}
				// console.log(res)
				res.result.forEach(v => {
					this.plateNumberStates.push(v.driverLicense)
				})
				this.plateNumberList = this.plateNumberStates.map(item => {
					return {
						value: `${item}`,
						label: `${item}`
					};
				});
				this.plateNumberOptions = this.plateNumberList
			},

			// 选择公司方法
			remoteCompanyMethod(query) {
				if (query !== '') {
					this.companyLoading = true;
					setTimeout(() => {
						this.companyLoading = false;
						this.companyOptions = this.companyList.filter(item => {
							return item.value.indexOf(query) > -1;
						});
					}, 300)
				} else {
					this.companyOptions = this.companyList
					this.carOwnerOptions = this.carOwnerList
					this.plateNumberOptions = this.plateNumberList
				}
			},

			// 选择车主方法
			remoteCarOwnerMethod(query) {
				if (query !== '') {
					this.carOwnerLoading = true;
					setTimeout(() => {
						this.carOwnerLoading = false;
						this.carOwnerOptions = this.carOwnerList.filter(item => {
							return item.value.indexOf(query) > -1;
						});
					}, 300)
				} else {
					this.carOwnerOptions = this.carOwnerList
					this.plateNumberOptions = this.plateNumberList
				}
			},
			// 选择车牌的方法
			remotePlateNumberMethod(query) {
				if (query !== '') {
					this.plateNumberLoading = true;
					setTimeout(() => {
						this.plateNumberLoading = false;
						this.plateNumberOptions = this.plateNumberList.filter(item => {
							return item.value.indexOf(query) > -1;
						});
					}, 300)
				} else {
					this.plateNumberOptions = this.plateNumberList
				}
			},

			// 选择公司名字
			async queryCompanyNameChange(name) {

				if (name !== '') {
					this.companyOptions = this.companyList
					const {
						data: res
					} = await this.$http.get('/base/tBaDriver/findDrivercompany?company=' + name)
					console.log(res)
					res.result.forEach(v => {
						this.newCarOwnerStates.push(v.driverCarOwner)
					})
					this.newCarOwnerList = this.newCarOwnerStates.map(item => {
						return {
							value: `${item}`,
							label: `${item}`
						};
					});
					// console.log(this.newCarOwnerList)
					this.carOwnerOptions = this.newCarOwnerList
					this.newCarOwnerStates = []
					
					// 根据公司名查车牌号
					const {
						data: res1
					} = await this.$http.get('/base/tBaDriver/findDrivercompanyandlicense?company=' + name)
					console.log(res1)
					res1.result.forEach(v => {
						this.newPlateNumberStates.push(v.driverLicense)
					})
					this.newPlateNumberList = this.newPlateNumberStates.map(item => {
						return {
							value: `${item}`,
							label: `${item}`
						};
					});
					// console.log(this.newCarOwnerList)
					this.plateNumberOptions = this.newPlateNumberList
					this.newPlateNumberStates = []
				} else {
					this.companyOptions = this.companyList
					this.carOwnerOptions = this.carOwnerList
				}

			},
			// 选择车主姓名
			async queryCarOwnerChange(owner) {

				if(this.queryCarOwner !== ''){
					const {
						data: res
					} = await this.$http.get('/base/tBaDriver/findownerandlicense?Owner=' + owner)
					// console.log(res)
					res.result.forEach(v => {
						this.newPlateNumberStates.push(v.driverLicense)
					})
					this.newPlateNumberList = this.newPlateNumberStates.map(item => {
						return {
							value: `${item}`,
							label: `${item}`
						};
					});
					// console.log(this.newCarOwnerList)
					this.plateNumberOptions = this.newPlateNumberList
					this.newPlateNumberStates = []
				}else{
					this.plateNumberOptions = this.plateNumberList
				}

			},
			// 选择车牌号
			queryPlateNumberChange() {
				// console.log(this.queryPlateNumber)
				// if(this.queryPlateNumber == ''){
				// 	this.plateNumberOptions = this.plateNumberList
				// }
				
			},
			// 选择时间
			handleDataChange() {
				if(this.queryPlistCtime){

					this.queryInfo.plistCtime1 = this.queryPlistCtime[0]
					this.queryInfo.plistCtime2 = this.queryPlistCtime[1]
				}else{
					this.queryInfo.plistCtime1 = '2021-01-01 10:00:00'
					this.queryInfo.plistCtime2 = '2021-02-01 10:00:00'
				}
			},
			handleQueryBtn() {
				if(this.queryCompanyName !== ''){
					this.queryInfo.company = this.queryCompanyName
				}else{
					this.queryInfo.company = '安丘货好多供应链管理有限公司'
				}
				
				this.queryInfo.driver = this.queryCarOwner
				this.queryInfo.linces = this.queryPlateNumber
				this.getQueryData()
				setTimeout(() => {
				this.creatEchartsMethod()
				}, 500);			
			},
			handleQueryBackBtn() {
				this.queryInfo.company = '安丘货好多供应链管理有限公司'
				this.queryInfo.driver = ''
				this.queryInfo.linces = ''
				this.queryInfo.plistCtime1 = '2021-01-04 10:00:00'
				this.queryInfo.plistCtime2 = '2021-01-17 10:00:00'
				this.queryCompanyName = ''
				this.queryCarOwner = ''
				this.queryPlateNumber = ''
				this.queryPlistCtime = ''
				this.getQueryData()
				setTimeout(() => {
				this.creatEchartsMethod()
				}, 300);			
			},

			// 根据查询列表
			async getQueryData() {
				this.sourceData = []
				this.xDataArr = []
				this.yDataArr1 = []
				this.yDataArr2 = []
				const {
					data: res
				} = await this.$http.get('data/findIncomeByTimeEveryday', {
					params: this.queryInfo
				})		
				if (res.code !== 200) {
					return this.$message.error('获取信息失败')
				}
				console.log(res.result)
				this.sourceData = res.result

				this.sourceData.forEach(v =>{
					this.xDataArr.push(v.总日期)
					this.yDataArr1.push(v.总里程)
					this.yDataArr2.push(v.总收入)
				})	
			},
			// 创建图表
		creatEchartsMethod(){
			var myChart = this.$echarts.init(document.getElementById('main'));
			console.log(this.xDataArr)
			console.log(this.yDataArr1)
			console.log(this.yDataArr2)
			var options = {
				title:{
					text:'柱状图'
				},
				legend:{
					data:['里程','收入'],
					 right:'180px'
				},
				xAxis:{
					name:'时间',
					nameTextStyle:{
											 fontWeight:600,
											 fontSize : 16,
											 
					},
					type:'category',
					data:this.xDataArr
				},
				yAxis:{
					name:'数据',
					 nameTextStyle:{
						 fontWeight:600,
						 fontSize : 16,
						 align:'right',
						 lineHeight: 56,
					 },
					type:'value'
				},
				series:[
					{
						name:'里程',
						type:'bar',
						data:this.yDataArr1,
						color:'#409EFF'
						// 平均值线
						// markLine:{
						// 	data:[
						// 		{type: 'average'}
						// 	]
						// }
					},
					{
						name:'收入',
						type:'bar',
						data:this.yDataArr2,
						color:'#E6AE5C'
						// 平均值
						// markLine:{
						// 	data:[
						// 		{type: 'average'}
						// 	]
						// }
					}
				],
				
			}
			// 使用刚指定的配置项和数据显示图表。
			 myChart.setOption(options);
		},
		}
	}
</script>

<style scoped>

</style>
