// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    shopData: [],
    time: '',
    nickName: '登录'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getBanner();
    this.getProduct();
    this.getTime();
  },
  onShow() {
    this.onReady();
  },
  onReady() {
    let name = getApp().globalData.nickname;
    if (name !== '') {
      this.setData({
        nickName: name
      })
    }
  },
  getBanner() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/banner',
      data: {
        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA='
      },
      success: result => {
        if (result.data.code === 300) {
          this.setData({
            list: result.data.result
          })
        }
      }
    })
  },
  getProduct() {
    wx.request({
      url: 'http://www.kangliuyong.com:10002/typeProducts',
      data: {
        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
        key: 'isHot',
        value: '1'
      },
      success: result => {
        if (result.data.code === 500) {
          this.setData({
            shopData: result.data.result
          })
        }
      }
    })
  },
  getTime() {
    let t = Number(new Date().toTimeString().substring(0, 2));
    let time = '';
    if (t >= 12) {
      time = '下午好';
    } else {
      time = '上午好';
    }
    this.setData({
      time: time
    })
  },
  goDetail(e) {
    let pid = e.currentTarget.dataset.pid;
    wx.navigateTo({
      url: '../detail/detail?pid=' + pid
    })
  },
  goLogin() {
    if (this.data.nickName === '登录') {
      wx.navigateTo({
        url: '../login/login',
      })
    } else {
      wx.switchTab({
        url: '../my/my',
      })
    }
  },
  goReacher(e) {
    let value = e.detail.value;
    wx.navigateTo({
      url: '../research/research?value=' + value,
    })
  }
})