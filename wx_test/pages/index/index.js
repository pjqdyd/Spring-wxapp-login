//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    code: '', // 小程序登录的code
  },
  onLoad: async function () {
    // 因为调用wx.login会刷新sessionKey, 可能会导致获取用户信息加密的sessionKey和传code到后端获取的sessionKey不一致
    // 导致解密失效，后端JSON序列化错误的微信解密信息， 所以要在调用getUserInfo前提前获取code
    await this.setCode(); // 初始前加载好code
  },

  // 设置登录code的方法
  async setCode() {
    const code = await this.getLoginCode(); // 同步获取登录code
    if (!code) {
      this.setData({
        code: ''
      })
      return console.log('微信获取CODE失败!');
    } else {
      this.setData({
        code: code
      })
    }
  },
  // 封装获取登录code方法
  getLoginCode() {
    return new Promise(function (reslove, reject) {
      wx.login({
        success(res) {
          reslove(res.code);
        },
        fail() {
          reject(null);
        }
      })
    })
  },

  // 获取用户信息1(把加密数据给后端)
  async onGotUserInfo1(value) { // value包含用户信息encryptedData, iv
    if (!this.data.code) {
      await this.setCode()
      return;
    }
    // 获取res.code, encryptedData, iv数据传给后端
    wx.request({
      url: 'http://localhost:8080/wx/login',
      method: "POST",
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        code: this.data.code,
        encryptedData: value.detail.encryptedData,
        iv: value.detail.iv
      },
      success: (result) => {
        console.log(result);
        if(result.data == "Success") {
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          });
        }else {
          // 登录失败弹出框
          console.log("失败");
        }
      },
      fail: () => {
        console.log("失败");
      },
      complete: () => {
        // 重新获取code, 因为code已经被使用了
        // 这一步不是必须的，在通常情况下，登录后会跳转到其他页面，重新进入此页面onload也会
        // 重新获取code, 请根据具体业务处理
        this.setCode()
      }
    })
  },

  // 获取用户信息2(直接把用户数据传给后端)
  async onGotUserInfo2(value) { //value.detail.rawData包含用户信息
    if (!this.data.code) {
      await this.setCode()
      return;
    }
    const userInfo = JSON.parse(value.detail.rawData);
    // 获登录code、 用户数据等传给后端
    wx.request({
      url: 'http://localhost:8080//wx/sample/login?code=' + this.data.code,
      method: "POST",
      header: {
        'content-type': 'application/json'
      },
      data: {
        nickName: userInfo.nickName,
        gender: userInfo.gender,
        language: userInfo.language,
        city: userInfo.city,
        province: userInfo.province,
        country: userInfo.country,
        avatarUrl: userInfo.avatarUrl,

        // userId: app.getGlobalUserInfo().userId,
        // token: app.getGlobalUserInfo().token
      },
      success: (result) => {
        console.log(result);
        if (result.data == "Success") { // 登录成功
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 1000
          });
        } else {
          // 登录失败弹出框
          console.log("失败");
        }
      },
      fail: () => {
        console.log("失败");
      },
      complete: () => {
        // 重新获取code, 因为code已经被使用了
        // 这一步不是必须的，在通常情况下，登录后会跳转到其他页面，重新进入此页面onload也会
        // 重新获取code, 请根据具体业务处理
        this.setCode()
      }
    })
  }
})
