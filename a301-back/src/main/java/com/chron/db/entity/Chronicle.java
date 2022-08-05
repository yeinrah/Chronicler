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
@Table(name = "chronicle")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Chronicle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "clist_id")
	private Integer clistId;

	@Column(name = "c_id")
	private Integer cId;

	@Column(name = "owner_id")
	private Integer ownerId;

	@Column(name = "chronicle_data")
	private String chronicle_data;

	@Column(name = "time")
	private String time;

	@Column(name = "call_start_time")
	private String callStartTime;

	@Column(name = "call_end_time")
	private String callEndTime;
}
