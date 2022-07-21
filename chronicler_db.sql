create database IF NOT EXISTS `chronicler` collate utf8mb4_general_ci;

CREATE TABLE user (
 id INTEGER auto_increment,
 nickname VARCHAR(32),
 password VARCHAR(255),
 email VARCHAR(255),  
 image VARCHAR(255),
 phone VARCHAR(11),
 PRIMARY KEY(id)
);


