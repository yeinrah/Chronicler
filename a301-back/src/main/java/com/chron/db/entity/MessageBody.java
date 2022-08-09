package com.chron.db.entity;

import java.util.List;

import lombok.Data;

@Data
public class MessageBody {
	private List<Message> items;
}
