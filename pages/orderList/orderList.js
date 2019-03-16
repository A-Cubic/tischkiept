var sliderWidth = 70; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    getData: {
      allList:[
        {
          shopName: 'shopName',
          address: '桃花岛-华山 k2222',
          time:'2019.08.02 11:08 - 12:02',
          buyers:['黄老邪','米老鼠'],
          total: 'total',
          rate: 'rate',
          money: 'money',
          payState:1
        },{
          shopName: 'shopName',
          address: '桃花岛-华山 k2222',
          time:'2019.08.02 11:08 - 12:02',
          buyers:['黄老邪','米老鼠'],
          total: 'total',
          rate: 'rate',
          money: 'money',
          payState:1
        }
      ],
      unpaidList:[],
      havePaid:[],
      refundedList:[]

    },
    tabs: ["全部订单","待支付", "已支付", "已退票"],
    payState:['待支付','已支付','已退款'],
    noRecord:'暂无订单',
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
    // this.getMainList()
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