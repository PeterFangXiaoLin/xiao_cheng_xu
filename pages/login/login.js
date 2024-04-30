// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isOpen: false,
    userInfo: {
      phone: '',
      password: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  updateIsOpen() {
    this.setData({
      isOpen: !this.data.isOpen
    })
  },
  updateUserInfo(e) {
    let key = e.currentTarget.dataset.key;
    let value = e.detail.value;
    this.data.userInfo[key] = value;
  },
  goRegister() {
    wx.navigateTo({
      url: '../../pages/register/register',
    })
  },
  login() {
    if (this.data.userInfo.phone.length === 0) {
      wx.showToast({
        title: '手机号不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let phoneReg = /^[1][3-9][0-9]{9}$/;
    if (!phoneReg.test(this.data.userInfo.phone)) {
      wx.showToast({
        title: '手机号格式错误',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    if (this.data.userInfo.password.length === 0) {
      wx.showToast({
        title: '密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    let passwordReg = /^[A-Za-z]\w{5,15}$/;
    if (!passwordReg.test(this.data.userInfo.password)) {
      wx.showToast({
        title: '密码格式不正确',
        icon: 'none',
        duration: 2000
      })
      return;
    }

    wx.showLoading({
      title: '加载中...',
    })

    wx.request({
      url: 'http://www.kangliuyong.com:10002/login',
      method: 'POST',
      data: {
        appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
        password: this.data.userInfo.password,
        phone: this.data.userInfo.phone
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: result => {
        console.log("result ==>  ", result);
        wx.hideLoading();
        wx.showToast({
          title: result.data.msg,
          icon: 'none',
          duration: 2000
        })
        if (result.data.code === 200) {
          wx.setStorageSync('token', result.data.token);
          wx.request({
            url: 'http://www.kangliuyong.com:10002/findMy',
            method: 'GET',
            data: {
              appkey: 'U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=',
              tokenString: result.data.token
            },
            success: result => {
              getApp().globalData.nickname = result.data.result[0].nickName;
            }
          })
          wx.reLaunch({
            url: '../home/home',
          })
        }

      }
    })
  }
})