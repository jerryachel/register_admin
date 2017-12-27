import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import layout from '@/views/layout'
import register_info from '@/views/register_info'
import quota_manage from '@/views/quota_manage'
import expense_manage from '@/views/expense_manage'
import password from '@/views/password'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/',
      name: '',
      component: layout,
      children:[
		{
	      path: '/register_info',
	      name: '挂号信息',
	      component: register_info
	    },{
	      path: '/quota_manage',
	      name: '挂号名额管理',
	      component: quota_manage
	    },{
	      path: '/expense_manage',
	      name: '挂号费用配置',
	      component: expense_manage
	    },{
	      path: '/password',
	      name: '修改密码',
	      component: password
	    },
      ]
    }
  ]
})
