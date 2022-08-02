package com.chron.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.User_conference;

@Repository
public interface User_ConferenceRepository extends JpaRepository<User_conference, String> {
	
}
