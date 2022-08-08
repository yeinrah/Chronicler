package com.chron.db.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.chron.db.entity.Chronicle;
@Repository
public interface ChronicleRepository extends JpaRepository<Chronicle, Integer> {

}