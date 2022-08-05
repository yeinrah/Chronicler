package com.chron.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.Conference;
import com.chron.db.entity.ConferenceHistory;

@Repository
public interface ConferenceHistoryRepository extends JpaRepository<ConferenceHistory, Integer> {
	ConferenceHistory findBycIdAndAction(int cid, int action); 
}