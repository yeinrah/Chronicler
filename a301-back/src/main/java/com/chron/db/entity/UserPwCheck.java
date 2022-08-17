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
@Table(name = "pw_tmp")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserPwCheck {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tmppw_id")
	private Integer tmppwId;

	@Column(name = "email", length = 255)
	private String email;

	@Column(name = "tmppw_code", length = 32)
	private String tmppwCode;
}