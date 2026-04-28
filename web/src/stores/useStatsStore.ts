import { create } from 'zustand';
import type { City } from '../types/cityStats';

type StateCities = {
  cities: City[];
  citiesMap: Record<string, City>;

  setCities: (cities: City[]) => void;
};

export const useStatsStore = create<StateCities>((set) => ({
  cities: [],
  citiesMap: {},

  setCities: (cities) =>
    set({
      cities,
      citiesMap: Object.fromEntries(cities.map((c) => [c.id, c])),
    }),
}));
