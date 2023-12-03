// pages/appeal_info/appeal_info.js
Page({

  /**
   * 页面的初始数据
   */
  // 此处数据为前端模拟数据 左边是申诉者 右边是被申诉者
  // 需要从后端或上级界面传参，得到两用户头像、昵称和申诉理由
  data: {
    orderID: '',
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
    // 设置导航栏标题
    wx.setNavigationBarTitle({title:'申诉详情'});
  },
  // 跳转至两用户的聊天界面
  goToChat: function(event) {
    var that = this
    // 将两用户ID传参给下级界面
    const item = {
      plaintiffID: that.data.plaintiffID,
      defendantID: that.data.defendantID
    };
    console.log(item);
    const params = encodeURIComponent(JSON.stringify(item));
    wx.navigateTo({
      url: '/pages/appeal_chat/appeal_chat?chatData=' + params
    });
  },
  // 申诉设置为有效，数据传回后端
  setValid: function() {
    var that = this
    wx.request({
      url: 'http://localhost:8080/complaintlist/update',
      data: {
        id: that.data.orderID,
        valid: 'valid'
      },
      success: function() {
        console.log('成功设置')
        wx.navigateBack({
          delta: 1
        });
      }
    })
  },
  // 申诉设置为无效，数据传回后端
  setInvalid: function() {
    var that = this
    wx.request({
      url: 'http://localhost:8080/complaintlist/update',
      data: {
        id: that.data.orderID,
        valid: 'invalid'
      },
      success: function() {
        console.log('成功设置')
        wx.navigateBack({
          delta: 1
        });
      }
    })
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
