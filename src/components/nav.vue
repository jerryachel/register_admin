<template>
	<div class="nav_bar">
		<span>当前位置：</span>
		<el-breadcrumb class="app-levelbar" separator=">">
			<el-breadcrumb-item v-for="(item,index)  in levelList" :key="index">
				<router-link v-if='item.redirect==="noredirect"||index==levelList.length-1' to="" class="no-redirect">{{item.name}}</router-link>
				<router-link v-else :to="item.path">{{item.name}}</router-link>
			</el-breadcrumb-item>
		</el-breadcrumb>
	</div>

</template>
<script>
import { Breadcrumb, BreadcrumbItem }from 'element-ui'
	export default {
		components: {
			elBreadcrumb:Breadcrumb,
			elBreadcrumbItem:BreadcrumbItem,
		},
		data(){
			return {
				levelList:null
			}
		},
		methods:{
			getBreadcrumb() {
				let matched = this.$route.matched.filter(item => item.name);
				const first = matched[0];
				/*if (first && (first.name !== '首页' || first.path !== '')) {
				matched = [{ name: '当前位置', path: '/' }].concat(matched)
				}*/
				this.levelList = matched;
			},
		},
		watch: {
	        $route() {
	          this.getBreadcrumb();
	        }
      	},
		created() {
			this.getBreadcrumb()
		},
	}

</script>
<style>
.nav_bar{
	display: flex;
	-ms-align-items: center;
	align-items: center;
	font-size: 13px;
	margin-bottom: 20px;
}
.sidebar .el-submenu .el-menu-item{
	min-width: auto;
}
.sidebar .el-submenu .el-menu{
	overflow: hidden;
}
</style>
