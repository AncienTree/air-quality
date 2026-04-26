package com.github.ancienttree.airquality.mapper;

import com.github.ancienttree.airquality.dto.NoteResponse;
import com.github.ancienttree.airquality.model.Note;

public class NoteMapper {
    public static NoteResponse toDto(Note note) {
        return new NoteResponse(
                note.getId(),
                note.getCityId(),
                note.getTitle(),
                note.getContent(),
                note.getCreatedAt().toEpochMilli(),
                note.getUpdatedAt().toEpochMilli()
        );
    }
}
