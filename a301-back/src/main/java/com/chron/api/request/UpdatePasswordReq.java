package com.chron.api.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@ApiModel("UpdatePasswordReq")
public class UpdatePasswordReq {
	@ApiModelProperty(name = "유저 Password", example = "password1!")
	@NotNull(message = "비밀번호 칸을 채워주세요.")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "비밀번호는 영문, 숫자, 특수문자가 적어도 1개 이상씩 포함된 8자 ~ 16자의 비밀번호여야 합니다.")
	private String password;
}
