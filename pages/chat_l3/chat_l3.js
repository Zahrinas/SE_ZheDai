// pages/chat_l3/chat_l3.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 接收传入的参数
    sendId: '',
    receiveId: '',
    avatar: '',
    nickname: '',
    id: '',
    inputValue: '', // 输入框的内容
    messageList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /* 接收从聊天列表界面传来的参数，包括收发ID
     * 二级聊天界面仅此一个，通过收发ID传给后端，后端传回对应数据
     * 后端：在此处获取与该用户的聊天记录 */
    // 如果是从聊天界面来，用chatData传参
    if (options.chatData) {
      var that = this
      const chatData = JSON.parse(decodeURIComponent(options.chatData));
      that.setData({
        sendId: chatData.sendId,
        receiveId: chatData.receiveId
      });
    }
    // 如果是从他人信息来，用id传参
    if (options.id) {
      var that = this
      that.setData({
        receiveId: options.id
      })
      // 从本地缓存获取用户ID（userInfo.nickName）
      const userInfo = wx.getStorageSync('userInfo')
      console.log(userInfo)
      that.setData({
        sendId: userInfo.nickName
      })
    }
    // 把发送者和接收者的ID发给后端，后端返回聊天记录
    var that = this;
    console.log('收发ID：')
    console.log(that.data.sendId);
    console.log(that.data.receiveId);
    wx.request({
      url: 'http://localhost:8080/messagelist/search',
      data: {
        sendId: that.data.sendId, // string类 (当前用户id)发送者id
        receiveId: that.data.receiveId // string类 接收者id
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          messageList: res.data
        })
      }
    });
    console.log(that.data.messageList)
  },
  

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 设置导航栏标题
    wx.setNavigationBarTitle({title:'私聊'});
  },

  /**
   * 发送消息
   */
  // 输入框绑定函数
  onInputChange: function (event) {
    // 更新data中的inputValue
    const inputValue = event.detail.value;
    this.setData({inputValue});
    console.log(inputValue);
  },
  // 发送框绑定函数
  onSendMessage: function (event) {
    // 获取输入框中的文本
    const content = this.data.inputValue;
    // console.log(event);
    // 检查inputValue是否存在，确保调用trim函数时不会是undefined并因此报错
    if (this.data.inputValue && this.data.inputValue.trim()) {
      this.triggerEvent('sendmessage', { value: this.data.inputValue.trim() });
      this.setData({ inputValue: '' });
    }
    // 如果输入框中没有文本则直接返回
    if (!content.trim()) {
      return;
    }
    // 获取当前的时间字符串，格式为：HH:mm 时间改为由后端更新
    /*const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});*/
    /* 后端：发送消息需要维护聊天记录，更新最后消息和最后消息时间 */
    var that = this;
    console.log(content);
    // 提交数据
    wx.request({
      url: 'http://localhost:8080/messagelist/search',
      data: {
        sendId: that.data.sendId,
        receiveId: that.data.receiveId,
        Msg: content
      },
      success: function(res) {
        //console.log(res.data);
        that.setData({
          messageList: res.data
        })
      },
      fail: function(res) {
        console.log('请求失败：', res);
      }
    });
    //插入到chatlist
    wx.request({
      url: 'http://localhost:8080/chatlist/insert',
      data: {
        sendId: that.data.sendId,
        receiveId: that.data.receiveId,
        lastMsg: content
      },
      success: function() {
        console.log('聊天列表已更新')
      }
    })
    // 清空输入框
    event.detail.value = '';
  }
});
