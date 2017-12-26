import Vue from 'vue'
import Vuex from 'vuex'
import Cookies from 'js-cookie'
// 引入 axios
import axios from '../service/axios.js'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		user_info:''
	},
	mutations:{
		SAVE_INFO:(state,obj)=> {
			if (obj.info == state.user_info) {
				return
			}else{
				state.user_info = obj.info
				//是否保持登录
				if (obj.isKeepLogin) {
					Cookies.set('user_info',state.user_info,{ expires: 7 })   
				}else{
					Cookies.set('user_info',state.user_info)
				}
			}
		},
		//保存站点列表信息
		SAVE_SITES:(state,obj)=>{
			obj.push({
				id:'',
				name:'所有'
			})
			state.siteList = obj
			Cookies.set('siteList',obj)
		}
	},
	actions: {
		login:({ commit },obj) => {
			axios.post('account/login.do',{
				userName:obj.userName,
				password:obj.password
			}).then(({data})=>{
				console.log(data)

			})
			commit('SAVE_INFO',obj)
	    },
		useInfo:({ commit },obj) => {
			commit('SAVE_INFO',obj)
	    },
	    sites:({ commit },obj)=>{
	    	commit('SAVE_SITES',obj)
	    }
	},
	getters:{
		siteList:(state)=>{
			return state.siteList
		},
		session:(state)=>{
			return state.user_info.session
		},
		token:(state)=>{
			return state.user_info.token
		}
	}
})
export default store