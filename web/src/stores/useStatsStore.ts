import { create } from 'zustand';
import type { City } from '../types/cityStats';

type StateCities = {
  cities: City[];

  setCities: (cities: City[]) => void;
};

export const useStatsStore = create<StateCities>((set) => ({
  cities: [],

  setCities: (cities) => set({ cities }),
}));
