package com.chron.db.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
public class UserConference {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
	private int id;

	@ManyToOne(targetEntity = User.class)
	@JoinColumn(name = "user_id")
	private int userId;

	@ManyToOne(targetEntity = Conference.class)
	@JoinColumn(name = "c_id")
	private int cId;

	@NotNull
	@Column(name = "is_owner", nullable = false)
	private boolean isOwner;
}
