package com.chron.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chron.db.entity.UserPwCheck;

public interface UserTmpPwRepository extends JpaRepository<UserPwCheck, Integer>{
	UserPwCheck findOneByTmppwCode(String tmppwCode);

	UserPwCheck findOneByEmail(String email);
}
