<template>
	<div class="password">
		<el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="150px" class="demo-ruleForm password_form">
		  <el-form-item label="请输入新密码：" prop="pass">
		    <el-input type="password" v-model="ruleForm.pass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item label="请重复新密码：" prop="checkPass">
		    <el-input type="password" v-model="ruleForm.checkPass" auto-complete="off"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
		    <el-button @click="resetForm('ruleForm')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>
</template>
<script>
import {Input,Button,Form,FormItem} from 'element-ui'
  export default {
  	components: {
  		elForm:Form,
  		elFormItem:FormItem,
  		elInput:Input,
  		elButton:Button
	},
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          checkPass: ''
        },
        rules2: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }
</script>
<style lang="scss" >
@import '../assets/css/index.scss';
.password{
	.password_form{
		width: 350px;
	}
}	
</style>