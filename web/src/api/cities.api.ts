import { http } from './http';

export const citiesApi = {
  getAllCities: () => http.get('/cities'),
  getCityStats: (range: string) => http.get(`/cities/stats/${range}`),
};
