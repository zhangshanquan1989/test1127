<template>
	<div>
		<!-- 新增表单项 -->
		<el-form :model="inServForm" ref="inServForm" label-width="130px" size="small">
			<el-form-item label="输入参数列表" prop="servin">
				<el-button type="primary" @click="addRow(infiledList)">新增</el-button>
				<template>
					<el-table border :data="infiledList" style="width: 100%">
						<el-table-column prop="fildna" label="名称" style="width:6vw;">
							<template scope="scope">
								<el-input size="mini" v-model="scope.row.fildna"></el-input>
							</template>
						</el-table-column>
						<el-table-column prop="fildtp" label="类型">
							<template scope="scope">
								<el-select v-model="scope.row.fildtp" clearable>
									<el-option v-for="item in fildtps" :key="item.value" :label="item.text" :value="item.value">
									</el-option>
								</el-select>
							</template>
						</el-table-column>
						<el-table-column prop="remark" label="备注">
							<template scope="scope">
								<el-input size="mini" v-model="scope.row.remark"></el-input>
							</template>
						</el-table-column>
						<el-table-column fixed="right" label="操作">
							<template slot-scope="scope">
								<el-button @click.native.prevent="deleteRow(scope.$index, infiledList)" size="small"> 移除 </el-button>
							</template>
						</el-table-column>
					</el-table>
				</template>
			</el-form-item>
		</el-form>


		<div>

			<el-upload name="imgFile" class="avatar-uploader" :action="updateDriverUrl" :auto-upload="true"    list-type="picture-card" :before-upload="beforeAvatarUpload" :on-success="handleAvatarSuccess" ref="newupload">
				　　<el-button slot="trigger" size="small" icon="el-icon-upload" style="margin-top: 20px;">选择上传文件</el-button>
				　　<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
			</el-upload>


			
		</div>

	</div>
</template>

<script>
	export default {
		data() {
			return {
				// 新增表单
				inServForm: {},
				infiledList: [],
				fildtps: [{
					text: '字符',
					value: '1'
				}, {
					text: '数字',
					value: '2'
				}],


				itemForm: {
					//编辑时数据
					token: sessionStorage.getItem('loginToken'),
					id: 0,
					user_name: '',
					user_nike_name: '',
					user_sex: 1, //默认 1男 0女
					user_phone: '',
					user_email: '',
					head_img: ''
				},
				newuploadPicture:{},
				file: {}, //向服务器进行传递的参数（带有图片formdata）
				updateDriverUrl: 'http://81.70.151.121:8080/jeecg-boot/base/tBaDriver/uploadImageDriver'

			}
		},
		methods: {
			//成功时保存一下后台给你返回的图片，可以渲染到页面上
			handleAvatarSuccess(response, file, fileList) {
				console.log(response)
				// console.log(file)
				// console.log(fileList)

				// this.itemForm.head_img = URL.createObjectURL(file.raw)
			},
			change(file){
				// // console.log(file.url)
				// this.file = file.url
			},

			//上传时，判断文件的类型及大小是否符合规则
			beforeAvatarUpload(file) {


				const isJPG = file.type == 'image/jpeg' || file.type == 'image/png' || file.type == 'image/gif'
				const isLt2M = file.size / 1024 / 1024 < 2
				if (!isJPG) {
					this.$message.warning('上传头像图片只能是 JPG/PNG/GIF 格式!')
					return isJPG
				}
				if (!isLt2M) {
					this.$message.warning('上传头像图片大小不能超过 2MB!')
					return isLt2M
				}
				this.multfileImg = file
				return isJPG && isLt2M
			},


			// 表单增加一行
			deleteRow(index, rows) { //删除改行
				rows.splice(index, 1);
			},
			addRow(tableData, event) {
				tableData.push({
					fildna: '',
					fildtp: '',
					remark: ''
				})
			},

		}
	}
</script>

<style scoped>

</style>
