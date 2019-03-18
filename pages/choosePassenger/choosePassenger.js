Page({
  data: {
    passengerForm: {
      passengerList: []
    }
  },
  
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    var that = this;
    var checked = options.str.split(',');
    this.getPassengerList(checked);
  },
  gotoPassenger:function(){
    wx.navigateTo({
      url: '../addPassenger/addPassenger',
    })
  },
  // 获取乘客列表 及已选择乘客
  getPassengerList: function (checked) {
    var list = [
      {
        name: '刘刚',
        userId: '111111111111',
        type: 0,
        phone: '13124567890',
        checked: false
      },
      {
        name: '王鹏',
        userId: '222222222222',
        type: 1,
        phone: '13245678234',
        checked: false
      },
      {
        name: '李玲',
        userId: '333333333333',
        type: 0,
        phone: '13577889923',
        checked: false
      },
      {
        name: '张正',
        userId: '444444444444',
        type: 0,
        phone: '13765462890',
        checked: false
      }
    ];
    this.setData({
      'passengerForm.passengerList': list
    });
    for (var i = 0; i < this.data.passengerForm.passengerList.length; i++) {
      for (var j = 0; j < checked.length; j++) {
        if (this.data.passengerForm.passengerList[i].userId == checked[j]) {
          var passengerChecked = 'passengerForm.passengerList[' + i + '].checked';
          this.setData({
            [passengerChecked]: true
          });
        }
      }
    }
  },

  //确定选择
  submitChecked: function () {
    var list = [];
    var checkedStr = '';
    this.data.passengerForm.passengerList.forEach((item) => {
      if (item.checked == true) {
        list.push(item.userId);
      }
    }); 
    checkedStr = list.join(',');
    wx.navigateBack({
      checkedStr: checkedStr
    });
    // wx.redirectTo({
    //   url: '../ticketDetails/ticketDetails?checkedStr=' + checkedStr
    // })
  }
 
})