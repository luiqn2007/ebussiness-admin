package com.example.ebussinessadmin.repository;


import com.example.ebussinessadmin.doman.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    Optional<User> findUserByUname(String uname);

    boolean existsByUname(String uname);
}
