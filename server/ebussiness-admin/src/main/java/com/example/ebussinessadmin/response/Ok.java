package com.example.ebussinessadmin.response;

import lombok.Getter;

@Getter
public class Ok<T> implements Resp {

    private final String status = "success";
    private final T data;

    public Ok(T data) {
        this.data = data;
    }
}
