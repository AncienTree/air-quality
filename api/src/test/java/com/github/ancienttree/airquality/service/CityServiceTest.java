package com.github.ancienttree.airquality.service;

import com.github.ancienttree.airquality.dto.CityStatsResponse;
import com.github.ancienttree.airquality.dto.enums.TimeRange;
import com.github.ancienttree.airquality.repository.CityRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.assertThat;

@ExtendWith(MockitoExtension.class)
public class CityServiceTest {

    @Mock
    private CityRepository cityRepository;

    @InjectMocks
    private CityService cityService;

    @Test
    void shouldReturnEmptyListWhenNoData() {
        // Given
        when(cityRepository.getCityStatisticsByRange(any()))
                .thenReturn(List.of());

        // When
        var result = cityService.getStatistics(TimeRange.H24);

        // Then
        assertThat(result).isEmpty();
    }

    @Test
    void shouldReturnDataFromRepository() {
        // Given
        var mockData = List.of(
                new CityStatsResponse(
                        "city-1", "PL",
                        10.0, 20.0, 5.0,
                        1.0, 2.0, 0.5,
                        50.0, 100.0, 10.0
                )
        );

        when(cityRepository.getCityStatisticsByRange(any()))
                .thenReturn(mockData);

        // When
        var result = cityService.getStatistics(TimeRange.H1);

        // Then
        assertThat(result).hasSize(1);
        assertThat(result.getFirst().cityId()).isEqualTo("city-1");
    }
}
