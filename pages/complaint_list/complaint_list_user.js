Page({

  /**
   * 页面的初始数据
   */
  data: {
    /*
    complaintList:[
      {
        id: 申诉对应的订单id,//string类
        plaintiff：申诉者id,//string类
        defendant：被申诉人id,//string类
        posterAvatarUrl: 发布者头像的url,//string类
        riderAvatarUrl：骑手头像的url,//string类
        reason:申诉理由，//string类
        valid:申诉状况//string类，分'valid' 'invalid' 'waiting'三个值
      },
      ...
    ],
    */
    complaintList:[],
    myId: '114514',
    isAdmin: 'user'

  },
  
  onLoad(options) {

  var that = this;
  const userInfo = wx.getStorageSync('userInfo');
  that.setData({
          myId: userInfo.nickName
  })

  wx.request({
    url: 'http://localhost:8080/adm/query',
    data: {
      id: that.data.myId,
    },
    success: function (res) {
      that.setData({
        isAdmin: res.data.identity
      });
      console.log(res);
      console.log(that.data.isAdmin)
  
      if (that.data.isAdmin == 'admin') {
        wx.request({
          url: 'http://localhost:8080/complaintlist/search',
          data: {
            id: that.data.myId,
          },
          success: function (res) {
            that.setData({
              complaintList: res.data
            });
            console.log(res);
          },
  
          fail: function (res) {
            console.log('!');
          }
  
        });
      } 
      else {
        wx.request({
          url: 'http://localhost:8080/complaintlist/id',
          data: {
            id: that.data.myId,
          },
          success: function (res) {
            that.setData({
              complaintList: res.data
            });
            console.log(res);
            console.log(that.data.myId)
            console.log(that.data.complaintList)
          },
  
          fail: function (res) {
            console.log('!');
          }
  
        });
      }
    },
    fail: function (res) {
      console.log('!');
    }
  });
  
},

  navigateToAppealInfo: function(event) {
    const id = event.currentTarget.dataset.id;
    const isAdmin = this.data.isAdmin;
    if (isAdmin === 'user') {
      wx.navigateTo({
        url: '/pages/appeal_info_user/appeal_info_user?id=' + id,
      });
    } else if (isAdmin === 'admin') {
      wx.navigateTo({
        url: '/pages/appeal_info/appeal_info?id=' + id,
      });
    }
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
