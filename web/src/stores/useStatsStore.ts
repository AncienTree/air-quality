import { create } from 'zustand';
import type { City } from '../types/CityStats';

type StateCities = {
  cities: City[];

  setCities: (cities: City[]) => void;
};

export const useStatsStore = create<StateCities>((set) => ({
  cities: [],

  setCities: (cities) => set({ cities }),
}));
