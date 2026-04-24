import { useQuery } from '@tanstack/react-query';
import { citiesApi } from '../api/cities.api';

export function useCities() {
  return useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const response = await citiesApi.getAllCities();
      return response.data;
    },
  });
}
