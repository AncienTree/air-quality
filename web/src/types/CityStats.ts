export type CityAvgStats = {
  cityId: string;
  country: string;
  avgNO2: number;
  minNO2: number;
  maxNO2: number;
  avgPM10: number;
  minPM10: number;
  maxPM10: number;
  avgCO: number;
  minCO: number;
  maxCO: number;
};

export type CityStats = {
  cityId: string;
  PM10: number;
  CO: number;
  NO2: number;
  timestamp: number;
};

export type City = {
  id: string;
  country: string;
  city: string;
  region: string;
  regionId: string;
};
