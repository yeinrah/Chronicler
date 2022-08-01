package com.chron.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chron.api.request.MakeSessionReq;
import com.chron.api.response.SessionRes;
import com.chron.api.util.SecurityUtil;
import com.chron.db.entity.Session;
import com.chron.db.entity.User;
import com.chron.db.repository.SessionRepository;
import com.chron.db.repository.UserRepository;

@Service
public class SessionService {
	private SessionRepository sessionRepository;
	private UserRepository userRepository;

	@Autowired
	public SessionService(SessionRepository sessionRepository, UserRepository userRepository) {
		this.sessionRepository = sessionRepository;
		this.userRepository = userRepository;
	}

	@Transactional
	public Session makeSession(String conference_code, MakeSessionReq makeSessionReq, User user) {
		Session session = Session.builder().owner_id(user.getId()).conference_code(conference_code)
				.title(makeSessionReq.getTitle()).is_active(true).build();
		return sessionRepository.save(session);
	}

	@Transactional(readOnly = true)
	public SessionRes getSessionRes(String conference_code, String title, String nickname) {
		SessionRes sessionRes = new SessionRes();
		User user = userRepository.findOneWithRolesByEmail(SecurityUtil.getCurrentEmail().orElse("")).orElse(null);

		sessionRes.setNickname(user.getNickname());
		sessionRes.setTitle(title);

		return sessionRes;
	}
}
