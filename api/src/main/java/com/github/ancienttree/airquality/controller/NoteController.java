package com.github.ancienttree.airquality.controller;


import com.github.ancienttree.airquality.dto.ApiResponse;
import com.github.ancienttree.airquality.dto.NoteRequest;
import com.github.ancienttree.airquality.dto.NoteResponse;
import com.github.ancienttree.airquality.service.NoteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@Tag(name = "Note", description = "Get information about notes for cities")
@RequiredArgsConstructor
public class NoteController {

    private final NoteService noteService;

    @GetMapping("/cities/{cityId}/notes")
    @Operation(summary = "Get all notes for a city")
    public ResponseEntity<ApiResponse<List<NoteResponse>>> getNotesForCity(@PathVariable String cityId) {
        return ResponseEntity.ok(ApiResponse.ok(noteService.getNotesForCity(cityId)));
    }

    @PostMapping("/cities/{cityId}/notes")
    @Operation(summary = "Create a note for a city")
    public ResponseEntity<ApiResponse<Long>> createNote(@PathVariable String cityId, @RequestBody NoteRequest body) {
        return ResponseEntity.ok(ApiResponse.created(noteService.creatNote(cityId, body)));
    }

    @PutMapping("/notes/{noteId}")
    @Operation(summary = "Update a note for a city")
    public ResponseEntity<ApiResponse<Void>> updateNote(@PathVariable String noteId, @RequestBody NoteRequest body) {
        noteService.updateNote(Long.valueOf(noteId), body);
        return ResponseEntity.ok(ApiResponse.ok(null));
    }

    @DeleteMapping("/notes/{noteId}")
    @Operation(summary = "Delete a note for a city")
    public ResponseEntity<Void> delete(@PathVariable String noteId) {
        noteService.deleteNote(Long.valueOf(noteId));
        return ResponseEntity.noContent().build();
    }
}
