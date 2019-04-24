// pages/warrant/warrant.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  bindGetUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    }, () => {
      this.getData()
    })

    //此处授权得到userInfo
    // console.log(e.detail.userInfo);

    //接下来写业务代码
  },
  getData: function () {
    app.Ajax(
      // 方法组名称为：User（代购用户），不是系统通用用户Users
      'Open',
      'POST',
      'MemberReg',
      { ...app.globalData.userInfo },
      function (json) {
        // console.log('json',json);
        if (json.success) {
          wx.switchTab({
            url: '../navHome/navHome',
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
})