const app = getApp();
Page({
  data: {
    alert: '优先按照制定作息出票',
    ticketForm: {
      planId: 'a1111111111',
      imgUrl: 'http://img.ui.cn/data/file/0/2/7/751720.jpg',
      shipName: '通泰7号',
      fromPort: '长海鸳鸯港',
      toPort: '广鹿多落母港',
      departureTime: '8:30',
      arriveTime: '13:00',
      sailingTime: '4.5小时',
      price: 1000,
      explain: '',
      status: 0,
      gradeList: [
        {
          gradeId: "021",
          gradeName: '软座',
          ticketLeft: '0'
        },
        {
          label: '硬卧',
          val: '有票'
        },
        {
          label: '软卧',
          val: '有票'
        },
        {
          label: '无座',
          val: '有票'
        }
      ],
      
      
      
      price: 10,
      num: 1
    },
    paramsData:{
      personList: [
        // {
        //   passengerName: '刘刚',
        //   passengerId:1,
        //   passengerCard: '111111111111',
        //   passengerType: 0,
        // },
        // {
        //   passengerName: '李玲',
        //   passengerId: 2,
        //   passengerCard: '333333333333',
        //   passengerType: 0,
        // },
      ],
      phone: '',
    }
  },
  
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    console.log('options', JSON.parse(options.params))
    this.setData({
      ticketForm: JSON.parse(options.params)
    })
    var that = this;
  },
  onShow:function(){
    this.getPassengerList();
  },
  getPassengerList: function (checked) {
    const that = this;
    app.Ajax(
      'User',
      'POST',
      'GetPassenger',
      {},
      function (json) {
        // console.log('aaa',json);
        if (json.success) {
          let list = []
          json.data.map(item=>{
            app.globalData.passengerChecked.map(i=>{
              if (item.passengerId==i){
                list.push(item)
              }
            })
          })
          that.setData({
            'paramsData.personList': list
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
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
  addPassenger () {
    app.globalData.passengerChecked=[];
    if (this.data.paramsData.personList!=''){
      this.data.paramsData.personList.map((item)=>{
        app.globalData.passengerChecked.push(item.passengerId)
      })
    }
    // console.log('sss', app.globalData.passengerChecked)
    // var list = [];
    // var str = '';
    // this.data.paramsData.personList.forEach((item) => {
    //   list.push(item.passengerId);
    // }) 
    // str = list.join(',');
    // wx.navigateTo({
    //   url: '../choosePassenger/choosePassenger?str=' + str
    // })
    wx.navigateTo({
      url: '../choosePassenger/choosePassenger'
    })
  },
  deletePassenger(e){
    // console.log(e.currentTarget.dataset.passengerid)
    let list = this.data.paramsData.personList
    list.map((item,index)=>{
      if (item.passengerId == e.currentTarget.dataset.passengerid){
        list.splice(index, 1);
        this.setData({
          'paramsData.personList':list
        })
      }
    })
  },
  bindPhoneInput(e){
    this.setData({
      'paramsData.phone': e.detail.value
    })
  },
  gotoTicketDetails:function(){
    const params = {
      planId: this.data.ticketForm.planId,
      gradeId: this.data.ticketForm.gradeList[0].gradeId,
      passengerList: this.data.paramsData.personList,
      mobile: this.data.paramsData.phone
    }
    const that = this;
    app.Ajax(
      'Plan',
      'POST',
      'BookingTicket',
      { ...params},
      function (json) {
        // console.log('aaa',json);
        if (json.success) {
          wx.navigateTo({
            url: '../ticketDetails/ticketDetails',
          })
        } else {
          app.Toast('', 'none', 3000, json.msg.code);
        }
      }
    )

   
  }
})