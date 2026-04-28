import { http } from './http';

export const citiesApi = {
  getAllCities: () => http.get('/cities'),
  getCitiesStats: (range: string, search: string) =>
    http.get(`/cities/stats/${range}`, { params: search && search?.length > 0 ? { search } : {} }),
  getCityStats: (cityId: string) => http.get(`/measurements/${cityId}`),
};
