package com.chron.api.controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.chron.api.request.MakeSessionReq;
import com.chron.api.response.SessionRes;
import com.chron.api.service.SessionService;
import com.chron.api.util.RandomNumberUtil;
import com.chron.db.entity.User;

import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.OpenViduRole;
import io.openvidu.java.client.Session;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@Api(value = "방 관리 API", tags = { "Room" })
@RestController
@RequestMapping("/session")
public class SessionController {

	private SessionService sessionService;

	private OpenVidu openVidu;

	private Map<String, Integer> mapSessions = new ConcurrentHashMap<>();
	private Map<String, Map<String, OpenViduRole>> mapSessionNamesTokens = new ConcurrentHashMap<>();

	private String OPENVIDU_URL;
	private String SECRET;

	@Autowired
	public SessionController(SessionService sessionService, @Value("openvidu.secret") String secret,
			@Value("openvidu.url") String openviduUrl) {
		this.sessionService = sessionService;

		this.SECRET = secret;
		this.OPENVIDU_URL = openviduUrl;
		this.openVidu = new OpenVidu(OPENVIDU_URL, SECRET);
	}

	@PostMapping("")
	@ApiOperation(value = "세션 만들기", notes = "세션 만들기을 통해 세션과 토큰을 생성 후 토큰, 세션 이름, 닉네임 반환")
	@ApiResponses({ @ApiResponse(code = 200, message = "세션 만들기 성공"), @ApiResponse(code = 400, message = "input 오류"),
			@ApiResponse(code = 401, message = "인증 오류"),
			@ApiResponse(code = 500, message = "서버 에러") })
	@PreAuthorize("hasAnyRole('USER', 'ADMIN')")
	public ResponseEntity<SessionRes> makeSession(@RequestBody MakeSessionReq makeSessionReq, @RequestBody User user)
			throws OpenViduJavaClientException, OpenViduHttpException {

		// 세션 코드 난수 생성
		String conference_code = RandomNumberUtil.getRandomNumber();

		// 방 관리 map에 저장
		this.mapSessions.put(conference_code, 1);

		// DB 저장
		sessionService.makeSession(conference_code, makeSessionReq, user);

		return ResponseEntity.ok(
				sessionService.getSessionRes(conference_code, makeSessionReq.getTitle(), makeSessionReq.getNickname()));
	}

}
