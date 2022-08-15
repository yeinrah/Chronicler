package com.chron.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;


@Getter
@Setter
@ApiModel("FindEmailReq")
public class FindEmailReq {
	@ApiModelProperty(name = "유저 Phone", example = "01012345678")
	@NotNull(message = "휴대폰 번호를 입력해주세요.")
	@Pattern(regexp = "(010)(\\d{4})(\\d{4})", message = "올바른 휴대폰 번호를 입력해주세요.")
	private String phone;
}
