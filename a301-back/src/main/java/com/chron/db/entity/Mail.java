package com.chron.db.entity;

import org.springframework.web.multipart.MultipartFile;

import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Data
public class Mail {
	private String address;
	private String title;
	private String nickname;
	private String message;
	private MultipartFile file;
}
