// pages/chat_list_l2/chat_list_l2.js
Page({
  data: {
    chatList: [] // 初始化为空数组
  },
  onLoad() {
    /* 后端：在此处获取聊天列表chatList
     * 包括头像avatar昵称nickname上次消息时间time最后一次消息lastMsg
     * 此处为前端模拟数据，实际应调用后端接口获取数据 */
    const chatList = [
      {
        id: 1,
        sendId :1,
        receiveId: 2,
        avatar: '../../static/img/avatar2.jpg',
        nickname: '尹建伟',
        lastMsg: '你好',
        time: '昨天'
      }
    ]
    this.setData({ chatList }) // 将初始数据设置为上述模拟数据

    /*
  *这是设想的对后端的请求
  /////////////////////////////

  var that = this;
  wx.request({
    url: 'https://我们的后端域名',
    success: function(chat) {
      that.setData({
        chatList: chat.data
      });
    }
  });

  /////////////////////////////
  */
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // 设置导航栏标题
    wx.setNavigationBarTitle({title:'聊天列表'});
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

  },

  onItemClick: function (event) {
    //console.log(event);
    const item = {
      sendId: event.currentTarget.dataset.chatItem.sendId,
      receiveId: event.currentTarget.dataset.chatItem.receiveId
    };
    //console.log(item);
    const params = encodeURIComponent(JSON.stringify(item));
    wx.navigateTo({
      url: '/pages/chat_l3/chat_l3?chatData=' + params
    });
  }  
});