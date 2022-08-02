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
@Table(name = "user_conference")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User_conference {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
//	@NotNull
	@Column(name = "id")
	private Integer id;
	
	@NotNull
	@Column(name = "user_id")
	private Integer user_id;
	
	@NotNull
	@Column(name = "c_id")
	private Integer c_id;
	
	@NotNull
	@Column(name = "is_owner", nullable = false)
	private boolean is_owner;
}
