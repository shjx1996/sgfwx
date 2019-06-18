//app.js
var Bmob = require('utils/bmob.js')
Bmob.initialize("af3ee2c6180945df163965a4b3e948c5", "403aab43cb9b11f0fce7c536a9e81237");
var coolsite360 = require('./coolsite/index.js');



App({
  coolsite360: coolsite360,
  onLaunch: function () {
    var that = this;
    var user1 = new Bmob.User();//开始注册用户
    wx.login({
      success: function (res) {
        withCredentials: true;
        user1.loginWithWeapp(res.code).then(function (user1) {
          var openid = user1.get("authData").weapp.openid;
          console.log(user1, 'user', user1.id, res);
          that.globalData.user.id=user1.id;
          console.log('user1.get("nickName")',user1.get("nickName"));
          if (user1.get("nickName")) {
            // 第二次访问
            var nickName = user1.get('nickName');
            var avatarUrl = user1.get('userPic');
            var jilu = user1.get('jilu');
            that.globalData.user.avatarUrl = avatarUrl;
            that.globalData.user.nickName = nickName;
            that.globalData.user.jilu = jilu;
            wx.setStorageSync('openid', openid)
          } else {
            var u = Bmob.Object.extend("_User");
            var query = new Bmob.Query(u);
            // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
            query.get(user1.id, {
              success: function (res) {
                // 自动绑定之前的账号
                res.set("openid", openid);
                res.save();
              }
            });
            wx.setStorageSync('openid', openid)
            wx.navigateTo({ url: '../../page/tologin/tologin?userid=' + user1.id,})

            //保存用户其他信息
            // wx.getUserInfo({
            //   success: function (res) {
            //     console.log('res',res.userInfo);
            //     that.globalData.userInfo = res.userInfo;
            //     nickName = that.globalData.userInfo.nickName;
            //     avatarUrl = that.globalData.userInfo.avatarUrl;
            //     console.log('2',nickName ,'3' ,avatarUrl);
            //     // 这个 id 是要修改条目的 id，你在生成这个存储并成功时可以获取到，请看前面的文档
            //     query.get(user1.id, {
            //       success: function (res) {
            //         // 自动绑定之前的账号
            //         res.set('nickName', nickName);
            //         res.set("userPic", avatarUrl);
            //         res.set("jilu", 0);
            //         res.set("openid", openid);
            //         res.save();
            //       }
            //     });
            //   }
            // });
          }
        }, function (err) {
          console.log(err, 'errr');
        });
      },
    });
  },

  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } 
  },
  globalData: {
    user: {},
    userInfo: null,
    pageReady: false
  }
})