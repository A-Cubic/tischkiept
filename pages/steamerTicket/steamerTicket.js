Page({
  data: {
    ticketForm: {
      ticketToyal: 2,
      ticketList: [
        {
          id: 'a1111111111',
          imgUrl: 'http://img.ui.cn/data/file/0/2/7/751720.jpg',
          lineName: '通泰7号',
          startPlace: '长海鸳鸯港',
          endPlace: '广鹿多落母港',
          startTime: '8:30',
          endTime: '13:00',
          allTime: '4.5小时',
          price: 1000,
          explain: '',
          status: 0,
          seatList: [
            {
              label: '软座',
              val: '有票'
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
        },
        {
          id: 'a22222222222',
          imgUrl: 'http://img.ui.cn/data/file/9/7/0/626079.gif',
          lineName: '通泰7号',
          startPlace: '长海鸳鸯港',
          endPlace: '广鹿多落母港',
          startTime: '16:30',
          endTime: '19:30',
          allTime: '3小时',
          price: 1000,
          explain: '',
          status: 1,
          seatList: [
            {
              label: '硬座',
              val: '有票'
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
        },
        {
          id: 'a333333333333',
          imgUrl: 'http://img.ui.cn/data/file/9/7/0/626079.gif',
          lineName: '通泰7号',
          startPlace: '长海鸳鸯港',
          endPlace: '广鹿多落母港',
          startTime: '16:30',
          endTime: '19:30',
          allTime: '3小时',
          price: 1000,
          explain: '',
          status: 2,
          seatList: [
            {
              label: '硬座',
              val: '有票'
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
        },
        {
          id: 'a333333333333',
          imgUrl: 'http://img.ui.cn/data/file/9/7/0/626079.gif',
          lineName: '通泰7号',
          startPlace: '长海鸳鸯港',
          endPlace: '广鹿多落母港',
          startTime: '16:30',
          endTime: '19:30',
          allTime: '3小时',
          price: 1000,
          explain: '',
          status: 2,
          seatList: [
            {
              label: '硬座',
              val: '有票'
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
        },
        {
          id: 'a333333333333',
          imgUrl: 'http://img.ui.cn/data/file/9/7/0/626079.gif',
          lineName: '通泰7号',
          startPlace: '长海鸳鸯港',
          endPlace: '广鹿多落母港',
          startTime: '16:30',
          endTime: '19:30',
          allTime: '3小时',
          price: 1000,
          explain: '',
          status: 2,
          seatList: [
            {
              label: '硬座',
              val: '有票'
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
    
    var that = this;
  },

  examineIt(e){
    var index = e.currentTarget.dataset.index;
    var id = this.data.ticketForm.ticketList[index].id;
    console.log(id);
    wx.navigateTo({
      url: '../orderFill/orderFill?id=' + id
    })
  }
 
})