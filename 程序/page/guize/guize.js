Page({

  data: {
    open: false,
    // mark 是指原点x轴坐标
    mark: 0,
    // newmark 是指移动的最新点的x轴坐标 
    newmark: 0,
    istoright: true,
    wxif: [true, false, false, false, false]
  },

  onLoad(){
    wx.showToast({
      title: '可右划调出侧边栏',
      icon: 'none',
      duration: 2000
    })
  },

  tap_start: function (e) {
    // touchstart事件
    // 把手指触摸屏幕的那一个点的 x 轴坐标赋值给 mark 和 newmark
    this.data.mark = this.data.newmark = e.touches[0].pageX;
  },

  tap_drag: function (e) {
    // touchmove事件
    this.data.newmark = e.touches[0].pageX;

    // 手指从左向右移动
    if (this.data.mark < this.data.newmark) {
      this.istoright = true;
    }

    // 手指从右向左移动
    if (this.data.mark > this.data.newmark) {
      this.istoright = false;
    }
    this.data.mark = this.data.newmark;
  },

  tap_end: function (e) {
    // touchend事件
    this.data.mark = 0;
    this.data.newmark = 0;
    // 通过改变 opne 的值，让主页加上滑动的样式
    if (this.istoright) {
      this.setData({
        open: true
      });
    } else {
      this.setData({
        open: false
      });
    }
  },

  botton1: function(){
    var that = this;
    that.setData({
      wxif: [true, false, false, false, false],
    })
  },

  botton2: function () {
    var that = this;
    that.setData({
      wxif: [false, true, false, false, false],
    })
  },

  botton3: function () {
    var that = this;
    that.setData({
      wxif: [false, false, true, false, false],
    })
  },

  botton4: function () {
    var that = this;
    that.setData({
      wxif: [false, false, false, true, false],
    })
  },

  botton5: function () {
    var that = this;
    that.setData({
      wxif: [false, false, false, false, true],
    })
  },

})
