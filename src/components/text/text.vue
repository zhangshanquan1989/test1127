<template>
	<div style="padding:20px">
		<div id="mapContainer" style="height: 500px;width: 500px;"></div>
			<el-divider content-position="left">分割</el-divider>
		<div>
					
			<el-button @click="toStringButton">转换</el-button>
			<el-button type="primary" class="toshareUrl"  :data-clipboard-text="shareUrl" @click="clickShareUrl">点击分享
			  </el-button>
			<el-card class="box-card">
				<el-table :data="tableData7" border>
					<el-table-column prop="id" label="ID" width="180"></el-table-column>
					<el-table-column prop="name" label="name" width="180">
						<template slot-scope="scope" style="display: flex;">
							<!-- <div v-for="item in scope.row.name" > -->
							<span>{{scope.row.name[0]}} {{scope.row.name[1]}} {{scope.row.name[2]}}</span>
							<!-- </div> -->
						</template>
					</el-table-column>
				</el-table>
			</el-card>
		</div>
		<el-table :data="tableData6" :span-method="objectSpanMethod" border>
			<el-table-column prop="id" label="ID" width="180"></el-table-column>
			<el-table-column prop="name" label="姓名"></el-table-column>
			<el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
		</el-table>

		<el-checkbox-group v-model="checkList" @change="checkboxchange">
			<el-checkbox label="复选框 A"></el-checkbox>
			<el-checkbox label="复选框 B"></el-checkbox>
			<el-checkbox label="复选框 C"></el-checkbox>
			<el-checkbox label="禁用" disabled></el-checkbox>
			<el-checkbox label="选中且禁用" disabled></el-checkbox>
		</el-checkbox-group>
		<el-input type="number" v-model="aaa" placeholder="单位:元"></el-input>

		<!-- 登陆界面 -->
		<div>
			<div class="outer_label">
				<img class="inner_label login_logo" src="../../assets/logo.png">
			</div>
			<div class="login_form">
				<input type="text" class="qxs-ic_user qxs-icon" placeholder="用户名" v-model="userName">
				<input type="text" class="qxs-ic_password qxs-icon" placeholder="密码" v-model="password">
				<!--<button class="login_btn el-button el-button&#45;&#45;primary is-round" type="primary" round>登录</button>-->
				<el-button class="login_btn" @click.native="login" type="primary" round :loading="isBtnLoading">登录</el-button>
				<div style="margin-top: 10px">
					<span style="color: #000099;" @click="login">司机账号登陆</span><span style="float: right;color: #A9A9AB">忘记密码？</span>
				</div>
			</div>
		</div>
		<!-- 下载excel -->
		<div>
			<a :href="downloadUrl">
				<button> 下载</button>
			</a>
		</div>
		<!-- echarts图表 -->
		<div id="main" style="width: 600px;height:400px;"></div>
		<button @click="dianji">点击</button>

		<div>
			<iframe src="https://www.baidu.com/" width="1200" height="300" frameborder="0" scrolling="auto"></iframe>
		</div>

		<el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
			<div class="card-panel" @click="handleSetLineChartData('newVisitis')">
				<div class="card-panel-icon-wrapper icon-people">
					<svg-icon icon-class="peoples" class-name="card-panel-icon" />
				</div>
				<div class="card-panel-description">
					<div class="card-panel-text">
						New Visits
					</div>
					<count-to :start-val="0" :end-val="102400" :duration="2600" class="card-panel-num" />
				</div>
			</div>
		</el-col>
<!--高德历史轨迹 -->
		<div id="container"></div>
		<div class="input-card">
			<h4>轨迹回放控制</h4>
			<div class="input-item">
				<el-button @click="startAnimation">开始</el-button>
				<input type="button" class="btn" value="开始动画" id="start" @onclick="startAnimation" />
				<input type="button" class="btn" value="暂停动画" id="pause" onclick="pauseAnimation()" />
			</div>
			<div class="input-item">
				<input type="button" class="btn" value="继续动画" id="resume" onclick="resumeAnimation()" />
				<input type="button" class="btn" value="停止动画" id="stop" onclick="stopAnimation()" />
			</div>
		</div>
		
		<!-- 位置标记 -->
		<div id="locition" style="width: 300px;height: 300px;"></div>
		
		
	</div>
	



</template>
<script>
	export default {
		data() {
			return {
				// 实时速度历史轨迹
				routeInfo:[{"lat":41.898985,"lng":123.532276,"speed":0.89},{"lat":41.898994,"lng":123.532212,"speed":1.55},{"lat":41.898965,"lng":123.532254,"speed":1.34},{"lat":41.899023,"lng":123.53229,"speed":4.74},{"lat":41.899022,"lng":123.532157,"speed":0.78},{"lat":41.899028,"lng":123.532115,"speed":11.43},{"lat":41.89907,"lng":123.53213,"speed":17.04},{"lat":41.89908,"lng":123.53206,"speed":11.78},{"lat":41.899079,"lng":123.5321,"speed":10.43},{"lat":41.898989,"lng":123.532134,"speed":7.47},{"lat":41.899051,"lng":123.532292,"speed":6.27},{"lat":41.899111,"lng":123.532169,"speed":6.88},{"lat":41.898991,"lng":123.532168,"speed":5.98},{"lat":41.899083,"lng":123.532157,"speed":2.29},{"lat":41.899114,"lng":123.532184,"speed":2.93},{"lat":41.899054,"lng":123.532083,"speed":2.48},{"lat":41.898948,"lng":123.532208,"speed":2.4},{"lat":41.898965,"lng":123.53223,"speed":1.59},{"lat":41.899085,"lng":123.532219,"speed":2.96},{"lat":41.899019,"lng":123.532224,"speed":4.64},{"lat":41.899089,"lng":123.532236,"speed":3.86},{"lat":41.899091,"lng":123.532176,"speed":6.02},{"lat":41.899038,"lng":123.532115,"speed":8.42},{"lat":41.864238,"lng":123.510692,"speed":0.89},{"lat":41.86401,"lng":123.510915,"speed":2.61},{"lat":41.863474,"lng":123.510799,"speed":10.31},{"lat":41.863071,"lng":123.510626,"speed":6.76},{"lat":41.862719,"lng":123.510458,"speed":9.22},{"lat":41.861887,"lng":123.50998,"speed":18.36},{"lat":41.860685,"lng":123.509322,"speed":26.62},{"lat":41.859401,"lng":123.50864,"speed":26.9},{"lat":41.858528,"lng":123.508255,"speed":17.02},{"lat":41.85839,"lng":123.508178,"speed":0.0},{"lat":41.857946,"lng":123.508087,"speed":11.64},{"lat":41.857131,"lng":123.507831,"speed":17.96},{"lat":41.85608,"lng":123.507415,"speed":22.2},{"lat":41.855023,"lng":123.507107,"speed":20.21},{"lat":41.854239,"lng":123.507109,"speed":15.07},{"lat":41.853437,"lng":123.507244,"speed":0.0},{"lat":41.85285,"lng":123.507266,"speed":5.11},{"lat":41.852853,"lng":123.50726,"speed":0.0},{"lat":41.852833,"lng":123.50724,"speed":0.0},{"lat":41.852504,"lng":123.507312,"speed":9.93},{"lat":41.851799,"lng":123.507233,"speed":14.16},{"lat":41.851242,"lng":123.507059,"speed":0.0},{"lat":41.851071,"lng":123.507009,"speed":2.83},{"lat":41.850975,"lng":123.506994,"speed":1.88},{"lat":41.850954,"lng":123.507074,"speed":3.12},{"lat":41.850888,"lng":123.507116,"speed":2.55},{"lat":41.850369,"lng":123.506927,"speed":12.25},{"lat":41.849632,"lng":123.506612,"speed":14.88},{"lat":41.849141,"lng":123.506082,"speed":12.58},{"lat":41.848494,"lng":123.505268,"speed":17.33},{"lat":41.847635,"lng":123.504232,"speed":22.73},{"lat":41.844513,"lng":123.500763,"speed":0.26},{"lat":41.844541,"lng":123.500873,"speed":1.15},{"lat":41.844538,"lng":123.500956,"speed":0.59},{"lat":41.844547,"lng":123.500901,"speed":1.31},{"lat":41.844607,"lng":123.500929,"speed":2.27},{"lat":41.844534,"lng":123.501072,"speed":1.57},{"lat":41.8446,"lng":123.50101,"speed":1.28},{"lat":41.844566,"lng":123.500914,"speed":0.32},{"lat":41.844514,"lng":123.501011,"speed":4.44},{"lat":41.844109,"lng":123.500855,"speed":12.22},{"lat":41.843536,"lng":123.500518,"speed":6.65},{"lat":41.841808,"lng":123.47934,"speed":18.47},{"lat":41.840919,"lng":123.478866,"speed":21.47},{"lat":41.840046,"lng":123.478525,"speed":19.79},{"lat":41.839302,"lng":123.478138,"speed":18.34},{"lat":41.838476,"lng":123.477633,"speed":18.76},{"lat":41.837629,"lng":123.477199,"speed":20.21},{"lat":41.836865,"lng":123.476741,"speed":15.45},{"lat":41.836261,"lng":123.476494,"speed":8.81},{"lat":41.836063,"lng":123.476472,"speed":1.23},{"lat":41.836059,"lng":123.476375,"speed":0.88},{"lat":41.83607,"lng":123.476511,"speed":0.52},{"lat":41.835947,"lng":123.4764,"speed":7.09},{"lat":41.835377,"lng":123.476121,"speed":16.47},{"lat":41.834477,"lng":123.475743,"speed":22.19},{"lat":41.833489,"lng":123.475429,"speed":20.63},{"lat":41.832667,"lng":123.475116,"speed":12.04},{"lat":41.832467,"lng":123.475155,"speed":1.64},{"lat":41.832113,"lng":123.474932,"speed":4.9},{"lat":41.832009,"lng":123.475042,"speed":0.68},{"lat":41.832049,"lng":123.475109,"speed":0.42},{"lat":41.831813,"lng":123.474998,"speed":7.82},{"lat":41.831434,"lng":123.474922,"speed":9.01},{"lat":41.830969,"lng":123.474801,"speed":0.26},{"lat":41.831016,"lng":123.474759,"speed":0.63},{"lat":41.831002,"lng":123.474811,"speed":0.37},{"lat":41.830979,"lng":123.474842,"speed":0.19},{"lat":41.831,"lng":123.474881,"speed":2.49},{"lat":41.830476,"lng":123.474859,"speed":13.4},{"lat":41.830074,"lng":123.474814,"speed":4.91},{"lat":41.835844,"lng":123.45395,"speed":26.14},{"lat":41.834962,"lng":123.452371,"speed":29.0},{"lat":41.834881,"lng":123.450394,"speed":31.17},{"lat":41.834637,"lng":123.448592,"speed":28.52},{"lat":41.834968,"lng":123.446697,"speed":31.61},{"lat":41.834239,"lng":123.444774,"speed":32.14},{"lat":41.834564,"lng":123.442773,"speed":30.3},{"lat":41.833447,"lng":123.441212,"speed":29.5},{"lat":41.834491,"lng":123.439277,"speed":26.66},{"lat":41.834464,"lng":123.437458,"speed":28.18},{"lat":41.833889,"lng":123.435907,"speed":25.68},{"lat":41.834097,"lng":123.434818,"speed":36.25},{"lat":41.834124,"lng":123.434497,"speed":15.35},{"lat":41.833805,"lng":123.434234,"speed":8.37},{"lat":41.833916,"lng":123.434072,"speed":9.12},{"lat":41.834113,"lng":123.433634,"speed":8.25},{"lat":41.833876,"lng":123.433384,"speed":11.07},{"lat":41.833807,"lng":123.432707,"speed":16.0},{"lat":41.83432,"lng":123.431755,"speed":18.92},{"lat":41.833885,"lng":123.430365,"speed":21.79},{"lat":41.833032,"lng":123.426448,"speed":12.26},{"lat":41.833191,"lng":123.426148,"speed":8.4},{"lat":41.832995,"lng":123.425893,"speed":4.54},{"lat":41.833207,"lng":123.425644,"speed":10.26},{"lat":41.833552,"lng":123.425237,"speed":5.53},{"lat":41.833566,"lng":123.42494,"speed":13.97},{"lat":41.833564,"lng":123.42421,"speed":16.61},{"lat":41.833379,"lng":123.423503,"speed":9.43},{"lat":41.83317,"lng":123.423291,"speed":4.27},{"lat":41.833259,"lng":123.423173,"speed":0.2},{"lat":41.833292,"lng":123.423196,"speed":0.56},{"lat":41.833315,"lng":123.423336,"speed":9.48},{"lat":41.833719,"lng":123.423198,"speed":2.06},{"lat":41.833402,"lng":123.423224,"speed":6.03},{"lat":41.833474,"lng":123.423232,"speed":4.01},{"lat":41.833261,"lng":123.422898,"speed":12.13},{"lat":41.833146,"lng":123.421998,"speed":17.87},{"lat":41.833189,"lng":123.421189,"speed":7.73},{"lat":41.833016,"lng":123.421064,"speed":3.04},{"lat":41.83258,"lng":123.42113,"speed":3.27},{"lat":41.832915,"lng":123.421084,"speed":2.39},{"lat":41.833145,"lng":123.421143,"speed":1.66},{"lat":41.832833,"lng":123.421134,"speed":1.06},{"lat":41.832969,"lng":123.421123,"speed":2.27},{"lat":41.833039,"lng":123.421166,"speed":1.63},{"lat":41.833188,"lng":123.42104,"speed":0.34},{"lat":41.832959,"lng":123.420934,"speed":7.38},{"lat":41.832785,"lng":123.420406,"speed":14.1},{"lat":41.832976,"lng":123.419447,"speed":18.05},{"lat":41.832722,"lng":123.418305,"speed":21.05},{"lat":41.832819,"lng":123.416974,"speed":20.29},{"lat":41.833235,"lng":123.416011,"speed":4.16},{"lat":41.832908,"lng":123.416037,"speed":2.9},{"lat":41.832515,"lng":123.415689,"speed":10.49},{"lat":41.83246,"lng":123.414803,"speed":18.14},{"lat":41.832752,"lng":123.413677,"speed":19.08},{"lat":41.83275,"lng":123.41255,"speed":19.73},{"lat":41.832427,"lng":123.411404,"speed":18.68},{"lat":41.83222,"lng":123.410159,"speed":22.06},{"lat":41.832284,"lng":123.409089,"speed":5.62},{"lat":41.832393,"lng":123.408715,"speed":8.48},{"lat":41.832029,"lng":123.408214,"speed":11.17},{"lat":41.83231,"lng":123.407423,"speed":19.98},{"lat":41.832169,"lng":123.406281,"speed":17.09},{"lat":41.831934,"lng":123.403808,"speed":3.74},{"lat":41.832033,"lng":123.403582,"speed":7.12},{"lat":41.831947,"lng":123.403109,"speed":9.49},{"lat":41.831807,"lng":123.402498,"speed":6.7},{"lat":41.831841,"lng":123.40205,"speed":9.64}],
				// 复制链接
				 shareUrl: '',
				 carid:'0000045',
				 
				tableData7: [{
					id: "1",
					name: ["1.9米", "6米", "13米"]
				}, {
					id: "2",
					name: ["3米", "5米"]
				}],
				bababa: '',
				ababab: ["1.9米", "6米", "13米及以上"],

				downloadUrl: 'http://81.70.151.121:8080/jeecg-boot/tPfPlist/exportXls',
				userName: '',
				password: '',
				isBtnLoading: false,



				aaa: 0,
				checkList: ['选中且禁用', '复选框 A'],
				spanArr: [], //用于存放每一行记录的合并数
				tableData6: [{
						id: "1",
						name: "王小虎",
						amount1: "234"
					},
					{
						id: "1",
						name: "王小虎",
						amount1: "165"
					},
					{
						id: "2",
						name: "王小虎",
						amount1: "324"
					},
					{
						id: "2",
						name: "王小虎",
						amount1: "621"
					},
					{
						id: "2",
						name: "王小虎",
						amount1: "539"
					}
				],

				xDataArr: [],
				yDataArr1: [],
				yDataArr2: [],
				firstArr:[116.478935, 39.997761],
				lineArr: [[116.478935,39.997761],[116.478939,39.997825],[116.478912,39.998549],[116.478912,39.998549],[116.478998,39.998555],[116.478998,39.998555],[116.479282,39.99856],[116.479658,39.998528],[116.480151,39.998453],[116.480784,39.998302],[116.480784,39.998302],[116.481149,39.998184],[116.481573,39.997997],[116.481863,39.997846],[116.482072,39.997718],[116.482362,39.997718],[116.483633,39.998935],[116.48367,39.998968],[116.484648,39.999861]],
				
			};
		},

		created() {
			
			this.getEchartsData();

			if (JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userName) {
				this.userName = JSON.parse(localStorage.getItem('user')).userName;
				this.password = JSON.parse(localStorage.getItem('user')).password;
			}
		},
		computed: {
			

			btnText() {
				if (this.isBtnLoading) return '登录中...';
				return '登录';
			}

		},
		mounted: function() {
			setTimeout(() => {
				this.initMap();
				this.initroad();
				this.initLocationMap();
				this.history();
			}, 1000);
			this.getSpanArr(this.tableData6);
			// echarts
			this.creatEchartsMethod();

		},
		methods: {
			// 带瞬时速度的历史轨迹
			history(){
				console.log(this.routeInfo)
				   // 1. 创建地图
				    var map = new AMap.Map("mapContainer", {
				        view: new AMap.View2D({
				        }),
				        lang: "zh_cn"
				    });
				
				    // 2.创建小汽车markerpush
				    var carMarker = new AMap.Marker({
				        map: map,
				        position: [this.routeInfo[0].lng, this.routeInfo[0].lat],
				        icon: "http://webapi.amap.com/images/car.png",
				        offset: new AMap.Pixel(-26, -13),
				        autoRotation: true
				    });
						
						// 3.创建跟速度信息展示框
						    var carWindow = new AMap.InfoWindow({
						        offset: new AMap.Pixel(6, -25),
						        content: "速速速速"
						    });
								
						// 4.生成车辆回放轨迹routeInfo
						    var pathPolyline = initializePaths(this.routeInfo);
						
						    // 5.车辆随轨迹移动
						    carMarker.moveAlong(pathPolyline.getPath(), 1000, function (k) {
						        return k
						    }, false);
						
						    // 6.速度框随车辆移动
						    AMap.event.addListener(carMarker, 'moving', function (e) {
						        var lastLocation = e.passedPath[e.passedPath.length - 1];
						        carWindow.setPosition(lastLocation);
						        setVehicleSpeedInWidowns(lastLocation);
						    });
						
						    // 7.打开速度框
						    carWindow.open(map, carMarker.getPosition());
						
						    // 8.地图自适应缩放
						    map.setFitView();

			},
			initializePaths(paths) {
			        var line;
			        var pathLngLatArray = [];
			        if (paths) {
			            for (var i = 0; i < paths.length; i++) {
			                pathLngLatArray.push(new AMap.LngLat(paths[i].lng, paths[i].lat));
			            }
			            line = new AMap.Polyline({
			                map: map,
			                path: pathLngLatArray,
			                strokeColor: 'red',
			                strokeOpacity: 0.8,
			                strokeWeight: 6,
			                strokeStyle: 'solid'
			            });
			            line.setMap(map);
			        }
			        return line;
			    },
					setVehicleSpeedInWidowns(lnglat) {
					        for (var i = 0; i < this.routeInfo.length; i++) {
					            if (lnglat.distance(new AMap.LngLat(this.routeInfo[i].lng, this.routeInfo[i].lat)) < 4) {
					                carWindow.setContent("速度:" + (this.routeInfo[i].speed * 1.852).toFixed(2) + "公里/时");
					                return;
					            }
					        }
					
					    },

			
			// 复制链接
			clickShareUrl() {
			      this.shareUrl = 'http://81.70.151.121:8080/jeecg-boot/phonePage/'+this.carid
			let clipboard = new this.Clipboard(".toshareUrl");
			clipboard.on("success", e => {
				// 释放内存
				this.$message.success('已成功复制')
				clipboard.destroy();
			});
			},
			    
			
			toStringButton() {
				this.bababa = this.ababab.toString()
				console.log(this.bababa)
			},
			getEchartsData() {
				this.xDataArr = ['1号', '2号', '3号', '4号', '5号', '6号', '7号', '8号', '9号']
				this.yDataArr1 = ['80', '90', '95', '100', '110', '130', '120', '105', '95']
				this.yDataArr2 = ['55', '65', '70', '80', '85', '100', '95', '85', '75']
			},
			// echarts
			creatEchartsMethod() {
				var myChart = this.$echarts.init(document.getElementById('main'));
				var options = {
					title: {
						text: '数据'
					},
					legend: {
						data: ['里程', '收入']
					},
					xAxis: {
						type: 'category',
						data: this.xDataArr
					},
					yAxis: {
						type: 'value'
					},
					series: [{
							name: '里程',
							type: 'bar',
							data: this.yDataArr1,
							// 平均值
							markLine: {
								data: [{
									type: 'average'
								}]
							}
						},
						{
							name: '收入',
							type: 'bar',
							data: this.yDataArr2,
							// 平均值
							markLine: {
								data: [{
									type: 'average'
								}]
							}
						}
					],

				}
				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(options);
			},
			dianji() {
				this.xDataArr = ['11号', '12号', '13号', '14号', '15号', '16号', '17号', '18号', '19号']
				this.yDataArr1 = ['180', '90', '195', '100', '110', '130', '120', '105', '95']
				this.yDataArr2 = ['55', '65', '70', '80', '85', '100', '95', '85', '75']
				this.creatEchartsMethod();
			},
			// 		creatEcharts(){
			// 			var myChart = this.$echarts.init(document.getElementById('main'));
			// 			 // 指定图表的配置项和数据
			// 			        var option = {
			//     legend: {},
			//     tooltip: {},
			//     dataset: {
			//         // 用 dimensions 指定了维度的顺序。直角坐标系中，
			//         // 默认把第一个维度映射到 X 轴上，第二个维度映射到 Y 轴上。
			//         // 如果不指定 dimensions，也可以通过指定 series.encode
			//         // 完成映射，参见后文。
			//         dimensions: ['product', '里程', '收入'],
			//         source: [
			//             {product: '1号', '里程': 43.3, '收入': 85.8},
			//             {product: '2号', '里程': 83.1, '收入': 73.4},
			//             {product: '3号', '里程': 99, '收入': 85.6},
			//             {product: '4号', '里程': 120.5, '收入': 115},
			//             {product: '5号', '里程': 201, '收入': 186.6},
			//             {product: '6号', '里程': 33.5, '收入': 33},
			//             {product: '7号', '里程': 51, '收入': 46}
			//         ]
			//     },
			//     // 声明一个 X 轴，类目轴（category）。默认情况下，类目轴对应到 dataset 第一列。
			//     xAxis: {type: 'category'},
			//     // 声明一个 Y 轴，数值轴。
			//     yAxis: {},
			//     // 声明多个 bar 系列，默认情况下，每个系列会自动对应到 dataset 的每一列。
			//     series: [
			//         {type: 'bar'},
			//         {type: 'bar'}
			//     ]
			// };

			// 			        // 使用刚指定的配置项和数据显示图表。
			// 			        myChart.setOption(option);
			// 		},
			// 下载
			async xiazai() {
				const {
					data: res
				} = await this.$http.get('tPfPlist/exportXls')
				console.log(res)
			},

			login() {
				if (!this.userName) {
					this.$message.error('请输入用户名');
					return;
				}
				if (!this.password) {
					this.$message.error('请输入密码');
					return;
				}

			},


			checkboxchange(e) {
				console.log(e)
				console.log(this.checkList)
			},

			getSpanArr(data) {
				// data就是我们从后台拿到的数据
				for (var i = 0; i < data.length; i++) {
					if (i === 0) {
						this.spanArr.push(1);
						this.pos = 0;
					} else {
						// 判断当前元素与上一个元素是否相同
						if (data[i].id === data[i - 1].id) {
							this.spanArr[this.pos] += 1;
							this.spanArr.push(0);
						} else {
							this.spanArr.push(1);
							this.pos = i;
						}
					}
					console.log(this.spanArr);
				}
			},
			objectSpanMethod({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if (columnIndex === 0 || columnIndex === 1) {
					const _row = this.spanArr[rowIndex];
					const _col = _row > 0 ? 1 : 0;
					console.log(`rowspan:${_row} colspan:${_col}`);
					return {
						// [0,0] 表示这一行不显示， [2,1]表示行的合并数
						rowspan: _row,
						colspan: _col
					};
				}
			},

			//初始化地图
			initMap() {
				this.map = new AMap.Map("container", {
					resizeEnable: true, //窗口大小调整
					center: this.firstArr, //中心 firstArr: [116.478935, 39.997761],
					zoom: 20
				});
				this.marker = new AMap.Marker({
					map: this.map,
					position: this.firstArr,
					icon: "https://webapi.amap.com/images/car.png",
					offset: new AMap.Pixel(-26, -13), //调整图片偏移
					autoRotation: true, //自动旋转
					angle: -90 //图片旋转角度
				});
				this.marker.text = "沙发沙发沙发"
				// this.marker.setTitle('我是marker的title');
				
				  // 设置label标签
    // label默认蓝框白底左上角显示，样式className为：amap-marker-label
    // this.marker.setLabel({
    //     offset: new AMap.Pixel(20, 20),  //设置文本标注偏移量
    //     content: "<div class='info'>我是 marker 的 label 标签</div>", //设置文本标注内容
    //     direction: 'top' //设置文本标注方位
    // });
			},
			
			//初始化轨迹
			  initroad() {
			      //绘制还未经过的路线
			      this.polyline = new AMap.Polyline({
			        map: this.map,
			        path: this.lineArr,
			        showDir: true,
			        strokeColor: "#28F", //线颜色--蓝色
			        // strokeOpacity: 1,     //线透明度
			        strokeWeight: 6 //线宽
			        // strokeStyle: "solid"  //线样式
			      });
			      //绘制路过了的轨迹
			      var passedPolyline = new AMap.Polyline({
			        map: this.map,
			        strokeColor: "#AF5", //线颜色-绿色
			        //path: this.lineArr,
			        // strokeOpacity: 1,     //线透明度
			        strokeWeight: 6 //线宽
			        // strokeStyle: "solid"  //线样式
			      });
						var infoWindow;
						infoWindow = new AMap.InfoWindow({
									isCustom:	true,
									draggable: true,  //是否可拖动
							        offset: new AMap.Pixel(0, -31),
							        content:""
							    });

			      this.marker.on("moving", e => {
							// e.target.text
			        // console.log(e)
							 infoWindow.setContent("<ul class='main'><li> 文字： <span style='color:blue'>"+e.target.text+"</span></li></ul>" );
											 infoWindow.open(this.map, e.lnglat);
			        passedPolyline.setPath(e.passedPath);
			      });
			      this.map.setFitView(); //合适的视口
			    },

			startAnimation() {
				this.marker.moveAlong(this.lineArr, 200);
			},
			pauseAnimation() {
				this.marker.pauseMove();
			},
			resumeAnimation() {
				this.marker.resumeMove();
			},
			stopAnimation() {
				this.marker.stopMove();
			},
			// 位置
			initLocationMap(){
				var map1 = new AMap.Map("locition", {
					resizeEnable: true, //窗口大小调整
					center: [116.397428, 39.90923], //中心 firstArr: [116.478935, 39.997761],
					zoom: 13
				});
				
				var marker1 = new AMap.Marker({
				            icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
				            position: [116.406315,39.908775],
				            offset: new AMap.Pixel(-13, -30)
				        });
								 marker1.setMap(map1);
			},
		}
	};
</script>
<style lang="less" scoped>
	.login_form {
		padding-top: 10%;
		padding-left: 10%;
		padding-right: 10%;
	}

	.qxs-ic_user {
		background: url("../../assets/name.png") no-repeat;
		background-size: 13px 15px;
		background-position: 3%;
	}

	.qxs-ic_password {
		background: url("../../assets/password.png") no-repeat;
		background-size: 13px 15px;
		background-position: 3%;
		margin-bottom: 20px;
	}

	.login_logo {
		height: 100%;
	}

	.login_btn {
		width: 100%;
		font-size: 16px;
		background: -webkit-linear-gradient(left, #000099, #2154FA);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(right, #000099, #2154FA);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradient(right, #000099, #2154FA);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to right, #000099, #2154FA);
		/* 标准的语法 */
		filter: brightness(1.4);
	}

	#container {
		height: 500px;
		width: 500px;
	}

	.input-card .btn {
		margin-right: 1.2rem;
		width: 9rem;
	}

	.input-card .btn:last-child {
		margin-right: 0;
	}
</style>
