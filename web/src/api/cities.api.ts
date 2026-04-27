import { http } from './http';

export const citiesApi = {
  getAllCities: () => http.get('/cities'),
  getCitiesStats: (range: string) => http.get(`/cities/stats/${range}`),
  getCityStats: (cityId: string) => http.get(`/cities/${cityId}/stats`),
};
