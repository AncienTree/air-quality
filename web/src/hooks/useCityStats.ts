import { useQuery } from '@tanstack/react-query';
import { citiesApi } from '../api/cities.api';

export function useCityStats(range: string) {
  return useQuery({
    queryKey: ['city-stats', range],
    queryFn: () => citiesApi.getCityStats(range),
    select: (response) => response.data,
  });
}
