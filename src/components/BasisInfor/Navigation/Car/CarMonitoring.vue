<template>
	<div>
		<el-container>
			<!-- <el-header>车辆实时监控</el-header> -->
			<el-container>
				<el-aside width="200px" style="height: 800px;">
					<el-card class="box-card" >
						<el-button type="primary" plain size="mini" @click="handleQuery" v-loading.fullscreen.lock="fullscreenLoading">查询</el-button>
						<el-button type="primary" plain size="mini" @click="handleClear">清空</el-button>
						<el-checkbox-group v-model="chooseCarData" :max="30" style="margin-top: 10px;">
							<el-checkbox v-for="carNo in checkBoxData" :label="carNo" :key="carNo">{{carNo}}</el-checkbox>
						</el-checkbox-group>

					</el-card>
				</el-aside>
				<el-main style="padding: 0;margin-left: 10px;">
					<!-- 位置 -->
					<el-card class="box-card" style="height: 800px;">
						<div id="allCarLocition" style="width: 100%;height: 760px"></div>
					</el-card>
				</el-main>
			</el-container>
		</el-container>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				chooseCarData:[],
				checkBoxData: [],
				carList: [],
				carJointList: [],
				newmap:{},
				// 加载查询
				fullscreenLoading: false,
			}
		},
		created() {

			this.findAllCarLicense()
		},
		methods: {
			// 获取所有车牌res1.result.anyType.CarCurrentStatus.map
			async findAllCarLicense(){
				const {
					data: res
				} = await this.$http.get('waybill/findAllLicense')
				// console.log(res)
				if (res.code !== 200) {
					return
				}
				this.checkBoxData = res.result
				setTimeout(() =>{
					this.initMap()
				},200)
			},
			// 点击查询
			async handleQuery(){
				this.carList = []
				if(!this.chooseCarData[1] ) { return this.$message.error('请选择最少两个车牌！')}
				this.carList = this.chooseCarData.forEach(v => {
					this.carJointList.push('货好多' + v)
				})
				this.fullscreenLoading = true;
				const {
					data: res1
				} = await this.$http.get('kCarinformation/GetCarCurrentStatusBycarMark?s=' + this.carJointList)
				console.log('res1', res1)
				this.fullscreenLoading = false;
				let list = []
				list = res1.result.anyType.CarCurrentStatus
				let allLocationList = []
				allLocationList = res1.result.anyType.CarCurrentStatus.map(item => {
					return [item.last_lon, item.last_lat]
				})
				setTimeout(() => {
					for (var i = 0, markerList; i < allLocationList.length; i++) {
						var markerList = new AMap.Marker({
							icon: "http://81.70.151.121/imgs/kache.png",
							position: allLocationList[i],
							offset: new AMap.Pixel(-13, -30),
							map: this.newmap
						});
						// console.log(list[i].location)
						markerList.setTitle(list[i].carMark + ":" + list[i].location)				
					}
					// console.log(markerList)
					this.newmap.add(markerList)
				}, 500)
			},
			// 初始化地图
			initMap(){
				this.newmap = new AMap.Map("allCarLocition", {
					resizeEnable: true, //窗口大小调整
					center: [116.478935, 39.997761], //中心 firstArr: [116.478935, 39.997761],
					zoom: 6
				});
			},
			
			// 点击清空
			handleClear(){
				this.newmap.clearMap();
				this.carJointList = []
				this.chooseCarData = []
				this.carList = []
			},
			
			
			// // 获取所有车牌号 并查询(以下代码为第一版，默认查询所有车辆，但接口最多只能查30辆，)
			// async findAllCarNo() {
			// 	const {
			// 		data: res
			// 	} = await this.$http.get('waybill/findAllLicense')
			// 	console.log(res)
			// 	if (res.code !== 200) {
			// 		return
			// 	}
			// 	this.checkBoxData = res.result
			// 	this.carList = res.result.forEach(v => {
			// 		this.carJointList.push('货好多' + v)
			// 	})
			// 	console.log("carJointList" + this.carJointList)
			// 	const {
			// 		data: res1
			// 	} = await this.$http.get('kCarinformation/GetCarCurrentStatusBycarMark?s=' + this.carJointList)
			// 	console.log('res1', res1)
			// 	const list = res1.result.anyType.CarCurrentStatus
			// 	const allLocationList = res1.result.anyType.CarCurrentStatus.map(item => {
			// 		return [item.last_lon, item.last_lat]
			// 	})
			// 	setTimeout(() => {
			// 		var map1 = new AMap.Map("allCarLocition", {
			// 			resizeEnable: true, //窗口大小调整
			// 			center: [116.478935, 39.997761], //中心 firstArr: [116.478935, 39.997761],
			// 			zoom: 6
			// 		});
			// 		for (var i = 0, markerList; i < allLocationList.length; i++) {
			// 			var markerList = new AMap.Marker({
			// 				icon: "https://webapi.amap.com/images/car.png",
			// 				position: allLocationList[i],
			// 				offset: new AMap.Pixel(-13, -30),
			// 				map: map1
			// 			});
			// 			console.log(list[i].location)
			// 			markerList.setTitle(list[i].carMark + ":" + list[i].location)

			// 		}
			// 		console.log(markerList)
			// 		map1.add(markerList)
			// 	}, 500)
			// },
			// async getCarStatusList() {
			// 	const {
			// 		data: res
			// 	} = await this.$http.get('kCarinformation/GetCarCurrentStatusBycarMark?s=' + this.carJointList)
			// 	console.log('res'+res.result.anyType.CarCurrentStatus)
			// 	const list = res.result.anyType.CarCurrentStatus
			// 	const allLocationList = res.result.anyType.CarCurrentStatus.map(item => {
			// 		return [item.last_lon, item.last_lat]
			// 	})
			// 	setTimeout(() => {
			// 		var map1 = new AMap.Map("allCarLocition", {
			// 			resizeEnable: true, //窗口大小调整
			// 			center: [116.478935, 39.997761], //中心 firstArr: [116.478935, 39.997761],
			// 			zoom: 6
			// 		});
			// 		for (var i = 0, markerList; i < allLocationList.length; i++) {
			// 			var markerList = new AMap.Marker({
			// 				icon: "https://webapi.amap.com/images/car.png",
			// 				position: allLocationList[i],
			// 				offset: new AMap.Pixel(-13, -30),
			// 				map: map1
			// 			});
			// 			console.log(list[i].location)
			// 			markerList.setTitle(list[i].carMark +""+ list[i].location)
			// 			// markerList.Cname = list[i].location
			// 			//点标注的点击事件
			// 			// markerList.on('click', (e)=>{
			// 			// 	console.log(e)
			// 			// 	alert(e.target.Cname);
			// 			// });
			// 			// marker.content = '我是第' + (i + 1) + '个Marker';
			// 			// marker.on('click', markerClick);
			// 			// marker.emit('click', {target: marker});
			// 		}
			// 		console.log(markerList)
			// 		// var marker1 = new AMap.Marker({
			// 		// 	icon: "https://webapi.amap.com/images/car.png",
			// 		// 	position: [last_lon, last_lat],
			// 		// 	offset: new AMap.Pixel(-13, -30)
			// 		// });
			// 		// var markerList = [marker1,marker2]
			// 		// marker1.setMap(map1);
			// 		map1.add(markerList)
			// 	}, 200)
			// },
		}
	}
</script>

<style scoped>

</style>
