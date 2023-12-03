// pages/chat_list_l2/chat_list_l2.js
Page({
  data: {
    // 此处收发ID还应该从上级界面传参，此处用1,2模拟
    userId: 1,
    chatList: []
  },
  onLoad() {
    /* 后端：在此处获取聊天列表chatList
      * 包括头像avatar昵称nickname上次消息时间time最后一次消息lastMsg */
    // 从本地缓存获取用户ID（userInfo.nickName）
    var that = this;
    const userInfo = wx.getStorageSync('userInfo')
    console.log(userInfo)
    that.setData({
      userId: userInfo.nickName
    })
    // 请求后端
    wx.request({
      url: 'http://localhost:8080/chatlist/search',
      data:{
        sendId: that.data.userId
      },
      success: function(chat) {
        that.setData({
          chatList: chat.data
        });
      }
    });

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
  // 此处传参，通过收发ID唯一确定一个聊天记录
  onItemClick: function (event) {
    // console.log(event);
    const item = {
      sendId: event.currentTarget.dataset.chatItem.sendId,
      receiveId: event.currentTarget.dataset.chatItem.receiveId
    };
    // console.log(item);
    const params = encodeURIComponent(JSON.stringify(item));
    wx.navigateTo({
      url: '/pages/chat_l3/chat_l3?chatData=' + params
    });
  }  
});