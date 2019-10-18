//app.js
App({

  serverUrl: "http://192.168.0.111:8080",
  userInfo: null,

  setGlobalUserInfo: function (user) {
    //设置用户对象为缓存的方法(key,data)
    wx.setStorageSync("userInfo", user);
  },

  getGlobalUserInfo: function () {
    //获取缓存的用户对象
    return wx.getStorageSync("userInfo");
  },

  onLaunch: function () { },
})