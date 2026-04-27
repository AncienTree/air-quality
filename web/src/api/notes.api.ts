import type { NoteUpdate } from '../types/note';
import { http } from './http';

export const notesApi = {
  getCityNotes: (cityId: string) => http.get(`/cities/${cityId}/notes`),
  createCityNote: (cityId: string, body: NoteUpdate) => http.post(`/cities/${cityId}/notes`, body),
  updateCityNote: (noteId: number, body: NoteUpdate) => http.put(`/notes/${noteId}`, body),
  deleteCityNote: (noteId: number) => http.delete(`/notes/${noteId}`),
};
