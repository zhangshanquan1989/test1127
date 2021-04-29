<template>
	<div>
		实时监控
	</div>
</template>

<script>
	export default {
		data(){
			return{}
		},
		created() {
			// this.getCarStatusList()
		},
		methods:{
			async getCarStatusList() {
				const {
					data: res
				} = await this.$http.get('kCarinformation/GetCarCurrentStatusBycarMark?list='+"鲁AG8928,冀GM2208")
				console.log(res)

			},
		}
	}
</script>

<style scoped>

</style>