package com.chron.api.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chron.api.request.MakeConferenceReq;
import com.chron.api.response.ConferenceRes;
import com.chron.api.util.SecurityUtil;
import com.chron.db.entity.Conference;
import com.chron.db.entity.User;
import com.chron.db.entity.User_conference;
import com.chron.db.repository.ConferenceRepository;
import com.chron.db.repository.UserRepository;
import com.chron.db.repository.User_ConferenceRepository;

@Service
public class ConferenceService {
	private ConferenceRepository conferenceRepository;
	private UserRepository userRepository;
	private User_ConferenceRepository userConferenceRepo;

	@Autowired
	public ConferenceService(ConferenceRepository conferenceRepository, UserRepository userRepository, User_ConferenceRepository userConferenceRepo) {
		this.conferenceRepository = conferenceRepository;
		this.userRepository = userRepository;
		this.userConferenceRepo = userConferenceRepo;
	}

	@Transactional
	public Conference makeConference(String conference_code, MakeConferenceReq makeConferenceReq, int id) {
		User user = userRepository.findOneById(id);
		Conference conference = Conference.builder().owner_id(user.getId()).conference_code(conference_code)
				.title(makeConferenceReq.getTitle()).is_active(true).build();
		
		return conferenceRepository.save(conference);
	}

	@Transactional(readOnly = true)
	public ConferenceRes getConferenceRes(String conference_code, String title, String nickname) {
		ConferenceRes conferenceRes = new ConferenceRes();
		
		conferenceRes.setNickname(nickname);
		conferenceRes.setTitle(title);
		conferenceRes.setConference_code(conference_code);
		return conferenceRes;
	}
	@Transactional
	public User_conference insertOwner(int user_id, int c_id) {
		User_conference userConference = User_conference.builder().user_id(user_id).c_id(c_id).is_owner(true).build();
		return userConferenceRepo.save(userConference);
	}
	
	
}
