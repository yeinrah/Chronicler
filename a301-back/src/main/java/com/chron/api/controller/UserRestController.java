package com.chron.api.controller;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chron.api.request.FindPwReq;
import com.chron.api.request.UpdateImageReq;
import com.chron.api.request.UpdateNicknameReq;
import com.chron.api.request.UpdatePasswordReq;
import com.chron.api.request.UpdatePhoneReq;
import com.chron.api.request.UserRegisterReq;
import com.chron.api.service.UserService;
import com.chron.api.util.JWTUtil;
import com.chron.api.util.RandomNumberUtil;
import com.chron.db.entity.User;
import com.chron.email.EmailSender;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/api/userInfo")
public class UserRestController {

	private UserService userService;

	@Autowired
	private JWTUtil jwtUtil;

	EmailSender emailSender;

	@Autowired
	public UserRestController(UserService userService, EmailSender emailSender) {
		super();
		this.userService = userService;
		this.emailSender = emailSender;
	}

	@PostMapping("/signup")
	@ApiOperation(value = "회원가입", notes = "이메일, 비밀번호, 닉네임, 그리고 전화번호를 통해 회원가입 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "회원가입 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "회원정보 중복(회원가입 불가)") })
	public ResponseEntity<?> signup(@Valid @RequestBody UserRegisterReq userRegisterReq) throws Exception {
		userService.checkEmailDuplication(userRegisterReq);
		userService.checkPhoneDuplication(userRegisterReq);
		userService.signup(userRegisterReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PostMapping("/login")
	@ApiOperation(value = "로그인", notes = "이메일, 비밀번호를 통해 로그인 한다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "로그인 성공"), @ApiResponse(code = 202, message = "로그인 성공"),
			@ApiResponse(code = 400, message = "입력 오류"), @ApiResponse(code = 409, message = "수정 실패"),
			@ApiResponse(code = 500, message = "회원정보 중복(로그인 불가)") })
	public ResponseEntity<Map<String, Object>> login(String email, String pw) throws Exception {
		HttpStatus status = null;
		HashMap<String, Object> result = new HashMap<>();

		try {
			User loginUser = userService.login(email, pw);
			if (loginUser != null) {
				// id 정보만 들어 있는 토큰 생성
				result.put("access-token", jwtUtil.createToken("userEmail", loginUser.getEmail()));
				result.put("message", "로그인에 성공하였습니다.");
				loginUser.setPassword("");
				result.put("loginUser", loginUser);

				status = HttpStatus.ACCEPTED;
			}
			// 실패했을 경우
			else {
				result.put("message", "로그인에 실패하였습니다.");
				status = HttpStatus.BAD_REQUEST;
			}
		} catch (Exception e) {
			result.put("message", "예외가 발생했습니다");
			status = HttpStatus.BAD_REQUEST;
		}
		return new ResponseEntity<Map<String, Object>>(result, status);
	}

	@GetMapping("/findEmail")
	@ApiOperation(value = "이메일 찾기", notes = "전화번호를 통해 이메일을 찾는다.")
	public ResponseEntity<?> findEmail(@RequestParam String phone) throws Exception {
		User user = userService.findEmail(phone);
		return new ResponseEntity<String>(user.getEmail(), HttpStatus.OK);
	}

	@PatchMapping("/updateNickname/{id}")
	@ApiOperation(value = "닉네임 수정", notes = "닉네임 수정")
	public ResponseEntity<?> updateNickname(@PathVariable Integer id,
			@Valid @RequestBody UpdateNicknameReq updateNicknameReq) throws Exception {
		userService.updateNickname(id, updateNicknameReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PatchMapping("/updateImage/{id}")
	@ApiOperation(value = "이미지 수정", notes = "이미지 수정")
	public ResponseEntity<?> updateImage(@PathVariable Integer id, @Valid @RequestBody UpdateImageReq updateImageReq)
			throws Exception {
		userService.updateImage(id, updateImageReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PatchMapping("/updatePhone/{id}")
	@ApiOperation(value = "핸드폰 번호 수정", notes = "핸드폰 번호 수정")
	public ResponseEntity<?> updatePhone(@PathVariable Integer id, @Valid @RequestBody UpdatePhoneReq updatePhoneReq)
			throws Exception {
		userService.updatePhone(id, updatePhoneReq);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@DeleteMapping("/mypage/{id}")
	@ApiOperation(value = "회원 탈퇴", notes = "회원 탈퇴")
	public ResponseEntity<?> withdraw(@PathVariable Integer id) throws Exception {
		userService.withdraw(id);
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	@PatchMapping("/updatePassword/{id}")
	@ApiOperation(value = "비밀번호 변경", notes = "비밀번호를 변경한다.")
	public ResponseEntity<?> updatePassword(@PathVariable int id, @Valid @RequestBody UpdatePasswordReq password) {
		userService.updatePassword(id, password);
		return new ResponseEntity<Integer>(HttpStatus.OK);
	}

	@GetMapping("/mypage/{id}")
	@ApiOperation(value = "회원 정보 조회", notes = "id를 통해 마이페이지를 조회한다.")
	public ResponseEntity<?> findUser(@PathVariable Integer id) throws Exception {
		HashMap<String, Object> user = userService.findUser(id);
		return new ResponseEntity<>(user, HttpStatus.OK);
	}

	@GetMapping("/findpw")
	@ApiOperation(value = "비밀번호 찾기", notes = "이메일주소를 통해 사용자 이메일로 인증코드를 발급한다.")
	public ResponseEntity<?> findpw(@RequestParam String email) throws Exception {

			String tmppwCode = RandomNumberUtil.getRandomNumber();
			userService.insertTmpPw(email, tmppwCode);
			emailSender.sendPwAuth(email, tmppwCode);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/updatepw")
	@ApiOperation(value = "비밀번호 난수 업데이트", notes = "이메일주소를 통해 인증코드를 입력하면 비밀번호가 난수로 변경되고 이메일로 발송된다.")
	public ResponseEntity<?> updatepw(@RequestBody FindPwReq findPwReq) throws Exception {

		userService.updatePasswordTMP(findPwReq.getEmail(), findPwReq.getTmppwCode());
		emailSender.sendUpdatePw(findPwReq.getEmail(), findPwReq.getTmppwCode());
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@GetMapping("/signup/checkEmail")
	@ApiOperation(value = "이메일 인증 코드 보내기", notes = "이메일주소를 통해 사용자 이메일로 인증코드를 발급한다.")
	public ResponseEntity<?> checkingEmail(@RequestParam String email) throws Exception {

			String tmpCode = RandomNumberUtil.getRandomNumber();
			userService.insertTmpUser(email, tmpCode);
			emailSender.checkEmail(email, tmpCode);
		return new ResponseEntity<>(HttpStatus.OK);
	}

}
