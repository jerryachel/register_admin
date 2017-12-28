<template>
	<div class="expense_manage">
		<p class="expense">当前挂号费用：<span>¥ 5.00</span></p>
		<p class="expense">更改挂号费用为：
			￥ <el-input v-model="expense" placeholder="请输入挂号费用"></el-input>
		</p>
		<el-button type="primary" @click="saveExpense">保存</el-button>
	</div>
</template>
<script>
import {Input,Button} from 'element-ui'
export default {
	data(){
		return {
			expense:''
		}
	},
	components: {
		elInput:Input,
		elButton:Button
	},
	methods:{
		saveExpense(){
			/**/
	        
			if (!isNaN(this.expense) || paserInt(this.expense)>0) {
				console.log()
			}else{
				this.$message({
					showClose: true,
					message: ''
				})
			}
		}
	}
}	
</script>
<style lang="scss" >
@import '../assets/css/index.scss';
.expense_manage{
	.el-input{
		width:140px;
	}
	.expense{
		display: flex;
		align-items:center;
		margin: 40px 0;
	}
}
</style>