<template>
	<div>
		<div>
			
		</div>
		<div class="input-card">
			<h4>轨迹回放控制</h4>
			<el-button @click="startAnimation">开始</el-button>
			<el-button @click="pauseAnimation">暂停</el-button>
			<el-button @click="resumeAnimation">继续</el-button>
		</div>
		<div id="mapContainer" style="height: 500px;width: 500px;"></div>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 历史轨迹速度
				routeInfo: [{
					"lat": 41.898985,
					"lng": 123.532276,
					"speed": 0.89
				}, {
					"lat": 41.898994,
					"lng": 123.532212,
					"speed": 1.55
				}, {
					"lat": 41.898965,
					"lng": 123.532254,
					"speed": 1.34
				}],
				map: {},
				carMarker:{},
				carWindow:{},
				pathPolyline:{},
				
			}
		},
		created() {

		},
		mounted() {
			setTimeout(() => {
				this.history()
			}, 200)
		},
		methods: {
			// startAnimation() {
			// 	this.marker.moveAlong(this.lineArr, 500);
			// },
			pauseAnimation() {
				this.carMarker.pauseMove();
			},
			resumeAnimation() {
				this.carMarker.resumeMove();
			},
			stopAnimation() {
				this.carMarker.stopMove();
			},
			startAnimation() {
				// 5.车辆随轨迹移动
				this.carMarker.moveAlong(this.pathPolyline.getPath(), 1000, function(k) {
					return k
				}, false);
				
				// 6.速度框随车辆移动
				AMap.event.addListener(this.carMarker, 'moving', (e)=> {
					var lastLocation = e.passedPath[e.passedPath.length - 1];
					this.carWindow.setPosition(lastLocation);
					this.setVehicleSpeedInWidowns(lastLocation);
				});
				
				// 7.打开速度框setPosition
				this.carWindow.open(this.map, this.carMarker.getPosition());
			},
			history() {
				console.log('routeInfo', this.routeInfo)

				// 1. 创建地图
				this.map = new AMap.Map("mapContainer", {
					view: new AMap.View2D({}),
					lang: "zh_cn",
					center: [this.routeInfo[0].lng, this.routeInfo[0].lat],
				});


				// 2.创建小汽车marker
				this.carMarker = new AMap.Marker({
					map: this.map,
					position: [this.routeInfo[0].lng, this.routeInfo[0].lat],
					icon: "http://webapi.amap.com/images/car.png",
					offset: new AMap.Pixel(-26, -13),
					autoRotation: true
				});

				// 3.创建跟速度信息展示框
				this.carWindow = new AMap.InfoWindow({
					offset: new AMap.Pixel(6, -25),
					content: ""
				});

				// 4.生成车辆回放轨迹
				this.pathPolyline = this.initializePaths(this.routeInfo, this.map);
				// console.log('pathPolyline',pathPolyline)

			

				// 8.地图自适应缩放
				this.map.setFitView();

				// let that = this

				// function initializePaths(paths, map1) {
				// 	console.log(map1)
				// 	var line;
				// 	var pathLngLatArray = new Array();
				// 	if (paths) {
				// 		for (var i = 0; i < paths.length; i++) {
				// 			pathLngLatArray.push(new AMap.LngLat(paths[i].lng, paths[i].lat));
				// 		}
				// 		line = new AMap.Polyline({
				// 			map: map1,
				// 			path: pathLngLatArray,
				// 			strokeColor: 'red',
				// 			strokeOpacity: 0.8,
				// 			strokeWeight: 6,
				// 			strokeStyle: 'solid'
				// 		});
				// 		line.setMap(map1);
				// 	}
				// 	return line;
				// }

				// function setVehicleSpeedInWidowns(lnglat) {
				// 	for (var i = 0; i < that.routeInfo.length; i++) {
				// 		if (lnglat.distance(new AMap.LngLat(that.routeInfo[i].lng, that.routeInfo[i].lat)) < 4) {
				// 			that.carWindow.setContent("速度:" + (that.routeInfo[i].speed * 1.852).toFixed(2) + "公里/时");
				// 			return;
				// 		}
				// 	}
				// }
			},
			initializePaths(paths, map1) {
				console.log(map1)
				var line;
				var pathLngLatArray = new Array();
				if (paths) {
					for (var i = 0; i < paths.length; i++) {
						pathLngLatArray.push(new AMap.LngLat(paths[i].lng, paths[i].lat));
					}
					line = new AMap.Polyline({
						map: map1,
						path: pathLngLatArray,
						strokeColor: 'red',
						strokeOpacity: 0.8,
						strokeWeight: 6,
						strokeStyle: 'solid'
					});
					line.setMap(map1);
				}
				return line;
			},
			setVehicleSpeedInWidowns(lnglat) {
				for (var i = 0; i < this.routeInfo.length; i++) {
					if (lnglat.distance(new AMap.LngLat(this.routeInfo[i].lng, this.routeInfo[i].lat)) < 4) {
						this.carWindow.setContent("速度:" + (this.routeInfo[i].speed * 1.852).toFixed(2) + "公里/时");
						return;
					}
				}
			}

		}

	}
</script>

<style scoped>

</style>
