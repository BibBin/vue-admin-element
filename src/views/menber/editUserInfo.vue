<template>
  <el-dialog title="修改信息" :visible.sync="inputs.show" :close-on-click-modal="false" @open="onOpen" custom-class="menberEditDialog" top="5%">
    <el-form :model="dialogForm" :rules="dialogFormRules" ref="editFormDialog" label-position="right" size="small">
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="min-device-padding">
          <el-form-item label="会员账号:" prop="userName" label-width="90px">
            <el-input v-model="dialogForm.userName" placeholder="会员账号" :disabled=true></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="min-device-padding">
          <el-form-item label="会员名称:" prop="nickName" label-width="90px">
            <el-input v-model="dialogForm.nickName" placeholder="名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="min-device-padding">
          <el-form-item label="会员等级:" prop="vip" label-width="90px">
            <el-select v-model="dialogForm.vip" placeholder="会员等级">
              <el-option
                v-for="item in vips"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                {{item.label}}
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="会员性别:" prop="sex" label-width="90px">
            <el-select v-model="dialogForm.sex" placeholder="会员性别">
              <el-option
                v-for="item in sexs"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                {{item.label}}
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12" class="min-device-padding">
          <el-form-item label="所属大区:" prop="address" label-width="90px">
            <el-input v-model="dialogForm.address" placeholder="所属大区"></el-input>
          </el-form-item>
        </el-col>
        <el-col :xs="24" :sm="12" :md="12" :lg="12" :xl="12">
          <el-form-item label="会员状态:" prop="vip" label-width="90px">
            <el-select v-model="dialogForm.status" placeholder="会员状态" :disabled=true>
              <el-option
                label="正常"
                :value="1">
                    正常
              </el-option>
              <el-option
                label="禁用"
                :value="2">
                禁用
              </el-option>
            </el-select>
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
        dialogForm:{
          userName:'',
          nickName:'',
          sex:'',
          address:'',
          vip:'',
          status:'',
          create_time:''
        },
        dialogFormRules:{
          nickName: [
            {required: true, message: '请输入名称', trigger: 'blur'}
          ],
        },
        vips:[
          {label:'普通会员',value:0},
          {label:'白银会员',value:1},
          {label:'黄金会员',value:2},
          {label:'白金会员',value:3},
          {label:'钻石会员',value:4}
        ],
        sexs:[
          {label:'女',value:0},
          {label:'男',value:1},
        ]
      }
    },
    methods: {
      onOpen() {
        Object.assign(this.dialogForm, this.inputs.data);
      },
      submitAddForm() {
        this.$refs['editFormDialog'].validate((valid) => {
          if (valid) {
            this.$emit('editUserInfoFun', this.dialogForm);
          }
        });
      }
    },
    mounted() {

    },
    created() {

    }
  }
</script>
<style rel="stylesheet/scss" scoped lang="scss">
  .menberEditDialog{
    padding-bottom:0 ;
    max-width: 500px;
    width:95%;
  }
  .min-device-padding{
    padding-right:10px;
  }
  @media (max-width: 768px){
    .min-device-padding{
      padding-right:0;
    }
  }
</style>
