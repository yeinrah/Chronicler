package com.chron.db.entity;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "conference")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Conference {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "c_id")
	private Integer cId;

	@Column(name = "owner_id")
	private Integer ownerId;

	@Column(name = "conference_code", length = 32)
	private String conferenceCode;

	@OneToMany(mappedBy = "conference")
	private List<UserConference> userconf = new ArrayList<UserConference>();
}
