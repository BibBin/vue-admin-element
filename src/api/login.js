import Http from '@/utils/http'
export function loginByUsername(userName, password) {
  const data = {
    userName,
    password
  }
  return Http.post('/post/login',data)
}

export function logout() {
  return Http.get('/proxy/quit')
}

export function getUserInfo() {
  return Http.get('/proxy/account')
}

export function  modifyPwd(data) {
  return Http.post('/proxy/modifyPwd',data)
}

