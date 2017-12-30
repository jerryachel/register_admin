<template>
	<div class="quota_manage">
		<div class="filter_options">
			<span>时间：</span>
			<el-date-picker  @change="handleDateChange" v-model="date"  type="month" placeholder="选择日期" ></el-date-picker>
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
				<li v-for="(item,index) in daysArr" :style="index == 0?marginLeft:''">
					<div @click="getDayQuota(index,item)" :class="['calendar_day',index+1 == currentDay && date.Format('yyyy-MM') === new Date().Format('yyyy-MM')?'calendar_current':'']">
						<span class="calendar_date">{{index+1}}</span>
						<span class="calendar_quota">{{item.registeredNum}}/{{item.totalNum}}</span>
					</div>
				</li>
			</ul>
		</div>
		<el-dialog :title="form.title" :visible.sync="dialogFormVisible">
			<el-form :model="form">
				<div class="dialog_input">
					<span>早班</span>
					<span>已预约：{{form.detail[0].registeredNum}}</span>
					<el-form-item label="总号数" label-width="80px">
						<el-input type="number" v-model="form.detail[0].totalNum" auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div class="dialog_input">
					<span>晚班</span>
					<span>已预约：{{form.detail[1].registeredNum}}</span>
					<el-form-item label="总号数" label-width="80px">
						<el-input type="number" v-model="form.detail[1].totalNum" auto-complete="off"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogFormVisible = false">取 消</el-button>
				<el-button type="primary" @click="comfirm()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
import {DatePicker,Input,Button,Dialog,Form,FormItem,MessageBox} from 'element-ui'
import navBar from '@/components/nav.vue'
import axios from '../service/axios.js'
export default {
	components: {
		elDatePicker:DatePicker,
		elInput:Input,
		elButton:Button,
		elDialog:Dialog,
		elForm:Form,
  		elFormItem:FormItem,
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
			//月历
			daysArr:[],
			dayOfWeek:0,
			//当前日期
			currentDay:new Date().getDate(),
			//上午总号数
			morningTotal:5,
			form:{
				dateTime:'2017-12-29',
				detail:[{
					configId:'',
					configClass:100,
					registeredNum:0,
					totalNum:0
				},{
					configId:'',
					configClass:200,
					registeredNum:0,
					totalNum:0
				}],
			},
			dialogFormVisible: false,
		}
	},
	computed:{
		//每月首日的缩进宽度
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
		comfirm(){
			let totalNum1 = parseInt(this.form.detail[0].totalNum)
			let totalNum2 = parseInt(this.form.detail[1].totalNum)

			if (parseInt(this.form.detail[0].registeredNum) > parseInt(totalNum1) || parseInt(this.form.detail[1].registeredNum) > parseInt(totalNum2)) {
				MessageBox.alert('总号数不得少于已预约号数','提示',{
					type:'warning'
				})
				return false
			}
			let params = this.form.detail
			params[0].dateTime = this.form.dateTime
			params[1].dateTime = this.form.dateTime
			axios.post('numberConfig/updateTotalNumber.do',{
				updateDTOs:params
			}).then(({data})=>{
				if (data.success) {
					this.renderCalendar()
					this.dialogFormVisible = false
				}
				else{
					this.$message({
						showClose: true,
						message: data.errorMsg,
						type: 'error'
					})
				}
			})
		},
		//显示详细挂号信息弹窗
		getDayQuota(i,obj){
			this.dialogFormVisible = true
			this.form = JSON.parse(JSON.stringify(obj))
		},
		//获取月日历
		renderCalendar(){

			//获取改月的第一天为星期几
			let firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1)
      		this.dayOfWeek = firstDay.getDay()
      		//获取该月的天数
			var d = new Date(this.date.getFullYear(),this.date.getMonth()+1,0).getDate()
			//清空上一次的面板
			this.daysArr = []	
			//生成月历面板	
			for(let i = 0; i < d; i++){
				//生成每天的空挂号信息
				let obj = {
					dateTime:new Date(this.date.getFullYear(), this.date.getMonth(), 1+i).Format('yyyy-MM-dd'),
					detail:[{
						configId:'',
						configClass:100,
						registeredNum:0,
						totalNum:0
					},{
						configId:'',
						configClass:200,
						registeredNum:0,
						totalNum:0
					}],
					registeredNum:0,
					totalNum:0
				} 
				this.daysArr.push(obj)
			}

      		axios.post('numberConfig/queryNumberConfig.do',{
      			queryDate:this.date.Format('yyyy-MM-dd'),
      			queryAllMonth:1
      		}).then(({data})=>{
      			let res = data.model
      			if (res) {	
	      			let len = res.length
	      			for(let i = 0; i < len; i++){
		      			this.daysArr.map((item,j,arr)=>{
		  					if (res[i].dateTime === item.dateTime) {
		  						//this.daysArr[j] = res[i]
		  						this.$set(this.daysArr,j,res[i])
		  					}
		  				})
	      			}
      			}
      			console.log(this.daysArr)
      		})
      		
		},
		//改变选择的月份
		handleDateChange(val){
			if (val) {
				
				this.renderCalendar()
			}
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
		justify-content:flex-start;
		li{
			width: 85px;
			text-align: center;
		}
	}
	.calendar_body{
		display: flex;
		flex-wrap:wrap;
		justify-content:flex-start;
		color:#666;
		.calendar_day{
			width: 50px;
			height: 50px;
			display: flex;
			flex-direction:column;
			justify-content:center;
			cursor: pointer;
			border-radius:5px;
			&:hover{
				border:2px solid $blue;
			}
			
		}
		.calendar_current{
			border:2px solid $blue;
			.calendar_date{
				color:$blue;
			}
		}
		li{
			width: 85px;
			//height: 85px;
			text-align: center;
			margin: 15px 0;
			display: flex;
			justify-content:center;
		}
		.calendar_date{
			font-size: 16px;
		}
		.calendar_quota{
			color:#aaa;
			font-size: 14px;
		}
	}
	.dialog_input{
		@extend %flex_justify;
		margin-bottom: 20px;
		.el-form-item{
			margin-bottom: 0;
		}
	}
	.el-dialog{
		width: 500px;
	}
	.el-dialog__header{
		padding: 15px 30px 15px;
		border-bottom: 1px solid #ccc;
	}

}	
.day_quota{
	@extend %flex_justify;
	margin-bottom: 20px;
	.el-input{
		width: 80px;
	}
}
</style>