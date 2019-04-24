const app = getApp();
Page({
  data: {
    usedPassengerForm: [
      // {
      //   passengerName: '刘刚',
      //   passengerId: '111111111111',
      //   passengerCard:'343512312132132',
      //   passengerType:'001',
      //   passengerCardType:'1',
      //   type: 0,
      //   passengerTel: '13124567890'
      // }
    ]
  },
  

  onShow: function () {
    this.getUsedPassenger();
  },

  // 获取乘客列表 及已选择乘客
  getUsedPassenger: function () {
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetPassenger',
      {},
      function (json) {
        // console.log('aaa',json);
        if (json.success) {
          that.setData({
            usedPassengerForm: json.data
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
    // this.setData({
    //   'usedPassengerForm.list': list
    // });
  },

  //确定选择
  gotoAddPassenger: function () {
    wx.navigateTo({
      url: '../../pages/addPassenger/addPassenger',
    })
  },

  //删除 
  deletePassenger:function(e){
    console.log(e.currentTarget.dataset.passengerid)

    const that = this;
    app.Ajax(
      'User',
      'POST',
      'DelPassenger',
      { passengerId: e.currentTarget.dataset.passengerid},
      function (json) {
        // console.log('aaa',json);
        if (json.success) {
          app.Toast('删除成功', 'success', 2000);
          setTimeout(function(){
            that.getUsedPassenger();
          },2000)
          
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

 
})