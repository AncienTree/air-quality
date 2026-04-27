import { useQuery } from '@tanstack/react-query';
import { citiesApi } from '../api/cities.api';

export function useCityStats(cityId: string | undefined) {
  if (!cityId) {
    throw new Error('City ID is required to fetch stats');
  }
  return useQuery({
    queryKey: ['city-stats', cityId],
    queryFn: () => citiesApi.getCityStats(cityId),
    select: (response) => response.data,
  });
}
