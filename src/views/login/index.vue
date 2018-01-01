<template>
  <div class="login-container">
    <el-form class="card-box login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">后台管理系统登录</h3>
      <el-form-item prop="userName">
        <el-input name="userName" type="text" v-model="loginForm.userName" autoComplete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
          placeholder="密码" />
      </el-form-item>

      <el-button type="primary" style="width:100%;margin-bottom:30px;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>

      <div class='tips'>账号:admin 密码:111</div>

    </el-form>

  </div>
</template>

<script>
export default {
  components: {},
  name: 'login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      loginRules: {
        userName: [
          { required: true,message: '请输入用户名', trigger: 'blur'},
          {pattern: /^admin/, message: '用户名不正确', trigger: 'blur'}],
        password: [
          { required: true,message: '请输入密码', trigger: 'blur' },
          {pattern: /^111/, message: '密码不正确', trigger: 'blur'},
          ]
      },
      loading: false,
    }
  },
  methods: {
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
         this.loading = true
          this.$store.dispatch('LoginByUsername', this.loginForm).then((rst) => {
            this.loading = false
            this.$router.push({ path: '/' })
          }).catch((e) => {
            this.$notify({
              title: '温馨提示',
              duration:2000,
              message:e.msg,
              type: 'warning'
            });
            this.loading = false
          })
        } else {
          return false
        }
      })
    }
  },
  created() {},
  destroyed() {}
}
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    @include relative;
    height: 100vh;
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
      -webkit-text-fill-color: #fff !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      position: absolute;
      left: 50%;
      top: 50%;
      width: 400px;
      padding: 35px 35px 15px 35px;
      border-radius: 4px;
      transform: translate(-50%, -50%);
      -webkit-transform: translate(-50%, -50%);
      -moz-transform: translate(-50%, -50%);
      -ms-transform: translate(-50%, -50%);
      -o-transform: translate(-50%, -50%);
      background-color: $bg;
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
</style>
