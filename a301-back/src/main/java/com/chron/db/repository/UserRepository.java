package com.chron.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	boolean existsByEmail(String email);
	boolean existsByPhone(String phone);
	User findOneByEmail(String email);
	User findOneByPhone(String email);
	User findOneById(Integer id);
	@Modifying
	@Query(value = "update user u set u.password = ?2 where id = ?1", nativeQuery = true)
	int updatePassword(int id, String password);
}
