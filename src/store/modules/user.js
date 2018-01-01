import { loginByUsername, logout } from '@/api/login'
import $vx from '@/utils/vx';
const user = {
  state: {
    token: $vx.localStorage.getItem('token'),
    userInfo:$vx.localStorage.getItem('user_info'),
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
  },

  actions: {
    // 用户名登录
    LoginByUsername({ commit }, userInfo) {
      const userName = userInfo.userName.trim()
      return new Promise((resolve, reject) => {
        loginByUsername(userName, userInfo.password).then(rst => {
          let data = rst.data
          $vx.localStorage.setItem('token',data.token);
          $vx.localStorage.setItem('user_info',data.userInfo);
          commit('SET_TOKEN', data.token)
          commit('SET_USER_INFO', data.userInfo)
          resolve()
        }).catch(e => {
          reject(e)
        })
      })
    },
    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          $vx.localStorage.removeItem('token');
          $vx.localStorage.removeItem('user_info');
          commit('SET_TOKEN', '')
          commit('SET_USER_INFO', [])
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default user
