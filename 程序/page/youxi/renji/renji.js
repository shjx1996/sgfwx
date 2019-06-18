var app = getApp();
var Bmob = require('../../../utils/bmob.js');
var compeleteCards = new Array();
var cdbk = 'background-image: url(http://bmob-cdn-24663.b0.upaiyun.com/2019/04/05/220bb5294079741980e1e4d72fa6c00e.png)';
var bkimg = '',p1dz=20,p2dz=20,p2cm=980,p2cm2=980,pln=2,round=0;
var multiarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

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
      var card = Cards(i, j);
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

function JudgeCards(arr) {
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
      max = m;
    }
  }
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
      return 9 * 10000000000;
    } else return;
  }
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
  return 8 * 10000000000 + a[4].number * 100000000;
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

function Npc(){
  var that = this;
  var arr = new Array();
  var rank1, rank2, cz, yuqi;
  var arr1 = [compeleteCards[0], compeleteCards[1], compeleteCards[5], compeleteCards[6], compeleteCards[7]];
  var arr2 = [compeleteCards[2], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9]];
  var arr3 = [compeleteCards[0], compeleteCards[1], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9]];
  var arr4 = [compeleteCards[0], compeleteCards[1], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9], compeleteCards[11]];
  switch(round){
    case 0:{
      sleep(500);
      if (p1dz === p2dz) {
        wx.showToast({
          title: '庄家选择过，请玩家进行操作',
          icon: 'none',
          duration: 2000
        })
        cz = '过';
      } else if (p2dz >= (p2cm2/3)){
        wx.showToast({
          title: '庄家选择弃牌',
          icon: 'none',
          duration: 2000
        });
        cz = '弃牌';
      } else{
        p1dz = p2dz;
        wx.showToast({
          title: '庄家选择跟注，请玩家进行操作',
          icon: 'none',
          duration: 2000
        });
        cz = '跟注';
      }
      round++;
      return cz;
    }
    case 1: {
      sleep(1000);
      arr = arr1;
      rank1 = RF(arr) || SF(arr) || FK(arr) || FH(arr) || F(arr) || S(arr) || TK(arr) || TP(arr) || OP(arr) || HC(arr);
      yuqi = (Math.ceil(rank1 / 10000000000)) * 100;
      console.log(yuqi);
      if (p2dz <= yuqi && p1dz < p2dz) {
        p1dz = p2dz;
        wx.showToast({
          title: '庄家选择跟注，请玩家进行操作',
          icon: 'none',
          duration: 2000
        });
        cz = '跟注';
        round--;
      } else if (p2dz > yuqi && p1dz != p2dz && p2cm!=0) {
        wx.showToast({
          title: '庄家选择弃牌',
          icon: 'none',
          duration: 2000
        });
        cz = '弃牌';
      } else if (p2dz < yuqi) {
        p1dz = p1dz + yuqi + (Math.floor(Math.random() * (4 + 4 + 1) - 4)) * 10 * (yuqi/100);
        wx.showToast({
          title: '庄家选择加注',
          icon: 'none',
          duration: 2000
        });
        round--;
      } else{
        wx.showToast({
          title: '庄家选择过，请玩家进行操作',
          icon: 'none',
          duration: 2000
        })
        cz = '过';
      } 
      round++;
      return cz;
    }
    case 2: {
      sleep(1500);
      rank1 = JudgeCards(arr3);
      rank2 = JudgeCards(arr2);
      yuqi = (Math.ceil(rank1 / 10000000000)) * 100;
      console.log(yuqi);
      if (rank1>=rank2 && p1dz<p2dz) {
        p1dz = p2dz;
        wx.showToast({
          title: '庄家选择跟注，请玩家进行操作',
          icon: 'none',
          duration: 2000
        });
        cz = '跟注';
        round--;
      } else if (rank1 < rank2) {
        wx.showToast({
          title: '庄家选择弃牌',
          icon: 'none',
          duration: 2000
        });
        cz = '弃牌';
      } else if (rank1 >= rank2 && p2dz < yuqi) {
        p1dz = p1dz + yuqi + (Math.floor(Math.random() * (4 + 4 + 1) - 4)) * 10 * (yuqi / 100);
        wx.showToast({
          title: '庄家选择加注',
          icon: 'none',
          duration: 2000
        });
        round--;
      } else {
        wx.showToast({
          title: '庄家选择过，请玩家进行操作',
          icon: 'none',
          duration: 2000
        })
        cz = '过';
      } 
      round++;
      return cz;
    }
    case 3: {
      sleep(2000);
      rank1 = JudgeCards(arr4);
      rank2 = JudgeCards(arr2);
      console.log(rank1, rank2);
      yuqi = (Math.ceil(rank1 / 10000000000)) * 100;
      console.log(yuqi);
      if (rank1 >= rank2 && p1dz < p2dz) {
        p1dz = p2dz;
        wx.showToast({
          title: '庄家选择跟注，请玩家进行操作',
          icon: 'none',
          duration: 2000
        });
        cz = '跟注';
        round--;
      } else if (rank1 < rank2) {
        wx.showToast({
          title: '庄家选择弃牌',
          icon: 'none',
          duration: 2000
        });
        cz = '弃牌';
      } else if (rank1 >= rank2 && p2dz < yuqi) {
        p1dz = p1dz + yuqi + (Math.floor(Math.random() * (4 + 4 + 1) - 4)) * 10 * (yuqi / 100);
        wx.showToast({
          title: '庄家选择加注',
          icon: 'none',
          duration: 2000
        });
        round--;
      } else {
        wx.showToast({
          title: '庄家选择过，请玩家进行操作',
          icon: 'none',
          duration: 2000
        })
        cz = '过';
      }
      round++;
      return cz;
    }
  }
}

function sleep(numberMillis) {
  var now = new Date();
  var exitTime = now.getTime() + numberMillis;
  while (true) {
    now = new Date();
    if (now.getTime() > exitTime)
      return;
  }
}

function tishi(arr){
  var arg = arr;
  var rank = JudgeCards(arg);
  rank = parseInt(rank / 10000000000);
  switch (rank) {
    case 0:
      return "高牌";
    case 1:
      return "一对";
    case 2:
      return "两对";
    case 3:
      return "三条";
    case 4:
      return "顺子";
    case 5:
      return "同花";
    case 6:
      return "葫芦";
    case 7:
      return "四条";
    case 8:
      return "同花顺";
    case 9:
      return "皇家同花顺";
  }
}

Page({
  data: {
    wxif: false,
    zj1if: false,
    zj2if: false,
    wjif: false,
    tsif: false,
    gg1if: false,
    gg2if: false,
    gg3if: false,
    modalHidden1: true,
    modalHidden2: true,
    buttonif:false,
    zjdz: p1dz,
    wjdz: p2dz,
    cm : p2cm,
    bk: cdbk,
    ans: '',
    arraytext: [],
    //多列选择器
    multiArray: [multiarr, multiarr, multiarr, multiarr, multiarr],
    multiIndex: [0, 0, 0, 0, 0],
  },

  onLoad() {
    var that = this;
    bkimg = '', p1dz = 20, p2dz = 20, p2cm = 980, p2cm2 = 980, pln = 2, round = 0;
    var arr = new Array();
    compeleteCards = CreatCompeleteCard();
    SortCards();
    if (compeleteCards.length == 52) {
      for (var i = 0; i <= 11; i++) {
        arr.push(compeleteCards[i]);
        if (i === 3 || i === 7 || i === 9) i++;
      }
    }
    for (var i = 0; i <= 8; i++) {
      var arrtype = 'arraytext[' + i + '].type';
      var arrco = 'arraytext[' + i + '].co';
      var arrnum = 'arraytext[' + i + '].number';
      switch (arr[i].type) {
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
      switch (arr[i].number) {
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
            [arrnum]: arr[i].number,
          })
          break;
      }
    }
    sleep(500);
    this.setData({
      zj1if : true,
    })
    sleep(500);
    this.setData({
      wjif: true,
      tsif: true,
    })
  },

  Call: function(){ //跟注
    var that=this;
    if(pln === 2){
      if (p1dz > p2dz) {
        if (p2cm < (p1dz - p2dz)) {
          wx.showToast({
            title: '你没有足够的筹码，不能进行此操作',
            icon: 'none',
            duration: 2000
          })
        } else {
          p2cm2 = p2cm;
          p2cm = p2cm - (p1dz - p2dz);
          p2dz = p1dz;
          that.setData({
            wjdz: p2dz,
            cm: p2cm,
          })
          pln = 1;
          var p1cz = Npc();
          if (p1cz === '弃牌') {
            p2cm = p2cm + p1dz + p2dz;
            p2cm2 = p2cm;
            that.setData({
              modalHidden1: false,
              bk: '',
              zj1if: true,
              zj2if: true,
              gg1if: true,
              gg2if: true,
              gg3if: true,
            })
          } else {
            that.setData({
              zjdz: p1dz,
            })
            switch (round) {
              case 1: {
                that.setData({
                  gg1if: true,
                })
                var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7]];
                var answer = tishi(arr);
                that.setData({
                  ans: answer,
                })
                break;
              }
              case 2: {
                that.setData({
                  gg2if: true,
                })
                var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7],       compeleteCards[9]];
                var answer = tishi(arr);
                that.setData({
                  ans: answer,
                })
                break;
              }
              case 3: {
                that.setData({
                  gg3if: true,
                })
                var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9], compeleteCards[11]];
                var answer = tishi(arr);
                that.setData({
                  ans: answer,
                })
                break;
              }
              case 4: {
                that.setData({
                  bk: '',
                  zj1if: true,
                  zj2if: true,
                })
                var arr = new Array();
                var arr1 = new Array();
                var player1 = new Array();
                var player2 = new Array();
                if (compeleteCards.length == 52) {
                  for (var i = 0; i <= 11; i++) {
                    arr.push(compeleteCards[i]);
                    if (i === 3 || i === 7 || i === 9) i++;
                  }
                }
                arr1 = arr.splice(4, 5);
                player1 = arr.splice(0, 2);
                player2 = arr.splice(0, 2);
                for (var i = 0; i < 5; i++) {
                  player1.push(arr1[i]);
                }
                for (var i = 0; i < 5; i++) {
                  player2.push(arr1[i]);
                }
                console.log(player1, player2);
                var rank1 = JudgeCards(player1);
                var rank2 = JudgeCards(player2);
                console.log(rank1, rank2);
                if (rank1 > rank2) {
                  wx.showToast({
                    title: '你输了',
                    icon: 'none',
                    duration: 2000
                  })
                  sleep(5000);
                  if (p2cm < 20) {
                    that.setData({
                      modalHidden2: false,
                    })
                  } else {
                    that.setData({
                      modalHidden1: false,
                    })
                  }
                  p1dz = 20, p2dz = 20;
                  p2cm = p2cm - 20;
                } else if (rank1 < rank2) {
                  p2cm = p1dz + p2dz;
                  p1dz = 20, p2dz = 20;
                  wx.showToast({
                    title: '你赢了',
                    icon: 'none',
                    duration: 2000
                  })
                  sleep(5000);
                  that.setData({
                    cm: p2cm - p2dz,
                    modalHidden1: false,
                  })
                } else {
                  p2cm = p2dz;
                  p1dz = 20, p2dz = 20;
                  wx.showToast({
                    title: '平手',
                    icon: 'none',
                    duration: 2000
                  })
                  sleep(5000);
                  that.setData({
                    cm: p2cm - p2dz,
                    modalHidden1: false,
                  })
                }
                break;
              }
            }
          }
          pln = 2;
        }
      } else {
        wx.showToast({
          title: '场上赌注相同，不能进行此操作',
          icon: 'none',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: '现在是庄家回合，不能进行此操作',
        icon: 'none',
        duration: 2000
      })
    }
  },

  Raise: function (e) { //加注
    var that = this;
    if (pln === 2) {
      var arr = e.detail.value;
      var jiazhu = arr[0] * 10000 + arr[1] * 1000 + arr[2] * 100 + arr[3] * 10 + arr[4];
      if (p2cm < jiazhu) {
        wx.showToast({
          title: '你没有足够的筹码，不能进行此操作',
          icon: 'none',
          duration: 2000
        })
      } else if ((p2dz + jiazhu)<p1dz){
        wx.showToast({
          title: '加注数值不足，不能进行此操作',
          icon: 'none',
          duration: 2000
        })
      }else {
        p2cm = p2cm - jiazhu;
        p2cm2 = p2cm;
        p2dz = p2dz + jiazhu;
        this.setData({
          multiIndex: e.detail.value,
          wjdz: p2dz,
          cm: p2cm,
        })
        pln = 1;
        var p1cz = Npc();
        if (p1cz === '弃牌') {
          p2cm = p2cm + p1dz + p2dz;
          p2cm2 = p2cm;
          that.setData({
            modalHidden1: false,
            bk: '',
            zj1if: true,
            zj2if: true,
            gg1if: true,
            gg2if: true,
            gg3if: true,
          })
        } else {
          that.setData({
            zjdz: p1dz,
          })
          switch (round) {
            case 1: {
              that.setData({
                gg1if: true,
              })
              var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7]];
              var answer = tishi(arr);
              that.setData({
                ans: answer,
              })
              break;
            }
            case 2: {
              that.setData({
                gg2if: true,
              })
              var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9]];
              var answer = tishi(arr);
              that.setData({
                ans: answer,
              })
              break;
            }
            case 3: {
              that.setData({
                gg3if: true,
              })
              var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9], compeleteCards[11]];
              var answer = tishi(arr);
              that.setData({
                ans: answer,
              })
              break;
            }
            case 4: {
              that.setData({
                bk: '',
                zj1if: true,
                zj2if: true,
              })
              var arr = new Array();
              var arr1 = new Array();
              var player1 = new Array();
              var player2 = new Array();
              if (compeleteCards.length == 52) {
                for (var i = 0; i <= 11; i++) {
                  arr.push(compeleteCards[i]);
                  if (i === 3 || i === 7 || i === 9) i++;
                }
              }
              arr1 = arr.splice(4, 5);
              player1 = arr.splice(0, 2);
              player2 = arr.splice(0, 2);
              for (var i = 0; i < 5; i++) {
                player1.push(arr1[i]);
              }
              for (var i = 0; i < 5; i++) {
                player2.push(arr1[i]);
              }
              console.log(player1, player2);
              var rank1 = JudgeCards(player1);
              var rank2 = JudgeCards(player2);
              console.log(rank1, rank2);
              if (rank1 > rank2) {
                wx.showToast({
                  title: '你输了',
                  icon: 'none',
                  duration: 2000
                })
                sleep(5000);
                if (p2cm < 20) {
                  that.setData({
                    modalHidden2: false,
                  })
                } else {
                  that.setData({
                    modalHidden1: false,
                  })
                }
                p1dz = 20, p2dz = 20;
                p2cm = p2cm - 20;
              } else if (rank1 < rank2) {
                p2cm = p1dz + p2dz;
                p1dz = 20, p2dz = 20;
                wx.showToast({
                  title: '你赢了',
                  icon: 'none',
                  duration: 2000
                })
                sleep(5000);
                that.setData({
                  cm: p2cm - p2dz,
                  modalHidden1: false,
                })
              } else {
                p2cm = p2dz;
                p1dz = 20, p2dz = 20;
                wx.showToast({
                  title: '平手',
                  icon: 'none',
                  duration: 2000
                })
                sleep(5000);
                that.setData({
                  cm: p2cm - p2dz,
                  modalHidden1: false,
                })
              }
              break;
            }
          }
        }
        pln = 2;
      }
    } else {
      wx.showToast({
        title: '现在是庄家回合，不能进行此操作',
        icon: 'none',
        duration: 2000
      })
    }
  },

  Guo: function () { //过
    var that = this;
    if (pln === 2) {
      if (p1dz != p2dz) {
        wx.showToast({
          title: '桌上赌注不等，不能进行此操作',
          icon: 'none',
          duration: 2000
        })
      }else{
        pln = 1;
        var p1cz = Npc();
        if (p1cz === '弃牌') {
          p2cm = p2cm + p1dz + p2dz;
          p2cm2 = p2cm;
          that.setData({
            modalHidden1: false,
            bk: '',
            zj1if: true,
            zj2if: true,
            gg1if: true,
            gg2if: true,
            gg3if: true,
          })
        } else {
          that.setData({
            zjdz: p1dz,
          })
          switch (round) {
            case 1: {
              that.setData({
                gg1if: true,
              })
              var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7]];
              var answer = tishi(arr);
              that.setData({
                ans: answer,
              })
              break;
            }
            case 2: {
              that.setData({
                gg2if: true,
              })
              var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9]];
              var answer = tishi(arr);
              that.setData({
                ans: answer,
              })
              break;
            }
            case 3: {
              that.setData({
                gg3if: true,
              })
              var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9], compeleteCards[11]];
              var answer = tishi(arr);
              that.setData({
                ans: answer,
              })
              break;
            }
            case 4: {
              that.setData({
                bk: '',
                zj1if: true,
                zj2if: true,
              })
              var arr = new Array();
              var arr1 = new Array();
              var player1 = new Array();
              var player2 = new Array();
              if (compeleteCards.length == 52) {
                for (var i = 0; i <= 11; i++) {
                  arr.push(compeleteCards[i]);
                  if (i === 3 || i === 7 || i === 9) i++;
                }
              }
              arr1 = arr.splice(4, 5);
              player1 = arr.splice(0, 2);
              player2 = arr.splice(0, 2);
              for (var i = 0; i < 5; i++) {
                player1.push(arr1[i]);
              }
              for (var i = 0; i < 5; i++) {
                player2.push(arr1[i]);
              }
              console.log(player1, player2);
              var rank1 = JudgeCards(player1);
              var rank2 = JudgeCards(player2);
              console.log(rank1, rank2);
              if (rank1 > rank2) {
                wx.showToast({
                  title: '你输了',
                  icon: 'none',
                  duration: 2000
                })
                sleep(5000);
                if (p2cm < 20) {
                  that.setData({
                    modalHidden2: false,
                  })
                } else {
                  that.setData({
                    modalHidden1: false,
                  })
                }
                p1dz = 20, p2dz = 20;
                p2cm = p2cm - 20;
              } else if (rank1 < rank2) {
                p2cm = p1dz + p2dz;
                p1dz = 20, p2dz = 20;
                wx.showToast({
                  title: '你赢了',
                  icon: 'none',
                  duration: 2000
                })
                sleep(5000);
                that.setData({
                  cm: p2cm - p2dz,
                  modalHidden1: false,
                })
              } else {
                p2cm = p2dz;
                p1dz = 20, p2dz = 20;
                wx.showToast({
                  title: '平手',
                  icon: 'none',
                  duration: 2000
                })
                sleep(5000);
                that.setData({
                  cm: p2cm - p2dz,
                  modalHidden1: false,
                })
              }
              break;
            }
          }
        }
        pln = 2;
      }
    } else {
      wx.showToast({
        title: '现在是庄家回合，不能进行此操作',
        icon: 'none',
        duration: 2000
      })
    }
  },

  Allin: function () { //全押
    var that = this;
    if (pln === 2) {
      if (p2cm > 0) {
        p2dz = p2cm + p2dz;
        p2cm2 = p2cm;
        p2cm = 0;
        that.setData({
          cm: p2cm,
          wjdz: p2dz,
        })
        pln = 1;
        var p1cz = Npc();
        while(round<=4){
          if (p1cz === '弃牌') {
            p2cm = p2cm + p1dz + p2dz;
            p2cm2 = p2cm;
            that.setData({
              modalHidden1: false,
              bk: '',
              zj1if: true,
              zj2if: true,
              gg1if: true,
              gg2if: true,
              gg3if: true,
            })
            break;
          } else {
            that.setData({
              zjdz: p1dz,
            })
            switch (round) {
              case 1: {
                that.setData({
                  gg1if: true,
                })
                var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7]];
                var answer = tishi(arr);
                that.setData({
                  ans: answer,
                })
                break;
              }
              case 2: {
                that.setData({
                  gg2if: true,
                })
                var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9]];
                var answer = tishi(arr);
                that.setData({
                  ans: answer,
                })
                break;
              }
              case 3: {
                that.setData({
                  gg3if: true,
                })
                var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9], compeleteCards[11]];
                var answer = tishi(arr);
                that.setData({
                  ans: answer,
                })
                break;
              }
              case 4: {
                that.setData({
                  bk: '',
                  zj1if: true,
                  zj2if: true,
                })
                var arr = new Array();
                var arr1 = new Array();
                var player1 = new Array();
                var player2 = new Array();
                if (compeleteCards.length == 52) {
                  for (var i = 0; i <= 11; i++) {
                    arr.push(compeleteCards[i]);
                    if (i === 3 || i === 7 || i === 9) i++;
                  }
                }
                arr1 = arr.splice(4, 5);
                player1 = arr.splice(0, 2);
                player2 = arr.splice(0, 2);
                for (var i = 0; i < 5; i++) {
                  player1.push(arr1[i]);
                }
                for (var i = 0; i < 5; i++) {
                  player2.push(arr1[i]);
                }
                console.log(player1, player2);
                var rank1 = JudgeCards(player1);
                var rank2 = JudgeCards(player2);
                console.log(rank1, rank2);
                if (rank1 > rank2) {
                  wx.showToast({
                    title: '你输了',
                    icon: 'none',
                    duration: 2000
                  })
                  sleep(5000);
                  that.setData({
                    modalHidden2: false,
                  })
                } else if (rank1 < rank2) {
                  p2cm = p1dz + p2dz;
                  p1dz = 20, p2dz = 20;
                  wx.showToast({
                    title: '你赢了',
                    icon: 'none',
                    duration: 2000
                  })
                  sleep(5000);
                  that.setData({
                    cm: p2cm - p2dz,
                    modalHidden1: false,
                  })
                } else {
                  p2cm = p2dz;
                  p1dz = 20, p2dz = 20;
                  wx.showToast({
                    title: '平手',
                    icon: 'none',
                    duration: 2000
                  })
                  sleep(5000);
                  that.setData({
                    cm: p2cm - p2dz,
                    modalHidden1: false,
                  })
                }
                break;
              }
            }
            round++;
          }
        }
        pln = 2;
      } else {
        wx.showToast({
          title: '你没有筹码，不能进行此操作',
          icon: 'none',
          duration: 2000
        })
      }
    } else {
      wx.showToast({
        title: '现在是庄家回合，不能进行此操作',
        icon: 'none',
        duration: 2000
      })
    }
  },

  Fold: function () { //弃牌
    var that = this;
    if (pln === 2) {
      if (p2cm < 20) {
        that.setData({
          modalHidden2: false,
          bk: '',
          zj1if: true,
          zj2if: true,
          gg1if: true,
          gg2if: true,
          gg3if: true,
        })
      } else {
        that.setData({
          modalHidden1: false,
          bk: '',
          zj1if: true,
          zj2if: true,
          gg1if: true,
          gg2if: true,
          gg3if: true,
        })
      }
      var arr = [compeleteCards[2], compeleteCards[3], compeleteCards[5], compeleteCards[6], compeleteCards[7], compeleteCards[9], compeleteCards[11]];
      var answer = tishi(arr);
      that.setData({
        ans: answer,
      })
    } else {
      wx.showToast({
        title: '现在是庄家回合，不能进行此操作',
        icon: 'none',
        duration: 2000
      })
    }
  },

  Exit: function () { //离开
    if (p2cm > app.globalData.user.jilu){
      app.globalData.user.jilu = p2cm;
      console.log(app.globalData.user.jilu);
      console.log(app.globalData.user);
      var Diary = Bmob.Object.extend("_User");
      var query = new Bmob.Query(Diary);
      query.get(app.globalData.user.id, {
        success: function (result) {
          // 回调中可以取得这个 diary 对象的一个实例，然后就可以修改它了
          result.set('jilu', p2cm);
          result.save();
          // The object was retrieved successfully.
        },
        error: function (object, error) {
          wx.showToast({
            title: '纪录失败',
            icon: 'none',
            duration: 2000
          })
        }
      })
    }
    wx.navigateBack({ delta: 1 });
  },

  modalCandel: function () { //取消
    pln=1;
    this.setData({
      modalHidden1: true,
      modalHidden2: true,
      buttonif: true,
    })
  },

  modalConfirm1: function () { //有筹码确定
    var that = this;
    var arr = new Array();
    p1dz = 20, p2dz = 20;
    p2cm = p2cm - p2dz;
    p2cm2 = p2cm;
    this.setData({
      modalHidden1: true,
      zj1if: false,
      zj2if: false,
      wjif: false,
      gg1if: false,
      gg2if: false,
      gg3if: false,
      ans:'',
      bk: cdbk,
      zjdz: p1dz,
      wjdz: p2dz,
      cm: p2cm,
    })
    SortCards();
    sleep(500);
    if (compeleteCards.length == 52) {
      for (var i = 0; i <= 11; i++) {
        arr.push(compeleteCards[i]);
        if (i === 3 || i === 7 || i === 9) i++;
      }
    }
    for (var i = 0; i <= 8; i++) {
      var arrtype = 'arraytext[' + i + '].type';
      var arrco = 'arraytext[' + i + '].co';
      var arrnum = 'arraytext[' + i + '].number';
      switch (arr[i].type) {
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
      switch (arr[i].number) {
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
            [arrnum]: arr[i].number,
          })
          break;
      }
    }
    console.log(compeleteCards);
    console.log(that.data.arraytext);
    sleep(500);
    this.setData({
      zj1if: true,
    })
    sleep(500);
    this.setData({
      wjif: true,
    })
    round =0;
  },

  modalConfirm2: function () { //无筹码确定
    var that = this;
    var arr = new Array();
    p1dz = 20, p2dz = 20;
    p2cm = 980;
    p2cm2 = p2cm;
    this.setData({
      modalHidden2: true,
      zj1if: false,
      zj2if: false,
      wjif: false,
      gg1if: false,
      gg2if: false,
      gg3if: false,
      ans: '',
      bk: cdbk,
      zjdz: p1dz,
      wjdz: p2dz,
      cm: p2cm,
    })
    SortCards();
    sleep(500);
    if (compeleteCards.length == 52) {
      for (var i = 0; i <= 11; i++) {
        arr.push(compeleteCards[i]);
        if (i === 3 || i === 7 || i === 9) i++;
      }
    }
    for (var i = 0; i <= 8; i++) {
      var arrtype = 'arraytext[' + i + '].type';
      var arrco = 'arraytext[' + i + '].co';
      var arrnum = 'arraytext[' + i + '].number';
      switch (arr[i].type) {
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
      switch (arr[i].number) {
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
            [arrnum]: arr[i].number,
          })
          break;
      }
    }
    console.log(compeleteCards);
    console.log(that.data.arraytext);
    sleep(500);
    this.setData({
      zj1if: true,
    })
    sleep(500);
    this.setData({
      wjif: true,
    })
    round = 0;
  },

  buttonTap: function(){
    var that = this;
    var arr = new Array();
    p1dz = 20, p2dz = 20;
    if(p2cm<20){
      p2cm = 980;
      p2cm2 = p2cm;
    }else{
      p2cm = p2cm - p2dz;
      p2cm2 = p2cm;
    }
    this.setData({
      modalHidden2: true,
      zj1if: false,
      zj2if: false,
      wjif: false,
      gg1if: false,
      gg2if: false,
      gg3if: false,
      buttonif: false,
      ans: '',
      bk: cdbk,
      zjdz: p1dz,
      wjdz: p2dz,
      cm: p2cm,
    })
    SortCards();
    sleep(500);
    if (compeleteCards.length == 52) {
      for (var i = 0; i <= 11; i++) {
        arr.push(compeleteCards[i]);
        if (i === 3 || i === 7 || i === 9) i++;
      }
    }
    for (var i = 0; i <= 8; i++) {
      var arrtype = 'arraytext[' + i + '].type';
      var arrco = 'arraytext[' + i + '].co';
      var arrnum = 'arraytext[' + i + '].number';
      switch (arr[i].type) {
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
      switch (arr[i].number) {
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
            [arrnum]: arr[i].number,
          })
          break;
      }
    }
    console.log(compeleteCards);
    console.log(that.data.arraytext);
    sleep(500);
    this.setData({
      zj1if: true,
    })
    sleep(500);
    this.setData({
      wjif: true,
    })
    round = 0;
    pln = 2;
  }
})

