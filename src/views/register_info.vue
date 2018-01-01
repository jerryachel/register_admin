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
				<el-input type="number" v-model="phone" placeholder="请输入预约电话"></el-input>
			</div>
			<el-button @click="getList" class="search_btn" type="primary">搜索</el-button>
		</div>
		<div class="table_container">	
			<el-table stripe :data="tableData" border style="width: 100%">
				<el-table-column prop="registerNumber" label="号码" width="60">
			    </el-table-column>
			    <el-table-column prop="contactName" label="姓名" >
			    </el-table-column>
			    <el-table-column label="性别" width="50">
			    	<template slot-scope="scope">
			    		<span>{{scope.row.sex?'女':'男'}}</span>
			    	</template>
			    </el-table-column>
			    <el-table-column prop="contactMobile" label="电话">
			    </el-table-column>
			    <el-table-column prop="contactAddress" label="地址" min-width="180">
			    </el-table-column>
			    <el-table-column prop="registrationFee" label="挂号费" width="100">
			    </el-table-column>
			    <el-table-column label="操作" width="100">
			    	<template slot-scope="scope">
			    		<el-button v-if="scope.row.state == 0" @click.native="handleEdit(scope.$index, scope.row)" size="mini" plain type="primary">就诊</el-button>
			    		<el-button v-else size="mini" disabled plain type="info">已就诊</el-button>
			    	</template>
			    </el-table-column>
		  	</el-table>
		  	<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
			</el-pagination>
		</div>
	</div>
</template>
<script>
import {DatePicker,Select,Option,Input,Button,Table,TableColumn,Pagination,MessageBox} from 'element-ui'
import navBar from '@/components/nav.vue'
import axios from '../service/axios.js'
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
			recordClass:new Date().getHours() <  14 ? 100 : 200,
			phone:'',
			//表格数据
	        tableData: [],
	        //分页数据
	        pageSize:10,
	        currentPage:1,
	        totalCount:0
		}
	},
	created(){
		this.getList()
	},
	methods:{
		handleSizeChange(val) {
			console.log(val)
			this.getList()
		},
		handleCurrentChange(val) {
			console.log(val)
			this.getList()
		},
		handleEdit(index, row) {
	        MessageBox.confirm(`确定要为 ${row.contactName} 就诊吗？`,'提示',{
	        	confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning'
	        }).then(()=>{
	        	console.log(this)
		        this.comfirmVisit(row)
	        }).catch(()=>{
	        	console.log('cancel visit')
	        })
	    },
	    comfirmVisit(row){
	    	axios.get('clinicNumberRecord/updateStateByRecordId.do',{
	    		params:{
	    			recordId:parseInt(row.recordId)
	    		}
		    }).then(({data})=>{
		    	if (data.success) {
		    		this.$message({
		    			showClose: true,
						message: '就诊成功',
						type: 'success'
		    		})
		    		this.getList()
		    	}else{
		    		this.$message({
						showClose: true,
						message: data.errorMsg,
						type: 'error'
				    })
		    	}
		    })
	    },
		getList(){
			axios.get('clinicNumberRecord/queryList.do',{
				params:{
					recordTime:this.date.Format('yyyy-MM-dd'),
					recordClass:this.recordClass,
					contactMobile:this.phone,
					pageIndex:this.currentPage-1,
					pageSize:this.pageSize
				}
			}).then(({data})=>{
				if (data.success) {
					let res = data.model
					this.tableData = res.recordDTOS
					this.totalCount = res.totalRecord
				}
			})
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
			width: 150px;
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