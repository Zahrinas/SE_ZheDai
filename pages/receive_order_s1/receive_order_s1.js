
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

    orderList:[]
  },

  //筛选的逻辑实现后面做


  //这两个tab主要处理点击动画
  tabSchool(e) {
    this.setData({
      schoolCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 2) * 200
    })
    
  var that = this;

  console.log('nowschool:')
    console.log(that.data.schoolList[that.data.schoolCur].name)
    console.log(that.data.typeList[that.data.typeCur].name)
  wx.request({

    url: 'http://localhost:8080/orders/order',
    data:{
      school: that.data.schoolList[that.data.schoolCur].name,//校区,string类
      type: that.data.typeList[that.data.typeCur].name//任务类型,string类
    },
    success: function(res) {
      that.setData({
        orderList: res.data
      });
      //console.log(res)
      //console.log(that.data.orderList)
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

      console.log('nowschool:')
        console.log(that.data.schoolList[that.data.schoolCur].name)
        console.log(that.data.typeList[that.data.typeCur].name)
      wx.request({
    
        url: 'http://localhost:8080/orders/order',
        data:{
          school: that.data.schoolList[that.data.schoolCur].name,//校区,string类
          type: that.data.typeList[that.data.typeCur].name//任务类型,string类
        },
        success: function(res) {
          that.setData({
            orderList: res.data
          });
          //console.log(res)
          //console.log(that.data.orderList)
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
    /*
    *以下是测试用的样例
    */
   /*
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
      备注:'取件手机尾号1919'
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
      备注:'接单之后微信私聊告诉你龟钥匙放哪里'
    }
  ]
  
  this.setData({orderList})
*/
  
  //这是设想的对后端的请求
  /////////////////////////////

  var that = this;

  console.log('nowschool:')
    console.log(that.data.schoolList[that.data.schoolCur].name)
    console.log(that.data.typeList[that.data.typeCur].name)
  wx.request({

    url: 'http://localhost:8080/orders/order',
    data:{
      school: that.data.schoolList[that.data.schoolCur].name,//校区,string类
      type: that.data.typeList[that.data.typeCur].name//任务类型,string类
    },
    success: function(res) {
      that.setData({
        orderList: res.data
      });
      //console.log(res)
      //console.log(that.data.orderList)
    },

    fail: function(res){
        console.log('!')
    }

  });

  /////////////////////////////

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
