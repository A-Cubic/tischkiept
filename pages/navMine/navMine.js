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
    this.setData({
      sex:wx.getStorageSync('sex')
    })
  },
  iphone: function(){
    wx.navigateTo({
      url: '../modifyPhone/modifyPhone',
    })
  },
  card: function () {
    wx.navigateTo({
      url: '../modifyBankcard/modifyBankcard',
    })
  },
  applyRecord:function(e){
    // console.log(e.currentTarget.dataset.paytype)
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'ApplyRecord',
      { payType: e.currentTarget.dataset.paytype},
      function (json) {
        // console.log('jsonsss',json);
        if (json.success) {
          that.setData({
            applyRecordData: json.data
          },()=>{
            that.setModalStatus(e);
            
          }
          )
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
  //弹窗
  setModalStatus: function (e) {
    const that = this;
    // console.log("设置显示状态，1显示0不显示", e.currentTarget.dataset.status);
    if (e.currentTarget.dataset.status == 1) {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }else if (e.currentTarget.dataset.status == 0) {
        this.setData(
          {
            showModalStatus: false
          },()=>{
            that.getMainInfo();
          }
        );
      }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (res) {
    this.getMainInfo();
  },
  getMainInfo:function(){
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetMainInfo',
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
});


