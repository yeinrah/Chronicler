package com.chron.api.request;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("MakeConferenceReq")
public class MakeConferenceReq {
	@ApiModelProperty(name = "세션 코드", example = "conference_code")
	@NotNull(message = "세션 코드를 채워주세요.")
	@Size(max = 16)
	private String conferenceCode;

}
