//index.js
//获取应用实例
const app = getApp()

Page({
  data: {},
  onLoad: function() {},
  //获取用户信息1(把加密数据给后端))
  onGotUserInfo1(value) { //value包含用户信息encryptedData, iv
    console.log(value)
    wx.login({ //登录
      success(res) {
        console.log(res)
        //获取res.code, encryptedData, iv数据传给后端
        wx.request({
          url: 'http://192.168.0.111:8080/wx/login',
          method: "POST",
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            code: res.code,
            encryptedData: value.detail.encryptedData,
            iv: value.detail.iv
          },
          success(result) {
            console.log(result);
          },
          fail() {
            console.log("失败");
          }
        })
      },
      fail() {
        console.log("登录失败");
      }
    })
  },
  //获取用户信息2(直接把用户数据传给后端)
  onGotUserInfo2(value) { //value.detail.rawData包含用户信息
    console.log(value)
    wx.login({ //登录
      success(res) {
        console.log(res)
        var userInfo = JSON.parse(value.detail.rawData);
        //获取res.code, 用户数据传给后端
        wx.request({
          url: 'http://192.168.0.111:8080/wx/sample/login?code=' + res.code,
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
            avatarUrl: userInfo.avatarUrl
          },
          success(result) {
            console.log(result);
          },
          fail() {
            console.log("失败");
          }
        })
      },
      fail() {
        console.log("登录失败");
      }
    })
  }
})