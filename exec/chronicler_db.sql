DROP DATABASE IF EXISTS `chronicler`;

CREATE DATABASE IF NOT EXISTS `chronicler` collate utf8mb4_general_ci;

USE `chronicler`;

-- 회원 테이블
CREATE TABLE user (
 u_id INTEGER auto_increment,
 nickname VARCHAR(32),
 password VARCHAR(255),
 email VARCHAR(255),  
 image INTEGER DEFAULT 0,
 phone VARCHAR(11),
 PRIMARY KEY(u_id)
);

-- 회의 테이블
CREATE TABLE conference (
c_id INTEGER auto_increment,
owner_id Integer,
conference_code VARCHAR(16),
PRIMARY KEY(c_id),
FOREIGN KEY(owner_id)
REFERENCES user(u_id) ON DELETE CASCADE
);

-- 회의록 테이블
CREATE TABLE chronicle (
clist_id INTEGER auto_increment,
c_id Integer,
owner_id Integer,
chronicle_data LONGTEXT,
time TIMESTAMP,
call_start_time DATETIME,
call_end_time DATETIME,
PRIMARY KEY(clist_id),
FOREIGN KEY(c_id)
REFERENCES conference(c_id) ON DELETE CASCADE,
FOREIGN KEY(owner_id)
REFERENCES conference(owner_id) ON DELETE CASCADE
);

-- 회의 히스토리
CREATE TABLE conference_history (
ch_id INTEGER auto_increment,
c_id Integer,
u_id Integer,
action SMALLINT,
inserted_time DATETIME DEFAULT CURRENT_TIMESTAMP,
PRIMARY KEY(ch_id),
FOREIGN KEY(c_id)
REFERENCES conference(c_id) ON DELETE CASCADE,
FOREIGN KEY(u_id)
REFERENCES user(u_id) ON DELETE CASCADE
);

-- 회원_회의 테이블
CREATE TABLE user_conference (
id INTEGER NOT NULL auto_increment,
u_id Integer NOT NULL,
c_id Integer NOT NULL,
is_owner BOOLEAN NOT NULL default 0,
PRIMARY KEY(id),
FOREIGN KEY(u_id)
REFERENCES user(u_id) ON DELETE CASCADE,
FOREIGN KEY(c_id)
REFERENCES conference(c_id) ON DELETE CASCADE
);

-- 회원 임시 테이블
CREATE TABLE user_tmp (
 tmp_id INTEGER auto_increment,
 email VARCHAR(255),
 tmp_code VARCHAR(32),
 PRIMARY KEY(tmp_id)
);

-- 회원 비밀번호 인증 테이블
CREATE TABLE pw_tmp (
 tmppw_id INTEGER auto_increment,
 email VARCHAR(255),
 tmppw_code VARCHAR(32),
 PRIMARY KEY(tmppw_id)
);

SELECT * FROM user;
SELECT * FROM conference;
SELECT * FROM chronicle;
SELECT * FROM conference_history;
SELECT * FROM user_conference;
SELECT * FROM user_tmp; 