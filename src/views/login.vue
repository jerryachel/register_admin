<template>
	<div class="login_container">
		<div class="login">
			<h1>陈景辉诊所后台管理系统</h1>
			<div class="login_input">
				登录名
				<el-input v-model="name" placeholder="请输入内容"></el-input>
			</div>
		</div>
	</div>
</template>
<script>
import {Input} from 'element-ui'
export default {
	components: {
		elInput:Input
	},
	data () {
		return {
			name: 'Welcome to Your Vue.js App'
		}
	}
}
</script>
<style lang="scss" >
@import '../assets/css/index.scss';
.login_container{
	width: 100%;
	height: 100%;
	.login{
		width: 400px;
		height: 300px;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		border: 1px solid #ccc;
		border-radius: 10px;
		padding: 10px;
		h1{
			text-align: center;
			font-size: 26px;
		}
		.login_input{
			display: flex;
			@extend %flex_justify;
		}
		.el-input{
			width: 70%;
		}
	}
}
</style>