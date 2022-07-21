package com.chron.A301.api.service;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.chron.db.entity.User;
import com.chron.db.repository.UserRepository;

@SpringBootTest
class UserServiceTest {
    @Autowired
    UserRepository userRepository;
    @Test
    void test() {
        User user = User.builder().nickname("nick").password("pw").email("email").phone("phone").build();
        userRepository.save(user);
    }
}
