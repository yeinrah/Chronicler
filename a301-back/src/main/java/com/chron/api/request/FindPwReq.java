package com.chron.api.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("FindPwReq")
public class FindPwReq {
	@ApiModelProperty(name = "유저 Email", example = "test@gmail.com")
	@NotNull(message = "이메일 칸을 채워주세요.")
	@Email(message = "이메일 형식(@)이 아닙니다.")
	@Size(min = 5, max = 50)
	private String email;
	
	@ApiModelProperty(name = "유저 Email 임시코드", example = "AAACc")
	@NotNull(message = "유저 Email 임시코드 칸을 채워주세요.")
	private String tmppwCode ;
}
