var compeleteCards = new Array();

function Cards(number, type) {
  var card = {
    number: number,
    type: type,
  }
  return card;
};

function CreatCompeleteCard() {
  var arr = new Array();
  for (var i = 2; i <= 14; i++) {
    for (var j = 1; j <= 4; j++) {
      var card = Cards(i,j);
      arr.push(card);
    }
  }
  return arr;
};

function SortCards() {
  if (compeleteCards.length == 52) {
    compeleteCards.sort(function (a, b) {
      return 0.5 - Math.random();
    });
  }
}

function JudgeCards(arr){
  var arr1 = new Array();
  var arr2 = new Array();
  var arr3 = new Array();
  var arr4 = new Array();
  var arr5 = new Array();
  var arr6 = [0,0,0,0,0,0,0,0,0];
  for(var i1=0;i1<52;i1++){
    arr1[i1]=arr[i1];
  }
  arr2 = arr1.splice(0,6);
  for (var i2 = 0; i2 < arr1.length;i2++){
    arr3.push([arr2[0], arr2[1], arr2[2], arr2[3], arr2[4], arr2[5], arr1[i2]]);
  }
  for(var i3=0;i3<46;i3++){
    var a1 = arr3[i3];
    for (var i = 0, len1 = a1.length; i < len1; i++) {
      var a2 = a1.concat();
      a2.splice(0, i + 1);
      for (var j = 0, len2 = a2.length; j < len2; j++) {
        var a3 = a2.concat();
        a3.splice(0, j + 1);
        for (var k = 0, len3 = a3.length; k < len3; k++) {
          var a4 = a3.concat();
          a4.splice(0, k + 1);
          for (var l = 0, len4 = a4.length; l < len4; l++) {
            var a5 = a4.concat();
            a5.splice(0, l + 1);
            for (var m = 0, len5 = a5.length; m < len5; m++) {
              arr4.push([a1[i], a2[j], a3[k], a4[l], a5[m]]);
            }
          }
        }
      }
    }
  }
  console.log(arr4)
  for (var i = 0; i < arr4.length; i++) {
    arr5 = arr4[i];
    arr5.sort(function (a, b) {
      if (a.number < b.number) {
        return -1;
      }
      if (a.number > b.number) {
        return 1;
      }
      return 0;
    })
    var m = RF(arr5) || SF(arr5) || FK(arr5) || FH(arr5) || F(arr5) || S(arr5) || TK(arr5) || TP(arr5) || OP(arr5) || HC(arr5);
    arr6[m]++;
  }
  console.log(arr6);
  return arr6;
}

var RF = function (arg) { //皇家
  var a = arg;
  var t = a[0];
  for (var i = 1; i < a.length; i++) {
    if (t.number == 10) {
      if (a[i].type === t.type && a[i].number === t.number + 1) {
        t = a[i];
      } else {
        return;
      }
    } else return;
  }
  return 9;
}

var SF = function (arg) { //同花顺
  var a = arg;
  var t = a[0];
  for (var i = 1; i < a.length; i++) {
    if (a[i].type === t.type && a[i].number === t.number + 1) {
      t = a[i];
    } else if (i === 4 && t.number === 5 && a[i].number === 14 && a[i].type === t.type) {
      t = a[i];
    } else {
      return;
    }
  }
  return 8;
}

var FK = function (arg) { //四条
  var a = arg;
  var arr = [];
  for (var i = 0; i < a.length;) {//按照属性判断属性合并列数
    var count = 0;
    for (var j = i; j < a.length; j++) {
      if (a[i].number === a[j].number) {
        count++;
      }
    }
    arr.push({
      num: a[i].number,
      count: count
    })
    i += count;
  }
  if (arr.length === 2) {
    if (arr[0].count === 4 || arr[0].count === 1) return 7;
  } else return;

};

var FH = function (arg) { //葫芦
  var a = arg;
  var arr = [];
  for (var i = 0; i < a.length;) {//按照属性判断属性合并列数
    var count = 0;
    for (var j = i; j < a.length; j++) {
      if (a[i].number === a[j].number) {
        count++;
      }
    }
    arr.push({
      num: a[i].number,
      count: count
    })
    i += count;
  }
  if (arr.length === 2) {
    if (arr[0].count === 3 || arr[0].count === 2) return 6;
  } else return;
};

var F = function (arg) { //同花
  var a = arg;
  var t = a[0];
  for (var i = 1; i < a.length; i++) {
    if (a[i].type === t.type) {
      t = a[i];
    } else {
      return;
    }
  };
  return 5;
};

var S = function (arg) { //顺子
  var a = arg;
  var t = a[0];
  for (var i = 1; i < a.length; i++) {
    if (a[i].number === t.number + 1) {
      t = a[i];
    } else if (i === 4 && (t.number) === 5 && (a[i].number) === 14) {
      t = a[i];
    } else {
      return;
    }
  };
  return 4;
};

var TK = function (arg) { //三条
  var a = arg;
  var arr = [];
  for (var i = 0; i < a.length;) {//按照属性判断属性合并列数
    var count = 0;
    for (var j = i; j < a.length; j++) {
      if (a[i].number === a[j].number) {
        count++;
      }
    }
    arr.push({
      num: a[i].number,
      count: count
    })
    i += count;
  }
  if (arr.length === 3) {
    if (arr[0].count === 3 || arr[1].count === 3 || arr[2].count === 3) return 3;
  } else return;
};

var TP = function (arg) { //两对
  var a = arg;
  var arr = [];
  for (var i = 0; i < a.length;) {//按照属性判断属性合并列数
    var count = 0;
    for (var j = i; j < a.length; j++) {
      if (a[i].number === a[j].number) {
        count++;
      }
    }
    arr.push({
      num: a[i].number,
      count: count
    })
    i += count;
  }
  if (arr.length === 3) {
    if (arr[0].count === 2 || arr[0].count === 1) return 2;
  } else return;
};

var OP = function (arg) { //一对
  var a = arg;
  var arr = [];
  for (var i = 0; i < a.length;) {//按照属性判断属性合并列数
    var count = 0;
    for (var j = i; j < a.length; j++) {
      if (a[i].number === a[j].number) {
        count++;
      }
    }
    arr.push({
      num: a[i].number,
      count: count
    })
    i += count;
  }
  if (arr.length === 4) {
    if (arr[0].count === 1 || arr[0].count === 2) return 1;
  } else return;
};

var HC = function (arg) { //高牌
  return 0;
};


function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
}

Page({
  data: {
    wxif: false,
    wxif1:false,
    modalHidden: true,
    buttonif: true,
    grade_name: '--请选择--',
    grades: ['0%', '0%<概率<=25%', '25%<概率<=50%', '50%<概率<=75%', '75%<概率<=100%', ],
    answer:'',
    ans:'',
    rank:'',
    arraytext: [],
  },

  onLoad(){
    var that=this;
    compeleteCards = CreatCompeleteCard();
    SortCards();
    var arr = new Array();
    arr = compeleteCards;
    for(var i=0;i<=5;i++){
      var arrtype='arraytext['+i+'].type';
      var arrco = 'arraytext[' + i + '].co';
      var arrnum = 'arraytext[' + i + '].number';
      switch (compeleteCards[i].type) {
        case 1:
          that.setData({
            [arrtype]: "♠",
            [arrco]: 'color: black',
          })
          break;
        case 2:
          that.setData({
            [arrtype]: "♣",
            [arrco]: 'color: black',
          })
          break;
        case 3:
          that.setData({
            [arrtype]: "♦",
            [arrco]: 'color: red',
          })
          break;
        case 4:
          that.setData({
            [arrtype]: "♥",
            [arrco]: 'color: red',
          })
          break;
      }
      switch (compeleteCards[i].number) {
        case 11:
          that.setData({
            [arrnum]: "J",
          })
          break;
        case 12:
          that.setData({
            [arrnum]: "Q",
          })
          break;
        case 13:
          that.setData({
            [arrnum]: "K",
          })
          break;
        case 14:
          that.setData({
            [arrnum]: "A",
          })
          break;
        default:
          that.setData({
            [arrnum]: compeleteCards[i].number,
          })
          break;
      }
    }
    console.log(that.data.arraytext);
    var rank = JudgeCards(arr);
    var num = Math.floor(Math.random() * 10);
    var quse,ans;
    switch (num) {
      case 0:
        quse="高牌";
        break;
      case 1:
        quse ="一对";
        break;
      case 2:
        quse ="两对";
        break;
      case 3:
        quse ="三条";
        break;
      case 4:
        quse ="顺子";
        break;
      case 5:
        quse ="同花";
        break;
      case 6:
        quse ="葫芦";
        break;
      case 7:
        quse ="四条";
        break;
      case 8:
        quse ="同花顺";
        break;
      case 9:
        quse ="皇家同花";
        break;
    };
    if ((rank[num] / 966)==0){
      ans = '0%';
    } else if ((rank[num] / 966) > 0 && (rank[num] / 966)<=0.25){
      ans = '0%<概率<=25%';
    } else if ((rank[num] / 966) > 0.25 && (rank[num] / 966) <= 0.5) {
      ans = '25%<概率<=50%';
    } else if ((rank[num] / 966) > 0.5 && (rank[num] / 966) <= 0.75) {
      ans = '50%<概率<=75%';
    } else if ((rank[num] / 966) > 0.75 && (rank[num] / 966) <= 1) {
      ans = '75%<概率<=100%';
    }
    that.setData({
      rank: quse,
      ans: ans,
    })
  },

  buttonTap: function () {
    this.setData({
      wxif: !this.data.wxif,
      buttonif: !this.data.buttonif
    })
  },

  button1: function(){
    if (this.data.ans === this.data.grade_name) {
      this.setData({
        answer: '恭喜你答对了'
      })
    } else {
      this.setData({
        answer: '对不起答错了，正确答案是' + this.data.ans
      })
    }
    this.setData({
      modalHidden: false
    })
  },

  button2: function () {
    wx.navigateBack({ delta: 4 })
  },

  button3: function () {
    wx.navigateTo({ url: '/page/youxi/lianxi4/bangzhu', }) 
  },

  bindShowMsg() {
    this.setData({
      select: !this.data.select
    })
  },

  mySelect(e) {
    console.log(e);
    var name = e.currentTarget.dataset.name;
    this.setData({
      grade_name: name,
      select: false
    })
  },

  modalCandel: function () { //取消
    this.setData({
      modalHidden: true,
    })
  },

  modalConfirm: function () { //确定 
    var that = this;
    SortCards();
    sleep(500);
    var arr = new Array();
    arr = compeleteCards;
    for (var i = 0; i <= 5; i++) {
      var arrtype = 'arraytext[' + i + '].type';
      var arrco = 'arraytext[' + i + '].co';
      var arrnum = 'arraytext[' + i + '].number';
      switch (compeleteCards[i].type) {
        case 1:
          that.setData({
            [arrtype]: "♠",
            [arrco]: 'color: black',
          })
          break;
        case 2:
          that.setData({
            [arrtype]: "♣",
            [arrco]: 'color: black',
          })
          break;
        case 3:
          that.setData({
            [arrtype]: "♦",
            [arrco]: 'color: red',
          })
          break;
        case 4:
          that.setData({
            [arrtype]: "♥",
            [arrco]: 'color: red',
          })
          break;
      }
      switch (compeleteCards[i].number) {
        case 11:
          that.setData({
            [arrnum]: "J",
          })
          break;
        case 12:
          that.setData({
            [arrnum]: "Q",
          })
          break;
        case 13:
          that.setData({
            [arrnum]: "K",
          })
          break;
        case 14:
          that.setData({
            [arrnum]: "A",
          })
          break;
        default:
          that.setData({
            [arrnum]: compeleteCards[i].number,
          })
          break;
      }
    }
    console.log(that.data.arraytext);
    var rank = JudgeCards(arr);
    var num = Math.floor(Math.random() * 10);
    var quse, ans;
    switch (num) {
      case 0:
        quse = "高牌";
        break;
      case 1:
        quse = "一对";
        break;
      case 2:
        quse = "两对";
        break;
      case 3:
        quse = "三条";
        break;
      case 4:
        quse = "顺子";
        break;
      case 5:
        quse = "同花";
        break;
      case 6:
        quse = "葫芦";
        break;
      case 7:
        quse = "四条";
        break;
      case 8:
        quse = "同花顺";
        break;
      case 9:
        quse = "皇家同花";
        break;
    };
    if ((rank[num] / 966) == 0) {
      ans = '0%';
    } else if ((rank[num] / 966) > 0 && (rank[num] / 966) <= 0.25) {
      ans = '0%<概率<=25%';
    } else if ((rank[num] / 966) > 0.25 && (rank[num] / 966) <= 0.5) {
      ans = '25%<概率<=50%';
    } else if ((rank[num] / 966) > 0.5 && (rank[num] / 966) <= 0.75) {
      ans = '50%<概率<=75%';
    } else if ((rank[num] / 966) > 0.75 && (rank[num] / 966) <= 1) {
      ans = '75%<概率<=100%';
    }
    this.setData({
      modalHidden: true,
      grade_name: '--请选择--',
      rank: quse,
      ans: ans,
    })

  },

})

