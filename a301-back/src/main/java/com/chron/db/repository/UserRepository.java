package com.chron.db.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chron.db.entity.User;


public interface UserRepository extends JpaRepository<User, Integer>{
	
	List<User> findAll();
}
