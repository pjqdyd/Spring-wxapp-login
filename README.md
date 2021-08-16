### Springboot微信小程序登录获取用户信息demo案例

#### --wx_text 小程序代码
#### --spring-wxapp-demo  后端代码

#### 如何使用:

    1.在后端Controller里修改成你的微信小程序的APPID, APP_SECRET.
    
    2.小程序也修改成你的小程序AppId.
    
    3.修改小程序pages/index/index.js中的wx.request方法的url的ip为后端启动ip地址 (默认laocalhost).
    
    4.运行后端项目, 小程序点击获取用户信息按钮, 后端控制台打印用户信息.
    
#### 提示:

    1. 小程序获取用户信息按钮1为传加密数据到后端解密获取用户信息, 包括UnionID(需要微信开放平台认证开发者账户绑定的小程序);
    
    2. 小程序获取用户信息按钮2为直接传用户信息到后端.

    3. 如果代码发现可以优化的地方，欢迎大家提issue改进。

  (此项目只是展示获取用户信息的步骤逻辑,建议阅读[这篇文章](https://blog.csdn.net/qq_41971087/article/details/82630612)理解步骤逻辑.)
 

#### [2021.08.16更新]:

   (迟到的更新)
   
   1. 已修复bug [issse #1](https://github.com/pjqdyd/Spring-wxapp-login/issues/1), 之前已经遇到过此类问题且已解决，但是仓库忘了更新...

   2. 可以通过官方新的api: wx.getUserProfile 获取用户的信息.

   3. 建议大家使用[Wechat-Group/WxJava 微信开发 Java SDK](https://github.com/Wechat-Group/WxJava) 这个官方Java Sdk来进行开发, 配置
      简单，支持多小程序appid, api都是经过封装成service的非常好用.
