var app=getApp();
Page({

  data: {
    user:{},
  },

  onLoad() {
    var that = this;
    that.setData({
      user: app.globalData.user,
    });
  },

  onShow(){
    var that = this;
    that.setData({
      user: app.globalData.user,
    });
  },

  guanyu:function(){
    wx.showToast({
      title: '本小程序有沈舸帆开发编写',
      icon: 'none',
      duration: 2000
    })
  }

  
})