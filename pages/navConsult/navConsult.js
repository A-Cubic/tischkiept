// pages/navConsult/navConsult.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    consultList:[
      {
        addr:'警务室',
        phone:'123'
      }, {
        addr: '售票处',
        phone: '234'
      }, {
        addr: '咨询台',
        phone: '4565'
      }
    ],
    
    newsList:[
      {
        title:'学哲学使我们能够过上经过思虑的人生',
        time:'2019-03-16 18：03：03',
        url:'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/bannerEuropeanAmerican.jpg',
        reading:'20',
        type: 0,
      }, {
        title: '学哲学使我们能够过上经过思虑的人生',
        time: '2019-03-16 18：03：03',
        url: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/bannerEuropeanAmerican.jpg',
        reading: '22',
        type: 1
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsList();
  },
  getTelList(){
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetTel',
      {},
      function (json) {
        // console.log('json', json)
        if (json.success) {
          // that.imageLoad();
          that.setData({
            consultList: json.data
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
  },
  getNewsList(){
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetNews',
      {},
      function (json) {
        // console.log('json', json)
        if (json.success) {
          // that.imageLoad();
          that.setData({
            newsList: json.data
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
  },
  togoPublicArticle(e){
    // console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: '../publicArticle/publicArticle?url=' + e.currentTarget.dataset.url,
    })
  },
  madeCall: function (e) {
    console.log(e.currentTarget.dataset.phone)
    wx.makePhoneCall({
      phoneNumber: e.currentTarget.dataset.phone // 仅为示例，并非真实的电话号码
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
})