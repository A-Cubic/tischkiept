Page({
  data: {
    usedPassengerForm: {
      list: []
    }
  },
  
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    // var that = this;
    // var checked = options.str.split(',');
    this.getUsedPassenger();
  },

  // 获取乘客列表 及已选择乘客
  getUsedPassenger: function () {
    var list = [
      {
        name: '刘刚',
        userId: '111111111111',
        type: 0,
        phone: '13124567890'
      },
      {
        name: '王鹏',
        userId: '222222222222',
        type: 1,
        phone: '13245678234'
      },
      {
        name: '李玲',
        userId: '333333333333',
        type: 0,
        phone: '13577889923'
      },
      {
        name: '张正',
        userId: '444444444444',
        type: 0,
        phone: '13765462890'
      }
    ];
    this.setData({
      'usedPassengerForm.list': list
    });
  },

  //确定选择
  gotoAddPassenger: function () {
    wx.navigateTo({
      url: '../../pages/addPassenger/addPassenger',
    })
  }

 
})