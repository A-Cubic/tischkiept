// pages/ticketDetails/ticketDetails.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    payTime: 1,
    paystate:1,
    // payStateArr: ['待支付', '已支付', '已退款'],
    payStateArr: ['初始化订单', '待支付', '已支付', '订单已取消','已申请退票','已退票'],
    alert: '您已成功占座，请在下单后30分钟之内完成支付，避免订单超时',
    getData:{},
    getDataOld:{
      ticketMessage:{
        num: '2323421',
        lineName: '通泰7号',
        startPlace: '长海鸳鸯港',
        endPlace: '广鹿多落母港',
        startDate: '2017-11-11',
        endDate: '2017-11-11',
        startTime: '8:30',
        endTime: '13:00',
      },
      ticketPassengers:[
        {
          name: '张三',
          idCard: '2743******4872',
          paystate:0,
          price: 1000,
          seat: '02排07号',
          type:0,
        }, {
          name: '李四',
          idCard: '2743******4872',
          paystate: 0,
          price: 1000,
          seat: '02排08号',
          type: 1,
        }
      ],
      ticketList:[
        {
          num:'2323421',
          id: 'a1111111111',
          imgUrl: 'http://img.ui.cn/data/file/0/2/7/751720.jpg',
          lineName: '通泰7号',
          startPlace: '长海鸳鸯港',
          endPlace: '广鹿多落母港',
          startDate: '2017-11-11',
          endDate: '2017-11-11',
          startTime: '8:30',
          endTime: '13:00',
          allTime: '4.5小时',
          price: 1000,
          name:'黄秋生',
          idCard:'2743******4872',
          seat:'02排07号'
        },
        {
          num: '2323421',
          id: 'a1111111111',
          imgUrl: 'http://img.ui.cn/data/file/0/2/7/751720.jpg',
          lineName: '通泰7号',
          startPlace: '长海鸳鸯港',
          endPlace: '广鹿多落母港',
          startDate: '2017-11-11',
          endDate: '2017-11-11',
          startTime: '8:30',
          endTime: '13:00',
          allTime: '4.5小时',
          price: 1000,
          name: '黄秋生',
          idCard: '2743******4872',
          seat: '02排07号'
        },
        {
          num: '2323421',
          id: 'a1111111111',
          imgUrl: 'http://img.ui.cn/data/file/0/2/7/751720.jpg',
          lineName: '通泰7号',
          startPlace: '长海鸳鸯港',
          endPlace: '广鹿多落母港',
          startDate: '2017-11-11',
          endDate: '2017-11-11',
          startTime: '8:30',
          endTime: '13:00',
          allTime: '4.5小时',
          price: 1000,
          name: '黄秋生',
          idCard: '2743******4872',
          seat: '02排07号'
        }
      ]
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    this.setData({
      getData: JSON.parse(options.params)
    })
    // console.log(this.data.getData)
  },
  cancelOrder(e) {
    // console.log(e.currentTarget.dataset)
    const that = this;
    app.Ajax(
      'Plan',
      'POST',
      'ReturnBill',
      { billId: e.currentTarget.dataset.billid },
      function (json) {
        // console.log('aaa',json);
        if (json.success) {
          app.Toast('订单已取消', 'success', 2000, );
          setTimeout(function(){
            wx.switchTab({
              url: '../../pages/navMine/navMine',
            })
          },1500)
          
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

  },
  refundTicket(e){
    const that = this;
    app.Ajax(
      'Plan',
      'POST',
      'ReturnTicket',
      { 
        billId: e.currentTarget.dataset.billid,
        id: e.currentTarget.dataset.id
       },
      function (json) {
        // console.log('aaa',json);
        if (json.success) {
          app.Toast('退票处理中', 'none', 2000);
          setTimeout(function () {
            wx.navigateBack({
              delta: 1,
            })
          }, 1500)

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
  },
  gotoPayment(){
    var that = this;
    app.Ajax(
      'Payment',
      'POST',
      'Payment',
      {
        billId: this.data.getData.billId
      },
      function (json) {
        if (json.success) {
          wx.requestPayment({
            'timeStamp': json.data.timeStamp,
            'nonceStr': json.data.nonceStr,
            'package': json.data.package,
            'signType': 'MD5',
            'paySign': json.data.paySign,
            'success': function (res) {
              // console.log("ok");
              // console.log(res);
              that.finishPaySend(json.data.billId);
              setTimeout(function () {
                console.log('')
                wx.reLaunch({
                  url: '../orderList/orderList?num=1'
                })
              },500)
            },
            'fail': function (res) {
              // app.Toast('', 'none', 3000, json.msg.code);
              wx.showModal({
                title: "支付失败",
                content: "请重新支付",
                showCancel: false,
                confirmText: "确定"
              })
            }
          })
        } else {
          wx.showModal({
            title: "支付失败",
            content: "请重新支付",
            showCancel: false,
            confirmText: "确定"
          })
        }

      }
    );
  },
  finishPaySend: function (billId) {
    // console.log(billId);
    var that = this;
    app.Ajax(
      'Payment',
      'POST',
      'SendPaymentMsg',
      { orderId: billId },
      function (json) {
        if (json.success) {
          // console.log('111111111')
          
          // console.log('yesssss')
        } else {
          // console.log(that.data.payTime)
          if (that.data.payTime < 3) {
            var curPayTime = that.data.payTime += 1
            that.setData({
              payTime: curPayTime
            })
            setTimeout(
              that.finishPaySend
              , 5000, billId)
          }
        }
      })
  },

})