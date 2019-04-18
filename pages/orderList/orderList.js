var sliderWidth = 70; // 需要设置slider的宽度，用于计算中间位置
const app = getApp()
Page({
  data: {
    getData:{},
    getDataOld: {
      
      unpaid: [
        {
          shopName: 'shopName',
          address: '长海鸳鸯港-杏树屯港 獐子8号',
          time: '2019.08.02 11:08 - 12:02',
          buyers: ['张三', '李四'],
          total: 'total',
          rate: 'rate',
          money: 'money',
          payState: 0
        }, {
          shopName: 'shopName',
          address: '长海鸳鸯港-广鹿多落母港 通泰7号',
          time: '2019.08.02 11:08 - 12:02',
          buyers: ['黄老'],
          total: 'total',
          rate: 'rate',
          money: 'money',
          payState: 0
        }
      ],
      paid:[
        {
          shopName: 'shopName',
          address: '长海鸳鸯港-杏树屯港 獐子8号',
          time: '2019.08.02 11:08 - 12:02',
          buyers: ['张三', '李四'],
          total: 'total',
          rate: 'rate',
          money: 'money',
          payState: 1
        }, {
          shopName: 'shopName',
          address: '长海鸳鸯港-广鹿多落母港 通泰7号',
          time: '2019.08.02 11:08 - 12:02',
          buyers: ['黄老'],
          total: 'total',
          rate: 'rate',
          money: 'money',
          payState: 1
        }
      ],
      refund:[
        {
          shopName: 'shopName',
          address: '长海鸳鸯港-杏树屯港 獐子8号',
          time: '2019.08.02 11:08 - 12:02',
          buyers: ['张三'],
          total: 'total',
          rate: 'rate',
          money: 'money',
          payState: 2
        }, {
          shopName: 'shopName',
          address: '长海鸳鸯港-广鹿多落母港 通泰7号',
          time: '2019.08.02 11:08 - 12:02',
          buyers: ['黄老'],
          total: 'total',
          rate: 'rate',
          money: 'money',
          payState: 2
        }
      ]

    },
    
    tabs: ["待支付", "已支付", "已退票"],
    payState:['待支付','已支付','已退款'],
    payStateArr: ['初始化订单', '待付款', '已付款', '订单已取消', '已申请退票', '已退票'],
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
    console.log(e)
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
      'Plan',
      'POST',
      'GetBookingList',
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
  },
  gotoTicketDetails(e){
    // console.log(e.currentTarget.dataset)
    const that = this;
    app.Ajax(
      'Plan',
      'POST',
      'GetBookingListById',
      { billId: e.currentTarget.dataset.billid},
      function (json) {
        // console.log('aaa',json);
        if (json.success) {
          wx.navigateTo({
            url: '../../pages/ticketDetails/ticketDetails?params=' + JSON.stringify(json.data),
          })
        } else {
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