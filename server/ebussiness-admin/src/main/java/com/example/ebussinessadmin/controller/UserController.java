package com.example.ebussinessadmin.controller;

import com.example.ebussinessadmin.doman.User;
import com.example.ebussinessadmin.response.Resp;
import com.example.ebussinessadmin.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController("/")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/login")
    public Resp login(@RequestParam String uname, @RequestParam String upwd) {
        Optional<User> userByUname = userService.findUserByUname(uname);
        if (userByUname.isPresent()) {
            if (userByUname.get().getUpwd().equals(upwd)) {
                return Resp.ok(userByUname.get());
            } else {
                return Resp.err("密码错误");
            }
        } else {
            return Resp.err("找不到用户");
        }
    }

    @PostMapping("/register")
    public Resp register(@RequestParam String uname, @RequestParam String upwd, @RequestParam Optional<String> icon) {
        if (userService.existUser(uname)) {
            return Resp.err("用户名已存在");
        }
        User user = userService.saveUser(uname, upwd, icon.orElse(null));
        return Resp.ok(user);
    }
}
