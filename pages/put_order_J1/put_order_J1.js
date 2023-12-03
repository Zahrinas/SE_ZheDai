
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

    typeCur: 1, //默认选中
    typeList: [
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

    myTime:'null',
    myReward:'null',
    myComment:'null',
    myId:'114514',
    myImghead:''
  },

  //筛选的逻辑实现后面做


  //这两个tab主要处理点击动画
  tabSchool(e) {
    this.setData({
      schoolCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 2) * 200
    })
  },

    tabType(e) {
      this.setData({
        typeCur: e.currentTarget.dataset.id,
        scrollLeft: (e.currentTarget.dataset.id - 2) * 200
      })
    },

    time(event)
    {
    const inputValue = event.detail.value;
    this.setData({
      myTime: event.detail.value
    });
    //this.setData({inputValue});
    console.log(inputValue);


    },

    reward(event)
    {

      const inputValue = event.detail.value;
    this.setData({
      myReward: event.detail.value
    });
    //this.setData({inputValue});
    console.log(inputValue);


    },

    comment(event)
    {
      const inputValue = event.detail.value;
    this.setData({
      myComment: event.detail.value
    });
    //this.setData({inputValue});
    console.log(inputValue);


    },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  sendOrder(e)
  {
    //提交数据

      var that=this;
      const userInfo = wx.getStorageSync('userInfo');
      //console.log(userInfo);
      that.setData({
              myId:userInfo.nickName,
              myImghead:userInfo.avatarUrl
      })



      var myId=that.data.myId;
      var myImghead=that.data.myImghead;
    //提交数据
    var nowTime=new Date().toJSON().substring(0, 10) + '_' + new Date().toTimeString().substring(0,8);
    var id=nowTime+myId;
    wx.request({
      url: 'http://localhost:8080/orders/insert',
      data: {
        id: id, //string类，该条记录id为发送时间接用户名
        posterId: myId,//string类
        nickname: myId,//string类
        posterHeadImg: myImghead,//string类
        riderId: "null",//string类
        school: that.data.schoolList[that.data.schoolCur].name,//校区,string类
        type: that.data.typeList[that.data.typeCur].name,//任务类型,string类
        time: that.data.myTime,//string类
        reward: that.data.myReward,//string类
        comment: that.data.myComment//string类
      },
      success: function(res) {
        console.log(res);

        console.log(nowTime+myId);
        console.log(myId);
        console.log(myId);
        console.log(myImghead);
        console.log( that.data.schoolList[that.data.schoolCur].name);
        console.log(that.data.typeList[that.data.typeCur].name);
        console.log(that.data.myTime);
        console.log(that.data.myReward);
        console.log(that.data.myComment);
      },
      fail: function(res)
      {
        console.log("!!!!!!\n");
      }
    });

    wx.switchTab({
      url: '/pages/receive_order_s1/receive_order_s1'
    });
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
