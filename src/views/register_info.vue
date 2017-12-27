<template>
	<div class="register_info">
		<div class="filter_options">
			<div>
				<span>时间：</span>
				<el-date-picker v-model="date" type="date" placeholder="选择日期"></el-date-picker>
				<el-select class="recordClass" v-model="recordClass" placeholder="请选择">
					<el-option v-for="item in recordClassOptions" :key="item.value" :label="item.label" :value="item.value">
					</el-option>
				</el-select>
			</div>
			<div>
				<span>预约电话：</span>
				<el-input v-model="phone" placeholder="请输入预约电话"></el-input>
			</div>
			<el-button class="search_btn" type="primary">搜索</el-button>
		</div>
		<div class="table_container">	
			<el-table stripe :data="tableData" border style="width: 100%">
				<el-table-column prop="registerNumber" label="号码" width="60">
			    </el-table-column>
			    <el-table-column prop="contactName" label="姓名" >
			    </el-table-column>
			    <el-table-column prop="sex" label="性别" width="50">
			    </el-table-column>
			    <el-table-column prop="contactMobile" label="电话">
			    </el-table-column>
			    <el-table-column prop="contactAddress" label="地址" min-width="180">
			    </el-table-column>
			    <el-table-column prop="registrationFee" label="挂号费">
			    </el-table-column>
			    <el-table-column prop="contactMobile" label="电话">
			    </el-table-column>
		  	</el-table>
		  	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
			</el-pagination>
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
			date:'',
			recordClassOptions: [{
				value: 100,
				label: '早班'
			}, {
				value: 200,
				label: '晚班'
			}],
			recordClass:100,
			phone:'',
			//表格数据
	        tableData: [{
	          recordId:2,
	          sex:0,
	          contactMobile:'13544500999',
	          contactName: '王小虎',
	          contactAddress: '上海市普陀区金沙江路 1518 弄',
	          registerNumber:5,
	          registrationFee:99
	        },{
	          recordId:2,
	          sex:0,
	          contactMobile:'13544500999',
	          contactName: '王小虎',
	          contactAddress: '上海市普陀区金沙江路 1518 弄',
	          registerNumber:5,
	          registrationFee:99
	        },{
	          recordId:2,
	          sex:0,
	          contactMobile:'13544500999',
	          contactName: '王小虎',
	          contactAddress: '上海市普陀区金沙江路 1518 弄',
	          registerNumber:5,
	          registrationFee:99
	        },{
	          recordId:2,
	          sex:0,
	          contactMobile:'13544500999',
	          contactName: '王小虎',
	          contactAddress: '上海市普陀区金沙江路 1518 弄',
	          registerNumber:5,
	          registrationFee:99
	        }],
	        //分页数据
	        pageSize:10,
	        currentPage:1,
	        totalCount:200
		}
	},
	methods:{
		handleSizeChange(val) {
			console.log(val)
		},
		handleCurrentChange(val) {
			console.log(val)
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
		.el-input{
			width: 140px;
		}
	}
	.table_container{
		margin-top: 50px;
	}
	.el-pagination{
		margin-top: 40px;
	}
}	

</style>