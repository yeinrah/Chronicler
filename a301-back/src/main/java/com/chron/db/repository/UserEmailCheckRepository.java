package com.chron.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.UserEmailCheck;

@Repository
public interface UserEmailCheckRepository extends JpaRepository<UserEmailCheck, Integer> {
	UserEmailCheck findOneByTmpCode(String tmpCode);

	UserEmailCheck findOneByEmail(String email);
}
