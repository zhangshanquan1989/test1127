import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Assembly from '../components/Assembly/Assembly.vue'
import BasisInfor from '../components/BasisInfor/BasisInfor.vue'
import DataFactory from '../components/DataFactory/DataFactory.vue'
import PerformanceInfor from '../components/PerformanceInfor/PerformanceInfor.vue'
import RightsManage from '../components/RightsManage/RightsManage.vue'
import Welcome from '../components/Welcome/Welcome.vue'

// Home子组件
import CompanyInfor from '../components/BasisInfor/Navigation/CompanyInfor.vue'
import WorkerInfor from '../components/BasisInfor/Navigation/WorkerInfor.vue'
import DriverQuery from '../components/BasisInfor/Navigation/DriverQuery.vue'
import CustomerInfor from '../components/BasisInfor/Navigation/CustomerInfor.vue'
import RegionInfor from '../components/BasisInfor/Navigation/RegionInfor.vue'
import CarInfo from '../components/BasisInfor/Navigation/Car/CarInfo.vue'
import Illegal from '../components/BasisInfor/Navigation/Car/Illegal.vue'
import EarnestMoney  from '../components/BasisInfor/Navigation/Car/EarnestMoney .vue'
import ManagementFee from '../components/BasisInfor/Navigation/Car/ManagementFee.vue'

// 权限子组件
import AssemblyAuthorized from '../components/RightsManage/Navigation/AssemblyAuthorized.vue'
import BasisAuthorized from '../components/RightsManage/Navigation/BasisAuthorized.vue'
import ManageLimit from '../components/RightsManage/Navigation/ManageLimit.vue'
import PerformanceAuthorized from '../components/RightsManage/Navigation/PerformanceAuthorized.vue'



import Text from '../components/text/text.vue'

Vue.use(VueRouter)

const routes = [
	{path:'/',redirect:'/login'},
  {path: '/login',component: Login},
  {path: '/home',component: Home,redirect:'/welcome',
	children:[
		{path:'/welcome', component:Welcome},
	  {path:'/basis', component:BasisInfor,
			children:[
				{path: '/basis/company',component: CompanyInfor},
				{path: '/basis/worker',component: WorkerInfor},
				{path: '/basis/car/carInfo',component: CarInfo},
				{path: '/basis/car/illegal',component: Illegal},
				{path: '/basis/car/earnestMoney',component: EarnestMoney},
				{path: '/basis/car/managementFee',component: ManagementFee},
				{path: '/basis/driver',component: DriverQuery},
				{path: '/basis/customer',component: CustomerInfor},
				{path: '/basis/region',component: RegionInfor},
				]},
		{path:'/assembly', component:Assembly},
		{path:'/dataFactory', component:DataFactory},
		{path:'/performance', component:PerformanceInfor},
		{path:'/rights', component:RightsManage,redirect:'/manageLimit',
		children:[
			{path: '/assemblyAuthorized',component: AssemblyAuthorized},
			{path: '/basisAuthorized',component: BasisAuthorized},
			{path: '/manageLimit',component: ManageLimit},
			{path: '/performanceAuthorized',component: PerformanceAuthorized},
			]},
		{path:'/text', component:Text}
		]
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
	
]

const router = new VueRouter({
  routes
})

export default router
