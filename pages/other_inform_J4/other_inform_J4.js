// pages/self_inform_J2/self_inform_J2.js
Page({

  /**
   * Page initial data
   */
  data: {
    info: {
      id: '1', //string类 用户id
      nickname: 'null', //string类 用户昵称
      school: 'null', //string类 校区信息
      vx: 'null', //string类 联系方式
      avatar: 'url'//string类，为用户头像url地址
   }
  },
  EditClick: function(){
    wx.navigateTo({
      url: "../chat_l3/chat_l3"
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
/*
  *这是设想的对后端的请求
  /////////////////////////////

  var that = this;
  wx.request({
    url: 'https://我们的后端域名',
    success: function(res) {
      that.setData({
        info: res.data
      });
    }
  });

  /////////////////////////////
  */
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