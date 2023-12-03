// pages/appeal_chat.js
Page({

  /**
   * 页面的初始数据
   */
  // 前端模拟数据，实际应通过sendID和receiveID从后端获取
  data: {
    plaintiffID: '',
    defendantID: '',
    messageList: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 接收从申诉详情界面传来的参数，申诉者ID和被申诉者ID
    if (options.chatData) {
      const chatData = JSON.parse(decodeURIComponent(options.chatData));
      this.setData({
        plaintiffID: chatData.plaintiffID,
        defendantID: chatData.defendantID
      });
    }
    console.log(this.data.plaintiffID)
    console.log(this.data.defendantID)
    // 把申诉者和被申诉者的ID发给后端，后端返回聊天记录
    var that = this
    wx.request({
      url: 'http://localhost:8080/messagelist/search',
      data: {
        sendId: that.data.plaintiffID, // string类 (当前用户id)发送者id
        receiveId: that.data.defendantID // string类 接收者id
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          messageList: res.data
        })
      }
    });
    console.log(that.data.messageList)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 设置导航栏标题
    wx.setNavigationBarTitle({title:'申诉用户聊天记录'});
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