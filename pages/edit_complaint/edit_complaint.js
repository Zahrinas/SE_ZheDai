// pages/edit_inform_J3/edit_inform_J3.js
Page({

  /**
   * Page initial data
   */
  data: {
  
      
	    plaintiff:'',
      reason:'',
      id:''
        
  },


  reason(event){
    const inputValue = event.detail.value;
    this.setData({
      'reason': event.detail.value
    });
    this.setData({inputValue});
    console.log(inputValue);
  },


  tap(e){
    var that = this;
    wx.request({
      url: 'http://localhost:8080/complaintlist/userupdate',
      data: {
        id:that.data.id,
	      plaintiff:that.data.plaintiff,
	      reason:that.data.reason
      },
      success: function(res) {
        console.log(res.data);
        console.log(that.data.plaintiff);
      }
    });

    
    wx.navigateTo({
      url: '/pages/receive_order_s3/receive_order_s3'
    });
    
  
  },

  

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    var that=this;
    var selectedId = options.id
    console.log (selectedId)

    that.setData({
      'id': selectedId
    })

    console.log(that.data.id)

    const userInfo = wx.getStorageSync('userInfo');
    that.setData({
          plaintiff:userInfo.nickName
    })
    

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