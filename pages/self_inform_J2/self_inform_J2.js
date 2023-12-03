// pages/self_inform_J2/self_inform_J2.js
Page({

  /**
   * Page initial data
   */
  data: {
    info:
    {
      id: '1', //string类 用户id
      nickname: '', //string类 用户昵称
      school: '', //string类 校区信息
      vx: '', //string类 联系方式
      avatar: 'url'//string类，为用户头像url地址
    }
  },
  EditClick: function(){
    wx.navigateTo({
      url: "../edit_inform_J3/edit_inform_J3"
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
  var that = this
  const userInfo = wx.getStorageSync('userInfo')
  wx.request({
    url: 'http://localhost:8080/user/query',
    data:{
      id: userInfo.nickName,
    },
    success: function(res) {
      console.log(res.data)
      that.setData({
        // 这里后端的info是个数组
        info: res.data[0]
      });
    }
  });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {
    var that = this
    const userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: 'http://localhost:8080/user/query',
      data:{
        id: userInfo.nickName,
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          // 这里后端的info是个数组
          info: res.data[0]
        });
      }
    });
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {
    var that = this
    const userInfo = wx.getStorageSync('userInfo')
    wx.request({
      url: 'http://localhost:8080/user/query',
      data:{
        id: userInfo.nickName,
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          // 这里后端的info是个数组
          info: res.data[0]
        });
      }
    });
  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})