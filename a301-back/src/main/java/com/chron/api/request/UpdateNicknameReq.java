package com.chron.api.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@ApiModel("UpdateNicknameRequest")
public class UpdateNicknameReq {
	@ApiModelProperty(name = "유저 Nickname", example = "Harry")
	@NotNull(message = "닉네임 칸을 채워주세요.")
	@Pattern(regexp = "^[0-9a-zA-Z가-힣]*$", message = "닉네임은 숫자, 영어, 한글만 가능하며 1자 ~ 32자의 닉네임이 가능합니다.")
	@Size(min = 1, max = 32)
	private String nickname;
}