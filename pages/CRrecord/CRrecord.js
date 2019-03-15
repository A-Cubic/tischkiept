var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    getData: {},
    tabs: ["处理中", "可提现", "已提现"],
    payState:['未申请','已申请','已提现'],
    payStateEx:['未申请提现','已申请现场提现','已申请银行卡提现'],
    noRecord:'您还没有相关记录哦',
    activeIndex: '',
    sliderOffset: 0,
    sliderLeft: 0,
    
  },
  onLoad: function (options) {
    var that = this;
    that.setData({
      activeIndex: options.num
      
    })
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex,
          
        });
      }
    });
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  onShow:function(){
    this.getMainList()
  },
  getMainList:function(){
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetMainList',
      {  },
      function (json) {
        // console.log('aaa',json);
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
  }
});