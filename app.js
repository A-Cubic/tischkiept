//app.js


App({
  globalData:{
    userInfo:null,
    passengerChecked:[]
  },
  onLaunch: function () {
    var isDebug = false;//true调试状态使用本地服务器，非调试状态使用远程服务器
    if (!isDebug) {
      //远程域名
     // wx.setStorageSync('domainName', "http://39.100.237.7:9291/api/analysis/Ship/")
       //wx.setStorageSync('domainName', "https://ticket.yiswl.com/api/analysis/Ship/")
      wx.setStorageSync('domainName', "http://test.yiswl.com/api/analysis/Ship/")
    }
    else {
      //本地测试域名
      wx.setStorageSync('domainName', "http://127.0.0.1:52524/api/analysis/Ship/")
    }
    // 登录
    wx.login({
      success: res => {
        const that = this;
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.Ajax(
          'Open',
          'POST',
          'Login',
          { code: res.code },
          function (json) {
            // console.log('~~~',json);
            if (json.success) {
              wx.setStorageSync('token', json.data.token);
              // wx.setStorageSync('scanCode', json.data.scanCode);
              // console.log(json.data.token);
              // console.log(!!json.data.isReg)

              if (!json.data.isReg) {
                // 跳转到授权登录页
                console.log('跳转授权页');
                wx.redirectTo({
                  url: '../warrant/warrant',
                })
              }else{
                console.log('here');
              }
            } else {
              // that.Toast('','none',2000,json.msg.code)
              console.log('here');

            }
          }
        )
      }
    })
  },
  Ajax: function (url, type, method, data, callback) {
    wx.showLoading({
      title: 'loading',
      duration: 3000,
    });

    var send = {
      token: wx.getStorageSync('token'),
      method: method,
      param: data,
    };
    wx.request({
      url: wx.getStorageSync('domainName') + url,
      data: send,
      method: type, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json' // 默认值
      }, // 设置请求的 header
      success: function (res) {
        wx.hideLoading();
        // 发送请求成功执行的函数
        if (typeof callback === 'function') {
          callback(res.data);
        }
      },
      fail: function (res) {
        wx.hideLoading();
        wx.showModal({
          title: '网络异常提示',
          content: '请检查网络，并重新登录小程序',
          showCancel: false,
        })
        //console.log('fa',res)
      },
      complete: function () {
        // wx.hideLoading();
      }
    })
  }
  ,
  Toast: function (title, icon, duration, code) {
    let content = title;
    switch (code) {
      // 通用
      case -1:
        content = 'Post为空'
        break;
      case 201:
        content = 'APPID错误'
        break;
      case 202:
        content = '	签名错误'
        break;
      case 404:
        content = '没有找到'
        break;
      case 500:
        content = '内部错误'
        break;
      case 1000:
        content = '	微信组件异常'
        break;
      case 3000:
        content = '	支付错误'
        break;
      case 3001:
        content = '支付金额不能为0'
        break;
      case 3002:
        content = '支付返回异常'
        break;
      case 4000:
        content = '无效的Token'
        break;
      case 4001:
        content = '无效的方法名'
        break;
      case 4002:
        content = '无效的参数'
        break;
      case 4003:
        content = '接口权限不足'
        break;
      case 4004:
        content = '接口的参数不对'
        break;
      case 4005:
        content = '接口数据库操作失败'
        break;
      case 4006:
        content = '需要登陆'
        break;

        // 我的
      case 10001:
        content = '用户已存在'
        break;
      case 10002:
        content = '注册用户失败'
        break;

        // 首页
      case 20000:
        content = '	订票失败'
        break;
      case 20001:
        content = '	检查乘车人失败'
        break;
      case 20002:
        content = '获取订单id失败'
        break;
      case 20003:
        content = '订票失败'
        break;
      case 20004:
        content = '获取订单状态失败'
        break;
      case 20005:
        content = '	写入订单失败'
        break;
      case 20006:
        content = '退票时退票状态校验失败'
        break;
      case 20007:
        content = '	退票失败'
        break;
      case 20008:
        content = '	用户被禁用'
        break;
      case 20009:
        content = '	订票失败，每个订单最多提交5位乘客'
        break;
      case 20010:
        content = '	订票失败，每个身份证每个航班只能订一张票'
        break;
      case 20011:
        content = '	订票失败，距离开航时间太近，请订其他船'
        break;
      case 30000:
        content = '新增乘客失败'
        break;
      case 30001:
        content = '删除乘客失败'
        break;
      case 30002:
        content = '已有相同证件号的乘客'
        break;
      case 30003:
        content = '身份证号校验失败'
        break;
     
      default:
        console.log(code);
    }
    wx.showToast({
      title: content,
      icon: icon,
      duration: duration
    });
  }

})