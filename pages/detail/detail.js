// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailData: {},
    pid: '',
    activeIndex: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let pid = options.pid;
    this.getdetailData(pid);
  },
  getdetailData(pid) {
    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: 'http://www.kangliuyong.com:10002/productDetail',
      method: 'GET',
      data: {
        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
        pid: pid
      },
      success: result => {
        wx.hideLoading();

        if (result.data.code === 600) {
          let data = result.data.result[0];
          data.desc = data.desc.split('\n');

          let rultText = ['tem', 'sugar', 'cream', 'milk'];
          let rultData = [];
          let indexs = [];

          rultText.forEach(item => {
            let currentRule = data[item];
            if (currentRule) {
              let rult = {
                title: data[`${item}_desc`],
                rultData: []
              }

              let r = currentRule.split('/');
              r.forEach(v => {
                rult.rultData.push({
                  name: v
                });
              })

              rultData.push(rult);
              indexs.push(0);
            }
          })

          data.rult = rultData;

          this.setData({
            pid: pid,
            detailData: data,
            activeIndex: indexs
          })
        }

        console.log(this.data.detailData);
      }
    })
  },
  selectType(e) {
    let i = e.currentTarget.dataset.i;
    let index = e.currentTarget.dataset.index;

    if (this.data.activeIndex[index] === i) {
      return;
    }

    this.setData({
      ['activeIndex[' + index + ']'] : i
    })
  }
})