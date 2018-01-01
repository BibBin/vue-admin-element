
<template>
  <el-dialog title="修改密码" :visible.sync="inputs.show" :close-on-click-modal="false" @open="onOpen" custom-class="resetPasswordDialog">
    <el-form :model="addForm" ref="addForm">
      <el-row>
        <el-col :span="24">
          <el-form-item label="旧密码：">
            <el-input v-model="addForm.oldPwd" placeholder="请填写密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="确认密码：">
            <el-input v-model="addForm.newPwd" placeholder="请填写密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="inputs.show = false">取消</el-button>
      <el-button type="primary" @click="submitForm('ruleForms')">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
  import { modifyPwd } from '@/api/login'
  export default {
    props: ['inputs'],
    components: {

    },
    computed: {

    },
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入旧密码'));
        } else {
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入新密码'));
        } else {
          callback();
        }
      };
      return {
        addForm:{
          oldPwd:'',
          newPwd:'',
        },
      }
    },
    methods: {
      onOpen(){
        this.addForm.oldPwd = '';
        this.addForm.newPwd = '';
      },
      submitForm(formName) {
          if(this.addForm.oldPwd && this.addForm.newPwd){
            modifyPwd(this.addForm).then(rst=>{
              this.$store.dispatch('LogOut').then(() => {
                this.$notify({
                  title: '温馨提示',
                  duration:2000,
                  message:'修改成功，重新登陆！',
                  type: 'success'
                });
                this.inputs.show = false;
                setTimeout(function(){ location.reload(); }, 3000);
                // location.reload()// 为了重新实例化vue-router对象 避免bug
              })
            })
          }else {
            this.$message({
              type: 'error',
              message: '请输入密码'
            });
          }
      },
    },
    mounted() {

    },
    created() {

    }
  }
</script>
<style lang="scss">
  .resetPasswordDialog{
    padding-bottom:0 ;
    max-width: 450px;
    width:95%;
  }
</style>
