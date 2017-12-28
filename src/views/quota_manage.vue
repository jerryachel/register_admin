<template>
	<div class="quota_manage">
		<div class="filter_options">
			<span>时间：</span>
			<el-date-picker value-format="yyyy-MM" @change="handleDateChange" v-model="date"  type="month" placeholder="选择日期" ></el-date-picker>
		</div>
		<div class="calendar_container">
			<ul class="calendar_head">
				<li>日</li>
				<li>一</li>
				<li>二</li>
				<li>三</li>
				<li>四</li>
				<li>五</li>
				<li>六</li>
			</ul>
			<ul class="calendar_body">
				<li v-for="(item,index) in this.daysArr" :style="index == 0?marginLeft:''">
					<span class="calendar_date">{{item.date}}</span>
					<span class="calendar_quota">20/20</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import {DatePicker,Select,Option,Input,Button,Table,TableColumn,Pagination} from 'element-ui'
import navBar from '@/components/nav.vue'
export default {
	components: {
		elDatePicker:DatePicker,
		elSelect:Select,
		elOption:Option,
		elInput:Input,
		elButton:Button,
		elTable:Table,
  		elTableColumn:TableColumn,
  		elPagination:Pagination
	},
	data(){
		return {
			date:new Date(),
			recordClassOptions: [{
				value: 100,
				label: '早班'
			}, {
				value: 200,
				label: '晚班'
			}],
			daysArr:[],
			dayOfWeek:0
		}
	},
	watch:{
		date: function(val){
			console.log(val)
		}
	},
	computed:{
		marginLeft:function(){
			return {
				marginLeft:(this.dayOfWeek * 85)+'px'
			} 
		}
	},
	created(){
		this.renderCalendar()
	},
	methods:{
		renderCalendar(){
			let firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
      		this.dayOfWeek = firstDay.getDay()
      		var d = new Date(2017,12,0).getDate()
			console.log(d)
			
			for(let i = 0; i < d; i++){
				let obj = {
					date:i+1
				} 
				this.daysArr.push(obj)

			}
		},
		handleDateChange(val){
			//let time = this.date.Format("yyyy-MM")+'-01'
			console.log(val)
		}
	}
}
</script>
<style lang="scss" >
@import '../assets/css/index.scss';
.quota_manage{
	.filter_options{
		padding: 0 20px;
		display: flex;
		align-items:center;
		//justify-content:space-between;
		.el-input{
			width: 140px;
		}
	}
	.calendar_container{
		margin-top: 40px;
		width: 630px;
		padding: 0 15px;
	}
	.calendar_head{
		width: 100%;
		display: flex;
		justify-content:space-between;
		li{
			width: 14.28%;
			text-align: center;
		}
	}
	.calendar_body{
		display: flex;
		flex-wrap:wrap;
		justify-content:flex-start;
		li{
			width: 85px;
			//height: 85px;
			text-align: center;
			margin: 20px 0;
			display: flex;
			flex-direction:column;
			align-items:center;
		}
		.calendar_date{
			font-size: 16px;
		}
		.calendar_quota{
			color:#666;
		}
	}
}	

</style>