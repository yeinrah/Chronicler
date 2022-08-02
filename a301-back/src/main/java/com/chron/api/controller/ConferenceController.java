package com.chron.api.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chron.api.request.EnterUserReq;
import com.chron.api.request.MakeConferenceReq;
import com.chron.api.response.ConferenceRes;
import com.chron.api.service.ConferenceService;
import com.chron.api.util.RandomNumberUtil;
import com.chron.db.entity.Conference;
import com.chron.db.entity.User;
import com.chron.db.entity.User_conference;

import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.ConnectionType;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "방 관리 API", tags = { "Conference" })
@RestController
@RequestMapping("/conference")
public class ConferenceController {

	private ConferenceService conferenceService;


	private Map<String, Integer> mapSessions = new ConcurrentHashMap<>();
	private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();


	@Autowired
	public ConferenceController(ConferenceService conferenceService, @Value("openvidu.secret") String secret,
			@Value("openvidu.url") String openviduUrl) {
		this.conferenceService = conferenceService;
	}

	@PostMapping("/{id}")
	@ApiOperation(value = "회의 DB에 등록", notes = "DB에 등록 후, 세션 이름, 닉네임 반환")
	@ApiResponses({ @ApiResponse(code = 200, message = "회의 만들기 성공"), @ApiResponse(code = 400, message = "input 오류"),
			@ApiResponse(code = 401, message = "인증 오류"),
			@ApiResponse(code = 500, message = "서버 에러") })
	public ResponseEntity<ConferenceRes> makeConference(@PathVariable int id, @RequestBody MakeConferenceReq makeConferenceReq)
			throws Exception {
		// 세션 코드 난수 생성
		String conference_code = RandomNumberUtil.getRandomNumber();
		
		// DB 저장
		Conference conf = conferenceService.makeConference(conference_code,  makeConferenceReq, id);
		//conference_history를 만들고 action을 0으로 했음
		conferenceService.makeConferenceHistory(id, conference_code);
		
		//방 참가했을 때 회의_회원 테이블에 방장 데이터 넣기
		conferenceService.insertOwner(id, conf.getC_id());
		
		return ResponseEntity.ok(
				conferenceService.getConferenceRes(conference_code, makeConferenceReq.getTitle(), makeConferenceReq.getNickname()));
	}
	
	@PostMapping("/enter/{id}")
	@ApiOperation(value = "회원_회의 DB에 참가자 데이터를 등록", notes = "DB에 등록")
	@ApiResponses({ @ApiResponse(code = 200, message = "회원_회의 DB에 넣기 성공"), @ApiResponse(code = 400, message = "input 오류"),@ApiResponse(code = 401, message = "인증 오류"),@ApiResponse(code = 500, message = "서버 에러") })
	public ResponseEntity<?> enterConference(@PathVariable int id, @RequestBody EnterUserReq enterUserReq)
			throws Exception {
		
		//방 참가했을 때 회의_회원 테이블에 팀원 데이터 넣기
		conferenceService.insertParticipant(id, enterUserReq.getConference_code());
		//참가했을때 conference_history의 action을 1로 해서 추가해줌
		
		return new ResponseEntity<String>(HttpStatus.OK);
		}
	
		//방 나가기 구현 => conference_history의 action을 2로, is_active false
		//회의록 구현

}
