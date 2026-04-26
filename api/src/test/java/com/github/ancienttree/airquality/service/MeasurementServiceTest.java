package com.github.ancienttree.airquality.service;

import com.github.ancienttree.airquality.dto.MeasurementRequest;
import com.github.ancienttree.airquality.model.Measurement;
import com.github.ancienttree.airquality.repository.MeasurementRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.Instant;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class MeasurementServiceTest {

    @Mock
    private MeasurementRepository measurementRepository;

    @Mock
    private CityService cityService;

    @InjectMocks
    private MeasurementService measurementService;

    @Test
    void shouldSaveMeasurementAndReturnId() {
        // Given
        MeasurementRequest request = new MeasurementRequest(
                "sensor-1",
                "city-1",
                10.0,
                1.0,
                20.0,
                1714123456L
        );

        Measurement saved = Measurement.map(request);

        // When
        when(measurementRepository.save(any()))
                .thenReturn(saved);
        Long id = measurementService.save(request);

        // Then
        assertThat(id).isNull();
        verify(cityService).getOrCreateCity("city-1");
        verify(measurementRepository).save(any());
    }

    @Test
    void shouldMapTimestampCorrectly() {
        // Given
        long timestamp = 1714123456L;

        MeasurementRequest request = new MeasurementRequest(
                "sensor-1",
                "city-1",
                10.0,
                1.0,
                20.0,
                timestamp
        );
        // When
        Measurement measurement = Measurement.map(request);
        // Then
        assertThat(measurement.getMeasuredAt()).isEqualTo(Instant.ofEpochSecond(timestamp));
    }
}
