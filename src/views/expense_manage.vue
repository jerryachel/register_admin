<template>
	<div class="expense_manage">
		<p class="expense">当前挂号费用：<span>¥ {{price}}</span></p>
		<p class="expense">更改挂号费用为：
			￥&nbsp;<el-input type="number" v-model="expense" placeholder="请输入挂号费用"></el-input>
		</p>
		<el-button class="save_btn" type="primary" @click="saveExpense">保存</el-button>
	</div>
</template>
<script>
import {Input,Button} from 'element-ui'
import axios from '../service/axios.js'
export default {
	data(){
		return {
			expense:'',
			price:''
		}
	},
	components: {
		elInput:Input,
		elButton:Button
	},
	created(){
		this.getExpense()
	},
	methods:{
		getExpense(){
			axios.get('priceConfig/queryPrice.do').then(({data})=>{
				if (data.success) {
					this.price = data.model
				}
			})
		},
		saveExpense(){
			if (parseInt(this.expense)>0) {
				axios.get('priceConfig/updatePrice.do',{
					params:{
						 price:this.expense
					}
				}).then(({data})=>{
					if (data.success) {
						this.getExpense()
						this.$message({
							showClose: true,
							message: '更新成功',
							type: 'success'
						})
					}
				})
			}else{
				this.$message({
					showClose: true,
					message: '请输入正确的金额！',
					type: 'error'
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
	.save_btn{
		margin-left: 130px;
	}
}
</style>