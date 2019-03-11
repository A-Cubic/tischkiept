//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    scanImgurl:'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-cubic/scanCode2.png',
    showConsume: false,
    scanCode:'',
    consume:''
  },
  
  onLoad: function () {
    console.log('sss', this.data)
  },
  toScanCode:function(){
    wx.scanCode({
      success: (res) => {
        this.setData({
          scanImgurl: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-cubic/scanCode1.png',
          scanCode: '12',
        })


        // var that = this;
        // app.Ajax(
        //   'Shop',
        //   'POST',
        //   'ScanCode',
        //   // { code: '123456' },
        //   { code: res.result },
        //   function (json) {
        //     // console.log('json',json);
        //     if (json.success) {
        //       that.setData({
        //         scanImgurl: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-cubic/scanCode1.png',
        //         scanCode:'',
        //         userId: json.data.userId
        //       })
        //     } else {
        //       app.Toast('扫描失败，请重新扫描', 'none', 3000); 

        //     }

        //   }
        // );
      },
      fail: (res) => {
        
      }
    })
  },
  getSign:function(){
      console.log('签到接口')
  },
  getConsume: function () {
    this.setData({
      showConsume:true
    })
  },
  onSureConsume(event) {
    if (event.detail === 'confirm') {
      console.log(4)
      if (this.data.consume!=''){
        console.log(1)
        const params = {
          consume: this.data.consume,
          scanCode: this.data.scanCode
        }
        console.log('params', params)
      

        this.setData({
          scanImgurl: 'http://llwell-wxapp.oss-cn-beijing.aliyuncs.com/A-cubic/scanCode2.png',
          scanCode: '',
          consume: '',
          showConsume: false
        });
      } else {

        app.Toast('请输入消费金额', 'none', 3000); 
        console.log(2)
        console.log('qing xian shuru ')
      }
      
    } else {
      console.log(3)
      this.setData({
        consume: '',
        showConsume: false
      });
    }
  },
  onChangeInput(event) {
    // event.detail 为当前输入的值
    console.log(event.detail);
    this.setData({
      consume: event.detail
    })
  }
})
