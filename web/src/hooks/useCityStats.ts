import { useQuery } from '@tanstack/react-query';
import { citiesApi } from '../api/cities.api';

export function useCitiesStats(range: string) {
  return useQuery({
    queryKey: ['cities-stats', range],
    queryFn: () => citiesApi.getCitiesStats(range),
    select: (response) => response.data,
  });
}
