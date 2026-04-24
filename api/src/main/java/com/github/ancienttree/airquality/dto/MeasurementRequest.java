package com.github.ancienttree.airquality.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;

public record MeasurementRequest(
        @NotBlank String sensorId,
        @NotBlank String cityId,
        @NotNull @PositiveOrZero Double pm10,
        @NotNull @PositiveOrZero Double co,
        @NotNull @PositiveOrZero Double no2,
        @NotNull Long timestamp
) {};
