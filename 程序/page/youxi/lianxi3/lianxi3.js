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
  var arr2 = new Array();
  var arr3 = new Array();
  var arrmax = new Array();
  var max = 0, m = 0;
  arr.sort(function (a, b) {
    if (a.number < b.number) {
      return -1;
    }
    if (a.number > b.number) {
      return 1;
    }
    return 0;
  })
  for (var i = 0, len1 = arr.length; i < len1; i++) {
    var a2 = arr.concat();
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
            arr2.push([arr[i], a2[j], a3[k], a4[l], a5[m]]);
          }
        }
      }
    }
  }
  for (var i = 0; i < arr2.length; i++) {
    arr3 = arr2[i];
    arr3.sort(function (a, b) {
      if (a.number < b.number) {
        return -1;
      }
      if (a.number > b.number) {
        return 1;
      }
      return 0;
    })
    m = RF(arr3) || SF(arr3) || FK(arr3) || FH(arr3) || F(arr3) || S(arr3) || TK(arr3) || TP(arr3) || OP(arr3) || HC(arr3);
    if (max < m) {
      arrmax = arr3;
      max = m;
    }
  }
  console.log(arrmax);
  
  return max;
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
  return 9 * 10000000000;
}

var SF = function (arg) { //同花顺
  var a = arg;
  var t = a[0];
  for (var i = 1; i < a.length; i++) {
    if (a[i].type === t.type && a[i].number === t.number + 1) {
      t = a[i];
    } else if (i === 4 && t.number === 5 && a[i].number === 14 && a[i].type === t.type) {
      t = a[i];
      return 8 * 10000000000 + 5 * 100000000;
    } else {
      return;
    }
  }
  return 8 * 10000000000 + a[4].number* 100000000;
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
    if (arr[0].count === 4) return 7 * 10000000000 + arr[0].num * 100000000 + arr[1].num * 1000000;
    else if (arr[0].count === 1) return 7 * 10000000000 + arr[1].num * 100000000 + arr[2].num * 1000000;
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
    if (arr[0].count === 3) return 6 * 10000000000 + arr[0].num * 100000000 + arr[1].num * 1000000;
    else if (arr[0].count === 2) return 6 * 10000000000 + arr[1].num * 100000000 + arr[2].num * 1000000;
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
  return 5 * 10000000000 + a[4].number * 100000000 + a[3].number * 1000000 + a[2].number * 10000 + a[1].number * 100 + a[0].number;
};

var S = function (arg) { //顺子
  var a = arg;
  var t = a[0];
  for (var i = 1; i < a.length; i++) {
    if (a[i].number === t.number + 1) {
      t = a[i];
    } else if (i === 4 && t.number === 5 && a[i].number === 14) {
      t = a[i];
      return 4 * 10000000000 + 5 * 100000000;
    } else {
      return;
    }
  };
  return 4 * 10000000000 + a[4].number * 100000000;
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
    if (arr[0].count === 3) return 3 * 10000000000 + arr[0].num * 100000000 + arr[2].num * 1000000 + arr[1].num * 1000000;
    else if (arr[1].count === 3) return 3 * 10000000000 + arr[1].num * 100000000 + arr[2].num * 1000000 + arr[0].num * 1000000;
    else if (arr[2].count === 3) return 3 * 10000000000 + arr[2].num * 100000000 + arr[1].num * 1000000 + arr[0].num * 1000000;
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
    if (arr[0].count === 1) return 2 * 10000000000 + arr[2].num * 100000000 + arr[1].num * 1000000 + arr[0].num * 10000;
    else if (arr[1].count === 1) return 2 * 10000000000 + arr[2].num * 100000000 + arr[0].num * 1000000 + arr[1].num * 10000;
    else if (arr[2].count === 1) return 2 * 10000000000 + arr[1].num * 100000000 + arr[0].num * 1000000 + arr[2].num * 10000;
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
    if (arr[0].count === 2) return 1 * 10000000000 + arr[0].num * 100000000 + arr[3].num * 1000000 + arr[2].num * 10000 + arr[1].num * 100;
    else if (arr[1].count === 2) return 1 * 10000000000 + arr[1].num * 100000000 + arr[3].num * 1000000 + arr[2].num * 10000 + arr[0].num * 100;
    else if (arr[2].count === 2) return 1 * 10000000000 + arr[2].num * 100000000 + arr[3].num * 1000000 + arr[1].num * 10000 + arr[0].num * 100;
    else if (arr[3].count === 2) return 1 * 10000000000 + arr[3].num * 100000000 + arr[2].num * 1000000 + arr[1].num * 10000 + arr[0].num * 100;
  } else return;
};

var HC = function (arg) { //高牌
  return arg[4].number * 100000000 + arg[3].number * 1000000 + arg[2].number * 10000 + arg[1].number * 100 + arg[0].number;
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
    modalHidden: true,
    buttonif: true,
    answer:'',
    ans:'',
    arraytext: [],
    radio: [
      {'value': '庄家胜'},
      {'value': '玩家胜'},
      {'value': '平手'}
    ]
  },

  onLoad(){
    var that=this;
    compeleteCards = CreatCompeleteCard();
    SortCards();
    for(var i=0;i<=8;i++){
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
  },

  buttonTap: function () {
    this.setData({
      wxif: !this.data.wxif,
      buttonif: !this.data.buttonif
    })
  },

  button1: function(){
    var that=this;
    var arr = new Array();
    var arr1 = new Array();
    var player1 = new Array();
    var player2 = new Array();
    if (compeleteCards.length == 52) {
      for (var i = 0; i <= 8; i++) {
        arr.push(compeleteCards[i]);
      }
    }
    arr1 = arr.splice(4, 5);
    player1 = arr.splice(0, 2);
    player2 = arr.splice(0, 2);
    for(var i=0;i<5;i++){
      player1.push(arr1[i]);
    }
    for (var i = 0; i < 5; i++) {
      player2.push(arr1[i]);
    }
    console.log(player1,player2);
    var rank1 = JudgeCards(player1);
    var rank2 = JudgeCards(player2);
    console.log(rank1,rank2);
    var ans;
    if(rank1 > rank2) ans = "庄家胜";
    else if (rank1 < rank2) ans="玩家胜";
    else ans = "平手";
    if (this.data.ans === ""){
      wx.showToast({
        title: '未选择答案',
        icon: 'loading',
        duration: 1000
      })
    } else if (ans === this.data.ans) {
      this.setData({
        modalHidden: false,
        answer: '恭喜你答对了',
        radio: [
          { 'value': '庄家胜' },
          { 'value': '玩家胜' },
          { 'value': '平手' }
        ]
      })
    } else {
      this.setData({
        modalHidden: false,
        answer: '对不起答错了，正确答案是' + ans,
      })
    }
  },

  button2: function () {
    wx.navigateTo({ url: '/page/youxi/lianxi4/lianxi4', }) 
  },

  getradio: function (e) { //单选
    let index = e.currentTarget.dataset.id;
    let radio = this.data.radio;
    for (let i = 0; i < radio.length; i++) {
      this.data.radio[i].checked = false;
    }
    if (radio[index].checked) {
      this.data.radio[index].checked = false;
    } else {
      this.data.radio[index].checked = true;
    }
    let userRadio = radio.filter((item, index) => {
      return item.checked == true;
    })
    this.setData({ 
      radio: this.data.radio,
      ans : userRadio[0].value,
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
    for (var i = 0; i <= 8; i++) {
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
    this.setData({
      modalHidden: true,
      radio: [
        { 'value': '庄家胜' },
        { 'value': '玩家胜' },
        { 'value': '平手' }
      ],
      ans: '',
    })

  },

})

