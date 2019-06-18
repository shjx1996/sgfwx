Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 显示弹窗
   */
  buttonTap: function () {
    wx.navigateTo({ url: '/page/guize/guize', }) 
  },

  gotoPage1: function () {
    wx.navigateTo({ url: '/page/youxi/lianxi1/lianxi1', }) 
  },

  gotoPage2: function () {
    wx.navigateTo({ url: '/page/youxi/renji/renji', }) 
  }
})