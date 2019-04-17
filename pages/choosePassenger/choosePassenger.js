const app =getApp()
Page({
  data: {
      passengerList: [],
      allPassengerTypes:[
        {
          passengerType:'001',
          val:'普通票'
        },
        {
          passengerType: '002',
          val: '学生票'
        },
        {
          passengerType: '004',
          val: '儿童票'
        },
        {
          passengerType: '005',
          val: '军人票'
        },
      ],
      passengerChecked:[],
  },
  
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
    // var that = this;
    // var checked = options.str.split(',');
    // this.getPassengerList(checked);
    // console.log('options', options)
    // if (options.str!=''){
      
    // }
    
  },
  onShow:function(){
    this.setData({
      passengerChecked: app.globalData.passengerChecked
    })
    // console.log('app.globalData', app.globalData)
    this.getPassengerList()
  },
  gotoPassenger:function(){
    wx.navigateTo({
      url: '../addPassenger/addPassenger',
    })
  },
  // 获取乘客列表 及已选择乘客
  getPassengerList: function () {
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetPassenger',
      {},
      function (json) {
        // console.log('aaa',json);
        if (json.success) {
          json.data.map(item=>{
            that.data.allPassengerTypes.map(i=>{
              if (item.passengerType == i.passengerType){
                item.passengerTypeVal = i.val
              }
            })
            if (that.data.passengerChecked!=''){
              that.data.passengerChecked.map(j=>{
                if (j == item.passengerId){
                  item.checked = true
                }
              })
            }

          })
          that.setData({
            passengerList: json.data
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
  
    // for (var i = 0; i < this.data.passengerForm.passengerList.length; i++) {
    //   for (var j = 0; j < checked.length; j++) {
    //     if (this.data.passengerForm.passengerList[i].userId == checked[j]) {
    //       var passengerChecked = 'passengerForm.passengerList[' + i + '].checked';
    //       this.setData({
    //         [passengerChecked]: true
    //       });
    //     }
    //   }
    // }
  },
  checkboxChange(e){
    // console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    this.setData({
      passengerChecked: e.detail.value
    })
    app.globalData.passengerChecked = e.detail.value
  },
  //确定选择
  submitChecked: function () {
    // console.log(app.globalData.passengerChecked)
    // var list = [];
    // var checkedStr = '';
    // this.data.passengerForm.passengerList.forEach((item) => {
    //   if (item.checked == true) {
    //     list.push(item.userId);
    //   }
    // }); 
    // checkedStr = list.join(',');
    wx.navigateBack({
      delta: 1
    });
    // wx.redirectTo({
    //   url: '../ticketDetails/ticketDetails?checkedStr=' + checkedStr
    // })
  }
 
})