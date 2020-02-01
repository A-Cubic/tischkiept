// pages/uploadBankcard/uploadBankcard.js
//获取应用实例
const app = getApp()
Page({

  data: {
    allData:{
      listHome:[
        // {
        //   img:'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/bannerEuropeanAmerican.jpg'
        // },
        // {
        //   img: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/bannerEuropeanAmerican.jpg'
        // }
      ],
      listShop:[]
    },
    index:0,
    address: [], 
    bannerList:[],  
    newsList: [],
    autoplay: true,//是否自动切换  
    indicatorDots: true,//是否显示圆点  
    interval: 5000,//自动切换间隔  
    duration: 500, //滑动动画时长  
    //indicatorColor: "rgba(255,255,255,0.24)",//滑动圆点颜色  
    //indicatorActiveColor: "white", //当前圆点颜色 
    indicatorColor: "blue",//滑动圆点颜色  
    indicatorActiveColor: "white", //当前圆点颜色
    current: 0, //当前所在页面的 index  
    circular: true,  //是否采用衔接滑动  
    imgheights: [],
    //图片宽度 
    imgwidth: 750,
    //默认  
    current: 0,
    today:'',
    nowDate:'',
    preData:'',
    paramsData:'',
    swiperH:1
  },
  onLoad: function () {
    this.getAddress();
    this.getBanner();
    this.getToday();
    this.getNewsList();
    this.CheckPlan();
    // this.getPreData();
  },
  onShow:function(){
   
  },
  getToday:function(){
    // let todayDate = new Date();
    // this.setData({
    //   today: todayDate.getMonth()+1 + '月' + todayDate.getDate() + '日'
    // })


    let date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let nowDate = year + "-" + month + "-" + day;

    this.setData({
      today: year+'年'+month + '月' + day + '日',
      nowDate: nowDate,
      paramsData: year.toString() + month.toString() + day.toString()
    })
  },
  getPreData:function(){
    let curDate = new Date();
    let preDate = new Date(curDate.getTime() - 24 * 60 * 60 * 1000) //前一天
    
    let year = preDate.getFullYear();
    let month = preDate.getMonth() + 1;
    let day = preDate.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let preData = year + "-" + month + "-" + day;

    this.setData({
      preData: preData
    })
  },
  getAddress:function(){
    const that = this;
    app.Ajax(
      'Open',
      'POST',
      'GetPort',
      { },
      function (json) {
        // console.log('json', json)
        if (json.success) {
          that.setData({
            address: json.data
          })
        }else{
          if (json.msg.code == 4000) {
            setTimeout(function () {
              that.getAddress();
            }, 2000)
          }
          // app.Toast('', 'none', 3000, json.msg.code);
          // wx.showToast({
          //   title: json.msg.msg,
          //   icon: 'none',
          //   duration: 2500
          // });
        }
      }
    )
  },
  getBanner: function () {
    const that = this;
    app.Ajax(
      'Open',
      'POST',
      'GetBanner',
      {},
      function (json) {
        // console.log('json', json)
        if (json.success) {
          that.setData({
            bannerList: json.data
          })
        } else {
          if (json.msg.code == 4000) {
            setTimeout(function () {
              that.getAddress();
            }, 2000)
          }
          // app.Toast('', 'none', 3000, json.msg.code);
          // wx.showToast({
          //   title: json.msg.msg,
          //   icon: 'none',
          //   duration: 2500
          // });
        }
      }
    )
  },
  bindPickerChange: function (e) {
    // console.log(e.detail.value)
    this.setData({ index: e.detail.value })
  },
  formSubmit: function (e) {
    const params = {
      dateFrom: this.data.paramsData,
      dateTo: this.data.paramsData,
      port: this.data.address[this.data.index]
    }
    // console.log('form发生了submit事件，携带数据为：', params)
    const that = this;
    app.Ajax(
      'Plan',
      'POST',
      'GetPlan',
      { ...params },
      function (json) {
        // console.log('json', json)
        if (json.success) {
          // that.setData({
          //   address: json.data
          // })
          const params = {
            ...json.data,
            paramsData: that.data.nowDate
          }
          wx.navigateTo({
            url: '../steamerTicket/steamerTicket?params=' + JSON.stringify(params)
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


    
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
  },
  madeCall: function () {
    wx.makePhoneCall({
      phoneNumber: '(0411)89896000' // 仅为示例，并非真实的电话号码
    })
  },
  goAddress: function () {
    wx.getLocation({//获取当前经纬度
      type: 'wgs84', //返回可以用于wx.openLocation的经纬度，官方提示bug: iOS 6.3.30 type 参数不生效，只会返回 wgs84 类型的坐标信息  
      success: function (res) {
        // console.log('ssss', res)
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude: 39.299960,//要去的纬度-地址122.516797,39.306283
          longitude: 122.5104,//要去的经度-地址
          name: "长海县鸳鸯港",
          address: '菜园子西屯75号'
        })
      }
    })
  },
  requestMsg() {
    return new Promise((resolve, reject) => {
      wx.requestSubscribeMessage({
        tmplIds: ["RY5-SOQ2J7JtXJR9luD9hrftaHhzFd3Fa_Wr3ZPqzZs"],
        success: (res) => {
          // if (res['yXq0HWLxwD-l3PDHZpyO0LSO1ov83mOyZ5CiugSyn08'] === 'accept') {
          //   wx.showToast({
          //     title: '订阅OK！',
          //     duration: 1000,
          //     success(data) {
          //       console.log('ssss', res)
          //     }
          //   })
          // }
          if (res['RY5-SOQ2J7JtXJR9luD9hrftaHhzFd3Fa_Wr3ZPqzZs'] === 'accept') {
            wx.showToast({
              title: '订阅OK！',
              duration: 1000,
              success(data) {
                console.log('ssss', res)
              }
            })
          }
        },
        fail(err) {
          //失败
          console.error(err);
          reject()
        }
      })
    })
  },
  gotoPrecautions() {
    wx.navigateTo({
      url: '../precautions/precautions',
    })
  },
  dateReduce() {
    var time = this.data.nowDate.split('-');

    var myTime = new Date(time[0], (time[1] - 1), time[2]);
    let date = new Date(myTime.getTime() - 24 * 60 * 60 * 1000)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let nowDate = year + "-" + month + "-" + day;

    this.setData({
      today: year + '年' +month + '月' + day + '日',
      nowDate: nowDate,
      paramsData: year.toString() + month.toString() + day.toString()
    })
  },
  dateAdd() {
    console.log('dateAdd', '2')
    var time = this.data.nowDate.split('-');

    var myTime = new Date(time[0], (time[1] - 1), time[2]);
    let date = new Date(myTime.getTime() + 24 * 60 * 60 * 1000)
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (month < 10) {
      month = "0" + month;
    }
    if (day < 10) {
      day = "0" + day;
    }
    let nowDate = year + "-" + month + "-" + day;

    this.setData({
      today: year + '年' +month + '月' + day + '日',
      nowDate: nowDate,
      paramsData: year.toString() + month.toString() + day.toString()
    })
  },
  callTele: function (e) {
    // console.log(e.currentTarget.dataset.tele)
    const te = e.currentTarget.dataset.tele;
    wx.makePhoneCall({
      phoneNumber: te // 仅为示例，并非真实的电话号码
    })
  },
  imageLoad: function (e) {//获取图片真实宽度  
    var winWid = wx.getSystemInfoSync().windowWidth; //获取当前屏幕的宽度
    var imgh = e.detail.height;//图片高度
    var imgw = e.detail.width;//图片宽度
    var swiperH = winWid * imgh / imgw    
    //等比设置swiper的高度。 即 屏幕宽度 / swiper高度 = 图片宽度 / 图片高度 ==》swiper高度 = 屏幕宽度 * 图片高度 / 图片宽度
    // console.log(swiperH)
    this.setData({
      swiperH: swiperH//设置高度
    })
  },

  gotoPlan: function (e) {
     console.log('w', e.currentTarget.dataset)

    const params = {
      dateFrom: this.data.paramsData,
      dateTo: this.data.paramsData,
      port: e.currentTarget.dataset.port,
    }
    // console.log('form发生了submit事件，携带数据为：', params)
    const that = this;
    app.Ajax(
      'Plan',
      'POST',
      'GetPlan',
      { ...params },
      function (json) {
        // console.log('json', json)
        if (json.success) {
          // that.setData({
          //   address: json.data
          // })
          const params = {
            ...json.data,
            paramsData: that.data.nowDate
          }
          wx.navigateTo({
            url: '../steamerTicket/steamerTicket?params=' + JSON.stringify(params)
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

  },
  getNewsList() {
    const that = this;
    app.Ajax(
      'Open',
      'POST',
      'GetNews',
      {},
      function (json) {
        // console.log('json', json)
        if (json.success) {
          // that.imageLoad();
          that.setData({
            newsList: json.data
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
  },
  togoPublicArticle(e) {
    // console.log(e.currentTarget.dataset.url)
    wx.navigateTo({
      url: '../publicArticle/publicArticle?url=' + e.currentTarget.dataset.url,
    })
  },
  CheckPlan: function (e) { 

    const that = this;
    app.Ajax(
      'Open',
      'POST',
      'CheckPlan',
      {  },
      function (json) {
        // console.log('json', json)
        if (json.success) {
          if(json.data=="0"){
            that.dateAdd();
          }
        } else {
          
        }
      }
    )

  },
})