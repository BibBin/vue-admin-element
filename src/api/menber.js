import Http from '@/utils/http'
class menberApi {

  getMenberList(data) {
    return Http.get('/get/member_list',data)
  }

  modifyMemberPwd(data) {
    return Http.post('/member/modifyMemberPwd',data)
  }

  editMember(data) {
    return Http.post('/member/editMember',data)
  }

  updateStatus(data) {
    return Http.post('/member/updateStatus',data)
  }

  addMember(data) {
    return Http.post('/member/addMember',data)
  }

  checkUserName(data) {
    return Http.get('/member/checkUserName',data)
  }

  rechargeAndWithdraw(data) {
    return Http.post('/member/rechargeAndWithdraw',data)
  }

  settleAccounts(data) {
    return Http.post('/member/settleAccounts',data)
  }

  deletedList(data) {
    return Http.get('/member/deletedList',data)
  }

}

export default new menberApi();
