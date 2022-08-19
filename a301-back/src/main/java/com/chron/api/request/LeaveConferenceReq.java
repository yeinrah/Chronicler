package com.chron.api.request;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.chron.db.entity.Message;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LeaveConferenceReq")
public class LeaveConferenceReq {
	@ApiModelProperty(name = "회원ID", example = "1")
	@NotNull(message = "회원ID를 입력하세요.")
	private Integer id;
	
	@ApiModelProperty(name = "회의록 데이터", example = "회의_데이터")
	private List<Message> chronicleData;

}
