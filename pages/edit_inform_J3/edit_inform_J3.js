// pages/edit_inform_J3/edit_inform_J3.js
Page({

  /**
   * Page initial data
   */
  data: {
      nickname:"null",
      school:"null",
      vx:"null"
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
    var Info=[this.nickname,this.school,this.vx];
    wx.request({
      url: '后端的url',
      method: 'POST',
      data: {
        value: Info
      },
      success: function(res) {
        console.log(res.data);
      }
    });

    
    wx.switchTab({
      url: '/pages/self_inform_J2/self_inform_J2'
    });
    
  
  },

  headImg(e){
    wx.chooseImg({
      success:function (res) {
        var tempFilePaths=res.tempFilePaths;
        wx.uploadFile({
          filePath: tempFilePaths[0],
          name: 'imgFile',
          url: '后端地址',
          formData:{
            'user':'test'
          },
          success:function (res) {
            var date=res.data
            console.log(data)
          }
        })
        
      }
    })
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    

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