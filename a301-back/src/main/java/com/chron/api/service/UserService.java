package com.chron.api.service;

import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.chron.api.request.UserRegisterReq;
import com.chron.db.entity.User;
import com.chron.db.repository.UserRepository;

@Service
public class UserService {

	private final UserRepository userRepository;
	// id / nickname / password / email / image / phone

	@Autowired
	public UserService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	// 회원가입
	@Transactional
	public User signup(UserRegisterReq userRegisterReq) throws Exception {
		User user = User.builder().nickname(userRegisterReq.getNickname()).password(userRegisterReq.getPassword())
				.email(userRegisterReq.getEmail()).phone(userRegisterReq.getPhone()).build();
		return userRepository.save(user);
	}

	// 이메일 중복 검사
	@Transactional(readOnly = true)
	public void checkEmailDuplication(UserRegisterReq userRegisterReq) {
		boolean emailDuplicate = userRepository.existsByEmail(userRegisterReq.getEmail());
		if (emailDuplicate) {
			throw new IllegalStateException("이미 존재하는 이메일입니다.");
		}
	}

	// 전화번호 중복 검사
	@Transactional(readOnly = true)
	public void checkPhoneDuplication(UserRegisterReq userRegisterReq) {
		boolean phoneDuplicate = userRepository.existsByPhone(userRegisterReq.getPhone());
		if (phoneDuplicate) {
			throw new IllegalStateException("이미 존재하는 번호입니다.");
		}
	}

}
