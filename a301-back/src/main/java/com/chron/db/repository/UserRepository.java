package com.chron.db.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	List<User> findAllByEmail(String phone);
}
