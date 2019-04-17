// pages/modifyPassport/modifyPassport.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    allPassengerTypesIndex:0,
    allPassengerTypes: ['普通票', '学生票', '儿童票','军人票'],
    allPassengerTypesNum:['001','002','004','005'],
    allPassengerCardTypesIndex: 0,
    allPassengerCardTypes:['身份证','护照','军人证'],
    allPassengerCardTypesNum:[1,2,3],
    // adultTicket:'成人票',
    // idCard: '身份证',
    passengerType:'001',
    passengerName:'',
    passengerCardType:1,
    passengerCard:'',
    disabled: true, 
  },
 
  passengerNameInput: function (e) {
    this.setData({
      passengerName: e.detail.value
    })
  },

  idCardCodeInput: function (e) {
    this.setData({
      passengerCard: e.detail.value
    })
  },
  bindPickerAllPassengerTypesChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      allPassengerTypesIndex: e.detail.value,
      passengerType: this.data.allPassengerTypesNum[e.detail.value]
    })
  },
  bindPickerAllPassengerCardTypesChange(e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      allPassengerCardTypesIndex: e.detail.value,
      passengerCardType: this.data.allPassengerCardTypesNum[e.detail.value]
    })
  },

  formSubmit: function (e) {
    
    const params ={
      passengerType: this.data.passengerType,
      passengerCardType: this.data.passengerCardType,
      ...e.detail.value
    }
    console.log('form发生了submit事件，携带数据为：', params)
    app.Ajax(
      'User',
      'POST',
      'AddPassenger',
      { ...params },
      function (json) {
        // console.log('jsonsubmit',json);
        if (json.success) {
          app.Toast('绑定成功', 'success', 2000);
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },2000)

        }else{
          app.Toast('', 'none', 3000, json.msg.code);

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
  }


})