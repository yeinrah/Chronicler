package com.chron.api.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chron.api.request.UserRegisterPostReq;
import com.chron.api.response.UserRes;
import com.chron.db.entity.User;
import com.chron.db.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
public class UserService {
	
	private final UserRepository userRepository;
	//id / nickname / password / email / image / phone

	@Autowired
	public UserService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}
	
	
	// 회원가입
	@Transactional
	 public User signup(UserRegisterPostReq userInfo) throws Exception{
	        User user = User.builder()
	        		.nickname(userInfo.getNickname())
	        		.password(userInfo.getPassword())
	        		.email(userInfo.getEmail())
	        		.phone(userInfo.getPhone())
	        		.build();
//	        System.out.println("userService user의 값"+user.getNickname());
//	        System.out.println("userService userInfo의 값"+userInfo.getNickname());
	        return userRepository.save(user);
	   	 }
}
