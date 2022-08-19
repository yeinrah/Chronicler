package com.chron.api.service;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chron.api.request.UpdateImageReq;
import com.chron.api.request.UpdateNicknameReq;
import com.chron.api.request.UpdatePasswordReq;
import com.chron.api.request.UpdatePhoneReq;
import com.chron.api.request.UserRegisterReq;
import com.chron.db.entity.ConferenceHistory;
import com.chron.db.entity.User;
import com.chron.db.entity.UserEmailCheck;
import com.chron.db.entity.UserPwCheck;
import com.chron.db.repository.ConferenceHistoryRepository;
import com.chron.db.repository.UserEmailCheckRepository;
import com.chron.db.repository.UserRepository;
import com.chron.db.repository.UserTmpPwRepository;

@Service
public class UserService {

	@Autowired
	private BCryptPasswordEncoder encoder;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private UserEmailCheckRepository userEmailCheckRepository;

	@Autowired
	private ConferenceHistoryRepository confernecHistoryRepository;

	@Autowired
	private UserTmpPwRepository userTmpPwRepository;

	@Autowired
	public UserService(UserRepository userRepository, ConferenceHistoryRepository confernecHistoryRepository,
			UserEmailCheckRepository userEmailCheckRepository, UserTmpPwRepository userTmpPwRepository) {
		super();
		this.userRepository = userRepository;
		this.confernecHistoryRepository = confernecHistoryRepository;
		this.userEmailCheckRepository = userEmailCheckRepository;
		this.userTmpPwRepository = userTmpPwRepository;
	}

	// 회원가입
	@Transactional
	public User signup(UserRegisterReq userRegisterReq) throws Exception {
		UserEmailCheck userTmpDb = userEmailCheckRepository.findOneByTmpCode(userRegisterReq.getTmpCode());
		if (userTmpDb.getTmpCode().equals(userRegisterReq.getTmpCode())) {
			User user = User.builder().nickname(userRegisterReq.getNickname())
					.password(encoder.encode(userRegisterReq.getPassword())).email(userRegisterReq.getEmail())
					.phone(userRegisterReq.getPhone()).build();
			userEmailCheckRepository.delete(userTmpDb);
			return userRepository.save(user);
		} else {
			throw new IllegalStateException("회원가입에 실패하셨습니다.");
		}
	}

	// 로그인
	@Transactional
	public User login(String email, String pw) throws Exception {
		User loginUser = userRepository.findOneByEmail(email);
		if (loginUser == null)
			throw new IllegalStateException("이메일 또는 비밀번호가 틀립니다.");
		if (!encoder.matches(pw, loginUser.getPassword()))
			throw new IllegalStateException("이메일 또는 비밀번호가 틀립니다.");
		else {

		}
		return loginUser;
	}

	// 이메일 찾기
	@Transactional
	public User findEmail(String phone) throws Exception {
		return userRepository.findOneByPhone(phone);
	}

	// 비밀번호 변경
	@Transactional
	public void updatePassword(int id, UpdatePasswordReq password) {
		String encodePw = encoder.encode(password.getPassword());
		userRepository.updatePassword(id, encodePw);
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

	// 핸드폰 번호 수정
	@Transactional
	public User updatePhone(Integer id, UpdatePhoneReq phone) throws Exception {
		User user = userRepository.findOneById(id);
		System.out.println(user.getPhone());
		user.setPhone(phone.getPhone());
		return userRepository.save(user);
	}

	// 이미지 수정
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

	// 회원 정보 조회
	@Transactional
	public HashMap<String, Object> findUser(Integer id) throws Exception {
		User user = userRepository.findOneById(id);
		List<ConferenceHistory> confh = confernecHistoryRepository.findByUserId(id);
		if (user == null) {
			throw new IllegalStateException("회원 정보 조회에 실패했습니다.");
		}
		HashMap<String, Object> result = new HashMap<String, Object>();
		result.put("user", user);
		result.put("history", confh);
		return result;
	}

	// 비밀번호 변경(임시 비밀번호 발급)
	@Transactional
	public void updatePasswordTMP(String email, String password) {
		String encodePw = encoder.encode(password);
		userRepository.updatePasswordTMP(email, encodePw);
	}

	// 회원가입 이메일 검증을 위한 임시테이블에 email 저장
	@Transactional
	public UserEmailCheck insertTmpUser(String email, String tmpCode) throws Exception {

		UserEmailCheck userTmpDb = userEmailCheckRepository.findOneByEmail(email);

		if (userTmpDb == null) {
			System.out.println("null");
			userTmpDb = UserEmailCheck.builder().email(email).tmpCode(tmpCode).build();
		} else {
			if (email.equals(userTmpDb.getEmail())) {
				userEmailCheckRepository.delete(userTmpDb);
				userTmpDb = UserEmailCheck.builder().email(email).tmpCode(tmpCode).build();
			}
		}
		userEmailCheckRepository.save(userTmpDb);
		return userTmpDb;
	}

	// 비밀번호 찾기 계정 검증을 위한 임시테이블에 email 저장
	@Transactional
	public UserPwCheck insertTmpPw(String email, String tmppwCode) throws Exception {

		UserPwCheck userTmpPwDb = userTmpPwRepository.findOneByEmail(email);

		if (userTmpPwDb == null) {
			System.out.println("null");
			userTmpPwDb = UserPwCheck.builder().email(email).tmppwCode(tmppwCode).build();
		} else {
			if (email.equals(userTmpPwDb.getEmail())) {
				userTmpPwRepository.delete(userTmpPwDb);
				userTmpPwDb = UserPwCheck.builder().email(email).tmppwCode(tmppwCode).build();
			}
		}
		userTmpPwRepository.save(userTmpPwDb);
		return userTmpPwDb;
	}

	// 이메일 회원정보 조회
	@Transactional
	public Boolean findByEmail(String email) {
		User user = userRepository.findOneByEmail(email);
		if (user != null) {
			return false;
		}
		return true;
	}
}