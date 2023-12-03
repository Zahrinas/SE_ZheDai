// pages/appeal_info_user/appeal_info_user.js
Page({

  /**
   * 页面的初始数据
   */
 // 此处数据为前端模拟数据 左边是申诉者 右边是被申诉者
  // 需要从后端或上级界面传参，得到两用户头像、昵称和申诉理由
  data: {
    plaintiffID: '',
    defendantID: '',
    plaintiffAvatar: '',
    defendantAvatar: '',
    plaintiffNickname: '申诉者',
    defendantNickname: '被申诉者',
    reason: '申诉理由'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(res) {
    var that = this;
    that.setData({
      orderID: res.id
    });
    // 通过订单ID获取两用户ID
    wx.request({
      url: 'http://localhost:8080/complaintlist/getbyid',
      data: {
        id: that.data.orderID,
      },
      success: function(res) {
        that.setData({
          plaintiffID: res.data[0].plaintiff,
          defendantID: res.data[0].defendant,
          reason: res.data[0].reason
        });
        console.log(that.data);
        // 通过用户ID获取昵称头像
        wx.request({
          url: 'http://localhost:8080/user/query',
          data: {
            id: that.data.plaintiffID,
          },
          success: function(res) {
            that.setData({
              plaintiffAvatar: res.data[0].avatar,
              plaintiffNickname: res.data[0].nickname
            });
            wx.request({
              url: 'http://localhost:8080/user/query',
              data: {
                id: that.data.defendantID,
              },
              success: function(res) {
                that.setData({
                  defendantAvatar: res.data[0].avatar,
                  defendantNickname: res.data[0].nickname
                });
              }
            });
          }
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})