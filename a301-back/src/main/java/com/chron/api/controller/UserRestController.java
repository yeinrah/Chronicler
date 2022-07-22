package com.chron.api.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chron.api.request.FindEmailReq;
import com.chron.api.request.UserRegisterReq;
import com.chron.api.service.UserService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/userInfo")
public class UserRestController {
	private UserService userService;

	@Autowired
	public UserRestController(UserService userService) {
		super();
		this.userService = userService;
	}

	@PostMapping("/signup")
	@ApiOperation(value = "회원가입", notes = "이메일, 비밀번호, 닉네임, 그리고 전화번호를 통해 회원가입 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "회원가입 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "회원정보 중복(회원가입 불가)") })
	public ResponseEntity signup(@Valid @RequestBody UserRegisterReq userRegisterReq) throws Exception {
		userService.checkEmailDuplication(userRegisterReq);
		userService.checkPhoneDuplication(userRegisterReq);
		userService.signup(userRegisterReq);
		return new ResponseEntity(HttpStatus.OK);
	}

	public ResponseEntity findEmail(@RequestBody FindEmailReq findEmailReq) {
		return new ResponseEntity(HttpStatus.OK);
	}

}
