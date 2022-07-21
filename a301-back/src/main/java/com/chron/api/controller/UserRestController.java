package com.chron.api.controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = {"*"}, maxAge = 6000)
@RestController
@RequestMapping("/userInfo")
public class UserRestController {
	@ApiOperation(value="테스트입니다")
	@GetMapping("/test")
	public int test() throws Exception{
		return 1;
	}
	
}
