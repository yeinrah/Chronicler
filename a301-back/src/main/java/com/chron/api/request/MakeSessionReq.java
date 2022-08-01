package com.chron.api.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MakeSessionReq")
public class MakeSessionReq {

	@ApiModelProperty(name = "닉네임", example = "harry")
	@NotNull(message = "닉네임 칸을 채워주세요.")
	private String nickname;

	@ApiModelProperty(name = "세션 제목", example = "title")
	@NotNull(message = "세션 제목을 채워주세요.")
	@Size(max = 50)
	private String title;

}
