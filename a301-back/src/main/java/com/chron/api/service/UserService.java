package com.chron.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chron.api.request.UpdateImageReq;
import com.chron.api.request.UpdateNicknameReq;
import com.chron.api.request.UserRegisterReq;
import com.chron.db.entity.User;
import com.chron.db.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	private UserRepository userRepository;
	// id / nickname / password / email / image / phone

	@Autowired
	public UserService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}

	// 회원가입
	@Transactional
	public User signup(UserRegisterReq userRegisterReq) throws Exception {
		User user = User.builder().nickname(userRegisterReq.getNickname())
				.password(encoder.encode(userRegisterReq.getPassword())).email(userRegisterReq.getEmail())
				.phone(userRegisterReq.getPhone()).build();
		return userRepository.save(user);
	}

	@Transactional
	public User findEmail(String phone) throws Exception {

		return userRepository.findOneByPhone(phone);
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

	// 닉네임 수정
	@Transactional
	public User updateNickname(Integer id, UpdateNicknameReq updateNicknameReq) throws Exception {
		User user = userRepository.findOneById(id);
		user.setNickname(updateNicknameReq.getNickname());
		return userRepository.save(user);
	}

	// 닉네임 수정
	@Transactional
	public User updateImage(Integer id, UpdateImageReq updateImageReq) throws Exception {
		User user = userRepository.findOneById(id);
		user.setImage(Integer.parseInt(updateImageReq.getImage()));
		return userRepository.save(user);
	}

	// 회원 탈퇴
	@Transactional
	public void withdraw(Integer id) {
		User user = userRepository.findOneById(id);
		userRepository.delete(user);
	}
}
