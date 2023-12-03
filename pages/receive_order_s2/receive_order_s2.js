// pages/receive_order_s2/receive_order_s2.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myid: '',
    orderList:[],
    button: '接单',
    isComplaint: 0,
    riderHead:''
  },

  onLoad(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var selectedId = options.id
 //   console.log (selectedId)
    // 获取自己myid，用于后续判断页面跳转是个人信息还是他人信息
    var that = this
    const userInfo = wx.getStorageSync('userInfo')
    that.setData({
      myid: userInfo.nickName
    })
    console.log(that.data.myid)
    var that = this
    wx.request({
      url: 'http://localhost:8080/orders/detail',
      data:{
        id: selectedId
      },
      success: function(res) {
        that.setData({
          orderList: res.data
        });
        console.log(res)
        console.log(that.data.orderList)
       // console.log(that.data.orderList[0].reward)
       // console.log(that.data.orderList[0].remark)
       // console.log(that.data.orderList[0].nickname)
       console.log(that.data.orderList[0].riderId);

    if(that.data.orderList[0].riderId=='null')
    {
      that.setData({
        button:'接单',
        isComplaint:0
      })
    }
    else
    {
      that.setData({
        button:'申诉',
        isComplaint:1
      })

    }

      },
  
      fail: function(res){
          console.log('!')
      }
  
    });


    const order=that.data.orderList.find((e)=>{return e.id==selectedId})
    this.setData({order})

    console.log(order);
  },
   
  navigateToPage() {
    var that = this
    if (that.data.myid === that.data.orderList[0].posterId) {
      wx.switchTab({
        url: '/pages/self_inform_J2/self_inform_J2',
      });
    } else {
      wx.navigateTo({
        url: '/pages/other_inform_J4/other_inform_J4?id=' + that.data.orderList[0].posterId,
      });
    }
  },
  
  tab(e) {
    
var that=this

    if(that.data.isComplaint==0)
    {
    
    var myId;
    //提交数据

      const userInfo = wx.getStorageSync('userInfo');
      console.log(userInfo);
      that.setData({
              "orderList[0].riderId":userInfo.nickName
      })

    wx.request({
      url: 'http://localhost:8080/orders/update',
      /*
      data: {
        value: this.data.orderList[0]
      },*/
      data:{
        id: that.data.orderList[0].id, //string类，该条记录id为发送时间接用户名
        riderId: that.data.orderList[0].riderId,//string类

      },
      success: function(res) {
        console.log(res);
        console.log(that.data.orderList[0])
        console.log("。。。Ttansport Success。。。")
      }
    });

    wx.switchTab({
      url: '/pages/receive_order_s1/receive_order_s1'
    });
  }
  else
  {
    
    wx.navigateTo({
      url: '/pages/edit_complaint/edit_complaint?id='+that.data.orderList[0].id
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