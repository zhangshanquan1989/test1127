<template>
	<div>
		<el-container>
		  <el-header>车辆实时监控</el-header>
		  <el-container>
		    <el-aside width="100px" style="height: 600px;">
					<el-card class="box-card" >
					  <div>测试测试</div>
						<div>测试测试</div>
						<div>测试测试</div>
						<div>测试测试</div>
						<div>测试测试</div>
						<div>测试测试</div>

					</el-card>
				</el-aside>
		    <el-main>		
				<!-- 位置 -->
			<div id="allCarLocition" style="width: 100%;height: 700px;"></div>
		</el-main>
		  </el-container>
		</el-container>


	</div>
</template>

<script>
	export default {
		data() {
			return {
				carList:[],
				carJointList:[],
			}
		},
		created() {
			
			this.findAllCarLicense()
		},
		methods: {
			// 获取所有车牌号 并查询
			async findAllCarLicense() {
				const {
					data: res
				} = await this.$http.get('waybill/findAllLicense')
				console.log(res)
				if (res.code !== 200) {
					return
				}
				this.carList = res.result.forEach(v => {
					this.carJointList.push('货好多' + v)
				})
				console.log("carJointList" + this.carJointList)
				const {
					data: res1
				} = await this.$http.get('kCarinformation/GetCarCurrentStatusBycarMark?s=' + this.carJointList)
				console.log('res1',res1)
				const list = res1.result.anyType.CarCurrentStatus
				const allLocationList = res1.result.anyType.CarCurrentStatus.map(item => {
					return [item.last_lon, item.last_lat]
				})
				setTimeout(() => {
					var map1 = new AMap.Map("allCarLocition", {
						resizeEnable: true, //窗口大小调整
						center: [116.478935, 39.997761], //中心 firstArr: [116.478935, 39.997761],
						zoom: 6
					});
					for (var i = 0, markerList; i < allLocationList.length; i++) {
						var markerList = new AMap.Marker({
							icon: "https://webapi.amap.com/images/car.png",
							position: allLocationList[i],
							offset: new AMap.Pixel(-13, -30),
							map: map1
						});
						console.log(list[i].location)
						markerList.setTitle(list[i].carMark +":"+ list[i].location)

					}
					console.log(markerList)
					map1.add(markerList)
				}, 500)
			},
			
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
