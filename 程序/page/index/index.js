var Bmob = require('../../utils/bmob.js');

// 获取全局应用程序实例对象

var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "index",
  /**
   * 页面的初始数据
   */

  data: {
    modalHidden: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var _this = this;
    var pageSize = this.data.pageSize;
    // 最近加入
    var shipin = Bmob.Object.extend("shipin");
    var query = new Bmob.Query(shipin);
    query.descending("createdAt");
    query.limit(pageSize);
    // 查询所有数据
    query.find({
      success: function (results) {
        results.sort(function (a, b) {
          if (a.attributes.tuijianshu > b.attributes.tuijianshu) {
            return -1;
          }
          if (a.attributes.tuijianshu < b.attributes.tuijianshu) {
            return 1;
          }
          return 0;
        })
        var remen = results.slice(0, 4);
        _this.setData({
          remen: remen
        });
        console.log(results);
        results.sort(function (a, b) {
          if (a.createdAt > b.createdAt) {
            return -1;
          }
          if (a.createdAt < b.createdAt) {
            return 1;
          }
          return 0;
        })
        var attractionsList = results.slice(0, 4)
        _this.setData({
          attractionsList: attractionsList
        });
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });
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

})

