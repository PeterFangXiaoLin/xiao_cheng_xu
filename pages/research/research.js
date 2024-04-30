// pages/research/research.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopData: [],
    history: [],
    currentValue: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let value = options.value;
    this.setVa(value);
    this.confirm();
  },
  setVa(value) {
    this.setData({
      currentValue: value
    });
  },
  return() {
    wx.navigateBack({
      delta: 1
    })
  },
  updateValue(e) {
    let value = e.detail.value;
    this.setData({
      currentValue: value
    })
  },
  getInputValue(e) {
    let value = e.detail.value;
    if (this.data.history.indexOf(value) === -1) {
      let arr = [value];
      arr = arr.concat(this.data.history);
      this.setData({
        history: arr
      })
    } else {
      let index = this.data.history.indexOf(value);
      let arr = this.data.history;
      let t = arr[0];
      arr[0] = arr[index];
      arr[index] = t;
      this.setData({
        history: arr
      })
    }
    wx.request({
      url: 'http://www.kangliuyong.com:10002/search',
      method: 'GET',
      data: {
        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
        name: value
      },
      success: result => {
        console.log(result);
        if (result.data.code === 'Q001') {
          this.setData({
            shopData: result.data.result
          })
        }
        console.log(this.data.shopData);
      }
    })
  },
  confirm() {
    let value = this.data.currentValue;
    if (this.data.history.indexOf(value) === -1) {
      let arr = [value];
      arr = arr.concat(this.data.history);
      this.setData({
        history: arr
      })
    } else {
      let index = this.data.history.indexOf(value);
      let arr = this.data.history;
      let t = arr[0];
      arr[0] = arr[index];
      arr[index] = t;
      this.setData({
        history: arr
      })
    }
    wx.request({
      url: 'http://www.kangliuyong.com:10002/search',
      method: 'GET',
      data: {
        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
        name: value
      },
      success: result => {
        console.log(result);
        if (result.data.code === 'Q001') {
          this.setData({
            shopData: result.data.result
          })
        }
        console.log(this.data.shopData);
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
  setValue(e) {
    let value = e.currentTarget.dataset.value;
    this.setData({
      currentValue: value
    })
  },
  clear(e) {
    let value = e.currentTarget.dataset.value;
    let arr = this.data.history.filter(function(item) {
      return item !== value
    });
    this.setData({
      history: arr
    })
  },
  clearAll() {
    this.setData({
      history: []
    })
  }
})