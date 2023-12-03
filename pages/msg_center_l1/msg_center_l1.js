// msg_center_l1.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    id: '',
    identity: ''
  },
  onReady() {
    // 设置导航栏标题
    wx.setNavigationBarTitle({title:'消息中心'});
  },
  // 跳转至历史订单界面
  OrderHistoryClick: function() {
    wx.navigateTo({
      url: "../receive_order_s3/receive_order_s3"
    })
  },
  // 跳转至聊天列表界面
  ChatListClick: function () {
    wx.navigateTo({
      url: "../chat_list_l2/chat_list_l2"
    })
  },
  // 跳转至举报申诉界面
  AppealClick: function () {
    /*var that = this
    console.log(that.data.id)
    wx.request({
      url: 'http://localhost:8080/adm/query',
      data: {
        id: that.data.id
      },
      success: function(res) {
        console.log(res.identity)
          that.setData({
          identity: res.identity
        })
      }
    })*/
    wx.navigateTo({
      // 跳转至举报申诉一级界面
      url: "../complaint_list/complaint_list_user"
    })
  },

  onLoad() {
    // 从本地缓存获取用户ID（userInfo.nickName）
    var that = this;
    const userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    that.setData({
      id: userInfo.nickName
    })
  }
})
