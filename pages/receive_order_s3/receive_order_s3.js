
Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolCur: 0, //默认选中
    schoolList: [{
        name: '紫金港',
        id: 0
      },
      {
        name: '玉泉',
        id: 1
      },
      {
        name: '西溪',
        id: 2
      },
      {
        name: '之江',
        id: 3
      },
      {
        name: '华家池',
        id: 4
      },
      {
        name: '舟山',
        id: 5
      },
      {
        name: '海宁',
        id: 6
      }
    ],

    typeCur: 0, //默认选中
    typeList: [{
        name: '全部',
        id: 0
      },
      {
        name: '取外卖',
        id: 1
      },
      {
        name: '取物',
        id: 2
      },
      {
        name: '充电',
        id: 3
      },
      {
        name: '借书',
        id: 4
      },
      {
        name: '打卡',
        id: 5
      },
      {
        name: '其它',
        id: 6
      }
    ],

    orderList:[],
    myId: '114514',
    once: 1
  },

  //筛选的逻辑实现后面做
  tabSchool(e) {
    this.setData({
      schoolCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 2) * 200
    })

    var that = this;
    const userInfo = wx.getStorageSync('userInfo');
    that.setData({
            myId: userInfo.nickName
    })
    var myId = that.data.myId;
    console.log(that.data.myId);
  
  wx.request({

    url: 'http://localhost:8080/orders/poster',
    data:{
      posterId:myId,
      school: that.data.schoolList[that.data.schoolCur].name,//校区,string类
      type: that.data.typeList[that.data.typeCur].name//任务类型,string类
    },
    success: function(res) {
      that.setData({
        orderList: res.data
      });
      console.log(res)
    },

    fail: function(res){
        console.log('!')
    }

  });
  },

    tabType(e) {
      this.setData({
        typeCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 2) * 200
      })
      var that = this;
      var myId;     
      myId=that.data.myId;
      console.log(myId);
    wx.request({

    url: 'http://localhost:8080/orders/poster',
    data:{
      posterId:myId,
      school: that.data.schoolList[that.data.schoolCur].name,//校区,string类
      type: that.data.typeList[that.data.typeCur].name//任务类型,string类
    },
    success: function(res) {
      that.setData({
        orderList: res.data
      });
      console.log(res)
      console.log(myId)
    },

    fail: function(res){
        console.log('!')
    }

  });
    },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
    var that=this;
      const userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo);
      that.setData({
              myId:userInfo.nickName
      })
  wx.request({

    url: 'http://localhost:8080/orders/poster',
    data:{
      posterId:that.data.myId,
      school: that.data.schoolList[that.data.schoolCur].name,//校区,string类
      type: that.data.typeList[that.data.typeCur].name//任务类型,string类
    },
    success: function(res) {
      that.setData({
        orderList: res.data
      });
      console.log(res)
    },

    fail: function(res){
        console.log('!')
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
