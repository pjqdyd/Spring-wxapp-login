package com.pjqdyd.controller;

import com.pjqdyd.dto.UserInfoDTO;
import com.pjqdyd.utils.WxHttpUtil;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**   
 * @Description:  [微信小程序简单登录接口, 只获取Openid和基本信息,不包括UnionID,基本信息由前端传入]
 * @Author:       pjqdyd
 * @Version:      [v1.0.0]
 */
@RestController
@RequestMapping("/wx/sample")
public class WxSampleLoginController {

    public static final String APPID = "wx01b188dd7220f49d"; //申请小程序的AppId
    public static final String APP_SECRET = "d4149fa92186ef4f5ce5c1114fd75f78"; //生成的AppSecret

    //请求微信后端的地址
    public static final String AUTH_URL = "https://api.weixin.qq.com/sns/jscode2session?appid={appid}&secret={secret}&js_code={js_code}&grant_type={grant_type}";

    /**
     * 登录接口
     * @param code 前端wx.login获取的code
     * @return
     */
    @PostMapping("/login")
    public String wxLogin(@Param("code") String code,
                          @RequestBody UserInfoDTO userInfoDTO) throws Exception{

        if (StringUtils.isBlank(code)){
            return "失败-code不能为空";
        }

        //装载请求参数的Map集合,通过code,appid,app_secret获取用户的OpenId
        Map<String, String> paramsMap = new HashMap<>();
        paramsMap.put("appid", APPID);
        paramsMap.put("secret", APP_SECRET);
        paramsMap.put("js_code", code);
        paramsMap.put("grant_type", "authorization_code");

        //获取用户的OpenId
        Map<String, String> resultMap = new WxHttpUtil().getWxOpenIdAndSkey(AUTH_URL, paramsMap);
        System.out.println(resultMap);

        String openId = resultMap.get("openid");
        //String session_key = resultMap.get("session_key");

        System.out.println(userInfoDTO.toString());

        return "Success";
    }

}
