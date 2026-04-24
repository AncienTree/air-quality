package com.github.ancienttree.airquality.service;

import com.github.ancienttree.airquality.dto.NoteRequest;
import com.github.ancienttree.airquality.dto.NoteResponse;
import com.github.ancienttree.airquality.exception.NotFoundException;
import com.github.ancienttree.airquality.mapper.NoteMapper;
import com.github.ancienttree.airquality.model.Note;
import com.github.ancienttree.airquality.repository.NoteRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
public class NoteService {
    private final NoteRepository noteRepository;

    public List<NoteResponse> getNotesForCity(String cityId) {
        log.info("Start fetching notes for city {}", cityId);
        return noteRepository.findByCityIdOrderByCreatedAtDesc(cityId)
                .stream()
                .map(NoteMapper::toDto)
                .toList();
    }

    public Long creatNote(String cityId, NoteRequest body) {
        log.info("Start creating note for city {}", cityId);
        Instant now = Instant.now();
        Note note = new Note(cityId, body.title(), body.content(), now, now);
        var saved = noteRepository.save(note);
        return saved.getId();
    }

    @Transactional
    public void updateNote(Long noteId, NoteRequest body) {
        log.info("Start updating note with id {}", noteId);
        try {
            Note note = noteRepository.findById(noteId).orElseThrow(() -> new NotFoundException("Note not found"));
            note.update(body.title(), body.content());
        } catch (Exception e) {
            log.error("Error updating note with id {}: {}", noteId, e.getMessage());
            throw new NotFoundException("Error updating note");
        }
    }

    public void deleteNote(Long noteId) {
        log.info("Start deleting note with id {}", noteId);
        try {
            noteRepository.deleteById(noteId);
        } catch (Exception e) {
            log.error("Error deleting note with id {}: {}", noteId, e.getMessage());
            throw new RuntimeException("Error deleting note");
        }
    }
}
