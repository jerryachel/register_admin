<template>
	<div class="register_info">
		<div class="filter_options">
			<span>时间：</span>
			<el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
			<el-select class="recordClass" v-model="recordClass" placeholder="请选择">
				<el-option v-for="item in recordClassOptions" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
			<span>预约电话：</span>
			<el-input v-model="phone" placeholder="请输入预约电话"></el-input>
			<el-button class="search_btn" type="primary">搜索</el-button>
		</div>
		
	</div>
</template>
<script>
import {DatePicker,Select,Option,Input,Button} from 'element-ui'
import navBar from '@/components/nav.vue'
export default {
	components: {
		elDatePicker:DatePicker,
		elSelect:Select,
		elOption:Option,
		elInput:Input,
		elButton:Button
	},
	data(){
		return {
			date:'',
			recordClassOptions: [{
				value: 100,
				label: '早班'
			}, {
				value: 200,
				label: '晚班'
			}],
			recordClass:100,
			phone:''
		}
	}
}
</script>
<style lang="scss" >
@import '../assets/css/index.scss';
.register_info{
	.filter_options{
		padding: 0 20px;
		display: flex;
		align-items:center;
		justify-content:space-between;
	}
	.el-input{
		width: 140px;
	}
}	

</style>