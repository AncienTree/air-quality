package com.github.ancienttree.airquality.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record MeasurementRequest(
        @NotBlank String sensorId,
        @NotBlank String cityId,
        @NotNull @PositiveOrZero Double PM10,
        @NotNull @PositiveOrZero Double CO,
        @NotNull @PositiveOrZero Double NO2,
        @NotNull Long timestamp
) {};
