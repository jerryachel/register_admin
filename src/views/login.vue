<template>
	<div class="login_container">
		<div class="login">
			<h1>陈景辉诊所后台管理系统</h1>
			<div class="login_input">
				用户名
				<el-input v-model="name" placeholder="请输入用户名"></el-input>
			</div>
			<div class="login_input">
				密码
				<el-input v-model="password" placeholder="请输入密码"></el-input>
			</div>
			<el-button @click="login" class="login_btn" type="primary">登录</el-button>
		</div>
	</div>
</template>
<script>
import {Input,Button} from 'element-ui'
export default {
	components: {
		elInput:Input,
		elButton:Button
	},
	data () {
		return {
			name: '',
			password:''
		}
	},
	methods:{
		login(){

		}
	}
}
</script>
<style lang="scss" >
@import '../assets/css/index.scss';
.login_container{
	width: 100%;
	height: 100%;
	background: url('../assets/images/login_bg.jpg') no-repeat;
	background-size: cover;
	color: #333;
	.login{
		width: 400px;
		height: 300px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 10px 30px;
		background-color: rgba(255,255,255,.9);
		box-shadow: 0 0 5px rgba(64,158,255,.8);
		h1{
			text-align: center;
			font-size: 26px;
			color: $blue;
		}
		.login_input{
			@extend %flex_justify;
			margin: 30px;
		}
		.el-input{
			width: 70%;
		}
	}
	.login_btn{
		margin:0 auto;
		display: block;
		width: 280px;
	}
}
</style>