// pages/modifyPassport/modifyPassport.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adultTicket:'成人票',
    passengerName:'',
    idCard:'身份证',
    idCardCode:'',
    disabled: true, 
  },
 
  passengerNameInput: function (e) {
    this.setData({
      passengerName: e.detail.value
    })
  },
  idCardInput: function (e) {
    this.setData({
      idCard: e.detail.value
    })
  },
  idCardCodeInput: function (e) {
    this.setData({
      idCardCode: e.detail.value
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
    // this.getBankCard();
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
            passengerName: json.data.passengerName,
            idCard: json.data.idCard,
            idCardCode: json.data.idCardCode,
          })
        }else{
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )
  },
})