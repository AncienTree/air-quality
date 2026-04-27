import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NoteUpdate } from '../types/note';
import { notesApi } from '../api/notes.api';
import { notifications } from '@mantine/notifications';

export function useUpdateNote(cityId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ noteId, data }: { noteId: number; data: NoteUpdate }) =>
      notesApi.updateCityNote(noteId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['city-notes', cityId] });

      notifications.show({
        title: 'Sukces',
        message: 'Notatka została zaktualizowana',
        color: 'green',
      });
    },

    onError: (error) => {
      console.error('Error updating note:', error);

      notifications.show({
        title: 'Błąd',
        message: 'Nie udało się zaktualizować notatki',
        color: 'red',
      });
    },
  });
}
