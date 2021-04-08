<template>
  <div style="padding:20px">
		<div>
			<el-card class="box-card" style="width: 380px;height: 110px;">
			  
			</el-card>
		</div>
    <el-table :data="tableData6" :span-method="objectSpanMethod" border >
      <el-table-column prop="id" label="ID" width="180"></el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"></el-table-column>
    </el-table>
		
		<el-checkbox-group v-model="checkList" @change="checkboxchange">
		    <el-checkbox label="复选框 A" ></el-checkbox>
		    <el-checkbox label="复选框 B" ></el-checkbox>
		    <el-checkbox label="复选框 C"></el-checkbox>
		    <el-checkbox label="禁用" disabled></el-checkbox>
		    <el-checkbox label="选中且禁用" disabled></el-checkbox>
		  </el-checkbox-group>
			<el-input type="number" v-model="aaa"  placeholder="单位:元"></el-input>
			
			<!-- 登陆界面 -->
			<div>
			    <div class="outer_label">
			      <img class="inner_label login_logo" src="../../assets/logo.png">
			    </div>
			    <div class="login_form">
			      <input type="text"  class="qxs-ic_user qxs-icon"  placeholder="用户名" v-model="userName">
			      <input type="text"  class="qxs-ic_password qxs-icon"  placeholder="密码" v-model="password">
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
				<button > 下载</button>
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
  </div>
	
	
	
</template>
<script>
export default {
  data() {
    return {
			downloadUrl:'http://81.70.151.121:8080/jeecg-boot/tPfPlist/exportXls',
			 userName: '',
			        password: '',
			        isBtnLoading: false,

			
			
			aaa:0,
			checkList: ['选中且禁用','复选框 A'],
      spanArr: [],//用于存放每一行记录的合并数
      tableData6: [
        {
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
			
			xDataArr:[],
			yDataArr1:[],
			yDataArr2:[],
    };
  },

	    created () {
			this.getEchartsData();
				
	      if(JSON.parse( localStorage.getItem('user')) && JSON.parse( localStorage.getItem('user')).userName){
	        this.userName = JSON.parse( localStorage.getItem('user')).userName;
	        this.password = JSON.parse( localStorage.getItem('user')).password;
	      }
	    },
	    computed: {
	      btnText() {
	        if (this.isBtnLoading) return '登录中...';
	        return '登录';
	      }
	    },
  mounted: function() {
    this.getSpanArr(this.tableData6);
		// echarts
		this.creatEchartsMethod();
  },
  methods: {
		getEchartsData(){
			this.xDataArr = ['1号','2号','3号','4号','5号','6号','7号','8号','9号']
			this.yDataArr1 = ['80','90','95','100','110','130','120','105','95']
			this.yDataArr2 = ['55','65','70','80','85','100','95','85','75']
		},
		// echarts
		creatEchartsMethod(){
			var myChart = this.$echarts.init(document.getElementById('main'));
			var options = {
				title:{
					text:'数据'
				},
				legend:{
					data:['里程','收入']
				},
				xAxis:{
					type:'category',
					data:this.xDataArr
				},
				yAxis:{
					type:'value'
				},
				series:[
					{
						name:'里程',
						type:'bar',
						data:this.yDataArr1,
						// 平均值
						markLine:{
							data:[
								{type: 'average'}
							]
						}
					},
					{
						name:'收入',
						type:'bar',
						data:this.yDataArr2,
						// 平均值
						markLine:{
							data:[
								{type: 'average'}
							]
						}
					}
				],
				
			}
			// 使用刚指定的配置项和数据显示图表。
			 myChart.setOption(options);
		},
		dianji(){
			this.xDataArr = ['11号','12号','13号','14号','15号','16号','17号','18号','19号']
			this.yDataArr1 = ['180','90','195','100','110','130','120','105','95']
			this.yDataArr2 = ['55','65','70','80','85','100','95','85','75']
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
		async xiazai(){
				const {data:res} = await this.$http.get('tPfPlist/exportXls')
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
		
		
		checkboxchange(e){
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
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
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
    }
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
    background: -webkit-linear-gradient(left, #000099, #2154FA); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(right, #000099, #2154FA); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(right, #000099, #2154FA); /* Firefox 3.6 - 15 */
    background: linear-gradient(to right, #000099 , #2154FA); /* 标准的语法 */
    filter: brightness(1.4);
  }

</style>