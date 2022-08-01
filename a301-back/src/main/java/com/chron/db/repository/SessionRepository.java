package com.chron.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.Session;

@Repository
public interface SessionRepository extends JpaRepository<Session, String> {

}
