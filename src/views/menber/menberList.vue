<template>
  <section class="member">
    <!--工具条-->
    <el-col :span="24" class="toolbar" style="margin-top:20px;padding-left:1%">
      <el-form :inline="true" :model="filters">
        <el-form-item>
          <el-input v-model="filters.searchUserName" placeholder="账号" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="filters.searchNick" placeholder="名称" size="small"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="getSearchDataList" size="small">查询</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <!--列表-->
    <template>
      <el-table :data="users" highlight-current-row v-loading="listLoading" style="width: 100%;">
        <el-table-column prop="userName" min-width="100" label="会员账号" >
        </el-table-column>
        <el-table-column prop="nickName" min-width="100" label="名称" >
        </el-table-column>
        <el-table-column prop="sex" min-width="60" label="性别" >
          <template slot-scope="scope">
              <span v-if="scope.row.sex === 1">男</span>
              <span v-else-if="scope.row.sex === 0">女</span>
              <span v-else >未知</span>
          </template>
        </el-table-column>
        <el-table-column prop="address" min-width="100" label="所属大区" >
        </el-table-column>
        <el-table-column prop="vip" min-width="100" label="会员等级" >
          <template slot-scope="scope">
            <span v-if="scope.row.vip === 4">钻石会员</span>
            <span v-if="scope.row.vip === 3">白金会员</span>
            <span v-if="scope.row.vip === 2">黄金会员</span>
            <span v-if="scope.row.vip === 1">白银会员</span>
            <span v-if="scope.row.vip === 0">普通会员</span>
          </template>
        </el-table-column>
        <el-table-column min-width="80" label="状态">
          <template slot-scope="scope">
            <div>
            <span v-if="scope.row.status === 1">正常</span>
            <span v-if="scope.row.status === 2">禁用</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" min-width="180" label="创建日期">
        </el-table-column>
        <el-table-column label="功能" min-width="320" >
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click.native="handleLocked(scope.row,'info')">会员编辑</el-button>
            <el-button size="mini" type="primary" @click.native="handleLocked(scope.row,'password')">修改密码</el-button>
            <el-button size="mini" type="danger" @click.native="handleLocked(scope.row,'delete')">会员禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <pagination :currentPage=this.currentPage :total=this.total :pageSize=this.pageSize :pageSizes=this.pageSizes  v-on:handleSizeChange="handleSizeChange" v-on:handleCurrentChange="handleCurrentChange" ></pagination>
    <reset-password :inputs="resetPassword"  v-on:resetPasswordFun="resetPasswordFun"></reset-password>
    <edit-user-info :inputs="editUserInfo"  v-on:editUserInfoFun="editUserInfoFun"></edit-user-info>
  </section>
</template>
<script>
  import menberApi from '@/api/menber'
  import Pagination from '@/views/components/Pagination.vue';
  import ResetPassword from './resetPassword.vue';
  import EditUserInfo from './editUserInfo.vue'
  export default {
    components: {
      Pagination,
      ResetPassword,
      EditUserInfo,
    },
    computed: {

    },
    data() {
      return {
        statusValue:'',
        filters: {
          searchUserName:'',
          searchNick:''
        },
        users: [],
        listLoading: false,
        total: 0,
        pages: 1,
        currentPage: 1,
        pageSize: 10,
        pageSizes: [5,10,20,50,100],
        recharge:{
            show:false,
            data:{}
        },
        resetPassword:{
          show:false,
          data:{}
        },
        editUserInfo:{
          show:false,
          data:{}
        },
        cashList:{
          show:false,
        }
      }
    },
    methods: {
      getSearchDataList() {
        this.getUsersHttp()
      },
      getUsersHttp(currentPage) {
        menberApi.getMenberList(
          {
            proxyUserName:this.filters.userName,
            searchUserName:this.filters.searchUserName,
            searchNick:this.filters.searchNick,
            pageNum: this.currentPage || 1,
            pageSize: this.pageSize || 10,
          }
        ).then(rst =>{
          if(rst.data && rst.data.list.length>0){
            this.users = rst.data.list;
            this.total = rst.data.total;
          }
        })
      },
      // 分页处理 - 改变 size
      handleSizeChange(size){
        this.pageSize = size;
        this.getUsersHttp();
      },
      // 分页处理 - 改变 currentPage
      handleCurrentChange(currentPage){
        this.currentPage = currentPage;
        this.getUsersHttp(currentPage);
      },
      handleLocked(data,type) {
        switch (type){
          case 'info':
            this.editUserInfo.show = true;
            this.editUserInfo.data = data;
            break;
          case 'password':
            this.resetPassword.show = true;
            this.resetPassword.data = data;
            break;
          case 'delete':
            this.deleteMenber(data);
            break;
          default:;
        }
      },
      resetPasswordFun(data) {
        menberApi.modifyMemberPwd({
          userName:data.userName,
          newPwd:data.newPwd
        }).then(rst=>{
          this.$notify({
            title: '成功',
            message: '密码修改成功',
            type: 'success'
          });
        }).catch((e)=>{
          this.$notify({
            title: '失败',
            message: e.msg,
            type: 'error'
          });
        });
        this.resetPassword.show = false;
      },
      editUserInfoFun(data) {
          let params = {
            userName:data.userName,
            nick:data.nick,
            dayWinLimit:data.dayWinLimit,
            minBet:data.minBet,
            maxBet:data.maxBet,
            hminBet:data.hminBet,
            hmaxBet:data.hmaxBet,
            dminBet:data.dminBet,
            dmaxBet:data.dmaxBet,
            showNotice:data.showNotice,
            showXm:data.showXm
          };
        menberApi.editMember(params).then(rst=>{
          this.$notify({
            title: '成功',
            message: '信息修改成功',
            type: 'success'
          });
          this.getUsersHttp();
        }).catch((e)=>{
          this.$notify({
            title: '失败',
            message: e.msg,
            type: 'error'
          });
        });
        this.editUserInfo.show = false;
      },
      deleteMenber(data){}
    },
    mounted() {

    },
    created() {
      this.getUsersHttp()
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss">
  .member{
    .el-button+.el-button{
      margin-left:0;
    }
    .el-button--mini{
      border-radius: 0;
    }
  }
</style>
