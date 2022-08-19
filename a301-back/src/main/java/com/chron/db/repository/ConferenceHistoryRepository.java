package com.chron.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.ConferenceHistory;

@Repository
public interface ConferenceHistoryRepository extends JpaRepository<ConferenceHistory, Integer> {
	ConferenceHistory findBycIdAndAction(int cid, int action);

	List<ConferenceHistory> findByUserId(int uid);
	
	@Query(value = "select * from conference_history where c_id = ?1 and u_id = ?2 and action = ?3", nativeQuery = true)
	ConferenceHistory findOneByCIdAndUserIdAndAction(int c_id, int u_id, int action);
}