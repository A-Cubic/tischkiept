// pages/precautions/precautions.js

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url: 'http://ticket.yiswl.com:9180/precautions.png'
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
this.getDate()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  getDate: function () {
    const that = this;
    app.Ajax(
      'Open',
      'POST',
      'GetAttention',
      {},
      function (json) {
         console.log('json', json)
        if (json.success) {
          that.setData({
            url: json.data
          })
        } else {
         
        }
      }
    )
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

 


})