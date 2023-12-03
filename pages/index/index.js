// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    motto: '浙带',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: true
  },
  // 事件处理函数
  bindViewTap() {
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        if (res.userInfo) {
          // 将用户信息存入本地缓存
          wx.setStorageSync('userInfo', res.userInfo)
          console.log(res.userInfo)
          // 请求后端插入新用户信息
          // 判断是否存在该id，不存在则insert，存在则update（如头像可能更改）
          wx.request({
            url: 'http://localhost:8080/user/login',
            data:{
              // 用wx昵称作为用户数据库的id
              id: res.userInfo.nickName,
              avatar: res.userInfo.avatarUrl
            },
            success: function(res) {
              console.log('插入成功')
            }
          });
        } else {
          // 用户信息不存在
          console.log('用户信息不存在')
        }
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        // 为防止异步，在获取信息后再跳转页面
        wx.switchTab({
          url: '../receive_order_s1/receive_order_s1'
        })
      },
      fail: (error) => {
        console.log(error)
      }
    })
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  }
})
