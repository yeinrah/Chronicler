package com.chron.api.controller;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chron.api.request.FindEmailReq;
import com.chron.api.request.UserRegisterPostReq;
import com.chron.api.service.UserService;
import com.chron.db.entity.User;
import com.chron.db.repository.UserRepository;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/userInfo")
public class UserRestController {
	private UserService userService;
	
	
	@Autowired
	public UserRestController(UserService userService) {
		super();
		this.userService = userService;
	}


	@ApiOperation(value="회원가입")
	@PostMapping("/signup")
	public ResponseEntity signup(@RequestBody UserRegisterPostReq userRegisterPsotReq) throws Exception{
		userService.signup(userRegisterPsotReq);
//		System.out.println("userController 값 " + userRegisterPsotReq.getNickname());
		return new ResponseEntity(HttpStatus.OK);
	}
	
	public ResponseEntity findEmail(@RequestBody FindEmailReq findEmailReq) {
//		userService.findEmail();
		
		return new ResponseEntity(HttpStatus.OK);
	}
	
}
