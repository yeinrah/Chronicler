package com.chron.api.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chron.api.request.MakeConferenceReq;
import com.chron.api.response.ConferenceRes;
import com.chron.db.entity.Chronicle;
import com.chron.db.entity.Conference;
import com.chron.db.entity.ConferenceHistory;
import com.chron.db.entity.User;
import com.chron.db.entity.UserConference;
import com.chron.db.repository.ChronicleRepository;
import com.chron.db.repository.ConferenceHistoryRepository;
import com.chron.db.repository.ConferenceRepository;
import com.chron.db.repository.UserConferenceRepository;
import com.chron.db.repository.UserRepository;

@Service
public class ConferenceService {
	private ConferenceRepository conferenceRepository;
	private UserRepository userRepository;
	private UserConferenceRepository userConferenceRepo;
	private ConferenceHistoryRepository conferenceHistoryRepo;
	private ChronicleRepository chronicleRepo;

	@Autowired
	public ConferenceService(ConferenceRepository conferenceRepository, UserRepository userRepository,
			UserConferenceRepository userConferenceRepo, ConferenceHistoryRepository conferenceHistoryRepo, ChronicleRepository chronicleRepo) {
		this.conferenceRepository = conferenceRepository;
		this.userRepository = userRepository;
		this.userConferenceRepo = userConferenceRepo;
		this.conferenceHistoryRepo = conferenceHistoryRepo;
		this.chronicleRepo = chronicleRepo;
	}

	// conference 생성
	@Transactional
	public Conference makeConference(String conference_code, MakeConferenceReq makeConferenceReq, int id) {
		User user = userRepository.findOneById(id);
		Conference conference = Conference.builder().ownerId(user.getId()).conferenceCode(conference_code)
				.title(makeConferenceReq.getTitle()).build();
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

	// 방장 user_conference에 생성
	@Transactional
	public UserConference insertOwner(int user_id, int c_id) {
		UserConference userConference = UserConference.builder().userId(user_id).cId(c_id).isOwner(true).build();
		return userConferenceRepo.save(userConference);
	}

	// user_conference 참가자 생성
	@Transactional
	public UserConference insertParticipant(int user_id, String conference_code) {
		Conference conf = conferenceRepository.findOneByConferenceCode(conference_code);
		UserConference userConference = UserConference.builder().cId(conf.getCId()).userId(user_id).isOwner(false)
				.build();
		return userConferenceRepo.save(userConference);
	}

	// conference_history : 회의 생성
	@Transactional
	public ConferenceHistory makeConferenceHistory(int user_id, String conference_code) {
		Conference conf = conferenceRepository.findOneByConferenceCode(conference_code);
		Long time = System.currentTimeMillis();
		java.sql.Timestamp stamp = new Timestamp(time);
		ConferenceHistory confh = ConferenceHistory.builder().cId(conf.getCId()).userId(user_id).action(0)
				.insertedTime(stamp.toString()).build();
		return conferenceHistoryRepo.save(confh);
	}

	// conference_history : 회의 시작
	@Transactional
	public ConferenceHistory startConferenceHistory(int user_id, String conference_code) {
		Conference conf = conferenceRepository.findOneByConferenceCode(conference_code);
		Long time = System.currentTimeMillis();
		java.sql.Timestamp stamp = new Timestamp(time);
		ConferenceHistory confh = ConferenceHistory.builder().cId(conf.getCId()).userId(user_id).action(1)
				.insertedTime(stamp.toString()).build();
		return conferenceHistoryRepo.save(confh);
	}

	// conference_history : (방장)회의 종료
	@Transactional
	public ConferenceHistory endConferenceHistory(int user_id, String conference_code) {
		Long time = System.currentTimeMillis();
		java.sql.Timestamp stamp = new Timestamp(time);
		Conference conf = conferenceRepository.findOneByConferenceCode(conference_code);
		ConferenceHistory confh = ConferenceHistory.builder().cId(conf.getCId()).userId(user_id).action(2).insertedTime(stamp.toString()).build();
		return conferenceHistoryRepo.save(confh);
	}

	// conference_history : (일반 참가자)회의 나가기
	@Transactional
	public ConferenceHistory leaveConferenceHistory(int user_id, String conference_code) {
		Long time = System.currentTimeMillis();
		java.sql.Timestamp stamp = new Timestamp(time);
		Conference conf = conferenceRepository.findOneByConferenceCode(conference_code);
		ConferenceHistory confh = ConferenceHistory.builder().cId(conf.getCId()).userId(user_id).action(1).insertedTime(stamp.toString()).build();
		return conferenceHistoryRepo.save(confh);
	}

	// conference_history : 참가자가 방장인지 체크
	@Transactional
	public Boolean isOwner(int user_id, String conference_code) {
		Conference conf = conferenceRepository.findOneByConferenceCode(conference_code);
		int cid = conf.getCId();
		List<UserConference> userConfList = userConferenceRepo.findConferenceBycId(cid);

		for (UserConference userConf : userConfList) {
			if (userConf.getUserId() == user_id) {
				return userConf.isOwner();
			}
		}
		return false;
	}
	// 회의 종료하면 회의록 생성하는 로직
	@Transactional
	public Chronicle makeChronicle(int user_id, String conference_code) {
		//회의 데이터 가져옴
		Conference conf = conferenceRepository.findOneByConferenceCode(conference_code);
		int confCid = conf.getCId();
		String startTime = conferenceHistoryRepo.findBycIdAndAction(confCid, 0).getInsertedTime();
		String endTime = conferenceHistoryRepo.findBycIdAndAction(confCid, 2).getInsertedTime();
		Long time = System.currentTimeMillis();
		java.sql.Timestamp stamp = new Timestamp(time);
		
		Chronicle chronicle = Chronicle.builder().cId(confCid).ownerId(user_id).chronicle_data("회의록내용들어올곳").time(stamp.toString()).
				callStartTime(startTime).callEndTime(endTime).build();
		return chronicleRepo.save(chronicle);
	}
	
}