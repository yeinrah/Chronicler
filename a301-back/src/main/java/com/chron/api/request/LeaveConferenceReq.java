package com.chron.api.request;

import javax.validation.constraints.NotNull;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LeaveConferenceReq")
public class LeaveConferenceReq {

	@ApiModelProperty(name = "회원ID", example = "22")
	@NotNull(message = "회원ID를 입력하세요.")
	private Integer id;

}
