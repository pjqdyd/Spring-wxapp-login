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
          url: 'http://localhost:8080/wx/login',
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
            console.log("登录成功");
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
    var that = this;
    console.log(value)
    wx.showLoading({
      title: '正在登录'
    });

    wx.login({ //登录
      success(res) {
        console.log(res)
        var userInfo = JSON.parse(value.detail.rawData);

        //获取res.code, 用户数据传给后端
        wx.request({
          url: 'http://localhost:8080//wx/sample/login?code=' + res.code,
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

            userId: app.getGlobalUserInfo().userId,
            token: app.getGlobalUserInfo().token
          },
          success(result) {
            wx.hideLoading();
            console.log(result.data);
            if(result.data == "Success"){ //登录成功
              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 1000
              });
              var user = result.data.data;//返回的用户信息
              app.userInfo = user;
              //设置全局的用户信息为本地缓存
              app.setGlobalUserInfo(user);
            }else{
              //登录失败弹出框
              wx.showToast({
                title: "登录失败",
                icon: 'none',
                duration: 1000
              })
            }
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