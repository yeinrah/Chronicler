package com.chron.db.entity;

import javax.persistence.*;

import com.sun.istack.NotNull;

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
	private Integer c_id;

	@Column(name = "owner_id")
	private Integer owner_id;

	@Column(name = "conferenceCode", length = 32)
	private String conferenceCode;

	@Column(name = "title", length = 50)
	private String title;

	@Column(name = "description")
	private String description;
	@NotNull
	@Column(name = "is_active")
	private boolean is_active;

//	@Builder.Default
//	@OneToMany(mappedBy = "room")
//	private Set<Game> games = new LinkedHashSet<Game>();
}
