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

import com.chron.api.request.UpdateImageReq;
import com.chron.api.request.UpdateNicknameReq;
import com.chron.api.request.UpdatePasswordReq;
import com.chron.api.request.UserRegisterReq;
import com.chron.api.service.UserService;
import com.chron.api.util.JWTUtil;
import com.chron.db.entity.User;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = { "*" }, maxAge = 6000)
@RestController
@RequestMapping("/userInfo")
public class UserRestController {
	private UserService userService;

	@Autowired
	private JWTUtil jwtUtil;

	@Autowired
	public UserRestController(UserService userService) {
		super();
		this.userService = userService;
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
	@ApiResponses({ @ApiResponse(code = 200, message = "로그인 성공"), @ApiResponse(code = 202, message = "로그인 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 409, message = "수정 실패"), @ApiResponse(code = 500, message = "회원정보 중복(로그인 불가)") })
	public ResponseEntity<Map<String, Object>> login(String email, String pw) throws Exception {
		HttpStatus status = null;
		HashMap<String, Object> result = new HashMap<>();

		try {
			User loginUser = userService.login(email, pw);
			if (loginUser != null) {
				// id 정보만 들어 있는 토큰 생성
				result.put("access-token", jwtUtil.createToken("userEmail", loginUser.getEmail()));
				result.put("message", "로그인에 성공하였습니다.");
				status = HttpStatus.ACCEPTED;
			}
			// 실패했을 경우
			else {
				result.put("message", "로그인에 실패하였습니다.");
				status = HttpStatus.BAD_REQUEST;
			}
		} 
		catch (Exception e) {
			result.put("message", "예외가 발생했습니다");
			status = HttpStatus.ACCEPTED;
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
}
