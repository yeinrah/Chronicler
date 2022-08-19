package com.chron.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "u_id")
	private Integer id;

	@Column(name = "nickname", length = 32)
	private String nickname;

	@Column(name = "password", length = 255)
	private String password;

	@Column(name = "email", length = 255)
	private String email;

	@Column(name = "image")
	private Integer image;

	@Column(name = "phone", length = 11)
	private String phone;
}