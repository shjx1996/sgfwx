
var Bmob = require('../../utils/bmob.js');


// 获取全局应用程序实例对象
var app = getApp();

// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "list",
  /**
   * 页面的初始数据
   */

  data: {
    
  },
  lower:function(){
    console.log("到达底部");
    var _this = this;
    wx.showLoading({
      title: '加载中',
    })
    // 获取之前的数据
    var resultsOld = this.data.results;
    var page = this.data.page;
    var pageSize = this.data.pageSize;
    // 最近加入
    var shipin = Bmob.Object.extend("shipin");
    var query = new Bmob.Query(shipin);
    query.descending("createdAt");
    query.skip(pageSize * page);
    query.limit(pageSize);
    // 查询所有数据
    query.find({
      success: function (results) {
        wx.hideLoading()
        page++;
        _this.setData({
          page: page,
          results: resultsOld.concat(results)
        });
        console.log("共查询到 " + results.length + " 条记录");
      },
      error: function (error) {
        wx.hideLoading()
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad () {
    var _this =this;
    var pageSize = this.data.pageSize;
    // 最近加入
    var shipin = Bmob.Object.extend("shipin");
    var query = new Bmob.Query(shipin);
    query.descending("createdAt");
    query.limit(pageSize);
    // 查询所有数据
    query.find({
      success: function (results) {
        _this.setData({
          results: results
        });
        console.log("共查询到 " + results.length + " 条记录");
      },
      error: function (error) {
        console.log("查询失败: " + error.code + " " + error.message);
      }
    });

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    
  },


  //以下为自定义点击事件
  
})

