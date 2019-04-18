Page({
  data: {
    noRecord:'暂无船期',
    paramsData:'',
    date:'',
    ticketForm: {
      ticketList: [
        {
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
          ]
        }
      ]
    }
  },
  
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
    // const ticketForm = JSON.parse(options)
    // console.log('options', JSON.parse(options.params))
    this.setData({
      'ticketForm.ticketList': JSON.parse(options.params).shiplist,
      date: JSON.parse(options.params).date,
      paramsData: JSON.parse(options.params).paramsData
    })
    var that = this;
  },

  gotoOrderFill(e){
    // console.log(e.currentTarget.dataset)
    // var index = e.currentTarget.dataset.index;
    // var id = this.data.ticketForm.ticketList[index].id;
    // console.log(id);
    wx.navigateTo({
      url: '../orderFill/orderFill?params=' + JSON.stringify(e.currentTarget.dataset.detail)
    })
  }
 
})