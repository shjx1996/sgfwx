
// 引入coolsite360交互配置设定
require('coolsite.config.js');

// 获取全局应用程序实例对象
var app = getApp();
var Bmob = require('../../utils/bmob.js');
// 创建页面实例对象
Page({
  /**
   * 页面名称
   */
  name: "detial",
  /**
   * 页面的初始数据
   */

  data: {
    row:{},
    wxif: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option) {
    // 注册coolsite360交互模块
    app.coolsite360.register(this);
    var id = option.id;
    var _this = this;
    var Diary = Bmob.Object.extend("shipin");
    var query = new Bmob.Query(Diary);
    query.get(id, {
      success: function (result) {
        _this.setData({
          row: result
        });
        console.log(_this.data.row);
        // The object was retrieved successfully.
        console.log("该日记标题为" + result.get("biaoti"));
        // 获取评论数据
        var pinglun = Bmob.Object.extend("pinglun");
        var query = new Bmob.Query(pinglun);
        var shipin = Bmob.Object.createWithoutData("shipin", result.id);
        query.equalTo("shipin", shipin);
        query.include("own");
        query.include("shipin");
        // 查询所有数据
        query.find({
          success: function (results) {
            _this.setData({
              id: result.id,
              results: results
            });
            console.log("共查询到 " + results.length + " 条记录");
            // 循环处理查询到的数据
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              console.log(object.id + ' - ' + object.get('content'));
            }
          },
          error: function (error) {
            console.log("查询失败: " + error.code + " " + error.message);
          }
        });
      },
      error: function (result, error) {
        console.log("查询失败");
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
    // 执行coolsite360交互组件展示
    app.coolsite360.onShow(this);
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

  formSubmit: function (e) {
    var _this = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var content = e.detail.value.content;
    var pinglun = Bmob.Object.extend("pinglun");
    var diary = new pinglun();
    var id = this.data.id;
    var shipin = Bmob.Object.createWithoutData("shipin", id);
    diary.set("shipin", shipin);
    var currentUser = Bmob.User.current();
    var objectId = currentUser.id;
    var isme = new Bmob.User();
    isme.id = objectId;     //当前用户的objectId
    diary.set("own",isme);
    diary.set("neirong",content);
    //添加数据，第一个入口参数是null
    diary.save(null, {
      success: function(result) {
        _this.onLoad({"id":id});
        // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
          console.log("日记创建成功, objectId:"+result.id);
      },
      error: function(result, error) {
        // 添加失败
        console.log('创建日记失败');
      }
    });
  },
  formReset: function () {
    console.log('form发生了reset事件')
  },
  //以下为自定义点击事件

  tap_d6c84484: function (e) {
    //触发事件，提交留言
    console.log(e);
    app.coolsite360.fireEvent(e, this);
  },

  tap_e2bd485d: function (e) {
    //触发事件
    app.coolsite360.fireEvent(e, this);
  },

  tap_3ec69114: function (e) {
    //触发事件
    app.coolsite360.fireEvent(e, this);
  },

  tap_277327c4: function (e) {
    //触发事件
    app.coolsite360.fireEvent(e, this);
  },

  tap_22930b74: function (e) {
    //触发事件
    app.coolsite360.fireEvent(e, this);
  },

  botton1: function (){
    var _this = this;
    console.log(_this.data.row);
    var tuijnum = _this.data.row.attributes.tuijianshu + 1;
    _this.data.row.attributes.tuijianshu = tuijnum;
    _this.data.row._serverData.tuijianshu = tuijnum;
    _this.setData({
      row: _this.data.row,
    })
    var Diary = Bmob.Object.extend("shipin");
    var query = new Bmob.Query(Diary);
    query.get(_this.data.id, {
      success: function (result) {
        // 回调中可以取得这个 diary 对象的一个实例，然后就可以修改它了
        result.set('tuijianshu', tuijnum);
        result.save();
        // The object was retrieved successfully.
      },
      error: function (object, error) {
        wx.showToast({
          title: '推荐失败',
          icon: 'none',
          duration: 2000
        })
      }
    });
    _this.setData({
      wxif: !_this.data.wxif,
    })
  },

  botton2: function () {
    var _this = this;
    console.log(_this.data.row);
    var tuijnum = _this.data.row.attributes.tuijianshu - 1;
    _this.data.row.attributes.tuijianshu = tuijnum;
    _this.data.row._serverData.tuijianshu = tuijnum;
    _this.setData({
      row: _this.data.row,
    })
    var Diary = Bmob.Object.extend("shipin");
    var query = new Bmob.Query(Diary);
    query.get(_this.data.id, {
      success: function (result) {
        // 回调中可以取得这个 diary 对象的一个实例，然后就可以修改它了
        result.set('tuijianshu', tuijnum);
        result.save();
        // The object was retrieved successfully.
      },
      error: function (object, error) {
        wx.showToast({
          title: '取消推荐失败',
          icon: 'none',
          duration: 2000
        })
      }
    });
    _this.setData({
      wxif: !_this.data.wxif,
    })
  },

})

