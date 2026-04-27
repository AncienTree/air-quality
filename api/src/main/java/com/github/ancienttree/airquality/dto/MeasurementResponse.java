package com.github.ancienttree.airquality.dto;

public record MeasurementResponse(
        String cityId,
        Double PM10,
        Double CO,
        Double NO2,
        Long timestamp
) {
}
