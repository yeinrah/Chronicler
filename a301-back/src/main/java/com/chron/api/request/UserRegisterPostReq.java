package com.chron.api.request;

import com.chron.db.entity.User;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

/**
 * 유저 회원가입 API ([POST] /api/v1/users) 요청에 필요한 리퀘스트 바디 정의.
 */
@Getter
@Setter
@ApiModel("UserRegisterPostRequest")
public class UserRegisterPostReq {
	@ApiModelProperty(name = "유저 Nickname", example = "your_nickname")
	String nickname;
	
	@ApiModelProperty(name = "유저 Password", example = "your_password")
	String password;
	
	@ApiModelProperty(name = "유저 Email", example = "your_email")
	String email;
	
	@ApiModelProperty(name = "유저 Phone", example = "your_phone")
	String phone;

}
