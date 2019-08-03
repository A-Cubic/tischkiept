// pages/publicArticle/publicArticle.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options.url)
    this.setData({
      url: "http://news.yiswl.com/page.aspx?id="+options.url
    })
  },

})