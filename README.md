### Springboot微信小程序登录获取用户信息demo案例

#### --wx_text 小程序代码
#### --spring-wxapp-demo  后端代码

#### 如何使用:

    1.在后端Controller里修改微信小程序的APPID, APP_SECRET, 配置一下application.yml.
    
    2.小程序也修改AppId.
    
    3.修改小程序pages/index/index.js中的wx.request方法的url的ip为后端启动ip地址.
    
    4.运行后端项目, 小程序点击获取用户信息按钮, 后端控制台打印用户信息.
    
#### 提示:

    1. 小程序获取用户信息按钮1为传加密数据到后端解密获取用户信息, 包括UnionID(需要微信开放平台认证开发者账户绑定的小程序);
    
    2. 小程序获取用户信息按钮2为直接传用户信息到后端.
    
  (此项目只是展示获取用户信息的步骤逻辑,建议阅读[这篇文章](https://blog.csdn.net/qq_41971087/article/details/82630612)理解步骤逻辑.)
