package com.example.ebussinessadmin.response;

import lombok.Getter;

@Getter
public class Err implements Resp {

    private final String status = "failed";
    private final String message;

    public Err(String message) {
        this.message = message;
    }
}
