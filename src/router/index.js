import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Assembly from '../components/Assembly/Assembly.vue'
import BasisInfor from '../components/BasisInfor/BasisInfor.vue'
import DataFactory from '../components/DataFactory/DataFactory.vue'
import PerformanceInfor from '../components/PerformanceInfor/PerformanceInfor.vue'
import RightsManage from '../components/RightsManage/RightsManage.vue'

import CompanyInfor from '../components/BasisInfor/Navigation/CompanyInfor.vue'
import WorkerInfor from '../components/BasisInfor/Navigation/WorkerInfor.vue'
import DriverQuery from '../components/BasisInfor/Navigation/DriverQuery.vue'
import CustomerInfor from '../components/BasisInfor/Navigation/CustomerInfor.vue'
import RegionInfor from '../components/BasisInfor/Navigation/RegionInfor.vue'

Vue.use(VueRouter)

const routes = [
	{path:'/',redirect:'/login'},
  {path: '/login',component: Login},
  {path: '/home',component: Home,redirect:'/users',
	children:[
	  {path:'/users', component:BasisInfor,redirect:'/1',
			children:[
				{path: '/1',component: CompanyInfor},
				{path: '/2',component: WorkerInfor},
				{path: '/3',component: DriverQuery},
				{path: '/4',component: CustomerInfor},
				{path: '/5',component: RegionInfor},
				]},
		{path:'/welcome', component:Assembly},
		{path:'/rights', component:DataFactory},
		{path:'/roles', component:PerformanceInfor},
		{path:'/categories', component:RightsManage}
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
