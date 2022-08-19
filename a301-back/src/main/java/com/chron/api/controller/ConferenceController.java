package com.chron.api.controller;

import java.util.HashMap;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chron.api.request.EnterUserReq;
import com.chron.api.request.LeaveConferenceReq;
import com.chron.api.request.MakeConferenceReq;
import com.chron.api.service.ConferenceService;
import com.chron.api.service.UserService;
import com.chron.db.entity.Conference;
import com.chron.db.entity.User;
import com.chron.docx.Aspose;
import com.chron.email.EmailSender;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "회의 방 관리 API", tags = { "Conference" })
@RestController
@RequestMapping("/api/conference")
public class ConferenceController {

	private ConferenceService conferenceService;
	private Aspose aspose;
	private UserService userService;
	EmailSender emailSender;
	HttpSession session;

	@Autowired
	public ConferenceController(ConferenceService conferenceService, Aspose aspose, EmailSender emailSender,
			UserService userService) {
		this.conferenceService = conferenceService;
		this.aspose = aspose;
		this.emailSender = emailSender;
		this.userService = userService;
	}

	// 회의 생성
	@PostMapping("/{u_id}")
	@ApiOperation(value = "회의 생성", notes = "DB에 등록 후, 세션 이름, 닉네임 반환")
	@ApiResponses({ @ApiResponse(code = 200, message = "회의 만들기 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 401, message = "인증 오류"), @ApiResponse(code = 500, message = "서버 에러") })
	public ResponseEntity<String> makeConference(@PathVariable int u_id,
			@RequestBody MakeConferenceReq makeConferenceReq) throws Exception {

		// DB 저장
		Conference conf = conferenceService.makeConference(makeConferenceReq.getConferenceCode(), u_id);
		// conference_history를 만들고 action을 0으로 했음
		conferenceService.makeConferenceHistory(u_id, makeConferenceReq.getConferenceCode());
		// 방 참가했을 때 회의_회원 테이블에 방장 데이터 넣기
		conferenceService.insertOwner(u_id, conf.getCId());

		return new ResponseEntity<String>(HttpStatus.OK);
	}

	// 회의 참가
	@PostMapping("/enter/{u_id}")
	@ApiOperation(value = "회의 참가", notes = "세션코드와 닉네임을 입력하면 회의에 참가할 수 있다.")
	@ApiResponses({ @ApiResponse(code = 200, message = "회의 접속 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 401, message = "인증 오류"), @ApiResponse(code = 500, message = "서버 에러") })
	public ResponseEntity<?> enterConference(@PathVariable int u_id, @RequestBody EnterUserReq enterUserReq)
			throws Exception {
		// 방 참가했을 때 회의_회원 테이블에 팀원 데이터 넣기
		conferenceService.insertParticipant(u_id, enterUserReq.getConference_code());
		// 참가했을때 conference_history의 action을 1로 해서 추가해줌
		conferenceService.startConferenceHistory(u_id, enterUserReq.getConference_code());
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	// 회의 나가기(방장이면, 회의 종료)
	@PutMapping("/{conference_code}")
	@ApiOperation(value = "참가자가 회의를 나갈 경우 사용(방장이면 종료)", notes = "회의 나가기를 통해 상태 정보 변경")
	@ApiResponses({ @ApiResponse(code = 200, message = "회의 나가기 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 401, message = "인증 오류"), @ApiResponse(code = 404, message = "회의 정보가 없습니다."),
			@ApiResponse(code = 500, message = "서버 에러") })
	public ResponseEntity<?> leaveConference(@PathVariable String conference_code,
			@RequestBody LeaveConferenceReq leaveConferenceReq) {
		int u_id = leaveConferenceReq.getId();

		// 참가자 ID가 방장 ID인지 체크
		if (conferenceService.isOwner(u_id, conference_code)) {
			conferenceService.endConferenceHistory(u_id, conference_code);
			// 회의록 제작
			conferenceService.makeChronicle(u_id, conference_code, leaveConferenceReq.getChronicleData());
			try {
				HashMap<String, Object> user = userService.findUser(u_id);
				User user2 = (User) user.get("user");
				// 참가 시간 가져오기
				String time = conferenceService.getInsertedTime(u_id, conference_code);
				// 참가자 가져오기
				String participants = conferenceService.getParticipants(conference_code);
				aspose.makeChronicle(leaveConferenceReq.getChronicleData(), time, participants);
				emailSender.sendEmailAttachment(user2.getEmail(), leaveConferenceReq.getChronicleData());
			} catch (Exception e) {
				e.printStackTrace();
			}
		} else
			conferenceService.leaveConferenceHistory(u_id, conference_code);

		return new ResponseEntity<>(HttpStatus.OK);
	}

}
