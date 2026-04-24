import { http } from './http';

export const citiesApi = {
  getAllCities: () => http.get('/cities'),
};
