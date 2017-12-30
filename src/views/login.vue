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
				<el-input type="password" v-model="password" placeholder="请输入密码"></el-input>
			</div>
			<el-button @click.native="login" class="login_btn" type="primary">登录</el-button>
		</div>
	</div>
</template>
<script>
import {Input,Button} from 'element-ui'
import axios from '../service/axios.js'
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
			/*if (this.name == '' || this.password == '') {
				this.$message({
					showClose: true,
					message: '用户名与密码不能为空',
					type: 'error'
				})
				return false
			}*/
			axios.get('account/login.do',{
				params:{
					userName:this.name,
					password:this.password
				}
			}).then(({data})=>{
				if (data.success) {
					this.$store.dispatch('login',{name:'陈医生'})
					this.$router.push('/register_info')
				}else{
					this.$message({
						showClose: true,
						message: data.errorMsg,
						type: 'error'
					})
				}
			})
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