package com.chron.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.sun.istack.NotNull;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "conference_history")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Conference_history {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ch_id")
	private Integer ch_id;
	
	@Column(name = "c_id")
	private Integer c_id;
	
	@Column(name = "user_id")
	private Integer user_id;
	
	@Column(name = "action")
	private Integer action;
	
	@Column(name = "inserted_time")
	private String inserted_time;
	
}
