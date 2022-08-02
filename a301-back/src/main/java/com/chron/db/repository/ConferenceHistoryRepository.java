package com.chron.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.Conference_history;

@Repository
public interface ConferenceHistoryRepository extends JpaRepository<Conference_history, Integer> {
	
}