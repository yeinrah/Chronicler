package com.chron.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.UserConference;

@Repository
public interface UserConferenceRepository extends JpaRepository<UserConference, String> {
	List<UserConference> findConferenceBycId(int cid);
}
