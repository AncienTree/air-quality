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
}
