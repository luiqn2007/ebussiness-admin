package com.example.ebussinessadmin.response;

public interface Resp {

    static <T> Ok<T> ok(T value) {
        return new Ok<>(value);
    }

    static Err err(String message) {
        return new Err(message);
    }
}
