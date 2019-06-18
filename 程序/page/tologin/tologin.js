var Bmob = require('../../utils/bmob.js');
var app = getApp()
Page({

  data: {
    userInfo: {},
    id: ''
  },

  onLoad: function (options) {
    // 查看是否授权
    this.data.id = options.userid;
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          //保存用户其他信息
          console.log('already');
        }
      }
    })
  },

  bindGetUserInfo: function (e) {
    var that = this;
    console.log('授权')
    wx.getUserInfo({
      success: function (result) {
        var userInfo = result.userInfo;
        var nickName = userInfo.nickName;
        var avatarUrl = userInfo.avatarUrl;
        app.globalData.user.avatarUrl = avatarUrl
        console.log('avatarUrl',avatarUrl,'nickName', nickName)
        console.log('id', that.data.id)
        app.globalData.user.nickName = nickName

        var u = Bmob.Object.extend("_User");
        var query = new Bmob.Query(u);
        // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
        query.get(that.data.id, {
          success: function (res) {
            // 自动绑定之前的账号
            res.set('nickName', nickName);
            res.set("userPic", avatarUrl);
            res.set("jilu", 0);
            res.save();
          }
        });
      }
    });
    wx.navigateBack({ delta: 1})
  }
})

