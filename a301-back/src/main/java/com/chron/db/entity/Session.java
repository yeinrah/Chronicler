package com.chron.db.entity;

import javax.persistence.*;

import lombok.*;

@Entity
@Table(name = "session")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Session {
	@Id
	@Column(name = "c_id")
	private String c_id;

	@Column(name = "owner_id")
	private Integer owner_id;

	@Column(name = "conference_code", length = 32)
	private String conference_code;

	@Column(name = "title", length = 50)
	private String title;

	@Column(name = "description")
	private String description;

	@Column(name = "is_active", nullable = false)
	private boolean is_active;

//	@Builder.Default
//	@OneToMany(mappedBy = "room")
//	private Set<Game> games = new LinkedHashSet<Game>();
}
