<template>
	<div>
		手机页面
	</div>
</template>

<script>
	export default {
		data(){
			return{
				
			}
		},
		created() {
			console.log("url--info",this.$route.path);
			
			this.getInfo()
		},
		methods:{
			async getInfo(){
				let noList = this.$route.path.split("/")
				// console.log(noList)
				let no = noList[noList.length-1]
				// console.log(no)
				// console.log(this.$route.params)
				// let id = this.$route.params.id;
				// console.log('id'+id)
				const {data:res} = await this.$http.get('waybill/lianjie?plistNo=' + no)
				console.log(res)
			},
		}
	}
</script>

<style scoped>

</style>