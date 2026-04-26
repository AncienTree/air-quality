package com.github.ancienttree.airquality.service;

import com.github.ancienttree.airquality.client.CityClient;
import com.github.ancienttree.airquality.dto.CityResponse;
import com.github.ancienttree.airquality.dto.CityStatsResponse;
import com.github.ancienttree.airquality.dto.enums.TimeRange;
import com.github.ancienttree.airquality.mapper.CityMapper;
import com.github.ancienttree.airquality.model.City;
import com.github.ancienttree.airquality.repository.CityRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class CityService {

    private final CityRepository cityRepository;
    private final CityClient cityClient;

    public City getOrCreateCity(String cityId) {
        return cityRepository.findById(cityId).orElseGet(() -> {
            log.info("City {} not found in database. Start fetching.", cityId);
            CityResponse response = cityClient.fetchCityFromExternal(cityId);
            City city = City.map(cityId, response);

            return cityRepository.save(city);
        });
    }

    public List<CityResponse> getAllCities() {
        return cityRepository.findAll()
                .stream()
                .map(CityMapper::toDto)
                .toList();
    }

    public List<String> getAllRegions() {
        return cityRepository.getAllRegions();
    }

    public List<CityStatsResponse> getStatistics(TimeRange range) {
        log.info("Start fetching city statistics for range {}", range);
        Instant from = switch (range) {
            case H1 -> Instant.now().minus(1, ChronoUnit.HOURS);
            case H24 -> Instant.now().minus(24, ChronoUnit.HOURS);
            case M3 -> ZonedDateTime.now(ZoneOffset.UTC).minusMonths(3).toInstant();
        };
        return cityRepository.getCityStatisticsByRange(from);
    }
}
