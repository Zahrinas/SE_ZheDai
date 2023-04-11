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
    /* 接收从聊天列表界面传来的参数，包括头像和昵称
     * 二级聊天界面仅此一个，需要通过传参确定是跟谁的聊天
     * 后端：在此处获取与该用户的聊天记录 */
    if (options.chatData) {
      const chatData = JSON.parse(decodeURIComponent(options.chatData));
      this.setData({

        sendId: chatData.sendId,
        receiveId: chatData.receiveId,
        // 前端模拟的聊天记录，后端开发时删掉：
        messageList: [
          {
            id: 1,
            nickname: "尹建伟",
            content: "你好1",
            time: "09:30",
            self: false
          },
          {
            id: 2,
            nickname: "我",
            content: "你好2",
            time: "09:31",
            self: true
          },
          {
            id: 3,
            nickname: "尹建伟",
            content: "你好3",
            time: "09:32",
            self: false
          },
          {
            id: 4,
            nickname: "我",
            content: "你好4",
            time: "09:33",
            self: true
          }
        ]
      });
    }
    // 把发送者和接收者的ID发给后端
    wx.request({
      url: '后端的url',
      method: 'POST',
      data: {
        value: this.data
      },
      success: function(res) {
        console.log(res.data);
      }
    });
    /*
  *这是设想的对后端的请求
  /////////////////////////////

  var that = this;
  wx.request({
    url: 'https://我们的后端域名',
    success: function(mss) {
      that.setData({
        messageList: mss.data
      });
    }
  });

  /////////////////////////////
  */
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
    console.log(event);
    // 检查inputValue是否存在，确保调用trim函数时不会是undefined并因此报错
    if (this.data.inputValue && this.data.inputValue.trim()) {
      this.triggerEvent('sendmessage', { value: this.data.inputValue.trim() });
      this.setData({ inputValue: '' });
    }
    // 如果输入框中没有文本则直接返回
    if (!content.trim()) {
      return;
    }
    // 获取当前的时间字符串，格式为：HH:mm
    const time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: false});
    /* 后端：发送消息需要维护聊天记录，更新最后消息和最后消息时间 */
    // 获取聊天记录列表
    const messageList = this.data.messageList;
    // 构造一个新的消息对象，添加到聊天记录列表中

    //提交数据
    wx.request({
      url: '后端的url',
      method: 'POST',
      data: {
        value: messageList
      },
      success: function(res) {
        console.log(res.data);
      }
    });


    messageList.push({
      id: messageList.length + 1,
      // 此处nickname为自己的昵称，应该可以直接从后端获取
      nickname: '',
      content: content,
      time: time,
      self: true
    });
    // 更新聊天记录列表
    this.setData({
      messageList: messageList
    });
    // 清空输入框
    event.detail.value = '';
  }
});
