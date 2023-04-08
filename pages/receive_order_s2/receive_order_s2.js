// pages/receive_order_s2/receive_order_s2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderList:[]
  },

  onLoad(options) {
    //页面初始化 options为页面跳转所带来的参数
    var selectedId = options.id

    console.log (selectedId)


    /*
    *以下是测试用的样例
    */
    const orderList=[
      {
        id:'114514',
        posterId:'114',
        posterHeadImg:'../../imgs/exampleHeader.jpg',//订单上传者的头像
        riderId:null,
        school:'紫荆港',
        type:'取外卖',
        time:'2023.4.8-23:59',//截止时间
        reward:'微信打钱5毛钱',
        comment:'取件手机尾号1919'
      },
      {
        id:'1919810',
        posterId:'514',
        posterHeadImg:'../../imgs/exampleHeader.jpg',
        riderId:null,
        school:'玉泉',
        type:'充电',
        time:'2023.4.8-23:59',
        reward:'微信打钱1元',
        comment:'接单之后微信私聊告诉你龟钥匙放哪里'
      }
    ]
    this.setData({orderList})

    /*
    *这是设想的对后端的请求
    /////////////////////////////

    var that = this;
    wx.request({
      url: 'https://我们的后端域名',
      success: function(order) {
        that.setData({
          orderList: order.data
        });
      }
    });

    /////////////////////////////
    */
    //取出对应id的订单
    const order=orderList.find((e)=>{return e.id==selectedId})
    this.setData({order})

    console.log(order);
  },
   

  tab(e) {
    //order.riderId=wx.getUserInfo().id;

    //提交数据
    wx.request({
      url: '后端的url',
      method: 'POST',
      data: {
        value: this.order
      },
      success: function(res) {
        console.log(res.data);
      }
    });

    wx.navigateTo({
      url: '/pages/receive_order_s1/receive_order_s1'
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