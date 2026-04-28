import { useQuery } from '@tanstack/react-query';
import { citiesApi } from '../api/cities.api';

export function useCitiesStats(range: string, search: string) {
  return useQuery({
    queryKey: ['cities-stats', range, search],
    queryFn: () => citiesApi.getCitiesStats(range, search),
    select: (response) => response.data,
  });
}
