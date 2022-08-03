package com.chron.api.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
import com.chron.api.response.ConferenceRes;
import com.chron.api.service.ConferenceService;
import com.chron.api.util.RandomNumberUtil;
import com.chron.db.entity.Conference;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "회의 방 관리 API", tags = { "Conference" })
@RestController
@RequestMapping("/conference")
public class ConferenceController {

	private ConferenceService conferenceService;

//	// 회의 관리
//	private Map<String, Integer> mapSessions = new ConcurrentHashMap<>();

	@Autowired
	public ConferenceController(ConferenceService conferenceService) {
		this.conferenceService = conferenceService;
	}

	@PostMapping("/{u_id}")
	@ApiOperation(value = "회의 DB에 등록", notes = "DB에 등록 후, 세션 이름, 닉네임 반환")
	@ApiResponses({ @ApiResponse(code = 200, message = "회의 만들기 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 401, message = "인증 오류"), @ApiResponse(code = 500, message = "서버 에러") })
	public ResponseEntity<ConferenceRes> makeConference(@PathVariable int u_id,
			@RequestBody MakeConferenceReq makeConferenceReq) throws Exception {
		// 세션 코드 난수 생성
		String conference_code = RandomNumberUtil.getRandomNumber();

		// DB 저장
		Conference conf = conferenceService.makeConference(conference_code, makeConferenceReq, u_id);

		// conference_history를 만들고 action을 0으로 했음
		conferenceService.makeConferenceHistory(u_id, conference_code);

		// 방 참가했을 때 회의_회원 테이블에 방장 데이터 넣기
		conferenceService.insertOwner(u_id, conf.getCId());

		return ResponseEntity.ok(conferenceService.getConferenceRes(conference_code, makeConferenceReq.getTitle(),
				makeConferenceReq.getNickname()));
	}

	@PostMapping("/enter/{u_id}")
	@ApiOperation(value = "회원_회의 DB에 참가자 데이터를 등록", notes = "DB에 등록")
	@ApiResponses({ @ApiResponse(code = 200, message = "회원_회의 DB에 넣기 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 401, message = "인증 오류"), @ApiResponse(code = 500, message = "서버 에러") })
	public ResponseEntity<?> enterConference(@PathVariable int u_id, @RequestBody EnterUserReq enterUserReq)
			throws Exception {

		// 방 참가했을 때 회의_회원 테이블에 팀원 데이터 넣기
		conferenceService.insertParticipant(u_id, enterUserReq.getConference_code());
		// 참가했을때 conference_history의 action을 1로 해서 추가해줌
		conferenceService.startConferenceHistory(u_id, enterUserReq.getConference_code());
		return new ResponseEntity<String>(HttpStatus.OK);
	}

	
	
	// 방 나가기 구현 => conference_history의 action을 2로, is_active false
	@PutMapping("/{conference_code}")
	@ApiOperation(value = "참가자가 회의를 나갈 경우 사용", notes = "회의 나가기를 통해 상태 정보 변경")
	@ApiResponses({ @ApiResponse(code = 200, message = "회의 나가기 성공"), @ApiResponse(code = 400, message = "입력 오류"),
			@ApiResponse(code = 401, message = "인증 오류"), @ApiResponse(code = 404, message = "회의 정보가 없습니다."),
			@ApiResponse(code = 500, message = "서버 에러") })
	public ResponseEntity<?> leaveConference(@PathVariable String conference_code,
			@RequestBody LeaveConferenceReq leaveConferenceReq) {
		int u_id = leaveConferenceReq.getId();
		if (conferenceService.isOwner(u_id, conference_code))
			conferenceService.endConferenceHistory(u_id, conference_code);
		else
			conferenceService.leaveConferenceHistory(u_id, conference_code);

		return new ResponseEntity<>(HttpStatus.OK);
	}

	// 회의록 구현

}
