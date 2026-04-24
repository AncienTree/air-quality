package com.github.ancienttree.airquality.dto;

public record NoteResponse(
        Long id,
        String cityId,
        String title,
        String content,
        Long createdAt,
        Long updatedAt
) {
}
