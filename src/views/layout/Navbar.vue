<template>
  <div>
	<el-menu class="navbar" mode="horizontal">
		<hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
		<levelbar></levelbar>
		<tabs-view></tabs-view>
		<el-dropdown class="avatar-container" trigger="click">
			<div class="avatar-wrapper">
				<!--<img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">-->
        <span v-text="nickName"></span>
				<i class="el-icon-caret-bottom"></i>
			</div>
			<el-dropdown-menu class="user-dropdown" slot="dropdown" style="font-size: 13px;">
				<router-link class='inlineBlock' to="/">
					<el-dropdown-item>
            首页
					</el-dropdown-item>
				</router-link>
        <!--<el-dropdown-item @click.native="resetPasswordFun">-->
          <!--修改密码-->
        <!--</el-dropdown-item>-->
				<el-dropdown-item divided>
          <span @click="logout">退出登录</span>
        </el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</el-menu>
  <reset-password :inputs="sign"></reset-password>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Levelbar from './Levelbar'
import TabsView from './TabsView'
import Hamburger from 'components/Hamburger'
import resetPassword from '@/views/components/resetPassword.vue'
export default {
  components: {
    Levelbar,
    TabsView,
    Hamburger,
    resetPassword
  },
  data() {
    return {
      nickName:'',
      sign:{
        show:false,
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// 为了重新实例化vue-router对象 避免bug
      })
    },
    IsPC() {
      var userAgentInfo = navigator.userAgent
      var Agents = new Array('Android', 'iPhone', 'SymbianOS','Windows Phone', 'iPad', 'iPod')
      var flag = true
      for (var v = 0; v < Agents.length; v++) {
        if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; }
      }
      return flag
    },
    resetPasswordFun() {
        this.sign.show =true;
    }
  },
  mounted() {
      this.nickName = this.$store.getters.getUserInfo.nickName;
      if (!this.IsPC()) {
        if (this.sidebar.opened) {
            this.toggleSideBar()
        }
      }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.navbar {
			height: 50px;
			line-height: 50px;
			border-radius: 0px !important;
			.hamburger-container {
					line-height: 58px;
					height: 50px;
					float: left;
					padding: 0 10px;
			}
			.errLog-container {
					display: inline-block;
					position: absolute;
					right: 150px;
			}
			.screenfull {
					position: absolute;
					right: 90px;
					top: 16px;
					color: red;
			}
			.avatar-container {
					height: 50px;
					display: inline-block;
					position: absolute;
					right: 35px;
					.avatar-wrapper {
							cursor: pointer;
							margin-top: 5px;
							position: relative;
							.user-avatar {
									width: 40px;
									height: 40px;
									border-radius: 10px;
							}
							.el-icon-caret-bottom {
									position: absolute;
									right: -20px;
									top: 20px;
									font-size: 12px;
							}
					}
			}
	}
</style>



