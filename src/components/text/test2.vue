<template>
	<div>
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
				}, {
					"lat": 41.899023,
					"lng": 123.53229,
					"speed": 4.74
				}, {
					"lat": 41.899022,
					"lng": 123.532157,
					"speed": 0.78
				}, {
					"lat": 41.899028,
					"lng": 123.532115,
					"speed": 11.43
				}, {
					"lat": 41.89907,
					"lng": 123.53213,
					"speed": 17.04
				}, {
					"lat": 41.89908,
					"lng": 123.53206,
					"speed": 11.78
				}, {
					"lat": 41.899079,
					"lng": 123.5321,
					"speed": 10.43
				}, {
					"lat": 41.898989,
					"lng": 123.532134,
					"speed": 7.47
				}, {
					"lat": 41.899051,
					"lng": 123.532292,
					"speed": 6.27
				}, {
					"lat": 41.899111,
					"lng": 123.532169,
					"speed": 6.88
				}, {
					"lat": 41.898991,
					"lng": 123.532168,
					"speed": 5.98
				}, {
					"lat": 41.899083,
					"lng": 123.532157,
					"speed": 2.29
				}, {
					"lat": 41.899114,
					"lng": 123.532184,
					"speed": 2.93
				}, {
					"lat": 41.899054,
					"lng": 123.532083,
					"speed": 2.48
				}, {
					"lat": 41.898948,
					"lng": 123.532208,
					"speed": 2.4
				}, {
					"lat": 41.898965,
					"lng": 123.53223,
					"speed": 1.59
				}, {
					"lat": 41.899085,
					"lng": 123.532219,
					"speed": 2.96
				}, {
					"lat": 41.899019,
					"lng": 123.532224,
					"speed": 4.64
				}, {
					"lat": 41.899089,
					"lng": 123.532236,
					"speed": 3.86
				}, {
					"lat": 41.899091,
					"lng": 123.532176,
					"speed": 6.02
				}, {
					"lat": 41.899038,
					"lng": 123.532115,
					"speed": 8.42
				}, {
					"lat": 41.864238,
					"lng": 123.510692,
					"speed": 0.89
				}, {
					"lat": 41.86401,
					"lng": 123.510915,
					"speed": 2.61
				}, {
					"lat": 41.863474,
					"lng": 123.510799,
					"speed": 10.31
				}, {
					"lat": 41.863071,
					"lng": 123.510626,
					"speed": 6.76
				}, {
					"lat": 41.862719,
					"lng": 123.510458,
					"speed": 9.22
				}, {
					"lat": 41.861887,
					"lng": 123.50998,
					"speed": 18.36
				}, {
					"lat": 41.860685,
					"lng": 123.509322,
					"speed": 26.62
				}, {
					"lat": 41.859401,
					"lng": 123.50864,
					"speed": 26.9
				}, {
					"lat": 41.858528,
					"lng": 123.508255,
					"speed": 17.02
				}, {
					"lat": 41.85839,
					"lng": 123.508178,
					"speed": 0.0
				}, {
					"lat": 41.857946,
					"lng": 123.508087,
					"speed": 11.64
				}, {
					"lat": 41.857131,
					"lng": 123.507831,
					"speed": 17.96
				}, {
					"lat": 41.85608,
					"lng": 123.507415,
					"speed": 22.2
				}, {
					"lat": 41.855023,
					"lng": 123.507107,
					"speed": 20.21
				}, {
					"lat": 41.854239,
					"lng": 123.507109,
					"speed": 15.07
				}, {
					"lat": 41.853437,
					"lng": 123.507244,
					"speed": 0.0
				}, {
					"lat": 41.85285,
					"lng": 123.507266,
					"speed": 5.11
				}, {
					"lat": 41.852853,
					"lng": 123.50726,
					"speed": 0.0
				}, {
					"lat": 41.852833,
					"lng": 123.50724,
					"speed": 0.0
				}, {
					"lat": 41.852504,
					"lng": 123.507312,
					"speed": 9.93
				}, {
					"lat": 41.851799,
					"lng": 123.507233,
					"speed": 14.16
				}, {
					"lat": 41.851242,
					"lng": 123.507059,
					"speed": 0.0
				}, {
					"lat": 41.851071,
					"lng": 123.507009,
					"speed": 2.83
				}, {
					"lat": 41.850975,
					"lng": 123.506994,
					"speed": 1.88
				}, {
					"lat": 41.850954,
					"lng": 123.507074,
					"speed": 3.12
				}, {
					"lat": 41.850888,
					"lng": 123.507116,
					"speed": 2.55
				}, {
					"lat": 41.850369,
					"lng": 123.506927,
					"speed": 12.25
				}, {
					"lat": 41.849632,
					"lng": 123.506612,
					"speed": 14.88
				}, {
					"lat": 41.849141,
					"lng": 123.506082,
					"speed": 12.58
				}, {
					"lat": 41.848494,
					"lng": 123.505268,
					"speed": 17.33
				}, {
					"lat": 41.847635,
					"lng": 123.504232,
					"speed": 22.73
				}, {
					"lat": 41.844513,
					"lng": 123.500763,
					"speed": 0.26
				}, {
					"lat": 41.844541,
					"lng": 123.500873,
					"speed": 1.15
				}, {
					"lat": 41.844538,
					"lng": 123.500956,
					"speed": 0.59
				}, {
					"lat": 41.844547,
					"lng": 123.500901,
					"speed": 1.31
				}, {
					"lat": 41.844607,
					"lng": 123.500929,
					"speed": 2.27
				}, {
					"lat": 41.844534,
					"lng": 123.501072,
					"speed": 1.57
				}, {
					"lat": 41.8446,
					"lng": 123.50101,
					"speed": 1.28
				}, {
					"lat": 41.844566,
					"lng": 123.500914,
					"speed": 0.32
				}, {
					"lat": 41.844514,
					"lng": 123.501011,
					"speed": 4.44
				}, {
					"lat": 41.844109,
					"lng": 123.500855,
					"speed": 12.22
				}, {
					"lat": 41.843536,
					"lng": 123.500518,
					"speed": 6.65
				}, {
					"lat": 41.841808,
					"lng": 123.47934,
					"speed": 18.47
				}, {
					"lat": 41.840919,
					"lng": 123.478866,
					"speed": 21.47
				}, {
					"lat": 41.840046,
					"lng": 123.478525,
					"speed": 19.79
				}, {
					"lat": 41.839302,
					"lng": 123.478138,
					"speed": 18.34
				}, {
					"lat": 41.838476,
					"lng": 123.477633,
					"speed": 18.76
				}, {
					"lat": 41.837629,
					"lng": 123.477199,
					"speed": 20.21
				}, {
					"lat": 41.836865,
					"lng": 123.476741,
					"speed": 15.45
				}, {
					"lat": 41.836261,
					"lng": 123.476494,
					"speed": 8.81
				}, {
					"lat": 41.836063,
					"lng": 123.476472,
					"speed": 1.23
				}, {
					"lat": 41.836059,
					"lng": 123.476375,
					"speed": 0.88
				}, {
					"lat": 41.83607,
					"lng": 123.476511,
					"speed": 0.52
				}, {
					"lat": 41.835947,
					"lng": 123.4764,
					"speed": 7.09
				}, {
					"lat": 41.835377,
					"lng": 123.476121,
					"speed": 16.47
				}, {
					"lat": 41.834477,
					"lng": 123.475743,
					"speed": 22.19
				}, {
					"lat": 41.833489,
					"lng": 123.475429,
					"speed": 20.63
				}, {
					"lat": 41.832667,
					"lng": 123.475116,
					"speed": 12.04
				}, {
					"lat": 41.832467,
					"lng": 123.475155,
					"speed": 1.64
				}, {
					"lat": 41.832113,
					"lng": 123.474932,
					"speed": 4.9
				}, {
					"lat": 41.832009,
					"lng": 123.475042,
					"speed": 0.68
				}, {
					"lat": 41.832049,
					"lng": 123.475109,
					"speed": 0.42
				}, {
					"lat": 41.831813,
					"lng": 123.474998,
					"speed": 7.82
				}, {
					"lat": 41.831434,
					"lng": 123.474922,
					"speed": 9.01
				}, {
					"lat": 41.830969,
					"lng": 123.474801,
					"speed": 0.26
				}, {
					"lat": 41.831016,
					"lng": 123.474759,
					"speed": 0.63
				}, {
					"lat": 41.831002,
					"lng": 123.474811,
					"speed": 0.37
				}, {
					"lat": 41.830979,
					"lng": 123.474842,
					"speed": 0.19
				}, {
					"lat": 41.831,
					"lng": 123.474881,
					"speed": 2.49
				}, {
					"lat": 41.830476,
					"lng": 123.474859,
					"speed": 13.4
				}, {
					"lat": 41.830074,
					"lng": 123.474814,
					"speed": 4.91
				}, {
					"lat": 41.835844,
					"lng": 123.45395,
					"speed": 26.14
				}, {
					"lat": 41.834962,
					"lng": 123.452371,
					"speed": 29.0
				}, {
					"lat": 41.834881,
					"lng": 123.450394,
					"speed": 31.17
				}, {
					"lat": 41.834637,
					"lng": 123.448592,
					"speed": 28.52
				}, {
					"lat": 41.834968,
					"lng": 123.446697,
					"speed": 31.61
				}, {
					"lat": 41.834239,
					"lng": 123.444774,
					"speed": 32.14
				}, {
					"lat": 41.834564,
					"lng": 123.442773,
					"speed": 30.3
				}, {
					"lat": 41.833447,
					"lng": 123.441212,
					"speed": 29.5
				}, {
					"lat": 41.834491,
					"lng": 123.439277,
					"speed": 26.66
				}, {
					"lat": 41.834464,
					"lng": 123.437458,
					"speed": 28.18
				}, {
					"lat": 41.833889,
					"lng": 123.435907,
					"speed": 25.68
				}, {
					"lat": 41.834097,
					"lng": 123.434818,
					"speed": 36.25
				}, {
					"lat": 41.834124,
					"lng": 123.434497,
					"speed": 15.35
				}, {
					"lat": 41.833805,
					"lng": 123.434234,
					"speed": 8.37
				}, {
					"lat": 41.833916,
					"lng": 123.434072,
					"speed": 9.12
				}, {
					"lat": 41.834113,
					"lng": 123.433634,
					"speed": 8.25
				}, {
					"lat": 41.833876,
					"lng": 123.433384,
					"speed": 11.07
				}, {
					"lat": 41.833807,
					"lng": 123.432707,
					"speed": 16.0
				}, {
					"lat": 41.83432,
					"lng": 123.431755,
					"speed": 18.92
				}, {
					"lat": 41.833885,
					"lng": 123.430365,
					"speed": 21.79
				}, {
					"lat": 41.833032,
					"lng": 123.426448,
					"speed": 12.26
				}, {
					"lat": 41.833191,
					"lng": 123.426148,
					"speed": 8.4
				}, {
					"lat": 41.832995,
					"lng": 123.425893,
					"speed": 4.54
				}, {
					"lat": 41.833207,
					"lng": 123.425644,
					"speed": 10.26
				}, {
					"lat": 41.833552,
					"lng": 123.425237,
					"speed": 5.53
				}, {
					"lat": 41.833566,
					"lng": 123.42494,
					"speed": 13.97
				}, {
					"lat": 41.833564,
					"lng": 123.42421,
					"speed": 16.61
				}, {
					"lat": 41.833379,
					"lng": 123.423503,
					"speed": 9.43
				}, {
					"lat": 41.83317,
					"lng": 123.423291,
					"speed": 4.27
				}, {
					"lat": 41.833259,
					"lng": 123.423173,
					"speed": 0.2
				}, {
					"lat": 41.833292,
					"lng": 123.423196,
					"speed": 0.56
				}, {
					"lat": 41.833315,
					"lng": 123.423336,
					"speed": 9.48
				}, {
					"lat": 41.833719,
					"lng": 123.423198,
					"speed": 2.06
				}, {
					"lat": 41.833402,
					"lng": 123.423224,
					"speed": 6.03
				}, {
					"lat": 41.833474,
					"lng": 123.423232,
					"speed": 4.01
				}, {
					"lat": 41.833261,
					"lng": 123.422898,
					"speed": 12.13
				}, {
					"lat": 41.833146,
					"lng": 123.421998,
					"speed": 17.87
				}, {
					"lat": 41.833189,
					"lng": 123.421189,
					"speed": 7.73
				}, {
					"lat": 41.833016,
					"lng": 123.421064,
					"speed": 3.04
				}, {
					"lat": 41.83258,
					"lng": 123.42113,
					"speed": 3.27
				}, {
					"lat": 41.832915,
					"lng": 123.421084,
					"speed": 2.39
				}, {
					"lat": 41.833145,
					"lng": 123.421143,
					"speed": 1.66
				}, {
					"lat": 41.832833,
					"lng": 123.421134,
					"speed": 1.06
				}, {
					"lat": 41.832969,
					"lng": 123.421123,
					"speed": 2.27
				}, {
					"lat": 41.833039,
					"lng": 123.421166,
					"speed": 1.63
				}, {
					"lat": 41.833188,
					"lng": 123.42104,
					"speed": 0.34
				}, {
					"lat": 41.832959,
					"lng": 123.420934,
					"speed": 7.38
				}, {
					"lat": 41.832785,
					"lng": 123.420406,
					"speed": 14.1
				}, {
					"lat": 41.832976,
					"lng": 123.419447,
					"speed": 18.05
				}, {
					"lat": 41.832722,
					"lng": 123.418305,
					"speed": 21.05
				}, {
					"lat": 41.832819,
					"lng": 123.416974,
					"speed": 20.29
				}, {
					"lat": 41.833235,
					"lng": 123.416011,
					"speed": 4.16
				}, {
					"lat": 41.832908,
					"lng": 123.416037,
					"speed": 2.9
				}, {
					"lat": 41.832515,
					"lng": 123.415689,
					"speed": 10.49
				}, {
					"lat": 41.83246,
					"lng": 123.414803,
					"speed": 18.14
				}, {
					"lat": 41.832752,
					"lng": 123.413677,
					"speed": 19.08
				}, {
					"lat": 41.83275,
					"lng": 123.41255,
					"speed": 19.73
				}, {
					"lat": 41.832427,
					"lng": 123.411404,
					"speed": 18.68
				}, {
					"lat": 41.83222,
					"lng": 123.410159,
					"speed": 22.06
				}, {
					"lat": 41.832284,
					"lng": 123.409089,
					"speed": 5.62
				}, {
					"lat": 41.832393,
					"lng": 123.408715,
					"speed": 8.48
				}, {
					"lat": 41.832029,
					"lng": 123.408214,
					"speed": 11.17
				}, {
					"lat": 41.83231,
					"lng": 123.407423,
					"speed": 19.98
				}, {
					"lat": 41.832169,
					"lng": 123.406281,
					"speed": 17.09
				}, {
					"lat": 41.831934,
					"lng": 123.403808,
					"speed": 3.74
				}, {
					"lat": 41.832033,
					"lng": 123.403582,
					"speed": 7.12
				}, {
					"lat": 41.831947,
					"lng": 123.403109,
					"speed": 9.49
				}, {
					"lat": 41.831807,
					"lng": 123.402498,
					"speed": 6.7
				}, {
					"lat": 41.831841,
					"lng": 123.40205,
					"speed": 9.64
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
