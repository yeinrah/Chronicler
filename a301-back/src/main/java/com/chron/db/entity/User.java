package com.chron.db.entity;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;

import javax.persistence.Entity;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


//id / nickname / password / email / image / phone
@Entity
@Table(name="USER")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User{
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private Integer id;
	
	@Column(name = "nickname", length = 32)
	private String nickname;
	
	@Column(name = "password", length = 255)
	private String password;
	
	@Column(name = "email", length = 255)
	private String email;
	
	@Column(name = "image", length = 255)
	private String image;
	
	@Column(name = "phone", length = 11)
	private String phone;
}