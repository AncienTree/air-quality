package com.github.ancienttree.airquality.model;

import com.github.ancienttree.airquality.dto.MeasurementRequest;
import org.junit.jupiter.api.Test;

import java.time.Instant;

import static org.assertj.core.api.Assertions.assertThat;

public class MeasurementMapperTest {
    @Test
    void shouldMapTimestampCorrectly() {
        long timestamp = 1714123456L;

        MeasurementRequest dto = new MeasurementRequest(
                "sensor",
                "city",
                10.0,
                1.0,
                20.0,
                timestamp
        );

        Measurement m = Measurement.map(dto);

        assertThat(m.getMeasuredAt())
                .isEqualTo(Instant.ofEpochSecond(timestamp));
    }
}
