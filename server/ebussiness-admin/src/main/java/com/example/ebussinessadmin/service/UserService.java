package com.example.ebussinessadmin.service;

import com.example.ebussinessadmin.doman.User;
import com.example.ebussinessadmin.repository.UserRepository;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public Optional<User> findUserByUname(String uname) {
        return userRepository.findUserByUname(uname);
    }

    public boolean existUser(String uname) {
        return userRepository.existsByUname(uname);
    }

    public User saveUser(String uname, String upwd, @Nullable String icon) {
        return userRepository.save(new User(0, uname, upwd, icon));
    }
}
