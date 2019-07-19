package com.pjqdyd.dto;

import lombok.Data;

/**   
 * @Description:  [接收用户信息的对象]
 * @Author:       pjqdyd
 * @Version:      [v1.0.0]
 */
@Data
public class UserInfoDTO {

    private String nickName;

    private String gender;

    private String language;

    private String city;

    private String province;

    private String country;

    private String avatarUrl;

}
