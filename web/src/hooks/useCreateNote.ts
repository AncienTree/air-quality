import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { NoteUpdate } from '../types/note';
import { notesApi } from '../api/notes.api';
import { notifications } from '@mantine/notifications';

export function useCreateNote(cityId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: NoteUpdate) => notesApi.createCityNote(cityId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['city-notes', cityId] });
      
      notifications.show({
        title: 'Sukces',
        message: 'Notatka została dodana',
        color: 'green',
      });
    },
    onError: (error) => {
      console.error('Error creating note:', error);

      notifications.show({
        title: 'Błąd',
        message: 'Nie udało się dodać notatki',
        color: 'red',
      });
    },
  });
}
