package com.github.ancienttree.airquality.dto;

public record ApiResponse<T>(T data, String status) {

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(data, "OK");
    }

    public static <T> ApiResponse<T> created(T data) {
        return new ApiResponse<>(data, "CREATED");
    }
}
