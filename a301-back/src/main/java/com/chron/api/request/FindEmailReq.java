package com.chron.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


@Getter
@Setter
@ApiModel("FindEmailReq")
public class FindEmailReq {

    @ApiModelProperty(name = "찾을 유저 email", example = "khss4008@gmail.com")
    @NotNull(message = "email may not be empty")
    @Pattern(regexp = "^[0-9a-zA-Z]*$",
            message = "이메일은 숫자, 영어만 가능합니다.")
    @Size(min = 3, max = 40)
    private String findEmail;
}
