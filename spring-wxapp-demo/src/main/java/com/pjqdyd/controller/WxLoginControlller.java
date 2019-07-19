package com.pjqdyd.controller;

import com.alibaba.fastjson.JSONObject;
import com.pjqdyd.utils.AesCbcUtil;
import com.pjqdyd.utils.WxHttpUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**   
 * @Description:  [微信小程序登录获取用户信息接口, 解密数据获取用户信息包括UnionID(需要微信开放平台认证开发者账户绑定的小程序)]
 * @Author:       pjqdyd
 * @Version:      [v1.0.0]
 */

@RestController
@RequestMapping("/wx")
public class WxLoginControlller {

    public static final String APPID = "wx01b188dd7220f49d"; //申请小程序的AppId
    public static final String APP_SECRET = "d4149fa92186ef4f5ce5c1114fd75f78"; //生成的AppSecret

    //请求微信后端的地址
    public static final String AUTH_URL = "https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={js_code}&grant_type={grant_type}";

    /**
     * 登录接口
     * @param code 前端wx.login获取的code
     * @param iv 前端wx.getUserInfo获取的加密偏移值
     * @param encryptedData 前端wx.getUserInfo加密的用户数据
     * @return
     */
    @PostMapping("/login")
    public String wxLogin(@Param("code") String code,
                          @Param("iv") String iv,
                          @Param("encryptedData") String encryptedData) throws Exception{

        if (StringUtils.isBlank(code) || StringUtils.isBlank(iv) || StringUtils.isBlank(encryptedData)){
            return "失败-参数不能为空";
        }

        //装载请求参数的Map集合,通过code,appid,app_secret获取用户的OpenId和session_key
        Map<String, String> paramsMap = new HashMap<>();
        paramsMap.put("appid", APPID);
        paramsMap.put("secret", APP_SECRET);
        paramsMap.put("js_code", code);
        paramsMap.put("grant_type", "authorization_code");

        //获取用户的OpenId和ession_key
        Map<String, String> resultMap = new WxHttpUtil().getWxOpenIdAndSkey(AUTH_URL, paramsMap);
        System.out.println(resultMap);

        String openId = resultMap.get("openid");
        String session_key = resultMap.get("session_key");

        //表示用户认证登录信息正确
        if(!StringUtils.isBlank(openId) || !StringUtils.isBlank(session_key)){

            //解密用户数据
            JSONObject jsonUserInfo = AesCbcUtil.decrypt(encryptedData, session_key, iv);

            if (jsonUserInfo != null){
                System.out.println(jsonUserInfo.toString());
                System.out.println(jsonUserInfo.getString("country"));
                System.out.println(jsonUserInfo.getString("openId"));
                return "Success";
            }
        }


        return "Error";
    }


}
