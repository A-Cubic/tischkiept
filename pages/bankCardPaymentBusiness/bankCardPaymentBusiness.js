const app = getApp()
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
Page({

  /**
   * 页面的初始数据
   */
  data: {
    noRecord: '您还没有相关记录哦',
    inputShowed: false,
    inputVal: "",
    tabs: ["待付款", "已付款"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    getData: {},
    
  },
  previewImg: function (e) {
    wx.previewImage({
      urls: [e.currentTarget.dataset.payimg]
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
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

  //添加消费记录扫描二维码 成功或失败
  toSweepOrder: function () {
    var that = this;
    var show;
    wx.scanCode({
      success: (res) => {
        this.show = "结果:" + res.result + "二维码类型:" + res.scanType + "字符集:" + res.charSet + "路径:" + res.path;
        that.setData({
          show: this.show
        })
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })
        wx.navigateTo({
          url: '../QRCodePayment/QRCodePayment',

        })

      },
      fail: (res) => {
        wx.showToast({
          title: '失败',
          icon: 'loading',
          duration: 2000
        })
      },
      complete: (res) => {
      }
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getPayList();
  },
  getPayList: function () {
    const that = this;
    app.Ajax(
      'Staff',
      'POST',
      'GetPayList',
      { payType: 1 },
      function (json) {
        // console.log('sdsfdsds', json);
        if (json.success) {
          that.setData({
            getData: json.data
          })
        } else {
          app.Toast('', 'none', 2500, json.msg.code)
        }
      }
    )
  },
  getPayDetails: function (e) {
    // console.log(e.currentTarget.dataset)
    const that = this;
    wx.navigateTo({
      url: '../bankCardPaymentDetails/bankCardPaymentDetails?params=' + JSON.stringify(e.currentTarget.dataset),
    })
  },

})