<template>
  <div style="padding:20px">
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
			
			————————————————
			版权声明：本文为CSDN博主「屈想顺」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
			原文链接：https://blog.csdn.net/crazy__qu/article/details/81298623
			
			
  </div>
	
	
	
</template>
<script>
export default {
  data() {
    return {
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
      ]
    };
  },

	    created () {
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
  },
  methods: {
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