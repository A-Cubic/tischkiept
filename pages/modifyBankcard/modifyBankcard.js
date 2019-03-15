// pages/modifyPassport/modifyPassport.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bankcardUserName:'',
    bankName:'',
    subName:'',
    bankcardCode:'',
    disabled: true, 
  },
  userNameInput: function (e) {
    this.setData({
      bankcardUserName: e.detail.value
    })
  },
  bankInput: function (e) {
    this.setData({
      bankName: e.detail.value
    })
  },
  bankBranchInput: function (e) {
    this.setData({
      subName: e.detail.value
    })
  },
  numberInput: function (e) {
    this.setData({
      bankcardCode: e.detail.value
    })
  },


  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    app.Ajax(
      'User',
      'POST',
      'UpdateBankCard',
      { ...e.detail.value },
      function (json) {
        // console.log('jsonsubmit',json);
        if (json.success) {
          app.Toast('绑定成功', 'success', 2000);
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2000)
          
          // wx.showToast({
          //   title: '绑定成功',
          // })
        }else{
          app.Toast('', 'none', 3000, json.msg.code);
          // wx.showToast({
          //   title: '请重新绑定',
          //   icon: 'none'
          // })
        }
      }
    )
  },
  
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getBankCard();
  },
  getBankCard:function(){
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetBankCard',
      { },
      function (json) {
        // console.log('ajson',json);
        if (json.success) {
          that.setData({
            bankcardUserName: json.data.bankcardUserName,
            bankName: json.data.bankName,
            subName: json.data.subName,
            bankcardCode: json.data.bankcardCode,
          })
        }else{
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})