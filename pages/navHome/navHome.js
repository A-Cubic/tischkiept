// pages/uploadBankcard/uploadBankcard.js
//获取应用实例
const app = getApp()
Page({

  data: {
    allData:{
      listHome:[
        {
          img:'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/bannerEuropeanAmerican.jpg'
        },
        {
          img: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-test/bannerEuropeanAmerican.jpg'
        }
      ],
      listShop:[]
    },
    index:0,
    address: ['广鹿多落母港','杏树屯港'], 
    bannerList:[],  
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
    paramsData:''
  },
  onLoad: function () {
    // this.imageLoad();
    this.getAddress();
    this.getBanner();

    this.getToday()
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
      today: month + '月' + day + '日',
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
      'Plan',
      'POST',
      'GetPort',
      { },
      function (json) {
        // console.log('json', json)
        if (json.success) {
          // that.imageLoad();
          that.setData({
            address: json.data
          })
        }else{
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
          // that.imageLoad();
          that.setData({
            bannerList: json.data
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
          // that.imageLoad();
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
          latitude: 122.516797,//要去的纬度-地址122.516797,39.306283
          longitude: 39.306283,//要去的经度-地址
          name: "中山广场店",
          address: '中山广场A地铁口'
        })
      }
    })
  },
  gotoPrecautions() {
    wx.navigateTo({
      url: '../precautions/precautions',
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
    // console.log(e)
    var imgwidth = e.detail.width,
      imgheight = e.detail.height,
      //宽高比  
      ratio = imgwidth / imgheight;
    // console.log(imgwidth, imgheight)
    //计算的高度值  
    var viewHeight = 750 / ratio;
    var imgheight = viewHeight;
    var imgheights = this.data.imgheights;
    //把每一张图片的对应的高度记录到数组里  
    imgheights[e.target.dataset.id] = imgheight;
    this.setData({
      imgheights: imgheights
    })
  },
})