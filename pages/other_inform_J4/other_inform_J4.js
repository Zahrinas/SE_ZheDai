// pages/self_inform_J2/self_inform_J2.js
Page({

  /**
   * Page initial data
   */
  data: {
      id: '1', //string类 用户id
      nickname: 'null', //string类 用户昵称
      school: 'null', //string类 校区信息
      vx: 'null', //string类 联系方式
      avatar: 'url'//string类，为用户头像url地址
  },
  EditClick: function(){

    wx.navigateTo({
      url: "../chat_l3/chat_l3?id="+this.data.id
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var that = this
    that.setData({
      id: options.id
    })
    console.log(that.data.id)
    wx.request({
      url: 'http://localhost:8080/user/query',
      data:{
        id: that.data.id
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          // 这里后端的info是个数组
          nickname: res.data[0].nickname,
          school: res.data[0].school,
          vx: res.data[0].vx,
          avatar: res.data[0].avatar
        })
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