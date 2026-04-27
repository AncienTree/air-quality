import { useQuery } from '@tanstack/react-query';
import { notesApi } from '../api/notes.api';

export function useCityNotes(cityId: string | undefined) {
  if (!cityId) {
    throw new Error('City ID is required to fetch notes');
  }

  return useQuery({
    queryKey: ['city-notes', cityId],
    queryFn: () => notesApi.getCityNotes(cityId),
    select: (response) => response.data,
  });
}
