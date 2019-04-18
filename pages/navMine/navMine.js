var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    getData:{},
    applyRecordData:{},
    disabled: false,
  },
  
//获取头像信息等
  onLoad: function () {
    // this.setData({
    //   sex:wx.getStorageSync('sex')
    // })
  },
 
  
 
  onShow: function (res) {
    this.getMainInfo();
  },
  getMainInfo:function(){
    const that = this;
    app.Ajax(
      'Plan',
      'POST',
      'TicketNum',
      {  },
      function (json) {
        // console.log('ajson',json);
        if (json.success) {
          that.setData({
            getData: json.data
          })
        }else{
          app.Toast('', 'none', 3000, json.msg.code);
          // wx.showToast({
          //   title: json.msg.msg,
          //   icon: 'none',
          //   duration: 2500
          // });
        }
      }
    )
  },
  gotoSystemInforms(){
    wx.navigateTo({
      url: '../systemInforms/systemInforms',
    })
  },
  gotoPrecautions(){
    wx.navigateTo({
      url: '../precautions/precautions',
    })
  },
  gotoUsedPassenger:function(){
    wx.navigateTo({
      url: '../usedPassenger/usedPassenger',
    })
  }
});


