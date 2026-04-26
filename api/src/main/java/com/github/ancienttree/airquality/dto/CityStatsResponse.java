package com.github.ancienttree.airquality.dto;

public record CityStatsResponse(
        String cityId,
        String country,

        Double avgNO2,
        Double maxNO2,
        Double minNO2,

        Double avgCO,
        Double maxCO,
        Double minCO,

        Double avgPM10,
        Double maxPM10,
        Double minPM10
) {
    public CityStatsResponse {
        avgNO2 = round(avgNO2);
        maxNO2 = round(maxNO2);
        minNO2 = round(minNO2);

        avgCO = round(avgCO);
        maxCO = round(maxCO);
        minCO = round(minCO);

        avgPM10 = round(avgPM10);
        maxPM10 = round(maxPM10);
        minPM10 = round(minPM10);
    }

    private static double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}
