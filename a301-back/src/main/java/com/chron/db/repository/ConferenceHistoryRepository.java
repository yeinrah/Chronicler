package com.chron.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.ConferenceHistory;

@Repository
public interface ConferenceHistoryRepository extends JpaRepository<ConferenceHistory, Integer> {
	ConferenceHistory findBycIdAndAction(int cid, int action);

	List<ConferenceHistory> findByUserId(int uid);
}