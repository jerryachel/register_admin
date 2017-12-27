<template>
	<div class="layout">
		<header class="header">
			<div class="title">
				<img src="../assets/images/doctor.png" alt="">
				<p>XXXXXXXXXXXXXXXXXX</p>
				<!-- <p>陈景辉诊所后台管理系统</p> -->
			</div>
			<div class="user_info">
				<span>当前账户： XXX </span>
				<a href="javascript:void(0)">【退出】</a>
			</div>
		</header>
		<div class="container">
			<div class="sidebar">
	            <el-menu :default-active="$route.path" :router=true class="el-menu-vertical-demo" @select="handleSelect" @open="handleOpen" @close="handleClose">
	            	<el-menu-item index="/register_info"><i class="el-icon-menu"></i>挂号信息</el-menu-item>
	                <el-submenu index="/">
	                    <template slot="title"><i class="el-icon-search"></i>配置信息</template>
	                    <el-menu-item index="/quota_manage">挂号名额管理</el-menu-item>
	                    <el-menu-item index="/expense_manage">挂号费用配置</el-menu-item>
	                </el-submenu>
	                <el-menu-item index="/password"><i class="el-icon-menu"></i>修改密码</el-menu-item>
	            </el-menu>
	        </div>
	        <div class="content">
	        	<nav-bar></nav-bar>
	        	<router-view></router-view>
	        </div>
		</div>
		
	</div>
</template>
<script>
import {Menu,Submenu,MenuItem} from 'element-ui'
import navBar from '@/components/nav.vue'
export default {
	components: {
		elMenu:Menu,
		elSubmenu:Submenu,
		elMenuItem:MenuItem,
		navBar:navBar
	},
	methods:{
		handleSelect(index, indexPath) {
			console.log(index, indexPath)
		},
		handleOpen(key, keyPath) {
		  console.log(key, keyPath)
		},
		handleClose(key, keyPath) {
		  console.log(key, keyPath)
		}
	}
}
</script>
<style lang="scss" >
@import '../assets/css/index.scss';
.layout{
	width: 100%;
	height: 100%;
	.header{
		width: 100%;
		height: 70px;
		box-shadow: 0 2px 5px rgba(0,0,0,.3);
		@extend %flex_justify;
		padding: 0 60px;
		background-color: $blue;
		color: #fff;
		position: relative;
		z-index: 2;
		.title{
			display: flex;
			align-items:center;
			font-size: 16px;
			img{
				width: 30px;
				margin-right: 20px;
			}
		}
		.user_info{
			height: 50px;
			display: flex;
			align-items:center;
			font-size: 14px;
			span{
				padding-right: 15px;
				margin-right: 15px;
				border-right: 2px solid #fff;
			}
			a{
				color: #fff;
			}
		}
	}
	.container{
		width: 100%;
		display: flex;
		height: calc(100% - 70px);
	}
	.sidebar{
		width: 170px;
		height: 100%;
		.el-menu{
			height: 100%;
		}
	}
	.content{
		height: 100%;
		width: calc(100% - 170px);
		padding: 20px 20px;
	}
}	
</style>