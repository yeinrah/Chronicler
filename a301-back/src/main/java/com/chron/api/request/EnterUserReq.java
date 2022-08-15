package com.chron.api.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("EnterUserReq")
public class EnterUserReq {
	@ApiModelProperty(name = "닉네임", example = "porter")
	@NotNull(message = "닉네임 칸을 채워주세요.")
	private String nickname;

	@ApiModelProperty(name = "이곳으로 코드 값이 들어옵니다.", example = "conference_code")
	@NotNull(message = "코드 값을 채워주세요.")
	@Size(max = 32)
	private String conference_code;
}
