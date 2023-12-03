// pages/edit_inform_J3/edit_inform_J3.js
Page({

  /**
   * Page initial data
   */
  data: {
    id: '',
    nickname: '',
    school: '',
    vx: ''
  },


  nickname(event){
    const inputValue = event.detail.value;
    this.setData({
      nickname: event.detail.value
    });
    this.setData({inputValue});
    console.log(inputValue);
  },

  school(event){
    const inputValue = event.detail.value;
    this.setData({
      school: event.detail.value
    });
    this.setData({inputValue});
    console.log(inputValue);
  },

  vx(event){
    const inputValue = event.detail.value;
    this.setData({
      vx: event.detail.value
    });
    this.setData({inputValue});
    console.log(inputValue);
  },


  tap(e){
    var that = this;
    console.log(that.data.id)
    wx.request({
      url: 'http://localhost:8080/user/update',
      data: {
        id: that.data.id,
        nickname: that.data.nickname,
        school: that.data.school,
        vx: that.data.vx
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          // 这里后端的info是个数组
          nickname: res.data[0].nickname,
          school: res.data[0].school,
          vx: res.data[0].vx
        })
      }
    });
    
    wx.switchTab({
      url: '/pages/self_inform_J2/self_inform_J2'
    });
  
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var that = this;
    const userInfo = wx.getStorageSync('userInfo');
    that.setData({
        id: userInfo.nickName
    })
    wx.request({
      url: 'http://localhost:8080/user/query',
      data:{
        id: userInfo.nickName,
        avatar: userInfo.avatarUrl
      },
      success: function(res) {
        console.log(res.data)
        that.setData({
          // 这里后端的info是个数组
          nickname: res.data[0].nickname,
          school: res.data[0].school,
          vx: res.data[0].vx
        })
      }
    });
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }
})