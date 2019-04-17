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
        {
          name: '刘刚',
          userId: '111111111111',
          type: 0,
          phone: '13124567890',
        },
        {
          name: '李玲',
          userId: '333333333333',
          type: 0,
          phone: '13577889923',
        },
      ],
      phone: '13245678900',
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

  addPassenger () {
    var list = [];
    var str = '';
    this.data.paramsData.personList.forEach((item) => {
      list.push(item.userId);
    }) 
    str = list.join(',');
    wx.navigateTo({
      url: '../choosePassenger/choosePassenger?str=' + str
    })
  },
 
})