DROP DATABASE IF EXISTS `chronicler`;

CREATE DATABASE IF NOT EXISTS `chronicler` collate utf8mb4_general_ci;

USE `chronicler`;

CREATE TABLE user (
 id INTEGER auto_increment,
 nickname VARCHAR(32),
 password VARCHAR(255),
 email VARCHAR(255),  
 image INTEGER DEFAULT 0,
 phone VARCHAR(11),
 PRIMARY KEY(id)
);


Select * from user;