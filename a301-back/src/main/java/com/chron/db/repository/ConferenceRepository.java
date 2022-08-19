package com.chron.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.Conference;

@Repository
public interface ConferenceRepository extends JpaRepository<Conference, Integer> {
	Conference findOneByConferenceCode(String conference_code);
}
