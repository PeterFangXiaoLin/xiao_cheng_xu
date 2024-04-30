// pages/menu/menu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    //商品类型数据
    typeData: [],
    
    shopData: [],

    //实现class 动态绑定
    activeIndex: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getType();
  },


  //获取商品类型
  getType() {
    //启动加载提示
    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: 'http://www.kangliuyong.com:10002/type',
      method: 'GET',
      data: {
        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='
      },
      success: result => {
        wx.hideLoading();

        if (result.data.code === 400) {
          this.setData({
            typeData: result.data.result
          })

          let type = result.data.result[this.data.activeIndex].type;

          this.getShop(type);
        }
      }
    })
  },

  selectType(e) {
    let index = e.currentTarget.dataset.i;

    if (index === this.data.activeIndex) {
      return;
    }

    this.setData({
      activeIndex: index
    })
    let type = this.data.typeData[index].type;
    this.getShop(type);
  },

  getShop(type) {
    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: 'http://www.kangliuyong.com:10002/typeProducts',
      method: 'GET',
      data: {
        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
        key: 'type',
        value: type
      },
      success: result => {
        wx.hideLoading();
        if (result.data.code === 500) {
          this.setData({
            shopData: result.data.result
          })
          console.log(this.data.shopData);
        }
      }
    })
  },

  goDetail(e) {
    console.log(e);
    let pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../detail/detail?pid=' + pid
    })
  },
  goResearch(e) {
    console.log(e);
    let value = e.detail.value;
    wx.navigateTo({
      url: '../research/research?value=' + value,
    });

  }
})