package com.chron.api.request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * 유저 회원가입 API ([POST] /api/userInfo/signup) 요청에 필요한 리퀘스트 바디 정의
 */
@Getter
@Setter
@ApiModel("UserRegisterRequest")
public class UserRegisterReq {
	@ApiModelProperty(name = "유저 Nickname", example = "Harry")
	@NotNull(message = "닉네임 칸을 채워주세요.")
	@Pattern(regexp = "^[0-9a-zA-Z가-힣]*$", message = "닉네임은 숫자, 영어, 한글만 가능하며 1자 ~ 32자의 닉네임이 가능합니다.")
	@Size(min = 1, max = 32)
	private String nickname;

	@ApiModelProperty(name = "유저 Password", example = "password1!")
	@NotNull(message = "비밀번호 칸을 채워주세요.")
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{8,16}$", message = "비밀번호는 영문, 숫자, 특수문자가 적어도 1개 이상씩 포함된 8자 ~ 16자의 비밀번호여야 합니다.")
	private String password;

	@ApiModelProperty(name = "유저 Email", example = "test@gmail.com")
	@NotNull(message = "이메일 칸을 채워주세요.")
	@Email(message = "이메일 형식(@)이 아닙니다.")
	@Size(min = 5, max = 50)
	private String email;

	@ApiModelProperty(name = "유저 Phone", example = "01012345678")
	@NotNull(message = "휴대폰 번호를 입력해주세요.")
	@Pattern(regexp = "(010)(\\d{4})(\\d{4})", message = "올바른 휴대폰 번호를 입력해주세요.")
	private String phone;
	
	@ApiModelProperty(name = "유저 Email 임시코드", example = "AAACc")
	@NotNull(message = "유저 Email 임시코드 칸을 채워주세요.")
	private String tmpCode;
}