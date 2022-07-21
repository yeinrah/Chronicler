package com.chron.api.service;

import org.springframework.stereotype.Service;

import com.chron.api.request.UserRegisterPostReq;
import com.chron.api.response.UserRes;
import com.chron.db.entity.User;
import com.chron.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Service
public class UserService {
	private final UserRepository userRepository;
	//id / nickname / password / email / image / phone

	// 회원가입
	 public UserRes insertUser(UserRegisterPostReq userInfo) {
	        User user = new User();

	        //pw, salt를 user에 저장
	        user.setNickname(userInfo.getNickname());
	        user.setPassword(userInfo.getPassword());
	        user.setEmail(userInfo.getEmail());
	        user.setPhone(userInfo.getPhone());
	        
	        //DB에 저장
	        userRepository.save(user);

	        return new UserRes();
	   	 }
	   }
