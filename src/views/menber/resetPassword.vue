
<template>
  <el-dialog :title="title" :visible.sync="inputs.show" :close-on-click-modal="false" @open="onOpen" custom-class="resetPasswordDialog">
    <el-form :model="addForm"  ref="addForm" >
      <el-row style="margin-bottom:15px;">
        <el-col :span="12">
          <span style="width: 87px;display: inline-block;text-align: right;">会员账号:</span>&nbsp;&nbsp;
          <span v-text="inputs.data.userName"></span>
        </el-col>
        <el-col :span="12">
          <span>会员姓名:</span>
          <span v-text="inputs.data.nick"></span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="新密码:" labelWidth="100px">
            <el-input v-model="addForm.pwd" placeholder="请填写密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="确认新密码:" labelWidth="100px">
            <el-input v-model="addForm.newPwd" placeholder="请填写密码"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click.native="inputs.show = false">取消</el-button>
      <el-button type="primary" @click.native="submitAddForm">提交</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    props: ['inputs'],
    components: {

    },
    computed: {

    },
    data() {
      return {
        title:'修改密码',
        addForm:{
          pwd:'',
          newPwd:'',
          userName:''
        }
      }
    },
    methods: {
      onOpen(){
        this.addForm.pwd = '';
        this.addForm.newPwd = '';
      },
      submitAddForm() {
        this.addForm.userName = this.inputs.data.userName;
        if(this.addForm.pwd && this.addForm.newPwd) {
            if(this.addForm.pwd === this.addForm.newPwd) {
              this.$emit('resetPasswordFun', this.addForm);
            }else{
              this.$notify({
                title: '警告',
                message: '两次输入的密码不一致',
                type: 'error'
              });
            }
        }else{
          this.$notify({
            title: '警告',
            message: '密码不能为空',
            type: 'error'
          });
        }
      }
    },
    mounted() {

    },
    created() {

    },
    watch: {
      inputs: {
        deep: true,
        handler(value){
          if(value){
            // this.title = `修改密码  ${value.data.nick}(${value.data.userName})`
          }
        }
      }
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
