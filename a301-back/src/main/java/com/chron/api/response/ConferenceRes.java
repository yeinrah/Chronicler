package com.chron.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel("ConferenceRes")
public class ConferenceRes {

	@ApiModelProperty(name = "세션코드", example = "ABE83")
	private String conference_code;

	@ApiModelProperty(name = "닉네임", example = "harry")
	private String nickname;

	@ApiModelProperty(name = "세션 제목", example = "세션1")
	private String title;

}