Page({
  data: {
    ticketForm: {
      id: 'a1111111111',
      imgUrl: 'http://img.ui.cn/data/file/0/2/7/751720.jpg',
      lineName: 'K3456',
      startPlace: '海南',
      endPlace: '烟台',
      startDate: '2017-11-11',
      endDate: '2017-11-11',
      startTime: '8:30',
      endTime: '13:00',
      allTime: '4.5小时',
      price: 1000,
      explain: '',
      status: 0,
      seatList: [
        {
          id: 'qweqwe234255',
          seat: '一等座',
          status: '有票',
          price: 10,
          num: 99
        },
        {
          id: 'hgfjbhlf435543',
          seat: '二等座',
          status: '有票',
          price: 20,
          num: 40
        },
        {
          id: 'vdsfgdbg547656',
          seat: '商务座',
          status: '有票',
          price: 30,
          num: 10
        },
        {
          id: 'hfgnbvczxcas4543543',
          seat: '无座',
          status: '有票',
          price: 10,
          num: 20
        }
      ],
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
      alert: '优先按照制定作息出票，若无指定坐席，将转购其他坐席',
      phone: '13245678900',
      price: 10,
      num: 1
    }
  },
  
  // 生命周期函数--监听页面加载
  onLoad: function (options) {
    
    var that = this;
  },

  addPassenger () {
    var list = [];
    var str = '';
    this.data.ticketForm.personList.forEach((item) => {
      list.push(item.userId);
    }) 
    str = list.join(',');
    wx.navigateTo({
      url: '../choosePassenger/choosePassenger?str=' + str
    })
  },
 
})