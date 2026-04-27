import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notesApi } from '../api/notes.api';
import { notifications } from '@mantine/notifications';

export function useDeleteNote(cityId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (noteId: number) => notesApi.deleteCityNote(noteId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['city-notes', cityId],
      });

      notifications.show({
        title: 'Sukces',
        message: 'Notatka została usunięta',
        color: 'green',
      });
    },

    onError: () => {
      notifications.show({
        title: 'Błąd',
        message: 'Nie udało się usunąć notatki',
        color: 'red',
      });
    },
  });
}
